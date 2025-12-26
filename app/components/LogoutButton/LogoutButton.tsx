"use client";

export default function LogoutButton() {
  return (
    <a
      href="/auth/logout"
      className="button logout bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
    >
      Log Out
    </a>
  );
}