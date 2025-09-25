import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Simplified middleware for Edge Runtime compatibility
  // Skip authentication check in middleware to avoid Edge Runtime issues
  
  // Allow all requests to pass through
  // Authentication will be handled in client-side components
  return NextResponse.next({
    request,
  })
}