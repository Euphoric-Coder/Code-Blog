import React, { useEffect, useRef } from "react";
import { User, X } from "lucide-react";

const NotSignedIn = ({
  isOpen,
  onClose,
  onSignIn,
  title = "Sign In Required",
  message = "You need to sign in to access this feature. Please sign in to continue.",
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      previousFocusRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      const focusable = modalRef.current?.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 sm:px-6 sm:py-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gradient-to-br from-blue-50/80 via-blue-100/60 to-blue-50/90 dark:from-black/60 dark:via-gray-900/70 dark:to-black/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-gradient-to-br from-blue-50/20 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800/90 dark:to-gray-900 rounded-3xl border-2 border-blue-200/60 dark:border-gray-600/50 shadow-2xl shadow-blue-200/20 dark:shadow-black/50 backdrop-blur-xl p-8 sm:p-10"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-blue-50/80 dark:hover:bg-gray-700/60"
        >
          <X size={18} />
        </button>
        <div className="flex items-center mb-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-700 shadow-lg ring-2 ring-blue-100/30 dark:ring-gray-700/50 mr-5">
            <User className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-8">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onSignIn}
            className="flex-1 min-h-[52px] px-6 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-md"
          >
            Sign In
          </button>
          <button
            onClick={onClose}
            className="flex-1 min-h-[52px] px-6 py-3.5 bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-2xl border dark:border-gray-600/50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotSignedIn;
