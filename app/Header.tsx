"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import LoginButton from "@/app/components/LoginButton/LoginButton";
import LogoutButton from "@/app/components/LogoutButton/LogoutButton";
import SignupButton from "@/app/components/SignupButton/SignupButton";
import Link from "next/link";

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <header className="flex items-center justify-between p-4 shadow-md">
      {/* Left: Site name + Dashboard link */}
      <div className="flex items-center space-x-2 md:space-x-4 text-xl font-bold">
        <Link href="/">Edward's Log</Link>
        {user && (
          <>
            <span>|</span>
            <Link href="/dashboard" className="font-normal">
              Dashboard
            </Link>
          </>
        )}
      </div>

      {/* Right: Auth buttons */}
      <div className="space-x-2">
        {isLoading ? (
          "Loading..."
        ) : user ? (
          <>
            <LogoutButton />
          </>
        ) : (
          <>
            <SignupButton />
            <LoginButton />
          </>
        )}
      </div>
    </header>
  );
}
