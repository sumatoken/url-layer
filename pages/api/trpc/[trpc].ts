import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
const appRouter = trpc
  .router()
  .query("getLink", {
    input: z.object({
      link: z.string(),
    }),

    resolve({ input }) {
      return {
        link: input.link,
      };
    },
  })
  .mutation("createLink", {
    input: z.object({
      link: z.string().url({ message: "Please provide a valid Campaign link" }),
    }),
    async resolve(req) {
      return { status: "generated", generatedLink: "newlinkhabibi" };
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
