"use client";

import { Button } from "@/app/components/Button/Button";

export default function SignupButton() {
  return (
    <Button variant="secondary" asChild>
      <a href="/auth/login?screen_hint=signup">
        Sign Up
      </a>
    </Button>
  );
}
