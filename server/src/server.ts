import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { memoriesRoute } from "./routes/memories";
import fastifyCors from "@fastify/cors";
import "dotenv/config";
import { authRoutes } from "./routes/auth";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import { uploadRoutes } from "./routes/upload";
import { resolve } from "path";

const app = fastify();
app.register(memoriesRoute);
app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "uploads",
});
app.register(multipart);
app.register(authRoutes);
app.register(uploadRoutes);
app.register(fastifyCors, {
  origin: true, // ou ['http://localhost:3000/']
});
app.register(jwt, {
  secret: "spacetime", // diferenciar jwt de outros backend
  // importante não ser simples
});
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("http");
  });
