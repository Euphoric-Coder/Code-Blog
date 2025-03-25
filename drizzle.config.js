import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/schema.jsx",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
