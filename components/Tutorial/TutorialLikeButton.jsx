"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function TutorialLike({
  tutorialId,
  initialLikes = 0,
  onChange,
  showIconOnly = false,
  listView = false,
}) {
  const { isSignedIn, user } = useUser();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  // Check if this tutorial is liked by current user
  useEffect(() => {
    const checkLikedStatus = async () => {
      if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) return;

      try {
        const res = await fetch("/api/tutorials/check-tutorial-like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tutorialId,
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
  }, [isSignedIn, user, tutorialId]);

  // Handle like toggle
  const toggleLike = useCallback(async () => {
    // console.log("Toggling like for tutorial:", tutorialId);
    if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) {
      // Optionally open login modal
      return;
    }

    try {
      const res = await fetch("/api/tutorials/toggle-tutorial-like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tutorialId,
          email: user.primaryEmailAddress.emailAddress,
          time: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (data.liked === true) {
        setLiked(true);
        setLikes((prev) => prev + 1);
        onChange?.(tutorialId, likes + 1, true);
      } else if (data.liked === false) {
        setLiked(false);
        setLikes((prev) => Math.max(0, prev - 1));
        onChange?.(tutorialId, Math.max(0, likes - 1), false);
      }
      toast.success(
        data.liked ? "Liked the tutorial!" : "Removed like from the tutorial!"
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }, [isSignedIn, user, tutorialId, likes, onChange]);

  return (
    <button
      onClick={toggleLike}
      className={cn(
        "flex items-center gap-1 transition-colors z-10",
        liked ? "text-rose-600" : "hover:text-rose-400",
        showIconOnly &&
          `${liked ? "text-rose-600" : "hover:text-rose-400 text-white"} p-2 bg-white/30 backdrop-blur-sm rounded-full shadow-lg`,
        showIconOnly &&
          listView &&
          `${liked ? "text-rose-600" : "hover:text-rose-400 text-black dark:text-white"} p-2 bg-white hover:bg-white/80 dark:bg-white/30 dark:hover:bg-white/40 backdrop-blur-sm rounded-full shadow-lg`
      )}
      aria-pressed={liked}
    >
      <Heart className={cn("h-4 w-4", liked && "fill-current")} />
      {!showIconOnly && <span className="text-sm">{likes}</span>}
    </button>
  );
}
