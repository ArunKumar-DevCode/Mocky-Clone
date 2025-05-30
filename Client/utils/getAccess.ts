"use server";

import { getCookie } from "cookies-next/server";

export async function getAccessToken(): Promise<string> {
  const token = getCookie("accessToken");

  if (typeof token !== "string") {
    throw new Error("Access token not found in cookies");
  }

  return token;
}
