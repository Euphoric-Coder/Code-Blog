// Utility to calculate reading time based on word count
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const textOnly = content.replace(/<[^>]*>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Sample blog post data
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
    description:
      "Exploring the latest trends and technologies shaping the future of web development in 2025 and beyond.",
    content: `
      <p>The landscape of web development continues to evolve at a remarkable pace. As we move through 2025, several key trends are emerging that will define the industry for years to come.</p>
      
      <h2>AI-Driven Development</h2>
      <p>Artificial intelligence is no longer just a buzzword in web development. Today's developers are leveraging AI tools to automate repetitive tasks, generate boilerplate code, and even debug applications with unprecedented efficiency.</p>
      
      <p>The most significant advancement has been in the realm of natural language programming, where developers can describe functionality in plain English and have AI generate the corresponding code. This has dramatically reduced development time for common features and allowed teams to focus on more complex challenges.</p>
      
      <h2>WebAssembly Dominance</h2>
      <p>WebAssembly (Wasm) has finally achieved its promise of bringing near-native performance to web applications. Complex applications that once required desktop installation can now run seamlessly in the browser, opening new possibilities for web-based software.</p>
      
      <p>Game development, video editing, and even 3D modeling applications have made the leap to the web, offering users the convenience of browser-based tools without sacrificing performance.</p>
      
      <h2>The Metaverse Web</h2>
      <p>The concept of the metaverse continues to shape how we think about web experiences. Immersive, interconnected virtual environments are becoming more common, blurring the line between websites and virtual worlds.</p>
      
      <p>For developers, this means learning new paradigms for user interaction and spatial design. The most successful web applications now consider how their interfaces exist in three-dimensional space, even when viewed on traditional screens.</p>
      
      <h2>Looking Ahead</h2>
      <p>As we look to the future, it's clear that web development will continue to embrace these trends while pushing into new frontiers. The most successful developers will be those who can adapt to these changes while maintaining a focus on performance, accessibility, and user experience.</p>
    `,
    createdAt: "2025-04-15T10:30:00Z",
    readingTime: 4,
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
  },
];

// Function to return blog posts with calculated reading time
export const getBlogPosts = () => {
  return blogPosts.map((post) => ({
    ...post,
    readingTime: post.readingTime || calculateReadingTime(post.content),
  }));
};
