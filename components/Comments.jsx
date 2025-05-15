"use client";

import { use, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  PenBox,
  Trash,
  Send,
  Reply as ReplyIcon,
  Heart,
  Menu,
  EllipsisVertical,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "@/lib/dbConfig";
import { Comments, Replies } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { format, set } from "date-fns";
import { getISTDateTime } from "@/lib/utils";
import { Input } from "./ui/input";

// Word truncation
const truncateText = (text, limit) => {
  const words = text.trim().split(" ");
  return words.length <= limit ? text : `${words.slice(0, limit).join(" ")}...`;
};

const Comment = ({ blogId }) => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [showFullComment, setShowFullComment] = useState({});
  const [showFullReply, setShowFullReply] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editReplyId, setEditReplyId] = useState(null);
  const [editReplyText, setReplyEditText] = useState("");

  useEffect(() => {
    fetchComments(blogId);
  }, []);

  const fetchComments = async (blogId) => {
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ blogId }),
      });

      const data = await res.json(); // array of comments

      // Helper function to fetch image URL by email
      const getImgURL = async (email) => {
        try {
          const imgRes = await fetch("/api/get-imgurl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });

          const { imgURL } = await imgRes.json();
          return imgURL || null;
        } catch {
          return null;
        }
      };

      // Enrich comments and their replies
      const enrichedComments = await Promise.all(
        data.map(async (comment) => {
          const commentImgURL = await getImgURL(comment.createdBy);
          console.log("Comment Image URL:", commentImgURL);

          const enrichedReplies = await Promise.all(
            (comment.replies || []).map(async (reply) => {
              const replyImgURL = await getImgURL(reply.createdBy);
              console.log("Reply Image URL:", replyImgURL);
              return { ...reply, imgURL: replyImgURL };
            })
          );

          return {
            ...comment,
            imgURL: commentImgURL,
            replies: enrichedReplies,
          };
        })
      );

      console.log("Enriched Comments:", enrichedComments);

      setComments(enrichedComments);
    } catch (error) {
      toast.error("Failed to fetch comments!");
    }
  };

  const refreshData = async () => fetchComments(blogId);

  const handlePostComment = async () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty!");
    await db.insert(Comments).values({
      blogId: blogId,
      name: user.fullName,
      createdBy: user.primaryEmailAddress.emailAddress,
      text: comment,
      time: getISTDateTime(),
      userId: user.id,
    });
    setComment("");
    toast.success("Comment posted!");
    refreshData();
  };

  const handlePostReply = async () => {
    if (!reply.trim() || !replyingTo)
      return toast.error("Reply cannot be empty!");
    await db.insert(Replies).values({
      commentId: replyingTo,
      name: user.fullName,
      createdBy: user.primaryEmailAddress.emailAddress,
      text: reply,
      time: new Date().toLocaleString(),
    });
    setReply("");
    setReplyingTo(null);
    toast.success("Reply posted!");
    refreshData();
  };

  const EditComment = async (id, newText) => {
    if (!newText) return;
    await db
      .update(Comments)
      .set({ text: newText, time: getISTDateTime() })
      .where(eq(Comments.id, id));
    toast.success("Comment edited!");
    refreshData();
  };

  const DeleteComment = async (id) => {
    await db.delete(Replies).where(eq(Replies.commentId, id));
    await db.delete(Comments).where(eq(Comments.id, id));
    toast.success("Comment deleted!");
    refreshData();
  };

  const EditReply = async (id, newText) => {
    if (!newText) return;
    await db
      .update(Comments)
      .set({ text: newText, time: getISTDateTime() })
      .where(eq(Comments.id, id));
    toast.success("Comment edited!");
    refreshData();
  };

  const DeleteReply = async (id) => {
    await db.delete(Replies).where(eq(Replies.commentId, id));
    await db.delete(Comments).where(eq(Comments.id, id));
    toast.success("Comment deleted!");
    refreshData();
  };

  return (
    <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6">
      <h3 className="text-2xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
        Comments ({comments.length})
      </h3>
      {/* Comment input */}
      <div className="flex items-start gap-4 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.fullName?.[0]}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Write a comment..."
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-end mt-2 gap-3">
            {comment.length > 0 && (
              <Button
                variant="ghost"
                onClick={() => {
                  setComment("");
                }}
                className="rounded-3xl"
              >
                Cancel
              </Button>
            )}
            <Button
              onClick={handlePostComment}
              className="flex gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Send size={16} />
              Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments and replies */}
      <div className="space-y-8">
        {comments.map((c, cIdx) => (
          <div key={c.id} className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={c.imgURL} />
              <AvatarFallback>{c.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {c.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {format(c.time.split(", ")[0], "PPP")}
                    </span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-xl [&_svg]:size-6 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <EllipsisVertical />
                        </Button>
                      </PopoverTrigger>

                      {user?.primaryEmailAddress.emailAddress ===
                        c.createdBy && (
                        <PopoverContent className="w-32 p-1 space-y-1">
                          {/* Edit and Delete Comments */}

                          {/* Edit Comment */}
                          <Dialog
                            open={editDialogOpen}
                            onOpenChange={setEditDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900"
                                // onClick={() => EditComment(c.id, c.text)}
                                onClick={() => {
                                  setEditCommentId(c.id);
                                  setEditText(c.text);
                                }}
                              >
                                <PenBox size={16} className="mr-2" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Comment</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Input
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="w-full"
                                  placeholder="Edit your comment"
                                />
                              </div>
                              <DialogFooter className="pt-4">
                                <Button
                                  onClick={async () => {
                                    if (editCommentId && editText.trim()) {
                                      await EditComment(
                                        editCommentId,
                                        editText
                                      );
                                      setEditDialogOpen(false);
                                    } else {
                                      toast.error("Comment cannot be empty!");
                                    }
                                  }}
                                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                  Save Changes
                                </Button>
                                <DialogClose asChild>
                                  <Button
                                    variant="ghost"
                                    onClick={() => setEditDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Delete Comment */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900"
                              >
                                <Trash size={16} className="mr-2" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will permanently delete the
                                  comment and all its replies. This cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                  onClick={() => DeleteComment(c.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </PopoverContent>
                      )}
                    </Popover>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {showFullComment[c.id] ? c.text : truncateText(c.text, 25)}
                </p>
                {c.text.split(" ").length > 25 && (
                  <button
                    className="text-xs text-indigo-600 hover:underline mt-1"
                    onClick={() =>
                      setShowFullComment((prev) => ({
                        ...prev,
                        [c.id]: !prev[c.id],
                      }))
                    }
                  >
                    {showFullComment[c.id] ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
              {/* Actions */}
              <div className="flex items-center justify-between mt-2 text-xs sm:text-sm gap-2 flex-wrap">
                {/* Action Buttons: Like, Edit, Delete, Reply */}
                <div className="flex items-center gap-1 flex-wrap">
                  {/* Like Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:text-blue-500 dark:hover:text-blue-300 [&_svg]:size-5"
                  >
                    <ThumbsUp size={20} />
                  </Button>
                  {/* Like Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:text-blue-500 dark:hover:text-blue-300 [&_svg]:size-5"
                  >
                    <ThumbsDown size={20} />
                  </Button>

                  {/* Reply Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-3xl text-indigo-600 dark:text-indigo-400 p-4"
                    onClick={() => setReplyingTo(c.id)}
                  >
                    <ReplyIcon size={14} />
                    Reply
                  </Button>
                </div>

                {/* Show/Hide Replies Toggle */}
                {c.replies.length > 0 && (
                  <button
                    className="text-gray-500 dark:text-gray-400 hover:underline"
                    onClick={() =>
                      setShowReplies((prev) => ({
                        ...prev,
                        [cIdx]: !prev[cIdx],
                      }))
                    }
                  >
                    {showReplies[cIdx]
                      ? "Hide Replies"
                      : `Show Replies (${c.replies.length})`}
                  </button>
                )}
              </div>

              {/* Reply form */}
              {replyingTo === c.id && (
                <div>
                  <div className="flex items-start gap-2 mt-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.imageUrl} />
                      <AvatarFallback>{user?.fullName?.[0]}</AvatarFallback>
                    </Avatar>
                    <input
                      type="text"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setReplyingTo(null);
                        setReply("");
                      }}
                      className="mr-2 rounded-3xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePostReply}
                      className="rounded-3xl bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {showReplies[cIdx] && c.replies.length > 0 && (
                <div className="mt-5 space-y-4 pl-10">
                  <div className="mt-5 space-y-4 pl-2">
                    {c.replies.map((r, rIdx) => {
                      const replyKey = `${c.id}-${rIdx}`;
                      return (
                        <div key={rIdx} className="flex items-start gap-3">
                          {/* Avatar outside the bubble */}
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback>{r.name[0]}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-1">
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {r.name}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {format(r.time.split(", ")[0], "PPP")}
                                  </span>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="rounded-xl [&_svg]:size-6 hover:bg-gray-200 dark:hover:bg-gray-700"
                                      >
                                        <EllipsisVertical />
                                      </Button>
                                    </PopoverTrigger>

                                    {user?.primaryEmailAddress.emailAddress ===
                                      r.createdBy && (
                                      <PopoverContent className="w-32 p-1 space-y-1">
                                        {/* Edit and Delete Replies */}

                                        {/* Edit Reply */}
                                        <Dialog
                                          open={editDialogOpen}
                                          onOpenChange={setEditDialogOpen}
                                        >
                                          <DialogTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              className="w-full justify-start text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900"
                                              // onClick={() => EditComment(r.id, r.text)}
                                              onClick={() => {
                                                setEditReplyId(r.id);
                                                setReplyEditText(r.text);
                                              }}
                                            >
                                              <PenBox
                                                size={16}
                                                className="mr-2"
                                              />
                                              Edit
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>
                                                Edit Reply
                                              </DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                              <Input
                                                value={editReplyText}
                                                onChange={(e) =>
                                                  setReplyEditText(
                                                    e.target.value
                                                  )
                                                }
                                                className="w-full"
                                                placeholder="Edit your comment"
                                              />
                                            </div>
                                            <DialogFooter className="pt-4">
                                              <DialogClose asChild>
                                                <Button variant="ghost">
                                                  Cancel
                                                </Button>
                                              </DialogClose>
                                              <Button
                                                onClick={async () => {
                                                  if (
                                                    editReplyId &&
                                                    editReplyText.trim()
                                                  ) {
                                                    await EditComment(
                                                      editReplyId,
                                                      editReplyText
                                                    );
                                                    setEditReplyId(null);
                                                    setReplyEditText("");
                                                    setEditDialogOpen(false);
                                                  } else {
                                                    toast.error(
                                                      "Comment cannot be empty!"
                                                    );
                                                    setEditReplyId(null);
                                                    setReplyEditText("");
                                                    setEditDialogOpen(false);
                                                  }
                                                }}
                                                className="bg-indigo-600 text-white hover:bg-indigo-700"
                                              >
                                                Save Changes
                                              </Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>

                                        {/* Delete Comment */}
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900"
                                            >
                                              <Trash
                                                size={16}
                                                className="mr-2"
                                              />
                                              Delete
                                            </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>
                                                Are you sure?
                                              </AlertDialogTitle>
                                              <AlertDialogDescription>
                                                This action will permanently
                                                delete the comment and all its
                                                replies. This cannot be undone.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>
                                                Cancel
                                              </AlertDialogCancel>
                                              <AlertDialogAction
                                                className="bg-red-600 hover:bg-red-700 text-white"
                                                onClick={() =>
                                                  DeleteComment(r.id)
                                                }
                                              >
                                                Delete
                                              </AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </PopoverContent>
                                    )}
                                  </Popover>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {showFullReply[replyKey]
                                  ? r.text
                                  : truncateText(r.text, 20)}
                              </p>
                              {r.text.split(" ").length > 20 && (
                                <button
                                  className="text-xs mt-1 text-indigo-600 dark:text-cyan-300 hover:underline"
                                  onClick={() =>
                                    setShowFullReply((prev) => ({
                                      ...prev,
                                      [replyKey]: !prev[replyKey],
                                    }))
                                  }
                                >
                                  {showFullReply[replyKey]
                                    ? "Show less"
                                    : "Show more"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
