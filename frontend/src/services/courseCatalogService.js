import { COURSES } from '@/components/courses/courseData';

export const courseCatalogService = {
  async list() {
    return COURSES;
  },

  async getBySlug(slug) {
    return COURSES.find((course) => course.slug === slug) || null;
  },
};

export default courseCatalogService;
