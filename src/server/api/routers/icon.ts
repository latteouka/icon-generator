import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const iconRouter = createTRPCRouter({
  getIcons: protectedProcedure.query(async ({ ctx }) => {
    const icons = await ctx.prisma.icon.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return icons;
  }),
  getCommunityIcons: publicProcedure.query(async ({ ctx }) => {
    const icons = await ctx.prisma.icon.findMany({
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });

    return icons;
  }),
});
