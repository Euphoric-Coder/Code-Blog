"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Award,
  ArrowLeft,
  CheckCircle,
  LayoutDashboard,
  PenBox,
  TrendingUp,
  Target,
  GraduationCap,
  Play,
  Star,
  User,
  Calendar,
  Clock,
} from "lucide-react";

const TutorialViewer = ({ tutorial }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [activeSubsection, setActiveSubsection] = useState(null);
  const [progress, setProgress] = useState(0);
  const [completedSubsections, setCompletedSubsections] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      if (tutorial.content.length > 0) {
        const firstSection = tutorial.content[0];
        setActiveSection(firstSection.id);

        if (firstSection.subsections.length > 0) {
          setActiveSubsection(firstSection.subsections[0].id);
        }

        const initialExpandedSections = {};
        initialExpandedSections[firstSection.id] = true;
        setExpandedSections(initialExpandedSections);
      }

      try {
        const res = await fetch("/api/tutorials/get-marked", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tutorialId: tutorial.id }),
        });

        const data = await res.json();
        setCompletedSubsections(data.completed || []);
      } catch (err) {
        console.error("Failed to fetch completed subsections:", err);
      }
    };

    initialize();
  }, [tutorial]);

  useEffect(() => {
    updateProgress();
  }, [completedSubsections, tutorial]);

  const updateProgress = () => {
    const totalSubsections = tutorial.content.reduce(
      (total, section) => total + section.subsections.length,
      0
    );

    const newProgress =
      totalSubsections > 0
        ? (completedSubsections.length / totalSubsections) * 100
        : 0;

    setProgress(newProgress);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const markSubsectionComplete = async (subsectionId) => {
    if (!completedSubsections.includes(subsectionId)) {
      setCompletedSubsections((prev) => [...prev, subsectionId]);

      try {
        await fetch("/api/tutorials/mark-as-read", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tutorialId: tutorial.id,
            subsectionId: subsectionId,
          }),
        });
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  };

  const getActiveSubsectionContent = () => {
    if (!activeSection || !activeSubsection) return null;

    const section = tutorial.content.find((s) => s.id === activeSection);
    if (!section) return null;

    const subsection = section.subsections.find(
      (sub) => sub.id === activeSubsection
    );
    return subsection?.content || null;
  };

  const getPreviousSubsection = () => {
    if (!activeSection || !activeSubsection) return null;

    const currentSectionIndex = tutorial.content.findIndex(
      (s) => s.id === activeSection
    );
    const currentSubsectionIndex = tutorial.content[
      currentSectionIndex
    ].subsections.findIndex((sub) => sub.id === activeSubsection);

    if (currentSubsectionIndex > 0) {
      return {
        sectionId: activeSection,
        subsectionId:
          tutorial.content[currentSectionIndex].subsections[
            currentSubsectionIndex - 1
          ].id,
      };
    }

    if (currentSectionIndex > 0) {
      const prevSection = tutorial.content[currentSectionIndex - 1];
      return {
        sectionId: prevSection.id,
        subsectionId:
          prevSection.subsections[prevSection.subsections.length - 1].id,
      };
    }

    return null;
  };

  const getNextSubsection = () => {
    if (!activeSection || !activeSubsection) return null;

    const currentSectionIndex = tutorial.content.findIndex(
      (s) => s.id === activeSection
    );
    const currentSubsectionIndex = tutorial.content[
      currentSectionIndex
    ].subsections.findIndex((sub) => sub.id === activeSubsection);

    const currentSection = tutorial.content[currentSectionIndex];

    if (currentSubsectionIndex < currentSection.subsections.length - 1) {
      return {
        sectionId: activeSection,
        subsectionId: currentSection.subsections[currentSubsectionIndex + 1].id,
      };
    }

    if (currentSectionIndex < tutorial.content.length - 1) {
      const nextSection = tutorial.content[currentSectionIndex + 1];
      return {
        sectionId: nextSection.id,
        subsectionId: nextSection.subsections[0].id,
      };
    }

    return null; // ✅ end of the tutorial
  };

  return (
    // <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
    //   <div className="lg:w-1/4 bg-white border-r border-gray-200 overflow-y-auto lg:h-[calc(100vh-64px)] lg:sticky lg:top-16">
    //     <div className="p-4 border-b border-gray-200">
    //       <h2 className="font-bold text-xl text-gray-900">{tutorial.title}</h2>
    //       <div className="mt-4 mb-2 w-full bg-gray-200 rounded-full h-2.5">
    //         <div
    //           className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
    //           style={{ width: `${progress}%` }}
    //         ></div>
    //       </div>
    //       <div className="flex justify-between text-sm text-gray-600">
    //         <span>{Math.round(progress)}% complete</span>
    //         <span>
    //           {completedSubsections.length} /{" "}
    //           {tutorial.content.reduce(
    //             (total, section) => total + section.subsections.length,
    //             0
    //           )}{" "}
    //           content
    //         </span>
    //       </div>
    //     </div>

    //     <div className="p-2">
    //       {tutorial.content.map((section) => (
    //         <div key={section.id} className="mb-2">
    //           <div
    //             className={`p-3 flex items-center justify-between rounded-md cursor-pointer transition-colors ${
    //               activeSection === section.id
    //                 ? "bg-blue-50 text-blue-700"
    //                 : "hover:bg-gray-100"
    //             }`}
    //             onClick={() => toggleSection(section.id)}
    //           >
    //             <div className="flex items-center">
    //               {expandedSections[section.id] ? (
    //                 <ChevronDown className="h-4 w-4 mr-2 flex-shrink-0" />
    //               ) : (
    //                 <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
    //               )}
    //               <span className="font-medium">{section.title}</span>
    //             </div>
    //           </div>

    //           {expandedSections[section.id] && (
    //             <div className="ml-6 mt-1 space-y-1">
    //               {section.subsections.map((subsection) => (
    //                 <div
    //                   key={subsection.id}
    //                   className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
    //                     activeSubsection === subsection.id
    //                       ? "bg-blue-100 text-blue-800"
    //                       : "hover:bg-gray-100"
    //                   }`}
    //                   onClick={() => {
    //                     setActiveSection(section.id);
    //                     setActiveSubsection(subsection.id);
    //                   }}
    //                 >
    //                   <div className="flex-1 text-sm">{subsection.title}</div>

    //                   {completedSubsections.includes(subsection.id) && (
    //                     <Award className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
    //                   )}
    //                 </div>
    //               ))}
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   <div className="flex-1 p-6 lg:p-8">
    //     {activeSection === tutorial.content[0]?.id &&
    //       activeSubsection === tutorial.content[0]?.subsections[0]?.id && (
    //         <div className="mb-8">
    //           {tutorial.coverImage && (
    //             <img
    //               src={tutorial.coverImage}
    //               alt={tutorial.title}
    //               className="w-full h-72 object-fill rounded-lg shadow-md mb-6"
    //             />
    //           )}

    //           <h1 className="text-3xl font-bold text-gray-900 mb-4">
    //             {tutorial.title}
    //           </h1>

    //           <div className="flex flex-wrap gap-2 mb-4">
    //             {tutorial.tags.map((tag) => (
    //               <span
    //                 key={tag}
    //                 className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
    //               >
    //                 {tag
    //                   .split(" ")
    //                   .map(
    //                     (word) => word.charAt(0).toUpperCase() + word.slice(1)
    //                   )
    //                   .join(" ")}
    //               </span>
    //             ))}
    //           </div>

    //           <p className="text-gray-700 mb-6">{tutorial.description}</p>

    //           <div className="flex items-center text-gray-600 mb-8">
    //             <BookOpen className="h-5 w-5 mr-2" />
    //             <span>
    //               {tutorial.content.reduce(
    //                 (total, section) => total + section.subsections.length,
    //                 0
    //               )}{" "}
    //               lessons
    //             </span>
    //           </div>
    //         </div>
    //       )}

    //     {activeSection && activeSubsection && (
    //       <div className="bg-white rounded-lg shadow-md overflow-hidden">
    //         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
    //           <div>
    //             <h2 className="text-xl font-semibold text-gray-900">
    //               {tutorial.content.find((s) => s.id === activeSection)?.title}
    //             </h2>
    //             <h3 className="text-lg text-gray-700">
    //               {
    //                 tutorial.content
    //                   .find((s) => s.id === activeSection)
    //                   ?.subsections.find((sub) => sub.id === activeSubsection)
    //                   ?.title
    //               }
    //             </h3>
    //           </div>

    //           <button
    //             onClick={() => markSubsectionComplete(activeSubsection)}
    //             className={`px-4 py-2 rounded-md transition-colors ${
    //               completedSubsections.includes(activeSubsection)
    //                 ? "bg-green-100 text-green-800"
    //                 : "bg-blue-600 hover:bg-blue-700 text-white"
    //             }`}
    //           >
    //             {completedSubsections.includes(activeSubsection)
    //               ? "Completed!"
    //               : "Mark as Complete"}
    //           </button>
    //         </div>

    //         <div className="p-6 prose max-w-none min-h-[300px] lg:min-h-[400px] flex flex-col justify-start">
    //           <div
    //             className="flex-1"
    //             dangerouslySetInnerHTML={{
    //               __html: getActiveSubsectionContent() || "",
    //             }}
    //           ></div>
    //         </div>

    //         <div className="p-4 border-t border-gray-200 flex justify-between">
    //           <button
    //             className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
    //             disabled={!getPreviousSubsection()}
    //             onClick={() => {
    //               const prev = getPreviousSubsection();
    //               if (prev) {
    //                 setActiveSection(prev.sectionId);
    //                 setActiveSubsection(prev.subsectionId);
    //                 setExpandedSections((current) => ({
    //                   ...current,
    //                   [prev.sectionId]: true,
    //                 }));
    //               }
    //             }}
    //           >
    //             Previous
    //           </button>

    //           <button
    //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    //             disabled={!getNextSubsection()}
    //             onClick={() => {
    //               const next = getNextSubsection();
    //               if (next) {
    //                 setActiveSection(next.sectionId);
    //                 setActiveSubsection(next.subsectionId);
    //                 setExpandedSections((current) => ({
    //                   ...current,
    //                   [next.sectionId]: true,
    //                 }));
    //               }
    //             }}
    //           >
    //             Next
    //           </button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-6">
              <button
                onClick={() => window.history.back()}
                className="flex items-center px-3 sm:px-6 py-2 sm:py-3 text-slate-700 hover:text-blue-600 bg-white/80 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-all duration-300 border border-slate-200/60 hover:border-blue-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-sm"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-semibold text-sm hidden sm:inline">
                  Back
                </span>
              </button>

              <div className="h-8 w-px bg-slate-300/50 hidden sm:block"></div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl ring-2 sm:ring-4 ring-white/20">
                  <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate max-w-32 sm:max-w-md">
                    {tutorial.title}
                  </h1>
                  <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600">
                    <span>{tutorial.category}</span>
                    <span className="text-slate-400">•</span>
                    <span>{tutorial.subcategory}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 ml-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="hidden sm:flex items-center px-6 py-3 text-slate-700 hover:text-indigo-600 bg-white/80 hover:bg-indigo-50 rounded-xl transition-all duration-300 border border-slate-200/60 hover:border-indigo-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-sm"
              >
                <LayoutDashboard className="h-5 w-5 mr-2" />
                <span className="font-semibold text-sm">Dashboard</span>
              </button>

              <button
                onClick={() => (window.location.href = `/edit/${tutorial.id}`)}
                className="flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ring-2 ring-white/20"
              >
                <PenBox className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-2" />
                <span className="font-semibold text-sm hidden sm:inline">
                  Edit Tutorial
                </span>
              </button>

              {/* Mobile Dashboard Button */}
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="sm:hidden flex items-center px-3 py-2 text-slate-700 hover:text-indigo-600 bg-white/80 hover:bg-indigo-50 rounded-lg transition-all duration-300 border border-slate-200/60 hover:border-indigo-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-sm"
              >
                <LayoutDashboard className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 sm:pt-24 flex flex-col lg:flex-row">
        {/* Enhanced Sidebar */}
        <div className="lg:w-96 bg-white/95 backdrop-blur-xl lg:border-r border-slate-200/60 shadow-2xl overflow-y-auto lg:h-[calc(100vh-96px)] lg:sticky lg:top-24">
          {/* Progress Section */}
          <div className="p-4 sm:p-8 border-b border-slate-200/60 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Progress
                </h2>
                <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full transition-all duration-700 ease-out shadow-lg"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="text-lg sm:text-2xl font-black text-slate-900 mb-1">
                  {completedSubsections.length}/{" "}
                  {tutorial.content.reduce(
                    (total, section) => total + section.subsections.length,
                    0
                  )}{" "}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600">
                  Lessons
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="text-lg sm:text-2xl font-black text-slate-900 mb-1">
                  {tutorial.content.length}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600">
                  Sections
                </div>
              </div>
            </div>
          </div>

          {/* Sections Navigation */}
          <div className="p-4 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
              Course Content
            </h2>

            <div className="space-y-4">
              {tutorial.content.map((section, sectionIndex) => (
                <div
                  key={section.id}
                  className="border border-slate-200/60 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`p-3 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500"
                        : "hover:bg-slate-50"
                    }`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg ${
                          activeSection === section.id
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                            : "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700"
                        }`}
                      >
                        {sectionIndex + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                          {section.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                          {section.subsections.length} lessons
                        </p>
                      </div>
                    </div>

                    {expandedSections[section.id] ? (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    )}
                  </div>

                  {expandedSections[section.id] && (
                    <div className="bg-slate-50/50 border-t border-slate-200/60">
                      {section.subsections.map(
                        (subsection, subsectionIndex) => (
                          <div
                            key={subsection.id}
                            className={`flex items-center p-3 sm:p-4 cursor-pointer transition-all duration-300 ${
                              activeSubsection === subsection.id
                                ? "bg-gradient-to-r from-blue-100 to-indigo-100 border-l-4 border-blue-500"
                                : "hover:bg-white"
                            }`}
                            onClick={() => {
                              setActiveSection(section.id);
                              setActiveSubsection(subsection.id);
                            }}
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <div
                                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs shadow-md ${
                                  completedSubsections.includes(subsection.id)
                                    ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
                                    : activeSubsection === subsection.id
                                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                                      : "bg-gradient-to-br from-slate-300 to-slate-400 text-slate-600"
                                }`}
                              >
                                {completedSubsections.includes(
                                  subsection.id
                                ) ? (
                                  <CheckCircle className="h-2 w-2 sm:h-3 sm:w-3" />
                                ) : (
                                  <Play className="h-2 w-2 sm:h-3 sm:w-3" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                                  {subsection.title}
                                </h4>
                                <p className="text-xs text-slate-500 font-medium">
                                  Lesson {subsectionIndex + 1}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-8">
          {activeSection === tutorial.content[0]?.id &&
            activeSubsection === tutorial.content[0]?.subsections[0]?.id && (
              <div className="mb-8 sm:mb-12 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200/60">
                {tutorial.coverImage && (
                  <div className="relative h-48 sm:h-96 overflow-hidden">
                    <img
                      src={tutorial.coverImage}
                      alt={tutorial.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg ring-2 ring-white/20">
                          {tutorial.category}
                        </span>
                        <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg ring-2 ring-white/20">
                          {tutorial.subcategory}
                        </span>
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg ring-2 ring-white/20 flex items-center">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Premium
                        </span>
                      </div>

                      <h1 className="text-2xl sm:text-5xl font-black mb-3 sm:mb-6 leading-tight">
                        {tutorial.title}
                      </h1>

                      <div className="hidden sm:flex items-center space-x-8 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Expert Instructor</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Updated recently</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {" "}
                            {tutorial.content.reduce(
                              (total, section) =>
                                total + section.subsections.length,
                              0
                            )}{" "}
                            lessons
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4 sm:p-10">
                  {!tutorial.coverImage && (
                    <div className="mb-6 sm:mb-10">
                      <h1 className="text-2xl sm:text-5xl font-black text-slate-900 mb-3 sm:mb-6">
                        {tutorial.title}
                      </h1>
                      <div className="flex items-center space-x-3">
                        <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                          {tutorial.category}
                        </span>
                        <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                          {tutorial.subcategory}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {tutorial.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-base sm:text-xl text-slate-700 leading-relaxed mb-6 sm:mb-10 font-medium">
                    {tutorial.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
                    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200/50">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                        <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-blue-700 mb-1 sm:mb-2">
                        {" "}
                        {tutorial.content.reduce(
                          (total, section) =>
                            total + section.subsections.length,
                          0
                        )}{" "}
                      </div>
                      <div className="text-blue-700 font-bold text-sm sm:text-base">
                        Total Lessons
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-200/50">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                        <Star className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-purple-700 mb-1 sm:mb-2">
                        {tutorial.content.length}
                      </div>
                      <div className="text-purple-700 font-bold text-sm sm:text-base">
                        Sections
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-200/50">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                        <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-700 mb-1 sm:mb-2">
                        ~2h
                      </div>
                      <div className="text-emerald-700 font-bold text-sm sm:text-base">
                        Duration
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {activeSection && activeSubsection && (
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200/60">
              <div className="p-4 sm:p-10 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
                <div className="flex items-center space-x-3 sm:space-x-6 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl ring-2 sm:ring-4 ring-white/30">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-3xl font-black text-slate-900">
                      {
                        tutorial.content.find((s) => s.id === activeSection)
                          ?.title
                      }
                    </h2>
                    <h3 className="text-base sm:text-xl text-slate-600 font-semibold">
                      {
                        tutorial.content
                          .find((s) => s.id === activeSection)
                          ?.subsections.find(
                            (sub) => sub.id === activeSubsection
                          )?.title
                      }
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    In Progress
                  </span>
                  <div className="flex items-center space-x-2 text-slate-600 font-medium text-xs sm:text-sm">
                    <Clock className="h-4 w-4" />
                    <span>~5 min read</span>
                  </div>
                  <span className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified Content
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-10 prose prose-base sm:prose-xl max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-p:text-slate-700 prose-p:font-medium prose-a:text-blue-600 prose-a:font-semibold prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:font-semibold">
                <div
                  dangerouslySetInnerHTML={{
                    __html: getActiveSubsectionContent() || "",
                  }}
                ></div>
              </div>

              <div className="p-4 sm:p-10 border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
                    <button
                      className="flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl sm:rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-slate-200/60 font-semibold text-sm sm:text-base"
                      disabled={!getPreviousSubsection()}
                      onClick={() => {
                        const prev = getPreviousSubsection();
                        if (prev) {
                          setActiveSection(prev.sectionId);
                          setActiveSubsection(prev.subsectionId);
                          setExpandedSections((current) => ({
                            ...current,
                            [prev.sectionId]: true,
                          }));
                        }
                      }}
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Previous Lesson
                    </button>

                    <button
                      className="flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl sm:rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold text-sm sm:text-base"
                      disabled={!getNextSubsection()}
                      onClick={() => {
                        const next = getNextSubsection();
                        if (next) {
                          setActiveSection(next.sectionId);
                          setActiveSubsection(next.subsectionId);
                          setExpandedSections((current) => ({
                            ...current,
                            [next.sectionId]: true,
                          }));
                        }
                      }}
                    >
                      Next Lesson
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </button>
                  </div>

                  <button
                    onClick={() => markSubsectionComplete(activeSubsection)}
                    className={`flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold text-sm sm:text-base w-full sm:w-auto ${
                      completedSubsections.includes(activeSubsection)
                        ? "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-2 border-emerald-300"
                        : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                    }`}
                  >
                    {completedSubsections.includes(activeSubsection) ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Completed!
                      </>
                    ) : (
                      <>
                        <Award className="h-5 w-5 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialViewer;
