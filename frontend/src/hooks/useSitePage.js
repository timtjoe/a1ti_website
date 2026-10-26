import { useQuery } from '@tanstack/react-query';
import { sitePageService } from '@/services/sitePageService';
import { useSitePageStore } from '@/store/sitePageStore';

export function useSitePage(pathname) {
  return useQuery({
    queryKey: ['site-pages', pathname],
    queryFn: async () => {
      const page = await sitePageService.getByPath(pathname);
      useSitePageStore.getState().setPage(pathname, page);
      return page;
    },
    staleTime: Infinity,
  });
}

export default useSitePage;
