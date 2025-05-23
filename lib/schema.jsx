import { json } from "drizzle-orm/gel-core";
import { pgTable, varchar, uuid, boolean, jsonb } from "drizzle-orm/pg-core";

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
  mdFormat: varchar("mdFormat").notNull(),
  htmlFormat: varchar("htmlFormat").notNull(),
  categories: varchar("categories").notNull().default("Programming"),
  subCategories: varchar("subCategories"),
  author: varchar("author").notNull(),
  date: varchar("date").notNull(),
  featured: boolean("featured").notNull().default(false),
  createdBy: varchar("createdBy").notNull(),
});

export const Tutorials = pgTable("tutorials", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title").notNull(),
  coverImage: varchar("coverImage"),
  description: varchar("description").notNull(),
  categories: jsonb("categories").notNull().default("Programming"),
  subCategories: jsonb("subCategories"),
  tags: jsonb("tags").notNull(),
  sections: jsonb("sections").notNull(),
  author: varchar("author").notNull(),
  date: varchar("date").notNull(),
  featured: boolean("featured").notNull().default(false),
  createdBy: varchar("createdBy").notNull(),
});

export const Comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  blogId: varchar("blogId")
    .notNull()
    .references(() => Blogs.id),
  userId: uuid("userId").references(() => Users.id),
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
