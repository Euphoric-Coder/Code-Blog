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
import { useUser } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import FormBackgroundEffect from "@/components/Effect/FormBackgroundEffect";
import { toast } from "sonner";
import { db } from "@/lib/dbConfig";
import { getISTDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import SnippetMetadata from "./SnippetMetadata";
import CodeEditor from "./CodeEditor";
import SnippetContentEditor from "./SnippetEditor";

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
  const [currentStep, setCurrentStep] = useState("metadata");
  const [pendingTutorial, setPendingTutorial] = useState(false);
  const [clearPendingAlert, setClearPendingAlert] = useState(false);

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

  const saveTutorial = async () => {
    try {
      toast.message("Saving metadata...");
      console.log("Saving metadata...");
      console.log(metadata);
      console.log(snippet);
      // Inserts the metadata into the DB
      //   const result = await db
      //     .insert(Tutorials)
      //     .values({
      //       title: metadata.title,
      //       coverImage: metadata.coverImage?.url || metadata.coverImage,
      //       imageId: metadata.imageId,
      //       description: metadata.description,
      //       category: metadata.category,
      //       subCategories: metadata.subcategory,
      //       tags: metadata.tags,
      //       content: sections,
      //       author: user?.fullName ?? "Anonymous",
      //       date: getISTDate(),
      //       createdBy: user?.primaryEmailAddress?.emailAddress,
      //     })
      //     .returning({ insertedId: Tutorials.id });
      //   if (result) {
      //     toast.success("Snippet saved successfully!");
      //     // Redirects to the Snippet Page
      //     setTimeout(() => {
      //       redirect(`/tutorialpost/${result.insertedId}`);
      //     }, 4000);
      //     clearData();
      //   }
    } catch (error) {
      toast.error("Some Error occurred!", error);
    }

    // for Demo Purpose
    // console.log({
    //   title: metadata.title,
    //   coverImage: metadata.coverImage,
    //   imageId: metadata.imageId,
    //   description: metadata.description,
    //   category: metadata.category,
    //   subCategories: metadata.subcategory,
    //   tags: metadata.tags,
    //   content: sections,
    //   author: user?.fullName ?? "Anonymous",
    //   date: getISTDate(),
    //   createdBy: user?.primaryEmailAddress?.emailAddress,
    // });
  };

  const editTutorial = async () => {
    
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#f6fbff] to-[#ffffff] dark:from-[#0b1625] dark:to-[#112030] transition-colors duration-500 flex flex-col items-center justify-center px-4 py-10">
      <div>
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
      </div>
      {currentStep === "metadata" ? (
        <div className="w-full max-w-6xl mt-10">
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
            />
          )}
        </div>
      ) : (
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
                  onClick={saveTutorial}
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
      )}
    </div>
  );
};

export default SnippetCreator;
