'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import LoginButton from '@/app/components/LoginButton/LoginButton';
import LogoutButton from '@/app/components/LogoutButton/LogoutButton';
import SignupButton from '@/app/components/SignupButton/SignupButton';

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      {/* Left: Site name */}
      <div className="text-xl font-bold">Edward's Log</div>

      {/* Right: Auth buttons */}
      <div className="space-x-2">
        {isLoading ? (
          'Loading...'
        ) : user ? (
          <>
            <span className="mr-2">Hello, {user.name}</span>
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
