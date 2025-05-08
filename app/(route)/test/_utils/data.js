export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const textOnly = content.replace(/<[^>]*>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const sampleComments = {
  "post-1": [
    {
      id: "c1",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      content:
        "This is a fantastic overview of where web development is heading! The section about AI-driven development particularly resonated with me.",
      createdAt: "2025-04-16T08:30:00Z",
      likes: 12,
      replies: [
        {
          id: "c1-r1",
          author: {
            name: "David Kim",
            avatar:
              "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          content:
            "Agreed! I've been using AI coding assistants and they've dramatically improved my workflow.",
          createdAt: "2025-04-16T09:15:00Z",
          likes: 8,
        },
      ],
    },
    {
      id: "c2",
      author: {
        name: "Mike Thompson",
        avatar:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      content:
        "The WebAssembly section was eye-opening. I'm curious about how this will affect the development of browser-based IDEs.",
      createdAt: "2025-04-16T10:45:00Z",
      likes: 15,
    },
  ],
  "post-2": [
    {
      id: "c3",
      author: {
        name: "Emma Wilson",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      content:
        "The insights about microinteractions really changed how I think about UX design. Great article!",
      createdAt: "2025-03-29T11:20:00Z",
      likes: 23,
      replies: [
        {
          id: "c3-r1",
          author: {
            name: "Alex Johnson",
            avatar:
              "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          content:
            "Thanks Emma! Microinteractions are indeed crucial for creating engaging user experiences.",
          createdAt: "2025-03-29T12:05:00Z",
          likes: 11,
        },
      ],
    },
  ],
  "post-3": [
    {
      id: "c4",
      author: {
        name: "Lucas Martinez",
        avatar:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      content:
        "It's great to see more attention being paid to the environmental impact of web development. The tips about efficient design principles are very practical.",
      createdAt: "2025-02-11T14:30:00Z",
      likes: 19,
    },
    {
      id: "c5",
      author: {
        name: "Rachel Green",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      content:
        "I've implemented some of these optimization techniques and saw significant improvements in both performance and energy consumption.",
      createdAt: "2025-02-11T16:45:00Z",
      likes: 14,
      replies: [
        {
          id: "c5-r1",
          author: {
            name: "Marcus Green",
            avatar:
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          content:
            "That's fantastic to hear, Rachel! Would you mind sharing some specific metrics?",
          createdAt: "2025-02-11T17:20:00Z",
          likes: 7,
        },
      ],
    },
  ],
};

export const blogPosts = [
  {
    id: "1",
    title: "The Future of Web Development in 2025",
    blogImage:
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Alex Johnson",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Technology",
    type: "blog",
    tags: ["Web Development", "AI", "WebAssembly", "Future Tech"],
    description:
      "Exploring the latest trends and technologies shaping the future of web development in 2025 and beyond.",
    content: `
      <p>The landscape of web development continues to evolve at a remarkable pace. As we move through 2025, several key trends are emerging that will define the industry for years to come.</p>
      
      <h2>AI-Driven Development</h2>
      <p>Artificial intelligence is no longer just a buzzword in web development. Today's developers are leveraging AI tools to automate repetitive tasks, generate boilerplate code, and even debug applications with unprecedented efficiency.</p>
      
      <p>Here's an example of how AI can help generate React components:</p>

      <pre><code class="language-javascript">// AI-generated React component with TypeScript
import React, { useState, useEffect } from 'react';

interface DataItem {
  id: string;
  title: string;
  completed: boolean;
}

const AIAssistedComponent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const items = await response.json();
        setData(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">AI Generated List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data.map((item) => (
            <li 
              key={item.id}
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {
                  setData(data.map(d =>
                    d.id === item.id
                      ? { ...d, completed: !d.completed }
                      : d
                  ));
                }}
              />
              <span className={item.completed ? 'line-through' : ''}>
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};</code></pre>
      
      <p>The most significant advancement has been in the realm of natural language programming, where developers can describe functionality in plain English and have AI generate the corresponding code. This has dramatically reduced development time for common features and allowed teams to focus on more complex challenges.</p>
      
      <h2>WebAssembly Dominance</h2>
      <p>WebAssembly (Wasm) has finally achieved its promise of bringing near-native performance to web applications. Complex applications that once required desktop installation can now run seamlessly in the browser, opening new possibilities for web-based software.</p>
      
      <p>Here's a simple example of using WebAssembly with JavaScript:</p>

      <pre><code class="language-javascript">// Loading and using a Wasm module
const wasmInstance = await WebAssembly.instantiateStreaming(
  fetch('example.wasm'),
  {
    env: {
      memory: new WebAssembly.Memory({ initial: 256 }),
      log: (value) => console.log(value)
    }
  }
);

// Using a Wasm function
const result = wasmInstance.instance.exports.computeExpensive(42);
console.log('Result from Wasm:', result);</code></pre>
      
      <p>Game development, video editing, and even 3D modeling applications have made the leap to the web, offering users the convenience of browser-based tools without sacrificing performance.</p>
      
      <h2>The Metaverse Web</h2>
      <p>The concept of the metaverse continues to shape how we think about web experiences. Immersive, interconnected virtual environments are becoming more common, blurring the line between websites and virtual worlds.</p>
      
      <p>For developers, this means learning new paradigms for user interaction and spatial design. The most successful web applications now consider how their interfaces exist in three-dimensional space, even when viewed on traditional screens.</p>
      
      <h2>Looking Ahead</h2>
      <p>As we look to the future, it's clear that web development will continue to embrace these trends while pushing into new frontiers. The most successful developers will be those who can adapt to these changes while maintaining a focus on performance, accessibility, and user experience.</p>
    `,
    createdAt: "2025-04-15T10:30:00Z",
    readingTime: 4,
    comments: sampleComments["post-1"],
  },
  {
    id: "2",
    title: "Designing for Emotion: Creating Websites That Feel Alive",
    blogImage:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Sophia Chen",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Design",
    type: "blog",
    tags: ["Design", "UX", "Emotion", "User Experience"],
    description:
      "How thoughtful design choices can create emotional connections with your users and elevate your website beyond mere functionality.",
    content: `
      <p>In the digital world, where users encounter countless websites daily, creating a memorable experience is increasingly challenging. The most successful websites don't just function well—they evoke emotion and create meaningful connections with users.</p>
      
      <h2>The Psychology of Digital Emotion</h2>
      <p>Understanding how design elements trigger emotional responses is the first step in creating websites that feel alive. Color psychology, typography, animation, and imagery all play crucial roles in shaping how users feel when interacting with your site.</p>
      
      <p>Research shows that websites that evoke positive emotions have higher engagement rates, longer visit durations, and better conversion rates. This emotional connection creates loyalty that functionality alone cannot achieve.</p>
      
      <h2>Microinteractions: The Small Details That Matter</h2>
      <p>Microinteractions are subtle design elements that respond to user actions. A button that changes color when hovered, a subtle animation when completing a form, or a playful loading indicator—these small details add personality to your website and create moments of delight.</p>
      
      <p>When thoughtfully implemented, microinteractions guide users through their journey while adding layers of emotional engagement to the experience.</p>
      
      <h2>Storytelling Through Design</h2>
      <p>Every website tells a story, whether intentionally or not. By consciously crafting that narrative through design choices, you can create a cohesive emotional journey for your users.</p>
      
      <p>This storytelling approach extends beyond copy to include visual flow, pacing of information, and even the transition between pages. Each element should contribute to the emotional arc you want users to experience.</p>
      
      <h2>Balancing Emotion and Usability</h2>
      <p>While emotional design is powerful, it must never come at the expense of usability. The most effective websites balance emotional impact with clear navigation, accessible interfaces, and intuitive interactions.</p>
      
      <p>Remember that negative emotions—frustration, confusion, impatience—are just as powerful as positive ones. A beautiful website that's difficult to use will ultimately create negative emotional associations with your brand.</p>
    `,
    createdAt: "2025-03-28T14:15:00Z",
    readingTime: 5,
    comments: sampleComments["post-2"],
  },
  {
    id: "3",
    title: "Sustainable Web Design: Reducing Your Digital Carbon Footprint",
    blogImage:
      "https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Marcus Green",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Sustainability",
    type: "blog",
    tags: ["Sustainability", "Green Web", "Performance", "Optimization"],
    description:
      "How web designers and developers can create beautiful, functional websites while minimizing environmental impact.",
    content: `
      <p>The digital world has a physical footprint. Every website, app, and digital service requires energy to operate—from the servers that host them to the devices that access them. As the web continues to grow, so does its environmental impact.</p>
      
      <h2>Understanding the Problem</h2>
      <p>The internet consumes approximately 416.2 TWh of electricity annually—more than the entire United Kingdom. A significant portion of this energy goes to powering websites that are inefficiently designed, with unnecessarily large assets, complex animations, and energy-intensive processes.</p>
      
      <p>As web professionals, we have a responsibility to consider the environmental impact of our design and development decisions.</p>
      
      <h2>Efficient Design Principles</h2>
      <p>Sustainable web design starts with efficiency. By optimizing images, minifying code, and implementing thoughtful caching strategies, we can dramatically reduce the energy required to load and interact with our websites.</p>
      
      <p>These optimizations don't just benefit the environment—they also improve user experience by creating faster, more responsive websites that consume less data and battery life.</p>
      
      <h2>Green Hosting and Infrastructure</h2>
      <p>Choosing environmentally responsible hosting providers can significantly reduce your website's carbon footprint. Look for hosts that use renewable energy, have efficient data centers, and are transparent about their environmental initiatives.</p>
      
      <p>Beyond hosting, consider the entire technology stack. Some technologies are inherently more energy-efficient than others, and making informed choices about your infrastructure can have a substantial environmental impact.</p>
      
      <h2>Measuring and Improving</h2>
      <p>You can't improve what you don't measure. Tools like Website Carbon Calculator and Ecograder allow you to assess your website's environmental impact and identify areas for improvement.</p>
      
      <p>By establishing environmental metrics alongside traditional performance metrics, we can create a more holistic approach to web development that considers both user experience and sustainability.</p>
    `,
    createdAt: "2025-02-10T09:45:00Z",
    readingTime: 4,
    comments: sampleComments["post-3"],
  },
];

// Export posts with calculated reading time if not provided
export const getBlogPosts = () => {
  return blogPosts.map((post) => ({
    ...post,
    readingTime: post.readingTime || calculateReadingTime(post.content),
  }));
};
