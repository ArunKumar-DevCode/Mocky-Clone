import { cookies } from "next/headers";

export async function getAccessToken(): Promise<string | undefined> {
  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;
  return accessToken;
}
