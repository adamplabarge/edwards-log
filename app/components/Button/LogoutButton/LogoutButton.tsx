"use client";

import { Button } from "@/app/components/Button/Button";

export default function LogoutButton() {
  return (
    <Button variant="tertiary" asChild>
      <a href="/auth/logout">Log Out</a>
    </Button>
  );
}
