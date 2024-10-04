import type { Task } from "./schema";
import { db } from "./client";
import { tasks } from "./schema";
import { generateRandomTask } from "./util";

async function seedTasks(input: { count: number | null }) {
  const count = input.count ?? 100;
  try {
    const allTasks: Omit<Task, "id">[] = [];

    for (let i = 0; i < count; i++) {
      allTasks.push(generateRandomTask());
    }

    await db.delete(tasks);

    console.log("📝 Inserting tasks", allTasks.length);

    await db.insert(tasks).values(allTasks);
  } catch (err) {
    console.error(err);
  }
}

function _seedPosts(_input: { count: number }) {
  // TODO: Implement this function
}

function _seedUsers(_input: { count: number }) {
  // TODO: Implement this function
}

function _seedComments(_input: { count: number }) {
  // TODO: Implement this function
}

async function runSeed() {
  console.log("⏳ Running seed...");

  const start = Date.now();

  await seedTasks({ count: 100 });

  const end = Date.now();

  console.log(`✅ Seed completed in ${end - start}ms`);

  process.exit(0);
}

runSeed().catch((err) => {
  console.error("❌ Seed failed");
  console.error(err);
  process.exit(1);
});
