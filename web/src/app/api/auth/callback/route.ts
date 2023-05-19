import { api } from "@/app/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const redirectTo = request.cookies.get('redirectTo ')?.value


  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const registerResponse = await api.post("/register", { code });
  const { token } = registerResponse.data;
  const expire = 60 * 60 * 24 * 30;
  const redirectUrl = redirectTo ?? new URL("/", request.url);
  return NextResponse.redirect(redirectUrl, {
    headers: {
      "Set-cookie": `token=${token}; path=/; max-age=${expire}`,
    },
  });
}
