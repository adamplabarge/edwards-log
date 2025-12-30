"use client";

import { Button } from "@/app/components/Button/Button";

export default function LoginButton() {
  return (
    <Button asChild>
      <a href="/auth/login">Log In</a>
    </Button>
  );
}
