// import { NextResponse } from "next/server";

// export async function GET() {
//   const response = NextResponse.json({ message: "Admin logout successful." });

//   response.cookies.set("token", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//     expires: new Date(0), // Expire immediately
//   });

//   return response;
// }

import { NextResponse } from "next/server";
import { logLogout } from "@/utils/logoutLogger";

export async function GET(req) {
  await logLogout(req);

  const response = NextResponse.json({ message: "Admin logout successful." });
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
