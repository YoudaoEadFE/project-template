import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isNoAuthRoute, isAuthRoute } from '@/utils/authRoute';
import { aes } from '@/utils/util';

// Middleware usage see https://nextjs.org/docs/advanced-features/middleware

export function middleware(req: NextRequest) {
  const {
    nextUrl: { pathname },
    cookies,
  } = req;

  if (!isNoAuthRoute(pathname)) {
    const url = req.nextUrl.clone();
    const USER_COOKIES = cookies.get('USER_COOKIES_NEED_CHANGE') ?? { value: '{}' };
    const {token, role: encRole} = JSON.parse(USER_COOKIES?.value);

    const role = aes().decrypt(encRole ?? '');

    // 如果没有登录，则跳转到登录页面
    if (!role || !token || pathname === '/') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // 非当前角色授权的路由跳转到 404 页面
    if (!isAuthRoute(role, pathname)) {
      url.pathname = '/404';
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: '/((?!static|api|_next).*)',
};
