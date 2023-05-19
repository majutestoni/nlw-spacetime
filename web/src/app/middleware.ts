import { NextRequest, NextResponse } from "next/server";
const singIn = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(singIn, {
      headers: {
        "Set-cookie": `redirecTo=${request.url}; path=/; HttpOnly; max-age=20 `,
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/memories/:path*",
};
