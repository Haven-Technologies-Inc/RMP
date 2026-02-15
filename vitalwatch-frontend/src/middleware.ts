/**
 * VitalWatch Next.js Middleware
 * Route protection and authentication checks
 * 
 * Note: Auth is handled client-side via DashboardLayout for demo mode.
 * This middleware only handles basic routing logic.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // Allow all requests - auth is handled client-side via DashboardLayout
  // This is required because zustand persists to localStorage, not cookies
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};
