// import { NextResponse } from "next/server";

// export async function GET() {
//   const response = NextResponse.json({ message: "Logout successful." });

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

  return NextResponse.json(
    { success: true, message: "Logout successful." },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`,
      },
    }
  );
}
