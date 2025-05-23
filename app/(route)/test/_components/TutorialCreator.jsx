"use client";

import React, { useState } from "react";
import {
  Upload,
  ChevronRight,
  Save,
  Plus,
  Image,
  Trash2,
  GripVertical,
} from "lucide-react";
import TutorialMetadata from "./TutorialMetadata";
import SectionEditor from "./SectionEditor";
import { v4 as uuidv4 } from "uuid";

const TutorialCreator = () => {
  const [currentStep, setCurrentStep] = useState("metadata");
  const [tutorial, setTutorial] = useState({
    title: "",
    description: "",
    coverImage: "",
    category: "",
    subcategory: "",
    tags: [],
  });

  const initialSectionId = uuidv4();
  const initialSubsectionId = uuidv4();

  const [sections, setSections] = useState([
    {
      id: initialSectionId,
      title: "Introduction",
      subsections: [
        {
          id: initialSubsectionId,
          title: "Welcome",
          content: "<p>Welcome to this tutorial!</p>",
        },
      ],
    },
  ]);

  const [activeSectionId, setActiveSectionId] = useState(initialSectionId);
  const [activeSubsectionId, setActiveSubsectionId] =
    useState(initialSubsectionId);
  const [draggingSection, setDraggingSection] = useState(null);
  const [draggingSubsection, setDraggingSubsection] = useState(null);

  const handleMetadataComplete = (metadata) => {
    setTutorial({ ...tutorial, ...metadata });
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
          content: "<p>Add your content here...</p>",
        },
      ],
    };

    setSections([...sections, newSection]);
    setActiveSectionId(newId);
    setActiveSubsectionId(newSection.subsections[0].id);
  };

  const addNewSubsection = (sectionId) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          const newSubId = uuidv4();
          const newSubsection = {
            id: newSubId,
            title: "New Subsection",
            content: "<p>Add your content here...</p>",
          };

          setActiveSubsectionId(newSubId);
          return {
            ...section,
            subsections: [...section.subsections, newSubsection],
          };
        }
        return section;
      })
    );
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

  const saveTutorial = () => {
    const fullTutorial = {
      ...tutorial,
      sections,
    };
    console.log("Saving tutorial:", fullTutorial);
    alert("Tutorial saved successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {currentStep === "metadata" ? (
        <TutorialMetadata
          initialData={tutorial}
          onComplete={handleMetadataComplete}
        />
      ) : (
        <div>
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Creating: {tutorial.title}
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep("metadata")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
              >
                Back to Metadata
              </button>
              <button
                onClick={saveTutorial}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Tutorial
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Sections
                </h2>
                <button
                  onClick={addNewSection}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="border rounded-md overflow-hidden"
                    draggable
                    onDragStart={() => handleSectionDragStart(section)}
                    onDragOver={handleSectionDragOver}
                    onDrop={(e) => handleSectionDrop(e, section)}
                  >
                    <div
                      className={`p-3 flex justify-between items-center cursor-move ${
                        section.id === activeSectionId
                          ? "bg-blue-50 border-l-4 border-blue-600"
                          : "bg-gray-50"
                      }`}
                      onClick={() => {
                        setActiveSectionId(section.id);
                        setActiveSubsectionId(
                          section.subsections[0]?.id || null
                        );
                      }}
                    >
                      <div className="flex items-center">
                        <GripVertical className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSection(section.id);
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                        >
                          <Trash2 className="h-4 w-4" />
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
                      <div className="pl-4 pr-2 py-2 bg-white border-t">
                        <div className="space-y-2">
                          {section.subsections.map((subsection) => (
                            <div
                              key={subsection.id}
                              className={`px-3 py-2 rounded-md cursor-move flex justify-between items-center ${
                                subsection.id === activeSubsectionId
                                  ? "bg-blue-100"
                                  : "hover:bg-gray-100"
                              }`}
                              draggable
                              onDragStart={() =>
                                handleSubsectionDragStart(subsection)
                              }
                              onDragOver={handleSubsectionDragOver}
                              onDrop={(e) =>
                                handleSubsectionDrop(e, subsection, section.id)
                              }
                              onClick={() =>
                                setActiveSubsectionId(subsection.id)
                              }
                            >
                              <div className="flex items-center">
                                <GripVertical className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-sm">
                                  {subsection.title}
                                </span>
                              </div>
                              {section.subsections.length > 1 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteSubsection(section.id, subsection.id);
                                  }}
                                  className="text-red-600 hover:text-red-800 transition-colors p-1"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => addNewSubsection(section.id)}
                          className="mt-3 w-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded transition-colors flex items-center justify-center"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Subsection
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              {activeSectionId && activeSubsectionId && (
                <SectionEditor
                  section={sections.find((s) => s.id === activeSectionId)}
                  activeSubsection={sections
                    .find((s) => s.id === activeSectionId)
                    .subsections.find((sub) => sub.id === activeSubsectionId)}
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
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialCreator;
