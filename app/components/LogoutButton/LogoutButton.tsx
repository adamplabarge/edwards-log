"use client";

export default function LogoutButton() {
  return (
    <a
      href="/auth/logout"
      className="button logout bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
    >
      Log Out
    </a>
  );
}