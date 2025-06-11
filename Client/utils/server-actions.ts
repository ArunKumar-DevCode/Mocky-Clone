"use server";

import { MockFormData } from "@/types/mock";
import apiServer from "@/lib/axios"; // this should NOT use "use client"
import {
  ResetPasswordTypes,
  ForgotPasswordType,
  userTypes,
} from "@/types/users";
import { revalidateTag } from "next/cache";

// Create a mock API endpoint
export async function createMock(parsedData: MockFormData) {
  try {
    const res = await apiServer.post("/mocks/new", parsedData);
    return res.data;
  } catch (error) {
    console.error("Failed to create mock:", error);
    throw new Error("Failed to create mock");
  }
}

// Fetch all mocks
export async function fetchMocks(): Promise<MockFormData[]> {
  try {
    const res = await apiServer.get("/mocks/all");
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
    const res = await apiServer.delete(`/mocks/delete/${id}`);

    if (res.status !== 200) {
      throw new Error("Failed to delete mock");
    }

    revalidateTag("mocks");
    return { success: true };
  } catch (error) {
    console.error("Error deleting mock:", error);
    throw error;
  }
}

// Get a mock by ID
export async function getMockById(id: string): Promise<MockFormData> {
  if (!id) throw new Error("Missing mock ID");

  try {
    const res = await apiServer.get(`/mocks/response/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching mock by ID:", error);
    throw error;
  }
}

// Login user
export async function LoginUser(data: userTypes) {
  try {
    const res = await apiServer.post("/auth/signin", data);

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

// Signup user
export async function signupUser(data: userTypes) {
  try {
    const res = await apiServer.post("/auth/signup", data);

    return res.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
}

// Reset password
export async function resetPassword(data: ResetPasswordTypes) {
  try {
    const res = await apiServer.patch("/auth/reset-password", data);

    return res.data;
  } catch (error) {
    console.error("Reset password failed:", error);
    throw error;
  }
}

// Forget password
export async function forgetPassword(data: ForgotPasswordType) {
  try {
    const res = await apiServer.post("/auth/forget-password", data);
    return res.data;
  } catch (error) {
    console.error("Forget password failed:", error);
    throw error;
  }
}

// Logout user
export async function logout() {
  try {
    const res = await apiServer.post("/auth/logout", null, {
      withCredentials: true,
    });

    if (res.status === 200) {
      return { success: true, message: "Logout successful" };
    } else {
      return { success: false, message: "Logout failed on server" };
    }
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "Error during logout" };
  }
}
