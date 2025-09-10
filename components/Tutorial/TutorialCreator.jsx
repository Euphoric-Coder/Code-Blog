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
  LayoutDashboard,
  PenBox,
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
import TutorialMetadata from "@/components/Tutorial/TutorialMetadata";
import SectionEditor from "@/components/Tutorial/SectionEditor";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import FormBackgroundEffect from "@/components/Effect/FormBackgroundEffect";
import { toast } from "sonner";
import { db } from "@/lib/dbConfig";
import { Tutorials } from "@/lib/schema";
import { getISTDate } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { ModeToggle } from "../theme-btn";

const initialSectionId = uuidv4();
const initialSubsectionId = uuidv4();
const defaultData = {
  tutorial: {
    title: "",
    description: "",
    coverImage: null,
    imageId: null,
    category: "",
    subcategory: [],
    tags: [],
  },
  sections: [
    {
      id: initialSectionId,
      title: "Introduction",
      subsections: [
        {
          id: initialSubsectionId,
          title: "Welcome",
          content: "",
          usedMarkdown: false,
        },
      ],
    },
  ],
  activeSectionId: initialSectionId,
  activeSubsectionId: initialSubsectionId,
};

const isDefaultLike = (data) => {
  if (!data) return true;

  const { tutorial, sections, activeSectionId, activeSubsectionId } =
    JSON.parse(data);

  // Check tutorial fields are empty
  const tutorialIsEmpty =
    tutorial?.title === "" &&
    tutorial?.description === "" &&
    tutorial?.coverImage === null &&
    tutorial?.imageId === null &&
    tutorial?.category === "" &&
    Array.isArray(tutorial?.subcategory) &&
    Array.isArray(tutorial?.tags) &&
    tutorial.tags.length === 0;

  // Check sections array matches default pattern
  const defaultSection = sections?.[0];
  const sectionsAreDefault =
    Array.isArray(sections) &&
    sections.length === 1 &&
    defaultSection?.title === "Introduction" &&
    defaultSection?.subsections?.length === 1 &&
    defaultSection?.subsections?.[0]?.title === "Welcome" &&
    defaultSection?.subsections?.[0]?.content === "";

  // Check IDs of section and subsection match default ones
  const idsAreDefault =
    activeSectionId === defaultSection?.id &&
    activeSubsectionId === defaultSection?.subsections?.[0]?.id;

  return tutorialIsEmpty && sectionsAreDefault && idsAreDefault;
};

