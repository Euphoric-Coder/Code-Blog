import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/dbConfig";
import { Blogs } from "@/lib/schema";

// Add user to DB
export async function GET() {
  try {
    const user = await currentUser();

    const email = user.emailAddresses[0]?.emailAddress;

    const blogData = [
      {
        id: "sample-blog-post-on-software-engineering--e83c24fc-fc1d-4ee1-b131-70e06aadfc1b",
        title: "Sample Blog Post on Software Engineering",
        blogImage: "https://dummyimage.com/600x400/000/fff&text=Blog+Image",
        blogImageId: "4e34a909-381",
        content:
          "<p>This is sample content in HTML format for the blog post.</p>",
        description:
          "This blog provides insights into software engineering with practical examples.",
        category: "Software Engineering",
        subCategories: ["Testing & QA", "Design Patterns"],
        tags: ["React", "Cloud", "JavaScript"],
        readTime: "6 min read",
        views: 650,
        likes: 354,
        author: "Sagnik Dey",
        date: "2025-10-03",
        createdBy: "2023ebcs536@online.bits-pilani.ac.in",
      },
      {
        id: "sample-blog-post-on-programming-scripting--61f28264-2446-4949-940e-96b30f439cce",
        title: "Sample Blog Post on Programming & Scripting",
        blogImage: "https://dummyimage.com/600x400/000/fff&text=Blog+Image",
        blogImageId: "83ba641b-00e",
        content:
          "<p>This is sample content in HTML format for the blog post.</p>",
        description:
          "This blog provides insights into programming & scripting with practical examples.",
        category: "Programming & Scripting",
        subCategories: ["Scripts & Snippets", "IDE Tips"],
        tags: ["ML", "UX", "Docker"],
        readTime: "4 min read",
        views: 734,
        likes: 493,
        author: "Sagnik Dey",
        date: "2025-08-03",
        createdBy: "2023ebcs536@online.bits-pilani.ac.in",
      },
      {
        id: "sample-blog-post-on-tech-business-startups--c5030178-6b19-4e38-a0ee-891a5bfe96d9",
        title: "Sample Blog Post on Tech Business & Startups",
        blogImage: "https://dummyimage.com/600x400/000/fff&text=Blog+Image",
        blogImageId: "ff57ed5c-150",
        content:
          "<p>This is sample content in HTML format for the blog post.</p>",
        description:
          "This blog provides insights into tech business & startups with practical examples.",
        category: "Tech Business & Startups",
        subCategories: ["VC & Funding Insights", "Product-Market Fit"],
        tags: ["Startups", "Security", "React"],
        readTime: "4 min read",
        views: 830,
        likes: 101,
        author: "Sagnik Dey",
        date: "2025-01-03",
        createdBy: "2023ebcs536@online.bits-pilani.ac.in",
      },
      {
        id: "sample-blog-post-on-open-source-community--a9b0c7f7-f1e8-4f2e-823e-3b5031e9a406",
        title: "Sample Blog Post on Open Source & Community",
        blogImage: "https://dummyimage.com/600x400/000/fff&text=Blog+Image",
        blogImageId: "20f6bb8c-a32",
        content:
          "<p>This is sample content in HTML format for the blog post.</p>",
        description:
          "This blog provides insights into open source & community with practical examples.",
        category: "Open Source & Community",
        subCategories: ["Contribution Guides", "Community Building"],
        tags: ["UX", "Security", "AI"],
        readTime: "7 min read",
        views: 757,
        likes: 341,
        author: "Sagnik Dey",
        date: "2025-02-03",
        createdBy: "2023ebcs536@online.bits-pilani.ac.in",
      },
      {
        id: "sample-blog-post-on-hardware-iot--fde71539-04eb-46b3-8d5c-fd70c394c471",
        title: "Sample Blog Post on Hardware & IoT",
        blogImage: "https://dummyimage.com/600x400/000/fff&text=Blog+Image",
        blogImageId: "905c39ff-793",
        content:
          "<p>This is sample content in HTML format for the blog post.</p>",
        description:
          "This blog provides insights into hardware & iot with practical examples.",
        category: "Hardware & IoT",
        subCategories: ["Smart Devices", "Arduino Experiments"],
        tags: ["AI", "Security", "React"],
        readTime: "3 min read",
        views: 165,
        likes: 271,
        author: "Sagnik Dey",
        date: "2025-07-03",
        createdBy: "2023ebcs536@online.bits-pilani.ac.in",
      },
    ];
      
      

    const result = await db
      .insert(Blogs)
      .values(blogData)
      .returning({ insertedId: Blogs.id });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding user to DB:", error);
    return NextResponse.json(
      { error: "Failed to add user to DB", userAdded: false, error: error },
      { status: 500 }
    );
  }
}
