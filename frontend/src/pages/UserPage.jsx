// src/pages/UserPage.jsx
import React from 'react';
import { useBrowseUsers, useUpdateUser } from '@/hooks/useUser';

export default function UserPage() {
  const { data: users, isLoading, error } = useBrowseUsers({ page: 1 });
  const updateMutation = useUpdateUser();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  // Handle data structure whether it returns raw array or wrapped in { data: [...] }
  const userList = Array.isArray(users) ? users : users?.data || [];

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {userList.map((user) => (
          <li
            key={user.id}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              margin: '0.5rem 0',
            }}
          >
            <span>{user.name}</span>
            <button
              onClick={() =>
                updateMutation.mutate({
                  userId: user.id,
                  values: { name: `${user.name} (Updated)` },
                  idempotencyKey: crypto.randomUUID(),
                })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
