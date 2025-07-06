"use client";

import TutorialViewer from "@/components/Tutorial/TutorialViewer";
import { db } from "@/lib/dbConfig";
import { Tutorials } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [tutorialData, setTutorialData] = useState(null);

  console.log(id);

  useEffect(() => {
    const fetchTutorial = async () => {
      const result = await db
        .select()
        .from(Tutorials)
        .where(eq(Tutorials.id, id));

      console.log(result[0]);
      setTutorialData(result[0]);
    };

    fetchTutorial();
  }, [id]);

  return (
    <div className="mt-20">
      {tutorialData ? (
        <div>
          <TutorialViewer tutorial={tutorialData} />
        </div>
      ) : (
        <div>Empty Data</div>
      )}
    </div>
  );
};

export default Page;
