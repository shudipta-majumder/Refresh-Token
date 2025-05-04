import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const backend_exp = req.nextauth.token.backend_exp;
    const isExpired = backend_exp && Date.now() > backend_exp * 1000;
    console.log("backend_exp", backend_exp);
    console.log("isExpired", isExpired);

    if (req.nextUrl.pathname.startsWith("/academic/version") ) {
      return NextResponse.next();
    } 
    // if(isExpired){
    //   return NextResponse.rewrite(new URL("/academic/refreshsession", req.url));
    // }
    else {
      return NextResponse.rewrite(new URL("/403", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // "/login",
    "/dashboard",
    "/class-timetable",
    "/academic/:path*",
    "/student-info/:path*",
    "/human-resource/:path*",
    "/exam/:path*",
    "/fees-collection/:path*",
  ],
};
