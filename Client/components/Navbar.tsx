import Link from "next/link";
import { Button } from "./ui/button"; // Assuming your Button component is here
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton"; // Import the client-side LogoutButton

export default async function Navbar() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("accessToken")?.value ? true : false;

  return (
    <header className="py-4 container mx-auto w-full md:max-w-[70%]">
      <nav className="flex items-center justify-between px-4 py-2">
        <Link href="/" className="text-3xl text-[#4E4949] cursor-pointer">
          MockAPI
        </Link>

        {isAuthenticated ? (
          <div className="items-center gap-12 flex">
            <div className="hidden bg-white/80 rounded-full md:flex gap-5 border border-gray-300 px-6 py-3 divide-x-2 divide-gray-200">
              <Link
                href="#" // You might want to update this href to an actual page or section ID
                className="capitalize text-md font-medium text-gray-700 pr-4"
              >
                How it works
              </Link>
              <Link
                href="/manage"
                className="capitalize text-md font-medium text-gray-700"
              >
                Manage my mock
              </Link>
            </div>
            <div className="flex gap-x-5 items-center">
              <Link
                href="/design"
                className="capitalize text-md text-white bg-emerald-500 px-6 py-3 font-medium rounded-full"
              >
                New Mock
              </Link>
              <LogoutButton /> {/* Use the client-side LogoutButton here */}
            </div>
          </div>
        ) : (
          <Link href={"/signin"}>
            <Button
              className="text-md font-medium text-white py-3 px-6"
              size={"lg"}
            >
              Sign In
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
