import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { b64Image } from "~/data/b64image";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
  region: "ap-northeast-1",
});

export const BUCKET_URL =
  "https://chundev-icon-generator.s3.ap-northeast-1.amazonaws.com/";

const configuration = new Configuration({
  apiKey: env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateIcon(prompt: string, number: number): Promise<string[]> {
  if (env.MOCK_DALLE === "true") {
    return new Array<string>(number).fill(b64Image);
  } else {
    const response = await openai.createImage({
      prompt,
      n: number,
      size: "512x512",
      response_format: "b64_json",
    });
    // fs.writeFileSync("./image.txt", response.data.data[0]?.b64_json as string);
    return response.data.data.map((result) => result.b64_json || "");
  }
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        color: z.string(),
        number: z.number().min(1).max(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you do not have enough credits.",
        });
      }

      const finalPrompt = `oil painting, in ${input.color} theme, of a ${input.prompt}`;

      // ask ai to generate
      const base64Image = await generateIcon(finalPrompt, input.number);

      const allGeneratedImages = await Promise.all(
        base64Image.map(async (image) => {
          const icon = await ctx.prisma.icon.create({
            data: {
              prompt: finalPrompt,
              userId: ctx.session.user.id,
            },
          });
          // save to s3
          await s3
            .putObject({
              Bucket: "chundev-icon-generator",
              Body: Buffer.from(image, "base64"),
              Key: icon.id,
              ContentEncoding: "base64",
              ContentType: "image/png",
            })
            .promise();
          return icon;
        })
      );

      return allGeneratedImages.map((image) => {
        return BUCKET_URL + image.id;
      });
    }),
});
