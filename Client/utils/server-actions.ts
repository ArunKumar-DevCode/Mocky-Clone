"use server";

import { getCookie } from "cookies-next/server";
import { MockFormData } from "@/types/mock";
import { revalidateTag } from "next/cache";

export async function fetchMocks(): Promise<MockFormData[]> {
  const token = (await getCookie("accessToken")) as string | undefined;
  if (!token) throw new Error("Missing access token");

  const res = await fetch("https://mock-clone-vx69.onrender.com/api/mocks/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch mocks");
  return res.json();
}

export async function handleDeleteMock(id: string | undefined) {
  if (!id) throw new Error("Missing mock id");

  const token = (await getCookie("accessToken")) as string | undefined;
  if (!token) throw new Error("Missing access token");

  const res = await fetch(
    `https://mock-clone-vx69.onrender.com/api/mocks/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to delete mock");

  revalidateTag("mocks");
}

export async function getMockById(id: string) {
  if (!id) throw new Error("Missing mock id");

  const token = (await getCookie("accessToken")) as string | undefined;
  if (!token) throw new Error("Missing access token");

  const res = await fetch(
    `https://mock-clone-vx69.onrender.com/api/mocks/response/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      next: { tags: ["mocks"] },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch mock by id");

  return res.json();
}
