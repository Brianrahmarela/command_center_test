import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('access_token')?.value;

  if (req.nextUrl.pathname.startsWith('/login') && !token) {
    return;
  }

  if (req.nextUrl.pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname === '/' && token) {
    return NextResponse.redirect(new URL('/menu', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/menu', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/menu') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/dashboard/:path*') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/', '/login', '/menu', '/dashboard', '/dashboard/:path*'],
};
