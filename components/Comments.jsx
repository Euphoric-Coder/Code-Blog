"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaReply } from "react-icons/fa";

// Word limit logic
const truncateText = (text, wordLimit) => {
  const words = text.trim().split(" ");
  return words.length <= wordLimit
    ? text
    : words.slice(0, wordLimit).join(" ") + "...";
};

const Comment = () => {
  const [comment, setComment] = useState("");
  const [showReplies, setShowReplies] = useState({});
  const [showFullComment, setShowFullComment] = useState({});
  const [showFullReply, setShowFullReply] = useState({});

  const [comments, setComments] = useState([
    {
      name: "Alice Dev",
      time: "2 hours ago",
      text: "Great post! Loved the explanation on React rendering. The section on virtual DOM was especially insightful. I also liked the part about hydration mismatches and real-world use cases of SSR.",
      replies: [
        {
          name: "John JS",
          time: "1 hour ago",
          text: "Totally agree! It was very helpful. Learned a lot about React’s SSR hydration behavior!",
        },
      ],
    },
    {
      name: "Bob Codes",
      time: "1 day ago",
      text: "Can you do a deep dive on server actions in Next.js 14? Especially about mutations, optimistic updates, revalidation strategies, and best practices.",
      replies: [],
    },
  ]);

  const handlePost = () => {
    if (!comment.trim()) return;
    const newComment = {
      name: "You",
      time: "Just now",
      text: comment,
      replies: [],
    };
    setComments([newComment, ...comments]);
    setComment("");
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
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl backdrop-blur-md">
      <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-cyan-200 tracking-tight">
        💬 Share Your Thoughts
      </h2>

      <div className="flex items-start gap-4 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/avatars/user.png" />
          <AvatarFallback>U</AvatarFallback>
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
        <button
          onClick={handlePost}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow-md transition duration-300"
        >
          Post Comment
        </button>
      </div>

      <div className="mt-10 space-y-6 max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 dark:scrollbar-thumb-slate-600">
        {comments.map((comment, cIdx) => (
          <div
            key={cIdx}
            className="rounded-xl border border-blue-100 dark:border-slate-700 p-5 bg-white/80 dark:bg-slate-900 shadow-sm"
          >
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage
                  src={`/avatars/${comment.name.toLowerCase().replace(" ", "")}.png`}
                />
                <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-semibold text-slate-800 dark:text-white">
                    {comment.name}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {comment.time}
                  </span>
                </div>
                <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {showFullComment[cIdx]
                    ? comment.text
                    : truncateText(comment.text, 20)}
                </p>
                {comment.text.split(" ").length > 20 && (
                  <button
                    onClick={() => toggleShowMoreComment(cIdx)}
                    className="text-sm mt-1 text-blue-600 dark:text-cyan-300 hover:underline"
                  >
                    {showFullComment[cIdx] ? "Show Less" : "Show More"}
                  </button>
                )}
                <div className="flex items-center gap-4 mt-3">
                  <button className="text-sm text-blue-600 dark:text-cyan-300 hover:underline flex items-center gap-1">
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
                              <AvatarImage
                                src={`/avatars/${reply.name.toLowerCase().replace(" ", "")}.png`}
                              />
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
                                  onClick={() =>
                                    toggleShowMoreReply(cIdx, rIdx)
                                  }
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
