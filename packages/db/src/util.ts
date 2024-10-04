import { faker } from "@faker-js/faker";
import { customAlphabet } from "nanoid";

import type { Task } from "./schema";
import { tasks } from "./schema";

export function generateRandomTask(): Omit<Task, "id"> {
  return {
    code: `TASK-${customAlphabet("0123456789", 4)()}`,
    title: faker.hacker
      .phrase()
      .replace(/^./, (letter) => letter.toUpperCase()),
    status: faker.helpers.shuffle(tasks.status.enumValues)[0] ?? "todo",
    label: faker.helpers.shuffle(tasks.label.enumValues)[0] ?? "bug",
    priority: faker.helpers.shuffle(tasks.priority.enumValues)[0] ?? "low",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