const TutorialCreator = ({ editData = null, editing = false }) => {
  const router = useRouter();
  const { user } = useUser();
  const LOCAL_STORAGE_KEY = useMemo(() => {
    return user?.id ? `tutorialCreatorData-${user.id}` : null;
  }, [user?.id]);

  const [initialData, setInitialData] = useState(editData ?? null);
  const [tutorial, setTutorial] = useState(null);
  const [sections, setSections] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [activeSubsectionId, setActiveSubsectionId] = useState(null);
  const [currentStep, setCurrentStep] = useState("metadata");
  const [draggingSection, setDraggingSection] = useState(null);
  const [draggingSubsection, setDraggingSubsection] = useState(null);
  const [pendingTutorial, setPendingTutorial] = useState(false);
  const [clearPendingAlert, setClearPendingAlert] = useState(false);
  const [editBlogCoverImageId, setEditBlogCoverImageId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 640); // Tailwind "sm"
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const limit = isMobile ? 11 : 30;

  // ✅ Load initial data from localStorage after mount
  useEffect(() => {
    if (editData) return; // skip loading for editing

    if (typeof window !== "undefined" && LOCAL_STORAGE_KEY) {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log(!isDefaultLike(savedData));
      if (!isDefaultLike(savedData)) {
        try {
          const parsed = JSON.parse(savedData);
          // console.log("Loaded tutorial data from localStorage:", parsed);
          setInitialData(parsed);
          setTutorial(parsed.tutorial);
          setSections(parsed.sections);
          setActiveSectionId(parsed.activeSectionId);
          setActiveSubsectionId(parsed.activeSubsectionId);
          setPendingTutorial(true);
          return;
        } catch (error) {
          console.error("Failed to parse localStorage data:", error);
        }
      }

      // Fallback default data on empty or invalid data from localStorage
      setInitialData(defaultData);
      setTutorial(defaultData.tutorial);
      setSections(defaultData.sections);
      setActiveSectionId(defaultData.activeSectionId);
      setActiveSubsectionId(defaultData.activeSubsectionId);
    }
  }, [LOCAL_STORAGE_KEY]);

  // Load data for editing
  useEffect(() => {
    if (editData) {
      setTutorial(editData.tutorial);
      setSections(editData.sections);
      setActiveSectionId(editData.activeSectionId);
      setActiveSubsectionId(editData.activeSubsectionId);
    }
  }, [editData]);

  // ✅ Save changes to localStorage
  useEffect(() => {
    if (tutorial && sections && !editing) {
      const dataToSave = {
        tutorial,
        sections,
        activeSectionId,
        activeSubsectionId,
      };
      // console.log("Saving tutorial data to localStorage:", dataToSave);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [
    tutorial,
    sections,
    activeSectionId,
    activeSubsectionId,
    LOCAL_STORAGE_KEY,
  ]);

  // ✅ Avoid rendering until initial data is loaded
  if (!initialData) return <div>Loading tutorial data...</div>;

  // ✅ Safely find the active section/subsection
  const activeSection =
    sections?.find((s) => s.id === activeSectionId) || sections[0];
  const activeSubsection =
    activeSection?.subsections?.find((sub) => sub.id === activeSubsectionId) ||
    activeSection?.subsections?.[0];

  const handleMetadataComplete = (metadata) => {
    setTutorial((prev) => ({ ...prev, ...metadata }));
    setCurrentStep("sections");
  };

  const addNewSection = () => {
    const newId = uuidv4();
    const newSection = {
      id: newId,
      title: "New Section",
      subsections: [
        {
          id: uuidv4(),
          title: "New Subsection",
          content: "",
          usedMarkdown: false,
        },
      ],
    };

    setSections([...sections, newSection]);
    setActiveSectionId(newId);
    setActiveSubsectionId(newSection.subsections[0].id);
  };

  const addNewSubsection = (sectionId) => {
    const newSubId = uuidv4(); // generate first
    const newSubsection = {
      id: newSubId,
      title: "New Subsection",
      content: "",
      usedMarkdown: false,
    };

    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            subsections: [...section.subsections, newSubsection],
          };
        }
        return section;
      })
    );

    setActiveSubsectionId(newSubId); // safely done after setSections
  };

  const updateSectionTitle = (sectionId, title) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, title } : section
      )
    );
  };

  const updateSubsectionTitle = (sectionId, subsectionId, title) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            subsections: section.subsections.map((subsection) =>
              subsection.id === subsectionId
                ? { ...subsection, title }
                : subsection
            ),
          };
        }
        return section;
      })
    );
  };

  const updateSubsectionContent = (sectionId, subsectionId, content) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            subsections: section.subsections.map((subsection) =>
              subsection.id === subsectionId
                ? { ...subsection, content }
                : subsection
            ),
          };
        }
        return section;
      })
    );
  };

  const updateSubsectionUsedMarkdown = (
    sectionId,
    subsectionId,
    usedMarkdown
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            subsections: section.subsections.map((subsection) =>
              subsection.id === subsectionId
                ? { ...subsection, usedMarkdown }
                : subsection
            ),
          };
        }
        return section;
      })
    );
  };

  const deleteSection = (sectionId) => {
    const filtered = sections.filter((section) => section.id !== sectionId);
    setSections(filtered);
    if (activeSectionId === sectionId) {
      setActiveSectionId(filtered[0]?.id || null);
      setActiveSubsectionId(filtered[0]?.subsections[0]?.id || null);
    }
  };

  const deleteSubsection = (sectionId, subsectionId) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          const updatedSubsections = section.subsections.filter(
            (sub) => sub.id !== subsectionId
          );
          if (activeSubsectionId === subsectionId) {
            setActiveSubsectionId(updatedSubsections[0]?.id || null);
          }
          return {
            ...section,
            subsections: updatedSubsections,
          };
        }
        return section;
      })
    );
  };

  const handleSectionDragStart = (section) => {
    setDraggingSection(section);
  };

  const handleSectionDragOver = (e) => {
    e.preventDefault();
  };

  const handleSectionDrop = (e, targetSection) => {
    e.preventDefault();
    if (draggingSection) {
      setSections((prev) => {
        const updated = [...prev];
        const draggingIndex = updated.findIndex(
          (s) => s.id === draggingSection.id
        );
        const targetIndex = updated.findIndex((s) => s.id === targetSection.id);
        [updated[draggingIndex], updated[targetIndex]] = [
          updated[targetIndex],
          updated[draggingIndex],
        ];
        return updated;
      });
      setDraggingSection(null);
    }
  };

  const handleSubsectionDragStart = (subsection) => {
    setDraggingSubsection(subsection);
  };

  const handleSubsectionDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubsectionDrop = (e, targetSubsection, sectionId) => {
    e.preventDefault();
    if (draggingSubsection) {
      setSections((prev) =>
        prev.map((section) => {
          if (section.id === sectionId) {
            const updated = [...section.subsections];
            const draggingIndex = updated.findIndex(
              (s) => s.id === draggingSubsection.id
            );
            const targetIndex = updated.findIndex(
              (s) => s.id === targetSubsection.id
            );
            [updated[draggingIndex], updated[targetIndex]] = [
              updated[targetIndex],
              updated[draggingIndex],
            ];
            return { ...section, subsections: updated };
          }
          return section;
        })
      );
      setDraggingSubsection(null);
    }
  };

  const clearData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear localStorage
    setPendingTutorial(false); // Reset pending state
    const initialSectionId = uuidv4();
    const initialSubsectionId = uuidv4();
    const defaultData = {
      tutorial: {
        title: "",
        description: "",
        coverImage: null,
        imageId: null,
        category: "",
        subcategory: [],
        tags: [],
      },
      sections: [
        {
          id: initialSectionId,
          title: "Introduction",
          subsections: [
            {
              id: initialSubsectionId,
              title: "Welcome",
              content: "",
              usedMarkdown: false,
            },
          ],
        },
      ],
      activeSectionId: initialSectionId,
      activeSubsectionId: initialSubsectionId,
    };

    setTutorial(defaultData.tutorial);
    setSections(defaultData.sections);
    setActiveSectionId(initialSectionId);
    setActiveSubsectionId(initialSubsectionId);
    setCurrentStep("metadata");
    console.log("Tutorial data fully reset.");
  };

  const saveTutorial = async () => {
    console.log({
      title: tutorial.title,
      coverImage: tutorial.coverImage?.url || tutorial.coverImage,
      imageId: tutorial.imageId,
      description: tutorial.description,
      category: tutorial.category,
      subCategories: tutorial.subcategory,
      tags: tutorial.tags,
      content: sections,
      author: user?.fullName ?? "Anonymous",
      date: getISTDate(),
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    // try {
    //   // Inserts the tutorial into the DB
    //   const result = await db
    //     .insert(Tutorials)
    //     .values({
    //       title: tutorial.title,
    //       coverImage: tutorial.coverImage?.url || tutorial.coverImage,
    //       imageId: tutorial.imageId,
    //       description: tutorial.description,
    //       category: tutorial.category,
    //       subCategories: tutorial.subcategory,
    //       tags: tutorial.tags,
    //       content: sections,
    //       author: user?.fullName ?? "Anonymous",
    //       date: getISTDate(),
    //       createdBy: user?.primaryEmailAddress?.emailAddress,
    //     })
    //     .returning({ insertedId: Tutorials.id });

    //   if (result) {
    //     toast.success("Tutorial saved successfully!");

    //     // Redirects to the Tutorial Page
    //     setTimeout(() => {
    //       redirect(`/tutorialpost/${result.insertedId}`);
    //     }, 4000);
    //     clearData();
    //   }
    // } catch (error) {
    //   toast.error("Some Error occurred!", error);
    // }

    // for Demo Purpose
    // console.log({
    //   title: tutorial.title,
    //   coverImage: tutorial.coverImage,
    //   imageId: tutorial.imageId,
    //   description: tutorial.description,
    //   category: tutorial.category,
    //   subCategories: tutorial.subcategory,
    //   tags: tutorial.tags,
    //   content: sections,
    //   author: user?.fullName ?? "Anonymous",
    //   date: getISTDate(),
    //   createdBy: user?.primaryEmailAddress?.emailAddress,
    // });
  };

  const editTutorial = async () => {
    // for Demo Purpose
    console.log({
      title: tutorial.title,
      coverImage: tutorial.coverImage,
      imageId: tutorial.imageId,
      description: tutorial.description,
      category: tutorial.category,
      subCategories: tutorial.subcategory,
      tags: tutorial.tags,
      content: sections,
      author: user?.fullName ?? "Anonymous",
      date: getISTDate(),
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
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
                <span className="hidden md:inline">Creating Tutorial: </span>
                <span className="md:hidden">Tutorial: </span>
                <HoverCard>
                  {tutorial?.title.length > limit ? (
                    <>
                      <HoverCardTrigger asChild>
                        <span className="cursor-pointer">
                          {tutorial?.title.slice(0, limit)}...
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="max-w-xs break-words whitespace-normal p-2">
                        {tutorial?.title}
                      </HoverCardContent>
                    </>
                  ) : (
                    <span>
                      {tutorial?.title === "" ? "Untitled" : tutorial?.title}
                    </span>
                  )}
                </HoverCard>
              </h1>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ModeToggle />
              {/* Tablet and Desktop buttons */}
              <button
                onClick={handleBackToDashboard}
                className="inline-flex items-center px-3 lg:px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 border border-blue-300 dark:border-gray-600 rounded-3xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 text-sm lg:text-base font-medium"
              >
                <LayoutDashboard className="md:mr-2" />
                <span className="md:inline hidden">Dashboard</span>
              </button>

              {/* Mobile-only save button */}
              <button
                // onClick={Add}
                onClick={saveTutorial}
                className="sm:hidden p-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-3xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                title={`${editing ? "Update" : "Create"} Snippet`}
              >
                {editing ? <PenBox /> : <Save />}
              </button>

              <button
                onClick={() => {
                  if (editing) {
                    editTutorial();
                  } else {
                    saveTutorial();
                  }
                }}
                className="hidden sm:inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold rounded-3xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm lg:text-base"
              >
                {editing ? (
                  <PenBox className="mr-1 lg:mr-2" />
                ) : (
                  <Save className="mr-1 lg:mr-2" />
                )}
                <span className="hidden lg:inline">{`${editing ? "Update" : "Create"} Snippet`}</span>
                <span className="lg:hidden">
                  {editing ? "Update" : "Create"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full bg-gradient-to-tr from-[#f6fbff] to-[#ffffff] dark:from-[#0b1625] dark:to-[#112030] transition-colors duration-500 flex flex-col items-center justify-center px-4 py-4">
        {!editing && (
          <AlertDialog open={clearPendingAlert}>
            <AlertDialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white via-blue-50 to-cyan-200 dark:from-gray-800 dark:via-gray-900 dark:to-blue-800 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,150,255,0.3)] dark:shadow-[0_0_40px_rgba(0,75,150,0.5)] w-[95%] max-w-lg">
              {/* Background Effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-10 -left-10 w-60 h-60 bg-gradient-radial from-blue-500 via-blue-400 to-transparent dark:from-blue-900 dark:via-gray-800 dark:to-transparent opacity-25 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-radial from-cyan-400 via-blue-300 to-transparent dark:from-cyan-800 dark:via-blue-900 dark:to-transparent opacity-30 blur-[120px]"></div>
              </div>

              {/* Dialog Header */}
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 dark:from-blue-300 dark:via-cyan-400 dark:to-blue-500">
                  Are you absolutely sure to delete?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  This action cannot be undone. This will permanently delete
                  your income <strong>&quot;{tutorial.title}&quot;</strong> and
                  all of its associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>

              {/* Dialog Footer */}
              <AlertDialogFooter className="flex gap-4 mt-6">
                <AlertDialogCancel
                  onClick={() => setClearPendingAlert(false)}
                  className="w-full py-3 rounded-2xl border border-blue-300 bg-gradient-to-r from-white to-blue-50 text-blue-600 font-semibold shadow-sm hover:shadow-md hover:bg-blue-100 transition-transform transform hover:scale-105 active:scale-95 dark:border-blue-500 dark:bg-gradient-to-r dark:from-gray-800 dark:to-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 hover:text-indigo-500 dark:hover:text-indigo-200"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    clearData();
                    setClearPendingAlert(false);
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-bold shadow-lg hover:shadow-[0_0_20px_rgba(255,100,100,0.5)] hover:scale-105 active:scale-95 transition-transform transform dark:bg-gradient-to-r dark:from-red-700 dark:via-red-800 dark:to-red-900 dark:shadow-[0_0_20px_rgba(200,50,50,0.5)] dark:hover:shadow-[0_0_30px_rgba(200,50,50,0.7)]"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/* Pending Tutorial Alert */}
        {!editing && (
          <div>
            {pendingTutorial && (
              <Alert className="gap-6 mt-10 mb-8 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 border border-yellow-400 dark:border-gray-600 shadow-md p-4 rounded-3xl flex items-center hover:shadow-lg transition-transform transform">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <AlertTitle className="text-yellow-700 text-sm md:text-lg dark:text-yellow-300 font-bold">
                      Pending Tutorial
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
                          You have an unfinished Tutorial: &quot;
                          <b className="font-semibold">
                            {tutorial.title === ""
                              ? "Untitled"
                              : `${tutorial.title.slice(0, 50)}${
                                  tutorial.title.length > 50 ? " ..." : ""
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
        )}
        {currentStep === "metadata" ? (
          <div className="w-full max-w-6xl mt-10">
            {tutorial && (
              <TutorialMetadata
                initialData={
                  tutorial || {
                    title: "",
                    description: "",
                    coverImage: null,
                    imageId: null,
                    category: "",
                    subcategory: "",
                    tags: [],
                  }
                }
                editing={editing}
                onComplete={handleMetadataComplete}
                onUpdateMetadata={(updatedMetadata) =>
                  setTutorial(updatedMetadata)
                } // Sync metadata updates
                setEditBlogCoverImageId={setEditBlogCoverImageId}
              />
            )}
          </div>
        ) : (
          <div className="w-full bg-[#e8f4ff]/60 dark:bg-[#1e2e44]/60 backdrop-blur-xl border border-blue-200 dark:border-blue-800 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="flex justify-end mb-4">
              <span className="inline-block px-4 py-1 text-xs font-medium rounded-full bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-100">
                Page 2 of 2
              </span>
            </div>
            <div className="mb-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center">
              <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-200">
                Creating: {tutorial.title}
              </h1>
              <div className="flex gap-5">
                <Button
                  onClick={() => setCurrentStep("metadata")}
                  className="btn8 hover:bg-purple-500"
                >
                  Back to Page 1
                </Button>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
              <div className="form-layout bg-white xl:w-1/3 h-fit">
                <FormBackgroundEffect />
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200 tracking-wide">
                    Sections({sections.length})
                  </h2>

                  <button
                    onClick={addNewSection}
                    className="group btn9 flex gap-2 items-center"
                  >
                    <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-700" />
                    Add
                  </button>
                </div>

                <div className="max-h-[500px] space-y-3 overflow-auto">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className="overflow-hidden"
                      draggable
                      onDragStart={() => handleSectionDragStart(section)}
                      onDragOver={handleSectionDragOver}
                      onDrop={(e) => handleSectionDrop(e, section)}
                    >
                      <div
                        className={`group tutorial-section rounded-[20px] flex justify-between cursor-pointer
                        ${
                          section.id === activeSectionId
                            ? "border-blue-600 rounded-b-none"
                            : "border-blue-400"
                        }`}
                        onClick={() => {
                          setActiveSectionId(section.id);
                          setActiveSubsectionId(
                            section.subsections[0]?.id || null
                          );
                        }}
                      >
                        <div className="flex items-center">
                          <GripVertical className="h-4 w-4 mr-2 text-gray-400 group-hover:cursor-move" />
                          <span className="text-sm text-gray-700 dark:text-gray-200">
                            {section.title} ({section.subsections.length}{" "}
                            Subsections)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSection(section.id);
                            }}
                            className="text-red-600 hover:text-red-800 transition-all duration-500 p-1"
                          >
                            <Trash2 className="h-5 w-5 hover:scale-[1.03]" />
                          </button>
                          <ChevronRight
                            className={`h-5 w-5 transition-transform ${
                              section.id === activeSectionId
                                ? "transform rotate-90"
                                : ""
                            }`}
                          />
                        </div>
                      </div>

                      {section.id === activeSectionId && (
                        <div className="pl-4 pr-2 py-2 border-[3px] border-t-0 border-blue-600 bg-gradient-to-b from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 backdrop-blur-md rounded-b-[20px]">
                          <div className="space-y-2">
                            {section.subsections.map((subsection) => (
                              <div
                                key={subsection.id}
                                className={`group px-3 py-2 rounded-xl flex justify-between items-center transition-colors duration-300 cursor-pointer backdrop-blur-sm border-[2.5px] border-l-8
                                ${
                                  subsection.id === activeSubsectionId
                                    ? "bg-gradient-to-r from-blue-300 to-indigo-300 border-l-blue-600 text-blue-900 shadow-inner dark:from-blue-800 dark:to-indigo-800 dark:border-l-blue-400 border-blue-600 dark:border-blue-400"
                                    : "bg-gradient-to-br from-blue-100 via-blue-100 to-indigo-100 hover:from-blue-200 hover:via-blue-200 hover:to-indigo-200 border-l-blue-400 text-gray-900 dark:from-gray-800/50 dark:via-gray-700 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:via-gray-600 dark:hover:to-gray-500 dark:border-l-gray-400 border-blue-400 dark:border-gray-400 hover:scale-[1.02] transition-all duration-700"
                                }`}
                                draggable
                                onDragStart={() =>
                                  handleSubsectionDragStart(subsection)
                                }
                                onDragOver={handleSubsectionDragOver}
                                onDrop={(e) =>
                                  handleSubsectionDrop(
                                    e,
                                    subsection,
                                    section.id
                                  )
                                }
                                onClick={() =>
                                  setActiveSubsectionId(subsection.id)
                                }
                              >
                                <div className="flex items-center">
                                  <GripVertical className="h-4 w-4 mr-2 text-gray-400 group-hover:cursor-move" />
                                  <span className="text-sm text-gray-700 dark:text-gray-200">
                                    {subsection.title}
                                  </span>
                                </div>
                                {section.subsections.length > 1 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteSubsection(
                                        section.id,
                                        subsection.id
                                      );
                                    }}
                                    className="text-red-600 hover:text-red-800 transition-all duration-500 p-1"
                                  >
                                    <Trash2 className="h-5 w-5 hover:scale-[1.03]" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          <Button
                            onClick={() => addNewSubsection(section.id)}
                            className="mt-3 w-full btn4 hover:scale-[1.01]"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Subsection
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="xl:w-full xl:col-span-3">
                {activeSectionId && activeSubsectionId && (
                  <div>
                    <SectionEditor
                      section={sections.find((s) => s.id === activeSectionId)}
                      activeSubsection={sections
                        .find((s) => s.id === activeSectionId)
                        .subsections.find(
                          (sub) => sub.id === activeSubsectionId
                        )}
                      onUpdateSectionTitle={(title) =>
                        updateSectionTitle(activeSectionId, title)
                      }
                      onUpdateSubsectionTitle={(title) =>
                        updateSubsectionTitle(
                          activeSectionId,
                          activeSubsectionId,
                          title
                        )
                      }
                      onUpdateSubsectionContent={(content) =>
                        updateSubsectionContent(
                          activeSectionId,
                          activeSubsectionId,
                          content
                        )
                      }
                      onUpdateUsedMarkdown={(isMarkdown) =>
                        updateSubsectionUsedMarkdown(
                          activeSectionId,
                          activeSubsectionId,
                          isMarkdown
                        )
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialCreator;
