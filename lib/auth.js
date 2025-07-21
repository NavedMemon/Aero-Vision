// // lib/auth.js
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

// export function generateToken(payload) {
//   return jwt.sign(payload, SECRET, { expiresIn: "1d" });
// }

// export function verifyToken(token) {
//   try {
//     return jwt.verify(token, SECRET);
//   } catch {
//     return null;
//   }
// }

import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "6h" });
}
