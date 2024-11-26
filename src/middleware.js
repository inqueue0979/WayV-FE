import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // 인증되지 않은 사용자를 "/login"으로 리다이렉트
  },
  callbacks: {
    authorized({ req, token }) {
      console.log(`[Middleware] URL: ${req.nextUrl.pathname}, Authenticated: ${!!token}`);
      return true; // 인증 여부에 관계없이 미들웨어 실행
    },
  },
});

export const config = {
  matcher: [
    "/",              // 루트 경로 보호
    "/dashboard/:path*", // "/dashboard" 및 하위 경로 보호
    "/projects/:path*",  // "/projects" 및 하위 경로 보호
    "/profile/:path*",   // "/profile" 및 하위 경로 보호
  ],
};

// 미들웨어 동작
export function middleware(req) {
  const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");

  // 인증된 사용자가 루트("/")로 접근하려는 경우
  if (token && req.nextUrl.pathname === "/") {
    console.log("[Middleware] Authenticated user attempted to access '/'. Redirecting to '/dashboard'.");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  else if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("[Middleware] Unauthenticated user attempted to access '/dashboard'. Redirecting to '/login'.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 기본 동작을 유지
  return NextResponse.next();
}