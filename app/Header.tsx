'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import LoginButton from '@/app/components/LoginButton/LoginButton';
import LogoutButton from '@/app/components/LogoutButton/LogoutButton';

export default function Header() {
  const { user, error, isLoading } = useUser();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Left: User greeting or placeholder */}
      <div className="text-lg font-semibold">
        {isLoading
          ? 'Loading...'
          : error
          ? `Error: ${error.message}`
          : user
          ? `Hello, ${user.name}`
          : 'Welcome, guest!'}
      </div>

      {/* Right: Login / Logout Button */}
      <div>
        {user ? (
          <LogoutButton />
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
