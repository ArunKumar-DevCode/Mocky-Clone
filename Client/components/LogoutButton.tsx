// components/LogoutButton.tsx
"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    // 3. Redirect to the homepage or sign-in page
    router.push("/");
  };

  return (
    <Button
      className="capitalize text-md px-6 py-3 font-medium rounded-full"
      size={"lg"}
      variant={"ghost"}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
