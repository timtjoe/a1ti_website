import { useQuery } from '@tanstack/react-query';
import { courseCatalogService } from '@/services/courseCatalogService';
import { useCourseStore } from '@/store/courseStore';

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const courses = await courseCatalogService.list();
      useCourseStore.getState().setCourses(courses);
      return courses;
    },
    staleTime: Infinity,
  });
}

export function useCourseBySlug(slug) {
  return useQuery({
    queryKey: ['courses', slug],
    queryFn: () => courseCatalogService.getBySlug(slug),
    enabled: Boolean(slug),
    staleTime: Infinity,
  });
}
