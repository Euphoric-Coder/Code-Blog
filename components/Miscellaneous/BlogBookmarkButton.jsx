"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils"; // optional utility for class merging

export default function BlogBookmark({
  blogId,
  onChange,
  showIconOnly = false,
}) {
  const { isSignedIn, user } = useUser();
  const [bookmarked, setBookmarked] = useState(false);

  // Check bookmark status on mount
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) return;

      try {
        const res = await fetch("/api/check-blog-bookmark", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blogId,
            email: user.primaryEmailAddress.emailAddress,
          }),
        });

        const data = await res.json();
        setBookmarked(data.bookmarked);
      } catch (err) {
        console.error("Error checking bookmark:", err);
      }
    };

    checkBookmarkStatus();
  }, [isSignedIn, user, blogId]);

  // Toggle bookmark
  const toggleBookmark = useCallback(async () => {
    if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) return;

    try {
      const res = await fetch("/api/toggle-blog-bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          email: user.primaryEmailAddress.emailAddress,
          time: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (data.bookmarked === true) {
        setBookmarked(true);
        onChange?.(blogId, true);
      } else if (data.bookmarked === false) {
        setBookmarked(false);
        onChange?.(blogId, false);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  }, [isSignedIn, user, blogId, onChange]);

  return (
    <button
      onClick={toggleBookmark}
      className={cn(
        "flex items-center gap-1 transition-colors",
        bookmarked ? "text-yellow-500" : "hover:text-amber-500",
        showIconOnly &&
          "text-white p-2 bg-white/30 backdrop-blur-sm rounded-full shadow-lg"
      )}
      aria-pressed={bookmarked}
    >
      <Bookmark
        className="h-4 w-4"
        fill={bookmarked ? "currentColor" : "none"}
      />
      {!showIconOnly && <span className="text-sm">{bookmarked ? "Bookmarked" : "Bookmark"}</span>}
    </button>
  );
}
