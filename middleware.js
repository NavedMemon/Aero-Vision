import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET =
  process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const protectedPaths = [
    "/dashboard/admin",
    "/dashboard/passenger",
    "/dashboard/staff",
  ];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  if (!token) {
    console.log("❌ No token. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("✅ Token verified. Payload:", payload);
    return NextResponse.next();
  } catch (err) {
    console.error("❌ JWT verification failed in Edge:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
