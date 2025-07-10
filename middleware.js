import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
	const { pathname } = request.nextUrl;

	const token = request.cookies.get("token");

	if (pathname.startsWith("/admin")) {
		if (!token) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/admin/:path*",
	]
};
