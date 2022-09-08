import { resolve } from "path";
import { prisma } from "./../../../lib/prisma";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { getBaseUrl } from "../../_app";
const appRouter = trpc
  .router()
  .query("getLinks", {
    async resolve() {
      try {
        const links = await prisma.link.findMany({
          select: {
            url: true,
            campaign: true,
            visitors: true,
          },
        });
        if (links) {
          return { links };
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          throw new trpc.TRPCError({
            code: "CONFLICT",
            message: "Link cannot be created",
          });
        }
        throw e;
      }
    },
  })
  .query("getLink", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      const link = await prisma.link.findUnique({
        where: {
          slug: input.slug,
        },
        include: {
          campaign: true,
        },
      });

      if (!link) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "Link cannot be found",
        });
      }
      return { link };
    },
  })
  .query("getVisitorInfo", {
    async resolve() {
      const geoLocation = await fetch("http://ip-api.com/json").then((res) =>
        res.json()
      );
      return { geoLocation };
    },
  })
  .mutation("createLink", {
    input: z.object({
      campaignLink: z.string(),
      campaignSlug: z.string(),
    }),
    async resolve({ input }) {
      try {
        const campaign = await prisma.campaign.create({
          data: {
            url: input.campaignLink,
            slug: input.campaignSlug,
            link: {
              create: {
                url: `${getBaseUrl()}/${input.campaignSlug}`,
                slug: input.campaignSlug,
              },
            },
          },
          include: {
            link: true,
          },
        });

        if (campaign) {
          return { status: "generated", generatedLink: campaign.link };
        }
      } catch (e) {
        console.log(e);
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          throw new trpc.TRPCError({
            code: "CONFLICT",
            message: "Link cannot be created",
          });
        }
        throw e;
      }

      // The .code property can be accessed in a type-safe manner
    },
  })
  .mutation("logVisitor", {
    input: z.object({
      ip: z.string(),
      country: z.string(),
      city: z.string(),
      slug: z.string(),
    }),
    async resolve({ input }) {
      const logVisitor = await prisma.link.update({
        where: {
          slug: input.slug,
        },
        data: {
          visitors: {
            create: [
              {
                source: "facebook",
                visitor: {
                  create: {
                    ip: input.ip,
                    country: input.country,
                    city: input.city,
                  },
                },
              },
            ],
          },
        },
      });
      return logVisitor;
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
