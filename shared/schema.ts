import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Question Types
export enum QuestionCategory {
  VULNERABILITY = "vulnerability",
  ATTRACTION = "attraction",
  IDENTITY = "identity",
  CONFLICT = "conflict",
  FUTURE = "future",
  SHADOW = "shadow",
  SURPRISE = "surprise",
  DEATH = "death",
  UNSPOKEN = "unspoken",
  SYMBOLS = "symbols",
  HOME = "home",
  CROSSROADS = "crossroads"
}

export const questionCategoryLabels: Record<QuestionCategory, string> = {
  [QuestionCategory.VULNERABILITY]: "Vulnerability & Truth",
  [QuestionCategory.ATTRACTION]: "Attraction & Sensuality",
  [QuestionCategory.IDENTITY]: "Inner Worlds & Identity",
  [QuestionCategory.CONFLICT]: "Conflict & Repair",
  [QuestionCategory.FUTURE]: "Future Fantasies",
  [QuestionCategory.SHADOW]: "Shadow & Jealousy",
  [QuestionCategory.SURPRISE]: "Surprise Me",
  [QuestionCategory.DEATH]: "Death & Letting Go",
  [QuestionCategory.UNSPOKEN]: "The Unspoken",
  [QuestionCategory.SYMBOLS]: "Symbols & Soul",
  [QuestionCategory.HOME]: "Coming Home",
  [QuestionCategory.CROSSROADS]: "Crossroads & Choice"
};
