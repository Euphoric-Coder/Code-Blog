"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function BlogLike({
  blogId,
  initialLikes = 0,
  onChange,
  showIconOnly = false,
}) {
  const { isSignedIn, user } = useUser();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  // Check if this blog is liked by current user
  useEffect(() => {
    const checkLikedStatus = async () => {
      if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) return;

      try {
        const res = await fetch("/api/check-blog-like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blogId,
            email: user.primaryEmailAddress.emailAddress,
          }),
        });

        const data = await res.json();
        setLiked(data.liked);
      } catch (err) {
        console.error("Error checking like:", err);
      }
    };

    checkLikedStatus();
  }, [isSignedIn, user, blogId]);

  // Handle like toggle
  const toggleLike = useCallback(async () => {
    // console.log("Toggling like for blog:", blogId);
    if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) {
      // Optionally open login modal
      return;
    }

    try {
      const res = await fetch("/api/toggle-blog-like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          email: user.primaryEmailAddress.emailAddress,
          time: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (data.liked === true) {
        setLiked(true);
        setLikes((prev) => prev + 1);
        onChange?.(blogId, likes + 1, true);
      } else if (data.liked === false) {
        setLiked(false);
        setLikes((prev) => Math.max(0, prev - 1));
        onChange?.(blogId, Math.max(0, likes - 1), false);
      }
      toast.success(
        data.liked ? "Liked the blog!" : "Removed like from the blog!"
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }, [isSignedIn, user, blogId, likes, onChange]);

  return (
    <button
      onClick={toggleLike}
      className={cn(
        "flex items-center gap-1 transition-colors",
        liked ? "text-rose-600" : "hover:text-rose-400",
        showIconOnly &&
          "p-2 bg-white/30 text-white backdrop-blur-sm rounded-full shadow-lg"
      )}
      aria-pressed={liked}
    >
      <Heart className={cn("h-4 w-4", liked && "fill-current")} />
      {!showIconOnly && <span className="text-sm">{likes}</span>}
    </button>
  );
}
