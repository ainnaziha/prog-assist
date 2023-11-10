import { NextRequest, NextResponse } from 'next/server'
import { AssessmentCode } from './config/contents';

export async function middleware(request: NextRequest) {
  const session = request.cookies.has('user');
  const pathname = request.nextUrl.pathname;
  const url = new URL(request.nextUrl.href);

  if (session && ['/', '/login', '/register'].includes(pathname)) {
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  } else if (!session && ['/dashboard', '/assessment'].includes(pathname)) {
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url);
  } else if (!session && /^\/result\/\w+$/.test(pathname)) {
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url);
  } else if (pathname === '/assessment') {
    const url = request.nextUrl.clone();
    const category = url.searchParams.get('category');
    if (category && !Object.values(AssessmentCode).includes(category as AssessmentCode)) {
      return NextResponse.json({ message: `Invalid category` }, { status: 400 });
    }
  }

  return NextResponse.next()
}
