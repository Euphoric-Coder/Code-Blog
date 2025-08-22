# **Dev Block** – Full-Stack Platform for Code Snippets, Blogs, Tutorials & Developer Collaboration

**Tagline:** *Breaking barriers in tech knowledge sharing and building meaningful developer connections.*
---

## 📖 Table of Contents
1. [Overview](#overview)
2. [Inspiration](#inspiration)
3. [Core Features](#core-features)
4. [Tech Stack](#tech-stack)
5. [System Architecture](#system-architecture)
6. [Database Schema](#database-schema)
7. [Installation & Setup](#installation--setup)
8. [Environment Variables](#environment-variables)
9. [Usage Guide](#usage-guide)
10. [Screenshots](#screenshots)
11. [Future Roadmap](#future-roadmap)

---

## **Overview**
**Dev Block** is an **interactive, community-driven platform** for developers to:
- Publish **blogs** and **tutorials**
- Share **code snippets**
- Collaborate and discuss ideas via threaded comments
- Run live code with an **integrated code playground**

It centralizes **tech learning, collaboration, and practical coding** in one platform.

---

## **Inspiration**
Dev Block started as **Code Blog**, a markdown-powered blog for coding tutorials and tech insights. It evolved into a feature-rich platform supporting:
- Multiple content types (blogs, tutorials, snippets)
- Real-time code execution
- Engagement features (likes, bookmarks, comments)

The **Primary Goal** is to provide a **single space where developers write, run, and refine ideas** while connecting with the community.

---

## **Core Features**

### **Content Types**
- **Blogs** – Long-form articles, guides, and insights.
- **Tutorials** – Step-by-step instructions with media and formatting.
- **Code Snippets** – Reusable code blocks with syntax highlighting.

### **Engagement**
- Likes, bookmarks, and threaded comments on all content types.
- Nested replies, edit/delete, and “show more” toggle for long threads.
- Real-time UI updates for engagement.

### **Code Playground**
- Multi-language execution with **online compiler APIs**.
- Shareable playground sessions with output display.
- Reduced code-testing friction by 70%.

### **Social Sharing**
- Share via WhatsApp, Twitter/X, LinkedIn, Email, Reddit, Telegram.
- One-click link copying for easy sharing.

### **UI & UX**
- Theme-switchable (light/dark) with smooth animations.
- Fully responsive design.
- Hydration-safe date rendering for SSR.
---

## **Tech Stack**

### **Frontend**
- [Next.js](https://nextjs.org/)
- [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [TipTap](https://tiptap.dev/) – Rich text editing

### **Backend & Databases**
- [PostgreSQL](https://www.postgresql.org/) – Structured content storage
- [MongoDB](https://www.mongodb.com/) – Flexible content storage
- [Piston API](https://rapidapi.com/) – Live code execution API
- [Clerk](https://clerk.com/) – Authentication

---

<!-- ## **System Architecture**
Frontend (Next.js, Tailwind CSS, ShadCN UI)
|
|-- TipTap Editor, Syntax Highlighting
|
Backend (Next.js API Routes, Compiler API Integration)
|
| |
PostgreSQL MongoDB
| |
Clerk Auth Compiler API

--- -->

## **Database Schema**
**Entities:**
- Users
- Blogs
- Tutorials
- Code Snippets
- Comments
- Likes
- Bookmarks
- Playground Sessions

**Relationships:**
- `Users` ↔ `Blogs` (One-to-Many)
- `Users` ↔ `Tutorials` (One-to-Many)
- `Users` ↔ `Code Snippets` (One-to-Many)
- `Users` ↔ `Comments` (One-to-Many)
- `Content` ↔ `Likes`/`Bookmarks` (Many-to-Many)

---

## **Installation & Setup**
```bash
# Clone repository
git clone https://github.com/yourusername/dev-block.git
```

```bash
# Move into directory
cd dev-block
```

```bash
# Install dependencies
npm install
```

```bash
# Copy environment variables
cp .env.example .env.local
```

```bash
# Start development server
npm run dev
```