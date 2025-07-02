import React from "react";
import TutorialViewer from "../_components/TutorialViewer";

const TutorialViewPage = () => {
  const mockTutorial = {
    id: "e7db08b7-7339-4d10-a472-fd782d98fb6f",
    title: "Beginner’s Guide to APIs (Application Programming Interfaces)",
    coverImage: null,
    description:
      "APIs power nearly every digital experience — from social media apps and e-commerce platforms to weather dashboards and payment gateways. This guide offers an in-depth introduction to APIs, how they work, their types, practical use cases, data formats, and authentication strategies.",
    category: "Programming",
    subCategories: [
      "javascript",
      "python",
      "java",
      "c-cpp",
      "ruby",
      "php",
      "go",
      "RESTAPIs",
      "API",
    ],
    tags: ["api", "restfull api", "new age tech"],
    content: [
      {
        id: "c1aa6ac4-b8d1-4183-b8b0-7c429370660f",
        title: "What is an API",
        subsections: [
          {
            id: "0737d004-93b9-4505-999e-281995f9e8d7",
            title: "API in Simple Terms",
            content:
              "<p>An&nbsp;<strong>API</strong>&nbsp;is a&nbsp;<strong>set of rules</strong>&nbsp;that allows one software program to interact with another. It defines&nbsp;<strong>how requests should be made</strong>,&nbsp;<strong>what data is required</strong>, and&nbsp;<strong>what format responses should be in</strong>.</p><ul><li><p>You don’t need to know how a server is built, just like you don’t need to know how a car engine works to drive. Similarly, an API hides the internal details and gives you just the controls you need.</p></li></ul><blockquote><p><strong>Analogy:</strong>&nbsp;Think of an API like a&nbsp;<strong>restaurant menu</strong>. The menu lists items you can order, along with a description. When you specify what you want, the kitchen (backend system) prepares it and returns it. The waiter (API) is the intermediary.</p></blockquote>",
            usedMarkdown: false,
          },
          {
            id: "fbdcfed8-718f-4f75-b6ca-2907aaf8b460",
            title: "What APIs Are NOT",
            content:
              "<ul><li><p>APIs are&nbsp;<strong>not the database</strong>, but they&nbsp;<strong>communicate with it</strong>.</p></li><li><p>APIs are&nbsp;<strong>not the frontend</strong>, but they&nbsp;<strong>feed it data</strong>.</p></li><li><p>APIs are&nbsp;<strong>not magic</strong>, but they&nbsp;<strong>abstract complexity</strong>.</p></li></ul>",
            usedMarkdown: false,
          },
        ],
      },
      {
        id: "77b9b9fa-e954-4026-bdea-b57288172aa9",
        title: "Why Are APIs So Important?",
        subsections: [
          {
            id: "9e827208-d5cf-4460-af3d-0cc33eba8d71",
            title: "The Request-Response Cycle",
            content:
              '<ol><li><p><strong>Client</strong>&nbsp;makes a request (e.g., your app asks for weather in Mumbai).</p></li><li><p><strong>Server/API</strong>&nbsp;processes the request.</p></li><li><p><strong>Response</strong>&nbsp;is sent back (e.g., temperature is 32°C, status is “Sunny”).</p></li></ol><p><strong>Data Format:</strong>&nbsp;Most APIs respond with data in JSON format.<br>Example:</p><pre><code class="language-json">{ "city": "Mumbai", "temperature": "32°C", "condition": "Sunny" }</code></pre><p></p>',
            usedMarkdown: false,
          },
          {
            id: "fd88403d-4c05-4c07-94ed-a9ef1079b21b",
            title: "Real-Life Examples of APIs",
            content:
              "<ul><li><p>Instagram API: Used to fetch user posts or stories.</p></li><li><p>Spotify API: Fetches user playlists or song data.</p></li><li><p>GitHub API: Retrieves repositories, issues, and commits.</p></li></ul>",
            usedMarkdown: false,
          },
        ],
      },
      {
        id: "16326a51-9c5b-4edc-bb16-b54f9d9239d0",
        title: "API Authentication",
        subsections: [
          {
            id: "fc392b1d-b7fd-4dda-84aa-8d68c991f5d8",
            title: "API Keys",
            content:
              "<ul><li><p>A unique identifier used to authenticate a user or app.</p></li><li><p>Common for public APIs like news APIs or movie databases.</p></li></ul><blockquote><p>Example:&nbsp;<code>apiKey=123456abcdef</code></p></blockquote>",
            usedMarkdown: false,
          },
          {
            id: "36ad8d50-6727-4aaa-aafe-3f44609923dd",
            title: "OAuth",
            content:
              "<ul><li><p>Used for&nbsp;<strong>secure user-based access</strong>.</p></li><li><p>Common in services like Google, GitHub, Facebook.</p></li><li><p>Requires permission from the user and returns a token for access.</p></li></ul>",
            usedMarkdown: false,
          },
        ],
      },
      {
        id: "6ced8c98-a9a7-4fe6-8d84-70983521e11a",
        title: "Types of APIs",
        subsections: [
          {
            id: "60db956c-a788-4155-b678-fbce22a6c630",
            title: "Open vs Private APIs",
            content:
              "<ul><li><p><strong>Open APIs</strong>: Publicly accessible, often with limited usage.</p></li><li><p><strong>Private APIs</strong>: Used within a company or organization.</p></li><li><p><strong>Partner APIs</strong>: Shared with specific business partners.</p></li></ul>",
            usedMarkdown: false,
          },
          {
            id: "0634eabe-256d-4182-b41a-935c6da368d8",
            title: "REST, SOAP, and GraphQL",
            content:
              "<ul><li><p><strong>REST (most common)</strong>: Uses HTTP methods like GET, POST.</p></li><li><p><strong>SOAP</strong>: Protocol-heavy, used in legacy systems.</p></li><li><p><strong>GraphQL</strong>: Flexible querying, lets clients ask for only the data they need.</p></li></ul>",
            usedMarkdown: false,
          },
        ],
      },
      {
        id: "f72d79ad-87d0-4f90-ad06-fd98e31290c0",
        title: "Common Use Cases of APIs",
        subsections: [
          {
            id: "00a24df0-fc99-424f-98d2-ce03a38bf795",
            title: "Social Media Integration",
            content:
              "<p>Apps fetch user profile photos, names, and posts from platforms like Instagram or LinkedIn using APIs.</p>",
            usedMarkdown: false,
          },
          {
            id: "c76d4606-73d8-442a-a626-e2ce6fb5f3cd",
            title: "Payments and E-commerce",
            content:
              "<p>Payment gateways like Razorpay or Stripe offer APIs to handle transactions, refunds, and billing.</p>",
            usedMarkdown: false,
          },
          {
            id: "4719756e-c9c5-4a10-8381-22c98b62fd85",
            title: "Real-time Data",
            content:
              "<ul><li><p>Stock market apps (e.g., NSE/BSE APIs)</p></li><li><p>Weather forecasting</p></li><li><p>Live sports scores</p></li></ul><p></p>",
            usedMarkdown: false,
          },
        ],
      },
    ],
    author: "Sagnik Dey",
    date: "2025-07-03",
    featured: false,
    createdBy: "2023ebcs536@online.bits-pilani.ac.in",
    imageId: null,
  };

  return (
    <div className="p-4">
      <TutorialViewer tutorial={mockTutorial} />
    </div>
  );
};

export default TutorialViewPage;
