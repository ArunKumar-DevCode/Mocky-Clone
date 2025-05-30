"use server";

import { MockFormData } from "@/types/mock";
import { revalidateTag } from "next/cache";
import apiClient from "@/lib/axios";
import {
  ResetPasswordTypes,
  ForgotPasswordType,
  userTypes,
} from "@/types/users";

// Todo : Create a mock api endpoint
export async function createMock(parsedData: MockFormData) {
  try {
    const res = await apiClient.post("/mocks/new", parsedData, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to create mock:", error);
    throw new Error("Failed to create mock");
  }
}
// Fetch all mocks
export async function fetchMocks(): Promise<MockFormData[]> {
  try {
    const res = await apiClient.get<MockFormData[]>("/mocks/all", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching mocks:", error);
    throw error;
  }
}

// Delete a mock by ID
export async function handleDeleteMock(id: string | undefined) {
  if (!id) throw new Error("Missing mock ID");

  try {
    const res = await apiClient.delete(`/mocks/delete/${id}`, {
      withCredentials: true,
    });

    if (res.status !== 200) {
      throw new Error("Failed to delete mock");
    }

    revalidateTag("mocks");
  } catch (error) {
    console.error("Error deleting mock:", error);
    throw error;
  }
}

// Get a mock by ID
export async function getMockById(id: string): Promise<MockFormData> {
  if (!id) throw new Error("Missing mock ID");

  try {
    const res = await apiClient.get(`/mocks/response/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching mock by ID:", error);
    throw error;
  }
}

// Login user
export async function LoginUser(data: userTypes) {
  try {
    const res = await apiClient.post("/auth/signin", data, {
      withCredentials: true,
    });

    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

// 1. Signup
export async function signupUser(data: userTypes) {
  try {
    const res = await apiClient.post("/auth/signup", data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
}

// 2. Reset Password
export async function resetPassword(data: ResetPasswordTypes) {
  try {
    const res = await apiClient.patch("/auth/reset-password", data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Reset password failed:", error);
    throw error;
  }
}

// 3. Forget Password
export async function forgetPassword(data: ForgotPasswordType) {
  try {
    const res = await apiClient.post("/auth/forget-password", data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Forget password failed:", error);
    throw error;
  }
}
