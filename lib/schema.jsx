import { pgTable, varchar, uuid, boolean } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imgURL: varchar("imgURL"),
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
