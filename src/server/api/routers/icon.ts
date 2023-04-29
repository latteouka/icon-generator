import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const iconRouter = createTRPCRouter({
  getIcons: protectedProcedure.query(async ({ ctx }) => {
    const icons = ctx.prisma.icon.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return icons;
  }),
});
