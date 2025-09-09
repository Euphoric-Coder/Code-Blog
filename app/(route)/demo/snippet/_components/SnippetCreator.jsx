"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  Save,
  Plus,
  Trash2,
  GripVertical,
  XCircle,
  AlertCircle,
  Edit,
  CheckCircle,
  ArrowLeft,
  Folder,
  LayoutDashboard,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useUser } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import FormBackgroundEffect from "@/components/Effect/FormBackgroundEffect";
import { toast } from "sonner";
import { db } from "@/lib/dbConfig";
import { getISTDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import { CodeSnippet } from "@/lib/schema";
import SnippetContentEditor from "@/components/CodeSnippet/SnippetEditor";
import CodeEditor from "@/components/CodeSnippet/CodeEditor";
import SnippetMetadata from "@/components/CodeSnippet/SnippetMetadata";
import { snippetCategories, tutorialSubCategoriesList } from "@/lib/data";
import SnippetBasicInfo from "@/components/CodeSnippet/SnippetBasicInfo";

const defaultData = {
  metadata: {
    title: "",
    description: "",
    category: "",
    subcategory: [],
    tags: [],
    language: "",
  },
  snippet: {
    content: "",
    code: "",
  },
};

const isDefaultLike = (data) => {
  if (!data) return true;

  const { metadata, snippet } = JSON.parse(data);

  // Check metadata fields are empty
  const tutorialIsEmpty =
    metadata?.title === "" &&
    metadata?.description === "" &&
    metadata?.category === "" &&
    metadata?.language === "" &&
    Array.isArray(metadata?.subcategory) &&
    Array.isArray(metadata?.tags) &&
    metadata.tags.length === 0;

  const dataIsEmpty = snippet?.content === "" && snippet?.code === "";

  return tutorialIsEmpty && dataIsEmpty;
};

const SnippetCreator = ({ editData = null, editing = false }) => {
  const { user } = useUser();
  const LOCAL_STORAGE_KEY = useMemo(() => {
    return user?.id ? `codeSnippetCreatorData-${user.id}` : null;
  }, [user?.id]);

  const [initialData, setInitialData] = useState(editData ?? null);
  const [metadata, setMetadata] = useState(null);
  const [snippet, setSnippet] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState("metadata");
  const [pendingTutorial, setPendingTutorial] = useState(false);
  const [clearPendingAlert, setClearPendingAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 640); // Tailwind "sm"
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const limit = isMobile ? 11 : 30;

  // Load initial data from localStorage after mount
  useEffect(() => {
    if (editData) return; // skip loading for editing

    if (typeof window !== "undefined" && LOCAL_STORAGE_KEY) {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log(isDefaultLike(savedData));
      if (!isDefaultLike(savedData)) {
        try {
          const parsed = JSON.parse(savedData);
          console.log("Loaded metadata data from localStorage:", parsed);
          setInitialData(parsed);
          setMetadata(parsed.metadata);
          setSnippet(parsed.snippet);
          setPendingTutorial(true);
          return;
        } catch (error) {
          console.error("Failed to parse localStorage data:", error);
        }
      }

      // Fallback default data on empty or invalid data from localStorage
      setMetadata(defaultData.metadata);
      console.log("Printing snippet data", defaultData.snippet);
      setSnippet(defaultData.snippet);
      setInitialData(defaultData);
    }
  }, [LOCAL_STORAGE_KEY]);

  // Load data for editing
  useEffect(() => {
    if (editData) {
      setMetadata(editData.metadata);
      setSnippet(editData.snippet);
    }
  }, [editData]);

  // Save changes to localStorage
  useEffect(() => {
    console.log("it is running");
    console.log(metadata);
    console.log(snippet);
    if (metadata && snippet && !editing) {
      console.log(metadata);
      const dataToSave = {
        metadata,
        snippet,
      };
      // console.log("Saving metadata data to localStorage:", dataToSave);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [metadata, snippet, LOCAL_STORAGE_KEY]);

  // To avoid rendering until initial data is loaded
  if (!initialData) return <div>Loading metadata data...</div>;

  const handleMetadataComplete = (metadata) => {
    setMetadata((prev) => ({ ...prev, ...metadata }));
    setCurrentStep("sections");
  };

  const clearData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear localStorage
    setPendingTutorial(false); // Reset pending state

    setMetadata(defaultData.metadata);
    setSnippet(defaultData.snippet);
    setCurrentStep("metadata");
    console.log("Snippet data fully reset.");
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleBackToDashboard = () => {
    window.location.hash = "dashboard";
  };

  const addSnippet = async () => {
    try {
      const newErrors = {};

      console.log("working ");

      if (!metadata.title) newErrors.title = "Title is required";
      if (!metadata.description)
        newErrors.description = "Description is required";
      if (!metadata.language) newErrors.language = "Language is required";
      if (!metadata.category) newErrors.category = "Category is required";
      if (metadata.subcategory.length === 0)
        newErrors.subcategory = "Subcategory is required";

      if (!snippet.code || !snippet.content)
        toast.error("Code and Content cannot be empty!");

      console.log(newErrors.category);
      console.log(newErrors.subcategory);

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return; // Stop submission
      console.log({
        title: metadata.title,
        description: metadata.description,
        category: metadata.category,
        subcategory: metadata.subcategory,
        tags: metadata.tags,
        language: metadata.language,
        content: snippet.content,
        code: snippet.code,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      //   const result = await db
      //     .insert(CodeSnippet)
      //     .values({
      //       title: metadata.title,
      //       description: metadata.description,
      //       category: metadata.category,
      //       subcategory: metadata.subcategory,
      //       tags: metadata.tags,
      //       language: metadata.language,
      //       content: snippet.content,
      //       code: snippet.code,
      //       createdBy: user?.primaryEmailAddress?.emailAddress,
      //     })
      //     .returning({ insertedId: CodeSnippet.id });
      //   if (result) {
      //     toast.success("Snippet saved successfully!");
      //     // Redirects to the Snippet Page
      //     // setTimeout(() => {
      //     //   redirect(`/tutorialpost/${result.insertedId}`);
      //     // }, 4000);
      //     clearData();
      //   }
    } catch (error) {
      toast.error("Some Error occurred!", error);
    }
  };

  const editSnippet = async () => {
    try {
      console.log({
        title: metadata.title,
        description: metadata.description,
        category: metadata.category,
        subcategory: metadata.subcategory,
        tags: metadata.tags,
        language: metadata.language,
        content: snippet.content,
        code: snippet.code,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      const result = await db
        .insert(CodeSnippet)
        .values({
          title: metadata.title,
          description: metadata.description,
          category: metadata.category,
          subcategory: metadata.subcategory,
          tags: metadata.tags,
          language: metadata.language,
          content: snippet.content,
          code: snippet.code,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({ insertedId: CodeSnippet.id });
      if (result) {
        toast.success("Snippet saved successfully!");
        // Redirects to the Snippet Page
        // setTimeout(() => {
        //   redirect(`/tutorialpost/${result.insertedId}`);
        // }, 4000);
        clearData();
      }
    } catch (error) {
      toast.error("Some Error occurred!", error);
    }
  };

  const editTutorial = async () => {};

  return (
    <div>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Dedicated Navigation Bar */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-teal-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border-b border-blue-200/50 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Left Side - Navigation */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors p-2 sm:p-0 font-medium"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              </div>

              {/* Center - Title */}
              <div className="flex-1 text-center px-2 sm:px-4">
                <h1 className="text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-blue-700 via-teal-600 to-blue-700 bg-clip-text text-transparent truncate">
                  <span className="hidden md:inline">Creating Snippet: </span>
                  <span className="md:hidden">Snippet: </span>
                  <HoverCard>
                    {metadata.title.length > limit ? (
                      <>
                        <HoverCardTrigger asChild>
                          <span className="cursor-pointer">
                            {metadata.title.slice(0, limit)}...
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent className="max-w-xs break-words whitespace-normal p-2">
                          {metadata.title}
                        </HoverCardContent>
                      </>
                    ) : (
                      <span>
                        {metadata.title === "" ? "Untitled" : metadata.title}
                      </span>
                    )}
                  </HoverCard>
                </h1>
              </div>

              {/* Right Side - Actions */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Mobile-only save button */}
                <button
                  onClick={addSnippet}
                  className="sm:hidden p-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  title="Save Snippet"
                >
                  <Save className="h-4 w-4" />
                </button>

                {/* Tablet and Desktop buttons */}
                <button
                  onClick={handleBackToDashboard}
                  className="hidden sm:inline-flex px-3 lg:px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 border border-blue-300 dark:border-gray-600 rounded-3xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 text-sm lg:text-base font-medium"
                >
                  <LayoutDashboard className="mr-2" />
                  <span className="lg:inline hidden">Back to Dashboard</span>
                  <span className="lg:hidden">Dashboard</span>
                </button>
                <button
                  onClick={addSnippet}
                  className="hidden sm:inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold rounded-3xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm lg:text-base"
                >
                  <Save className="mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Save Snippet</span>
                  <span className="lg:hidden">Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              <div className="w-full max-w-6xl mt-10">
                {initialData && (
                  <SnippetBasicInfo
                    initialData={
                      metadata || {
                        title: "",
                        description: "",
                        category: "",
                        subcategory: [],
                        tags: [],
                        language: "",
                      }
                    }
                    editing={editing}
                    onComplete={handleMetadataComplete}
                    onUpdateMetadata={(updatedMetadata) => {
                      console.log(updatedMetadata);
                      setMetadata(updatedMetadata);
                    }} // Sync metadata updates
                    errors={errors}
                    setErrors={setErrors}
                  />
                )}
              </div>
              <div className="w-full mt-10 bg-[#e8f4ff]/60 dark:bg-[#1e2e44]/60 backdrop-blur-xl border border-blue-200 dark:border-blue-800 rounded-3xl shadow-2xl p-8 md:p-12">
                <div className="mb-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center">
                  <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-200">
                    Creating Snippet: {metadata.title}
                  </h1>
                  <div className="flex gap-5">
                    <Button
                      onClick={() => setCurrentStep("metadata")}
                      className="btn8 hover:bg-purple-500"
                    >
                      Back to Metadata
                    </Button>
                    {!editing ? (
                      <Button
                        onClick={addSnippet}
                        className="btn9 flex [&_svg]:size-6"
                      >
                        <Save className="text-white" />
                        Save Snippet
                      </Button>
                    ) : (
                      <Button
                        onClick={editTutorial}
                        className="btn9 flex [&_svg]:size-6"
                      >
                        <Edit className="text-white" />
                        Update Snippet
                      </Button>
                    )}
                  </div>
                </div>
                <CodeEditor
                  languageName={metadata.language} // e.g., "JavaScript"
                  value={snippet?.code ?? ""} // current code string
                  onChange={(newCode) =>
                    setSnippet((prev) => ({ ...(prev ?? {}), code: newCode }))
                  }
                  theme="vs-dark"
                  height="520px"
                  className="rounded-xl overflow-hidden"
                />
                <SnippetContentEditor
                  value={snippet?.content ?? ""}
                  onChange={(html) =>
                    setSnippet((prev) => ({ ...(prev ?? {}), content: html }))
                  }
                  placeholder="Write your snippet explanation here…"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="p-6 sticky top-24">
                {initialData && (
                  <SnippetMetadata
                    initialData={
                      metadata || {
                        title: "",
                        description: "",
                        category: "",
                        subcategory: [],
                        tags: [],
                        language: "",
                      }
                    }
                    editing={editing}
                    onComplete={handleMetadataComplete}
                    onUpdateMetadata={(updatedMetadata) => {
                      console.log(updatedMetadata);
                      setMetadata(updatedMetadata);
                    }} // Sync metadata updates
                    errors={errors}
                    setErrors={setErrors}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetCreator;

{
  /* <div>
  {pendingTutorial && (
    <Alert className="gap-6 mt-10 mb-8 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 border border-yellow-400 dark:border-gray-600 shadow-md p-4 rounded-3xl flex items-center hover:shadow-lg transition-transform transform">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <AlertTitle className="text-yellow-700 text-sm md:text-lg dark:text-yellow-300 font-bold">
            Pending Snippet
          </AlertTitle>
        </div>
        <div className="flex items-center gap-4">
          <AlertDescription className="w-full">
            <div
              className="rounded-xl border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/10 
               px-4 py-3 text-sm sm:text-base text-justify leading-relaxed text-yellow-800 dark:text-yellow-200 
               shadow-sm transition-all"
            >
              <p className="text-wrap break-words">
                You have an unfinished Snippet: &quot;
                <b className="font-semibold">
                  {metadata.title === ""
                    ? "Untitled"
                    : `${metadata.title.slice(0, 50)}${
                        metadata.title.length > 50 ? " ..." : ""
                      }`}
                </b>
                &quot;. Would you like to continue?
              </p>
            </div>
          </AlertDescription>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Button
              variant="outline"
              size="lg"
              className="accept hover:bg-green-300 hover:text-green-700 dark:hover:text-green-400 [&_svg]:size-6"
              onClick={() => setPendingTutorial(false)}
            >
              <CheckCircle className="" />
              Continue
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="del3 hover:bg-red-300 hover:text-red-500 [&_svg]:size-6"
              onClick={clearData}
            >
              <XCircle className="" />
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </Alert>
  )}
</div> */
}
