// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Expire the auth cookie
//     return NextResponse.json(
//       { success: true, message: "Logout successful." },
//       {
//         status: 200,
//         headers: {
//           "Set-Cookie": `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`,
//         },
//       }
//     );
//   } catch (err) {
//     return NextResponse.json({ error: "Logout failed." }, { status: 500 });
//   }
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
