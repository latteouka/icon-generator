import { TRPCError } from "@trpc/server";
import { generateRouter } from "~/server/router";

describe("generateRouter", () => {
  const mockPrompt = "test prompt";
  const mockColor = "test color";
  const mockNumber = 2;

  describe("generateIcon", () => {
    it("should return an array of base64-encoded images when MOCK_DALLE is true", async () => {
      process.env.MOCK_DALLE = "true";

      const result = await generateRouter.mutations.generateIcon({
        ctx: {},
        input: {
          prompt: mockPrompt,
          color: mockColor,
          number: mockNumber,
        },
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(mockNumber);

      result.forEach((base64Image) => {
        expect(typeof base64Image).toBe("string");
      });

      process.env.MOCK_DALLE = "false";
    });

    it("should return an array of base64-encoded images when MOCK_DALLE is false", async () => {
      process.env.MOCK_DALLE = "false";

      const result = await generateRouter.mutations.generateIcon({
        ctx: {},
        input: {
          prompt: mockPrompt,
          color: mockColor,
          number: mockNumber,
        },
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(mockNumber);

      result.forEach((base64Image) => {
        expect(typeof base64Image).toBe("string");
      });

      process.env.MOCK_DALLE = "false";
    });
  });

  describe("generateRouter", () => {
    it("should return an array of URLs for the generated images", async () => {
      const result = await generateRouter.mutations.generateRouter({
        ctx: {
          prisma: {
            user: {
              updateMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            icon: {
              create: jest.fn().mockResolvedValue({ id: "test-id" }),
            },
          },
          session: {
            user: {
              id: "test-user-id",
            },
          },
        },
        input: {
          prompt: mockPrompt,
          color: mockColor,
          number: mockNumber,
        },
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(mockNumber);

      result.forEach((url) => {
        expect(typeof url).toBe("string");
        expect(url).toContain(
          "https://chundev-icon-generator.s3.ap-northeast-1.amazonaws.com/"
        );
      });
    });

    it("should throw a TRPCError when the user does not have enough credits", async () => {
      const result = generateRouter.mutations.generateRouter({
        ctx: {
          prisma: {
            user: {
              updateMany: jest.fn().mockResolvedValue({ count: 0 }),
            },
          },
          session: {
            user: {
              id: "test-user-id",
            },
          },
        },
        input: {
          prompt: mockPrompt,
          color: mockColor,
          number: mockNumber,
        },
      });

      await expect(result).rejects.toEqual(
        new TRPCError({
          code: "BAD_REQUEST",
          message: "you do not have enough credits.",
        })
      );
    });
  });
});
