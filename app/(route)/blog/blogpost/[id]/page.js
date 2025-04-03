"use client";

import { useParams } from "next/navigation";
import { markdownToHtml } from "@/components/MarkdownProcessor";
import { useEffect, useState } from "react";
import OnThisPage from "@/components/onthispage";
import Comment from "@/components/Comments";

export default function Page() {
  const blogId = useParams().id;
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      setHtmlContent(await markdownToHtml(data.mdFormat));
    };

    loadBlog();
  }, []);

  const data = {
    id: "this-is-just-a-test-for-the-following--cb6c5e7a-bab2-459a-a94c-556bbd59184c",
    title: "This is just a test for the following",
    mdFormat:
      '# Lorem Ipsum\n\n#### _"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."_\n\n##### "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."\n\n* * *\n\n## What is Lorem Ipsum?\n\n**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n## Why do we use it?\n\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n## Where does it come from?\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n\n## Where can I get some?\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    htmlFormat:
      '<h1>Lorem Ipsum</h1><h4><em>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</em></h4><h5>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</h5><hr><h2>What is Lorem Ipsum?</h2><p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h2>Why do we use it?</h2><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p><h2>Where does it come from?</h2><p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p><p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p><h2>Where can I get some?</h2><p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>',
    author: "Sagnik Dey",
    categories: "Programming",
    subCategories: "React, Javascript",
    date: "2025-03-28T20:52:27.290Z",
    description: "Lorem ipsum dolor sit amet",
  };

  console.log(markdownToHtml(data.htmlFormat));

  return (
    <div className="max-w-[95%] mx-auto p-4">
      {/* Main container for flex layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - takes up the left part of the screen on large screens */}
        <div className="lg:w-1/5 hidden lg:block">
          <OnThisPage htmlContent={htmlContent} />
        </div>

        {/* Main content + comment side-by-side */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:w-4/5 w-full">
          {/* Blog Main Content */}
          <div className="lg:w-3/4 w-full">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">
              &quot;{data.description}&quot;
            </p>
            <div className="flex gap-2 mb-10">
              <p className="text-sm text-gray-500 mb-4 italic">
                By {data.author}
              </p>
              <p className="text-sm text-gray-500 mb-4">{data.date}</p>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="prose prose-lg dark:prose-invert max-w-none mb-10"
            ></div>
          </div>

          {/* Comment Component - sticky on large screens */}
          <div className="lg:w-1/4 w-full">
            <div className="lg:sticky top-24">
              <Comment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
