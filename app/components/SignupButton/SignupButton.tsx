"use client";

export default function LoginButton() {
  return (
    <a
      href="/auth/login?screen_hint=signup"
      className="button login"
    >
      Sign Up
    </a>
  );
}