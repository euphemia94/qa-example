import { healthRouter } from "./router/health";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  health: healthRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
