import { pgTable, varchar, uuid, boolean, jsonb } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imgURL: varchar("imgURL"),
  username: varchar("username"),
  bio: varchar("bio"),
  websites: jsonb("websites"),
  aboutSection: jsonb("aboutSection"),
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

export const Comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  blogId: varchar("blogId")
    .notNull()
    .references(() => Blogs.id),
  userId: uuid("userId")
    .references(() => Users.id),
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
