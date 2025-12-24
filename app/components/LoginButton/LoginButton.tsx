"use client";

export default function LoginButton() {
  return (
    <a
      href="/auth/login"
      className="button login bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
    >
      Log In
    </a>
  );
}