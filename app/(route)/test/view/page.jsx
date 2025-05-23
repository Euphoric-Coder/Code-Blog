import React from "react";
import TutorialViewer from "../_components/TutorialViewer";

const TutorialViewPage = () => {
  const mockTutorial = {
    id: "1",
    title: "Introduction to JavaScript",
    description:
      "Learn the basics of JavaScript programming language, from variables and functions to advanced concepts like closures and promises.",
    coverImage:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Programming",
    subcategory: "JavaScript",
    tags: ["beginner", "web development", "coding"],
    sections: [
      {
        id: "1",
        title: "Getting Started",
        subsections: [
          {
            id: "1-1",
            title: "Introduction",
            content: `
              <h2>Welcome to JavaScript Fundamentals</h2>
              <p>This tutorial will guide you through the basics of JavaScript, one of the most popular programming languages in the world.</p>
              <p>JavaScript is primarily known as the scripting language for Web pages, but it's also used in many non-browser environments.</p>
              <img src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="JavaScript Code" class="w-full rounded-md my-4">
              <p>By the end of this tutorial, you'll have a solid understanding of JavaScript fundamentals and be able to write your own scripts.</p>
            `,
          },
          {
            id: "1-2",
            title: "Setting Up Your Environment",
            content: `
              <h2>Setting Up Your Development Environment</h2>
              <p>To get started with JavaScript, you don't need much:</p>
              <ul class="list-disc pl-6 my-4">
                <li>A text editor (VS Code, Sublime Text, or even Notepad)</li>
                <li>A modern web browser (Chrome, Firefox, Edge, etc.)</li>
              </ul>
              <h3 class="text-xl font-semibold mt-6 mb-3">Using the Browser Console</h3>
              <p>The easiest way to start experimenting with JavaScript is through your browser's developer console:</p>
              <ol class="list-decimal pl-6 my-4">
                <li>Open your web browser</li>
                <li>Right-click anywhere on a webpage and select "Inspect" or "Inspect Element"</li>
                <li>Navigate to the "Console" tab</li>
                <li>Type JavaScript code directly and press Enter to execute it</li>
              </ol>
              <p>Try typing <code>console.log("Hello, World!");</code> and pressing Enter.</p>
            `,
          },
        ],
      },
      {
        id: "2",
        title: "JavaScript Basics",
        subsections: [
          {
            id: "2-1",
            title: "Variables and Data Types",
            content: `
              <h2>Variables and Data Types in JavaScript</h2>
              <p>Variables are containers for storing data values. In JavaScript, there are several ways to declare variables:</p>
              <pre><code class="language-javascript">
var name = "John";
let age = 25;
const PI = 3.14159;
              </code></pre>
              <h3 class="text-xl font-semibold mt-6 mb-3">Common Data Types</h3>
              <p>JavaScript has several built-in data types:</p>
              <ul class="list-disc pl-6 my-4">
                <li><strong>String</strong>: <code>"Hello"</code></li>
                <li><strong>Number</strong>: <code>42</code></li>
                <li><strong>Boolean</strong>: <code>true</code></li>
                <li><strong>Null</strong>: <code>null</code></li>
                <li><strong>Undefined</strong>: <code>undefined</code></li>
                <li><strong>Object</strong>: <code>{ name: "John", age: 25 }</code></li>
                <li><strong>Array</strong>: <code>[1, 2, 3, 4]</code></li>
              </ul>
              <h3 class="text-xl font-semibold mt-6 mb-3">Type Checking</h3>
              <p>You can check the type of a variable using the <code>typeof</code> operator:</p>
              <pre><code class="language-javascript">
let name = "John";
console.log(typeof name);
              </code></pre>
            `,
          },
          {
            id: "2-2",
            title: "Operators",
            content: `
              <h2>JavaScript Operators</h2>
              <h3 class="text-xl font-semibold mt-6 mb-3">Arithmetic Operators</h3>
              <pre><code class="language-javascript">
let a = 10;
let b = 5;
let sum = a + b;
let difference = a - b;
              </code></pre>
              <h3 class="text-xl font-semibold mt-6 mb-3">Comparison Operators</h3>
              <pre><code class="language-javascript">
let x = 5;
let y = "5";
console.log(x == y);
              </code></pre>
              <h3 class="text-xl font-semibold mt-6 mb-3">Logical Operators</h3>
              <pre><code class="language-javascript">
let isAdult = true;
let hasLicense = false;
console.log(isAdult && hasLicense);
              </code></pre>
            `,
          },
        ],
      },
      {
        id: "3",
        title: "Control Structures",
        subsections: [
          {
            id: "3-1",
            title: "Conditional Statements",
            content: `
              <h2>Conditional Statements</h2>
              <pre><code class="language-javascript">
let age = 18;
if (age >= 18) {
  console.log("You are an adult.");
}
              </code></pre>
              <h3 class="text-xl font-semibold mt-6 mb-3">Switch Statement</h3>
              <pre><code class="language-javascript">
let day = 3;
switch (day) {
  case 1:
    console.log("Monday");
    break;
}
              </code></pre>
            `,
          },
          {
            id: "3-2",
            title: "Loops",
            content: `
              <h2>Loops</h2>
              <pre><code class="language-javascript">
for (let i = 0; i < 5; i++) {
  console.log(i);
}
              </code></pre>
              <h3 class="text-xl font-semibold mt-6 mb-3">While Loop</h3>
              <pre><code class="language-javascript">
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
              </code></pre>
            `,
          },
        ],
      },
    ],
  };

  return (
    <div className="p-4">
      <TutorialViewer tutorial={mockTutorial} />
    </div>
  );
};

export default TutorialViewPage;
