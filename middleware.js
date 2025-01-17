// Import NextResponse for handling requests/responses
import { NextResponse } from 'next/server';

// Main middleware function
export function middleware(request) {
  console.log('Request URL:', request.url);

  // Example: Redirect if user tries to access a restricted page
  if (request.nextUrl.pathname === '/admin(tkd)') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Continue processing the request
  return NextResponse.next();
}

// Optional: Configure routes where middleware should apply
export const config = {
  matcher: ['/admin(tkd)', '/api/:path*'], 
};
