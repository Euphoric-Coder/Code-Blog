import React, { useState } from "react";
import { Heart, Reply, Send } from "lucide-react";
import { formatDate } from "../_utils/formatDate";

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
      setReplyingTo(null);
    }
  };

  const CommentCard = ({ comment, isReply = false }) => (
    <div className={`${isReply ? "ml-4 sm:ml-12" : ""} mb-6`}>
      <div className="flex items-start space-x-2 sm:space-x-4">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-8 sm:w-10 h-8 sm:h-10 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2">
              <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                {comment.author.name}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words">
              {comment.content}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-2 text-xs sm:text-sm">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
              <Heart className="w-3 sm:w-4 h-3 sm:h-4" />
              <span>{comment.likes}</span>
            </button>
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
            >
              <Reply className="w-3 sm:w-4 h-3 sm:h-4" />
              <span>Reply</span>
            </button>
          </div>

          {replyingTo === comment.id && (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-start space-x-2">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Your avatar"
                  className="w-6 sm:w-8 h-6 sm:h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white rounded-lg px-3 sm:px-4 py-2 text-sm hover:bg-indigo-700 transition-colors whitespace-nowrap"
                >
                  Reply
                </button>
              </div>
            </form>
          )}

          {comment.replies?.map((reply) => (
            <CommentCard key={reply.id} comment={reply} isReply />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-start space-x-2 sm:space-x-4">
          <img
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Your avatar"
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg px-4 sm:px-6 py-2 text-sm sm:text-base hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Comment</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
