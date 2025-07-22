"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/dbConfig";
import { Tutorials } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import TutorialCreator from "@/components/Tutorial/TutorialCreator";

const Page = () => {
  const params = useParams();
  const id = params?.id;

  const [tutorialData, setTutorialData] = useState(null);

  useEffect(() => {
    FetchTutorial();
  }, [id]);

  const FetchTutorial = async () => {
    const result = await db
      .select()
      .from(Tutorials)
      .where(eq(Tutorials.id, id));

    const tutorial = result[0];
    console.log(tutorial);
    // Convert it to the shape TutorialCreator expects
    const editData = {
      tutorial: {
        title: tutorial.title,
        description: tutorial.description,
        coverImage: tutorial.coverImage,
        imageId: tutorial.imageId,
        category: tutorial.category,
        subcategory: tutorial.subCategories,
        tags: tutorial.tags,
      },
      sections: tutorial.content,
      activeSectionId: tutorial.content?.[0]?.id,
      activeSubsectionId: tutorial.content?.[0]?.subsections?.[0]?.id,
    };

    console.log(editData);
    setTutorialData(editData);
  };

  return (
    <div>
      {tutorialData && (
        <div>
          {tutorialData && (
            <TutorialCreator editData={tutorialData} editing={true} />
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
