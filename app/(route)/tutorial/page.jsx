"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "date-fns";
import { TutorialFetch } from "@/components/Tutorial/TutorialFetch";
import { PenBox, PlusCircle, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QuoteOfTheDay from "@/components/Miscellaneous/QuoteOfTheDay";
import FormBackgroundEffect from "@/components/Effect/FormBackgroundEffect";
import { Skeleton } from "@/components/ui/skeleton";
import CardSkeleton from "@/components/Miscellaneous/CardSkeleton";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const Page = () => {
  const { isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [tutorialData, setTutorialData] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Fetch tutorial data from an API or database
  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/fetch-tutorial"); // Replace with your API endpoint
      const data = await response.json();
      console.log("Fetched tutorials:", data);
      setTutorialData(data);
    } catch (error) {
      console.error("Error fetching tutorials:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchTutorials();
  };

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-700 dark:via-gray-800 dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-all duration-700">
      {/* Hero Section Heading */}
      <section className="py-20 p-5 bg-gradient-to-b from-blue-100 via-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="container p-4 md:p-0 mx-auto flex flex-col lg:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="lg:w-3/5 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-montserrat leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 mb-6 drop-shadow-md">
              Explore Curated Tutorials by Topic & Skill Level
            </h1>

            <p className="text-lg sm:text-xl lg:text-lg xl:text-xl leading-relaxed font-poppins font-medium text-justify text-gray-800 dark:text-gray-300 max-w-3xl lg:max-w-5xl">
              <span className="block">
                Dive into structured learning experiences designed to help you
                grow — whether you&apos;re starting out or leveling up your dev
                skills. Our tutorials are grouped by topic and split into
                actionable subsections, guiding you from fundamentals to
                advanced insights.
              </span>

              <span className="block mt-3">
                Begin your journey with{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-300 dark:to-teal-400">
                  Frontend & Backend Development
                </span>
                , refine your workflow with{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-400">
                  Git & DevOps Tools
                </span>
                , or master{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-300 dark:to-orange-400">
                  Full Stack Projects & System Design
                </span>
                .
              </span>

              <span className="block mt-3">
                Each tutorial is crafted with clarity and progression in mind —
                covering practical implementation, step-by-step walkthroughs,
                and expert techniques across{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-cyan-600 dark:from-green-300 dark:to-cyan-400">
                  databases, APIs, deployment
                </span>
                , and more.
              </span>
            </p>

            <QuoteOfTheDay type="tutorial" />

            <div className="mt-10 flex justify-center lg:justify-start gap-4">
              {/* Call to Action Buttons */}
              <Link href={"/tutorial/add-tutorial/"}>
                <button className="flex gap-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-out dark:from-teal-400 dark:to-blue-500">
                  <PlusCircle />
                  Create Tutorials
                </button>
              </Link>
              {/* Edit Tutorial Button with Dialog */}
              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogTrigger asChild>
                  <button
                    className="flex gap-1 px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-full shadow-lg hover:scale-105 hover:bg-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 transition-transform duration-300 ease-out"
                    onClick={() => {
                      refreshData();
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <PenBox />
                    Edit Tutorials
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      My Tutorials
                    </DialogTitle>
                    <DialogDescription>
                      Manage and edit your published tutorial. You have{" "}
                      {tutorialData.length} tutorial(s).
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 mt-6">
                    {tutorialData.length > 0 ? (
                      tutorialData.map((tutorial) => (
                        <div
                          key={tutorial.id}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {tutorial.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {tutorial.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>
                                Published: {formatDate(tutorial.date, "PPP")}
                              </span>
                              <span>
                                {tutorial.views.toLocaleString()} views
                              </span>
                              <span>{tutorial.likes} likes</span>
                            </div>
                          </div>
                          <Link href={`/tutorial/edit-tutorial/${tutorial.id}`}>
                            <Button size="sm" className="btn7">
                              <PenBox className="h-4 w-4" />
                              Edit
                            </Button>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No tutorials yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          You haven&apos;t created any tutorial yet. Start
                          writing your first tutorial!
                        </p>
                        <Link href="/tutorial/add-tutorial/">
                          <Button className="btn4">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create Your First Tutorial
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Illustration */}
          <div className="lg:w-2/5 flex justify-center items-center">
            <Image
              src="/tutorial-page.jpeg"
              alt="Blog Illustration"
              width={400}
              height={400}
              className="w-full h-auto max-w-sm drop-shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-400 drop-shadow-sm">
            Learn. Filter. Build.
          </h2>

          <p className="mt-4 text-lg sm:text-xl font-poppins font-medium text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Dive into structured tutorials in{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-300 dark:to-teal-400">
              Frontend & Backend Development
            </span>
            ,{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-400">
              AI & Machine Learning
            </span>
            ,{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-cyan-600 dark:from-green-300 dark:to-cyan-400">
              Cloud, DevOps & APIs
            </span>{" "}
            — then filter by topic, level, or tag to follow your personalized
            learning path.
          </p>

          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 italic">
            Search smart. Filter fast. Learn your way.
          </p>
        </div>
      </section>

      {/* Fetch and display tutorials */}
      <section>
        {loading ? (
          <div className="px-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((tutorial) => (
              <CardSkeleton key={tutorial} />
            ))}
          </div>
        ) : (
          <TutorialFetch tutorials={tutorialData} />
        )}
      </section>
    </main>
  );
};

export default Page;
