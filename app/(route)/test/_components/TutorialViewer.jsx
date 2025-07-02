"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, BookOpen, Award } from "lucide-react";

const TutorialViewer = ({ tutorial }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [activeSubsection, setActiveSubsection] = useState(null);
  const [progress, setProgress] = useState(0);
  const [completedSubsections, setCompletedSubsections] = useState([]);

  useEffect(() => {
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

    setCompletedSubsections([]);
    updateProgress();
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

  const markSubsectionComplete = (subsectionId) => {
    if (!completedSubsections.includes(subsectionId)) {
      setCompletedSubsections((prev) => [...prev, subsectionId]);
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

    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <div className="lg:w-1/4 bg-white border-r border-gray-200 overflow-y-auto lg:h-[calc(100vh-64px)] lg:sticky lg:top-16">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-xl text-gray-900">{tutorial.title}</h2>
          <div className="mt-4 mb-2 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{Math.round(progress)}% complete</span>
            <span>
              {completedSubsections.length} /{" "}
              {tutorial.content.reduce(
                (total, section) => total + section.subsections.length,
                0
              )}{" "}
              sections
            </span>
          </div>
        </div>

        <div className="p-2">
          {tutorial.content.map((section) => (
            <div key={section.id} className="mb-2">
              <div
                className={`p-3 flex items-center justify-between rounded-md cursor-pointer transition-colors ${
                  activeSection === section.id
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center">
                  {expandedSections[section.id] ? (
                    <ChevronDown className="h-4 w-4 mr-2 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                  )}
                  <span className="font-medium">{section.title}</span>
                </div>
              </div>

              {expandedSections[section.id] && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.subsections.map((subsection) => (
                    <div
                      key={subsection.id}
                      className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
                        activeSubsection === subsection.id
                          ? "bg-blue-100 text-blue-800"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setActiveSection(section.id);
                        setActiveSubsection(subsection.id);
                      }}
                    >
                      <div className="flex-1 text-sm">{subsection.title}</div>

                      {completedSubsections.includes(subsection.id) && (
                        <Award className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-8">
        {activeSection === tutorial.content[0]?.id &&
          activeSubsection === tutorial.content[0]?.subsections[0]?.id && (
            <div className="mb-8">
              {tutorial.coverImage && (
                <img
                  src={tutorial.coverImage}
                  alt={tutorial.title}
                  className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
                />
              )}

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {tutorial.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {tutorial.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 mb-6">{tutorial.description}</p>

              <div className="flex items-center text-gray-600 mb-8">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>
                  {tutorial.content.reduce(
                    (total, section) => total + section.subsections.length,
                    0
                  )}{" "}
                  lessons
                </span>
              </div>
            </div>
          )}

        {activeSection && activeSubsection && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {tutorial.content.find((s) => s.id === activeSection)?.title}
                </h2>
                <h3 className="text-lg text-gray-700">
                  {
                    tutorial.content
                      .find((s) => s.id === activeSection)
                      ?.subsections.find((sub) => sub.id === activeSubsection)
                      ?.title
                  }
                </h3>
              </div>

              <button
                onClick={() => markSubsectionComplete(activeSubsection)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  completedSubsections.includes(activeSubsection)
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {completedSubsections.includes(activeSubsection)
                  ? "Completed!"
                  : "Mark as Complete"}
              </button>
            </div>

            <div className="p-6 prose max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: getActiveSubsectionContent() || "",
                }}
              ></div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-between">
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
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
                Previous
              </button>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
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
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialViewer;
