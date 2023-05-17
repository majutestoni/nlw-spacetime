import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { memoriesRoute } from "./routes/memories";
import fastifyCors from "@fastify/cors";

const app = fastify();
const prisma = new PrismaClient();
app.register(memoriesRoute);
app.register(fastifyCors, {
  origin: true, // ou ['http://localhost:3000/']
});
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("http");
  });
