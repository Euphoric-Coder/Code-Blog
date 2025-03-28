"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function FirstUserHandler() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      fetch("/api/add-user", {
        method: "POST",
      })
        // .then((res) => res.json())
        // .then((data) => console.log(data))
        .catch((err) => console.error("Error initializing user:", err));
    }
  }, [isSignedIn, user]);

  return null;
}
