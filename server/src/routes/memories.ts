import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function memoriesRoute(app: FastifyInstance) {
  const prisma = new PrismaClient();

  app.get("/memories", async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createDate: "asc",
      },
    });
    return memories.map((e) => {
      return {
        id: e.id,
        coverUrl: e.coverUrl,
        excerpt: e.content.substring(0, 115).concat("..."),
      };
    });
  });

  app.get("/memories/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return memory;
  });

  app.post("/memories", async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body);

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: "asdk",
      },
    });
  });

  app.put("/memories/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body);

    await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    });
  });

  app.delete("/memories/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.memory.delete({
      where: {
        id,
      },
    });
  });
}
