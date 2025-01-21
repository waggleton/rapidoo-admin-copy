import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user has a 'token' cookie
  const token = request.cookies.get('token')?.value;

  // Define the protected routes
  const protectedRoutes = ['/Dashboard', '/profile', '/parcel', '/trips', '/rider', '/customer', '/other-protected-route'];
  const loginRoutes = ['/auth/signin'];

  // If the user is not authenticated and tries to access a protected route, redirect to SignIn
  if (!token && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (token && loginRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/Dashboard', request.url));
  }

  // Allow the request to proceed if the token is present or the route is not protected
  return NextResponse.next();
}

// Define the routes where middleware should apply
export const config = {
  matcher: [
    '/Dashboard/:path*', 
    '/profile/:path*', 
    '/parcel/:path*', 
    '/trips/:path*', 
    '/rider/:path*', 
    '/customer/:path*', 
    '/other-protected-route/:path*'
  ],
};
