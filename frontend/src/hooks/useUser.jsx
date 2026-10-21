// src/hooks/useUser.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';

const userService = {
  async browseUsers(filters) {
    return await apiClient.get('/users', { params: filters });
  },

  async getProfile(userId) {
    return await apiClient.get(`/users/${userId}`);
  },

  async createUser(values, idempotencyKey) {
    return await apiClient.post('/users', values, {
      headers: { 'Idempotency-Key': idempotencyKey },
    });
  },

  async updateProfile(userId, values, idempotencyKey) {
    return await apiClient.patch(`/users/${userId}/update`, values, {
      headers: { 'Idempotency-Key': idempotencyKey },
    });
  },

  async destroyUser(userId, idempotencyKey) {
    return await apiClient.delete(`/users/${userId}/delete`, {
      headers: { 'Idempotency-Key': idempotencyKey },
    });
  },
};

export const useBrowseUsers = (filters) => {
  return useQuery({
    queryKey: ['users', 'browse', filters],
    queryFn: () => userService.browseUsers(filters),
    refetchOnWindowFocus: true,
  });
};

export const useUserProfile = (userId, enabled = true) => {
  return useQuery({
    queryKey: ['users', 'profile', userId],
    queryFn: () => userService.getProfile(userId),
    enabled: enabled && !!userId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ values, idempotencyKey }) =>
      userService.createUser(values, idempotencyKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, values, idempotencyKey }) => {
      if (!userId) throw new Error('No target user specified.');
      return userService.updateProfile(userId, values, idempotencyKey);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDestroyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, idempotencyKey }) =>
      userService.destroyUser(userId, idempotencyKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
