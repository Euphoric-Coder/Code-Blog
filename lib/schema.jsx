import { pgTable, varchar, uuid, boolean, jsonb, integer, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("fullName").notNull(),
  email: varchar("email").notNull().unique(),
  profileImage: varchar("profileImage"),
  username: varchar("username"),
  gender: varchar("gender"),
  age: varchar("age"),
  bio: varchar("bio"),
  location: varchar("location"),
  linkedInUrl: varchar("linkedInUrl"),
  websites: jsonb("websites"),
  aboutMe: jsonb("aboutMe"),
  preferences: jsonb("preferences"),
  hasOnboarded: boolean("hasOnboarded").notNull().default(false),
});

export const Blogs = pgTable("blogs", {
  id: varchar("id").primaryKey(),
  title: varchar("title").notNull(),
  blogImage: varchar("blogImage"),
  blogImageId: varchar("blogImageId"),
  content: varchar("content").notNull(),
  description: varchar("description").notNull(),
  category: varchar("category").notNull().default("Programming"),
  subCategories: jsonb("subCategories").notNull().default([]),
  tags: jsonb("tags").default([]),
  readTime: varchar("readTime").default("0 min read"),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  author: varchar("author").notNull(),
  date: varchar("date").notNull(),
  featured: boolean("featured").notNull().default(false),
  trending: boolean("trending").notNull().default(false),
  createdBy: varchar("createdBy").notNull(),
});

export const blogViews = pgTable("blogViews", {
  id: uuid("id").defaultRandom().primaryKey(),
  blogId: varchar("blogId")
    .notNull()
    .references(() => Blogs.id, { onDelete: "cascade" }),
  viewers: jsonb("viewers").default([]).notNull(), // example: [{ email: "a@b.com", viewedAt: "2024-06-27T12:00:00Z" }]
  totalViews: varchar("totalViews").default(0).notNull(),
});

export const blogLikes = pgTable("blogLikes", {
  id: uuid("id").defaultRandom().primaryKey(),
  blogId: varchar("blogId")
    .notNull()
    .references(() => Blogs.id, { onDelete: "cascade" }),
  likedBy: varchar("likedBy").notNull(),
  likedAt: varchar("likedAt").notNull(),
  totalLikes: varchar("totalLikes").default(0).notNull(),
});

export const blogBookmarks = pgTable("blogBookmarks", {
  id: uuid("id").defaultRandom().primaryKey(),
  blogId: varchar("blogId")
    .notNull()
    .references(() => Blogs.id, { onDelete: "cascade" }),
  bookmarkedBy: varchar("bookmarkedBy").notNull(),
  bookmarkedAt: varchar("bookmarkedAt").notNull(),
});

export const Tutorials = pgTable("tutorials", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title").notNull(),
  coverImage: varchar("coverImage"),
  imageId: varchar("imageId"),
  description: varchar("description").notNull(),
  category: varchar("category").notNull().default("Programming"),
  subCategories: jsonb("subCategories"),
  tags: jsonb("tags").notNull(),
  level: varchar("level").notNull().default("Beginner"),
  content: jsonb("content").notNull(),
  author: varchar("author").notNull(),
  date: varchar("date").notNull(),
  duration: varchar("duration").notNull().default("0 hours"),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  featured: boolean("featured").notNull().default(false),
  trending: boolean("trending").notNull().default(false),
  createdBy: varchar("createdBy").notNull(),
});

export const TutorialsMarkedAsRead = pgTable("tutorialsMarkedAsRead", {
  id: uuid("id").defaultRandom().primaryKey(),
  markedBy: varchar("markedBy").notNull(),
  tutorialId: uuid("tutorialId").notNull(),
  subsectionId: varchar("subsectionId").notNull(),
});

export const tutorialLikes = pgTable("tutorialLikes", {
  id: uuid("id").defaultRandom().primaryKey(),
  tutorialId: uuid("tutorialId")
    .notNull()
    .references(() => Tutorials.id, { onDelete: "cascade" }),
  likedBy: varchar("likedBy").notNull(),
  likedAt: varchar("likedAt").notNull(),
  totalLikes: varchar("totalLikes").default(0).notNull(),
});

export const tutorialBookmarks = pgTable("tutorialBookmarks", {
  id: uuid("id").defaultRandom().primaryKey(),
  tutorialId: uuid("tutorialId")
    .notNull()
    .references(() => Tutorials.id, { onDelete: "cascade" }),
  bookmarkedBy: varchar("bookmarkedBy").notNull(),
  bookmarkedAt: varchar("bookmarkedAt").notNull(),
});

export const Comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  blogId: varchar("blogId")
    .notNull()
    .references(() => Blogs.id),
  // userId: uuid("userId").references(() => Users.id),
  name: varchar("name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  text: varchar("text").notNull(),
  time: varchar("time").notNull(),
});

export const Replies = pgTable("replies", {
  id: uuid("id").defaultRandom().primaryKey(),
  commentId: uuid("commentId")
    .notNull()
    .references(() => Comments.id),
  name: varchar("name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  text: varchar("text").notNull(),
  time: varchar("time").notNull(),
});

export const EditorImageUploads = pgTable("editorImageUploads", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: varchar("url").notNull(),
  fileId: varchar("fileId").notNull(),
  addedBy: varchar("addedBy").notNull(), 
  inUse : boolean("inUse").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const PlaygroundUserLogs = pgTable("playgroundUserLogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  language: varchar("language").notNull(),
  code: varchar("code").notNull(),
  output: varchar("output").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  createdBy: varchar("createdBy").notNull(),
});

export const PlaygroundOverallUsage = pgTable("playgroundOverallUsage", {
  id: uuid("id").defaultRandom().primaryKey(),
  language: varchar("language").notNull(),
  numberOfExecutions: integer("numberOfExecutions").notNull(),
  numberOfDownloads: integer("numberOfDownloads").notNull(),
});

export const PlaygroundUsageByUser = pgTable("playgroundUsageByUser", {
  id: uuid("id").defaultRandom().primaryKey(),
  language: varchar("language").notNull(),
  numberOfExecutions: integer("numberOfExecutions").notNull(),
  numberOfDownloads: integer("numberOfDownloads").notNull(),
  createdBy: varchar("createdBy").notNull(),
});

export const CodeSnippet = pgTable("codeSnippets", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title").notNull(),
  description: varchar("description").notNull(),
  category: varchar("category").notNull(),
  subcategory: jsonb("subcategory").notNull().default([]),
  tags: jsonb("tags").notNull().default([]),
  language: varchar("language").notNull(),
  content: varchar("content").notNull(),
  code: varchar("code").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
