import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
});
