import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const tasks = sqliteTable("tasks", {

  id: integer("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),

  description: text("description"),

  dueDate: text("due_date"),

  priority: text("priority").default("medium"),

  completed: integer("completed", { mode: "boolean" }).default(false),

  createdAt: text("created_at")

})