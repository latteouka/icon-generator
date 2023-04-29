import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const checkoutRouter = createTRPCRouter({
  createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "us_bank_account"],
      metadata: {
        userId: ctx.session.user.id,
      },
      success_url: env.HOST_NAME,
      cancel_url: env.HOST_NAME,
      line_items: [{ price: "price_1N1rXkGIK3a1GbjiM5UgCXd2", quantity: 1 }],
      mode: "payment",
    });
    return session;
  }),
});
