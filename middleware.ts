// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Verificar si es una ruta protegida
  const isProtectedRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api/protected') || 
    pathname.startsWith('/profile')
  
  const isAuthPage = pathname.startsWith('/auth')

  // Obtener el token de autenticación
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })
  
  const isAuthenticated = !!token

  // Redireccionar a login si intenta acceder a ruta protegida sin autenticación
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL('/auth/signin', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // Redireccionar al dashboard si ya está autenticado e intenta acceder a las páginas de auth
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Verificar roles específicos (ejemplo para rutas de administrador)
  if (pathname.startsWith('/admin') && isAuthenticated) {
    const userRoles = token.roles as string[] || []
    if (!userRoles.includes('admin')) {
      // No tiene rol de administrador, redirigir a acceso denegado
      return NextResponse.redirect(new URL('/access-denied', request.url))
    }
  }

  return NextResponse.next()
}

// Especificar rutas que serán manejadas por este middleware
export const config = {
  matcher: [
    // Páginas que requieren autenticación
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/protected/:path*',
    // Páginas de autenticación
    '/auth/:path*'
  ],
}