"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaReply } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { PenBox, Send, Trash } from "lucide-react";
import { db } from "@/lib/dbConfig";
import { Comments, Replies } from "@/lib/schema";
import { eq } from "drizzle-orm";

// Word limit logic
const truncateText = (text, wordLimit) => {
  const words = text.trim().split(" ");
  return words.length <= wordLimit
    ? text
    : words.slice(0, wordLimit).join(" ") + "...";
};

const Comment = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const [showReplies, setShowReplies] = useState({});
  const [showFullComment, setShowFullComment] = useState({});
  const [showFullReply, setShowFullReply] = useState({});
  const [comments, setComments] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    fetchComments(blogId);
  }, []);

  const fetchComments = async (blogId) => {
    if (!blogId) return;
    try {
      const resp = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ blogId }),
      });

      const result = await resp.json();
      console.log(result);
      if (result.length > 0) {
        setComments(result);
      }
    } catch (err) {
      console.error("Failed to fetch comments!", err);
      toast.error("Failed to fetch comments!");
      // setTimeout(() => {
      //   // Retry fetching comments after a delay
      //   toast.info("Trying to fetch comments again...");
      //   fetchComments(blogId);
      // }, 2000);
    }
  };

  const refreshData = async () => {
    await fetchComments(blogId);
  };

  const handlePost = async () => {
    if (!comment) {
      toast.error("Comment cannot be empty!");
      return;
    }

    const result = await db
      .insert(Comments)
      .values({
        blogId: blogId,
        name: user?.fullName,
        createdBy: user?.primaryEmailAddress.emailAddress,
        text: comment,
        time: new Date().toLocaleString(),
      })
      .returning({ id: Comments.id });
    if (result) {
      console.log(result);
      refreshData();
      setComment("");
      toast.success("Comment posted successfully!");
    }
  };

  const editComment = async (commentId, text) => {
    const result = await db
      .update(Comments)
      .set({
        text: text,
        time: new Date().toLocaleString(),
      })
      .where(eq(Comments.id, commentId))
      .returning();
    if (result) {
      refreshData();
      toast.success("Comment edited successfully!");
    }
  };

  const deleteComment = async (commentId) => {
    const delReplies = await db
      .delete(Replies)
      .where(eq(Replies.commentId, commentId));
    const delComment = await db
      .delete(Comments)
      .where(eq(Comments.id, commentId));
    if (delComment && delReplies) {
      refreshData();
      toast.success("Comment deleted successfully!");
    }
  };

  const handleReplies = async (commentId, text, name, createdBy) => {
    console.log(commentId, text, name, createdBy);
    if (!text) {
      toast.error("Reply cannot be empty!");
      return;
    }
    const result = await db
      .insert(Replies)
      .values({
        commentId: commentId,
        name: name,
        createdBy: createdBy,
        text: text,
        time: new Date().toLocaleString(),
      })
      .returning({ id: Replies.id });
    if (result) {
      console.log(result);
      refreshData();
      toast.success("Reply posted successfully!");
    }
  };

  const toggleReplies = (index) => {
    setShowReplies((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleShowMoreComment = (idx) => {
    setShowFullComment((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleShowMoreReply = (cIdx, rIdx) => {
    const key = `${cIdx}-${rIdx}`;
    setShowFullReply((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
        Comments ({comments.length})
      </h3>

      <div className="flex items-start gap-4 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-4 rounded-lg border border-blue-200 bg-white/80 dark:bg-slate-800 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          rows={3}
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handlePost}
          className="bg-indigo-600 text-white rounded-lg px-4 sm:px-6 py-2 text-sm sm:text-base hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Comment</span>
        </Button>
      </div>

      <div className="mt-10 space-y-6 max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 dark:scrollbar-thumb-slate-600">
        {comments.map((comment, cIdx) => (
          <div
            key={cIdx}
            className="rounded-xl border border-blue-100 dark:border-slate-700 p-5 bg-white/80 dark:bg-slate-900 shadow-sm"
          >
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={comment?.name.imgURL} />
                <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-semibold text-slate-800 dark:text-white">
                      {comment.name}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {comment.time}
                    </span>
                  </div>
                  {user?.primaryEmailAddress.emailAddress ===
                    comment.createdBy && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 dark:text-blue-400 hover:underline px-2 py-1"
                        onClick={() => {
                          const newText = prompt(
                            "Edit your comment:",
                            comment.text
                          );
                          editComment(comment.id, newText);
                        }}
                      >
                        <PenBox />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 dark:text-red-400 hover:underline px-2 py-1"
                        onClick={() => deleteComment(comment.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  )}
                </div>

                <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {showFullComment[cIdx]
                    ? comment.text
                    : truncateText(comment.text, 20)}
                </p>
                {comment.text.split(" ").length > 20 && (
                  <button
                    onClick={() => toggleShowMore(cIdx)}
                    className="text-sm mt-1 text-blue-600 dark:text-cyan-300 hover:underline"
                  >
                    {showFullComment[cIdx] ? "Show Less" : "Show More"}
                  </button>
                )}
                <div className="flex items-center gap-4 mt-3">
                  <button
                    className="text-sm text-blue-600 dark:text-cyan-300 hover:underline flex items-center gap-1"
                    onClick={() => {
                      const text = prompt("Reply to this comment:");
                      if (text) {
                        handleReplies(
                          comment.id,
                          text,
                          user?.fullName,
                          user?.primaryEmailAddress.emailAddress
                        );
                      } else {
                        toast.error("Reply cannot be empty!");
                      }
                    }}
                  >
                    <FaReply size={14} />
                    Reply
                  </button>
                  {comment.replies.length > 0 && (
                    <button
                      onClick={() => toggleReplies(cIdx)}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:underline"
                    >
                      {showReplies[cIdx]
                        ? "Hide Replies"
                        : `Show Replies (${comment.replies.length})`}
                    </button>
                  )}
                </div>

                {/* Replies */}
                {showReplies[cIdx] && comment.replies.length > 0 && (
                  <div className="mt-5 space-y-4 pl-2 sm:pl-5 border-l-2 border-blue-200 dark:border-cyan-800">
                    {comment.replies.map((reply, rIdx) => {
                      const key = `${cIdx}-${rIdx}`;
                      return (
                        <div
                          key={rIdx}
                          className="bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-lg p-4"
                        >
                          <div className="flex gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {reply.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-semibold text-blue-800 dark:text-white">
                                  {reply.name}
                                </p>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {reply.time}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                                {showFullReply[key]
                                  ? reply.text
                                  : truncateText(reply.text, 20)}
                              </p>
                              {reply.text.split(" ").length > 20 && (
                                <button
                                  onClick={() => toggleShowMore(key, true)}
                                  className="text-xs mt-1 text-blue-600 dark:text-cyan-300 hover:underline"
                                >
                                  {showFullReply[key]
                                    ? "Show Less"
                                    : "Show More"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
