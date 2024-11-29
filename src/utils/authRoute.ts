import { roleAuthRoutesRegex } from '@/constants';

export const isAuthRoute = ( role: string, path: string) => {
  // 有权限的路由
  return roleAuthRoutesRegex[role].some((regex) => regex.test(path));
};

export const isNoAuthRoute = (path: string) => {
  // 无需权限的路由
  return (
    path.startsWith('/login') ||
    ['/404', '/403', '/500', '/_error', '/serviceWorker.js', '/__webpack_hmr'].includes(path)
  );
};
