import { sql } from "drizzle-orm";
import {
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

//////////////////////// POSTS ////////////////////////

export const Post = pgTable("post", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: varchar("name", { length: 256 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const User = pgTable("user", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
});

//////////////////////// TASKS ////////////////////////

export const statusEnum = pgEnum(`status`, [
  "todo",
  "in-progress",
  "done",
  "canceled",
]);

export const labelEnum = pgEnum(`label`, [
  "bug",
  "feature",
  "enhancement",
  "documentation",
]);

export const priorityEnum = pgEnum(`priority`, ["low", "medium", "high"]);

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  code: varchar("code", { length: 256 }).notNull().unique(),
  title: varchar("title", { length: 256 }),
  status: statusEnum("status").notNull().default("todo"),
  label: labelEnum("label").notNull().default("bug"),
  priority: priorityEnum("priority").notNull().default("low"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

export const views = pgTable("views", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull().unique(),
  columns: text("columns").array(),
  filterParams: json("filter_params").$type<FilterParams>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type View = typeof views.$inferSelect;

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
  viewId: z.string().uuid().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

export const getTasksSchema = searchParamsSchema;

export type GetTasksSchema = z.infer<typeof getTasksSchema>;

export const createTaskSchema = z.object({
  title: z.string(),
  label: z.enum(tasks.label.enumValues),
  status: z.enum(tasks.status.enumValues),
  priority: z.enum(tasks.priority.enumValues),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  label: z.enum(tasks.label.enumValues).optional(),
  status: z.enum(tasks.status.enumValues).optional(),
  priority: z.enum(tasks.priority.enumValues).optional(),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;

export const createViewSchema = z.object({
  name: z.string().min(1),
  columns: z.string().array().optional(),
  filterParams: z
    .object({
      operator: z.enum(["and", "or"]).optional(),
      sort: z.string().optional(),
      filters: z
        .object({
          field: z.enum(["title", "status", "priority"]),
          value: z.string(),
          isMulti: z.boolean().default(false),
        })
        .array()
        .optional(),
    })
    .optional(),
});

export type CreateViewSchema = z.infer<typeof createViewSchema>;

export const editViewSchema = createViewSchema.extend({
  id: z.string().uuid(),
});

export type EditViewSchema = z.infer<typeof editViewSchema>;

export const deleteViewSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteViewSchema = z.infer<typeof deleteViewSchema>;

export type FilterParams = NonNullable<CreateViewSchema["filterParams"]>;
export type Operator = FilterParams["operator"];
export type Sort = FilterParams["sort"];
export type Filter = NonNullable<FilterParams["filters"]>[number];
