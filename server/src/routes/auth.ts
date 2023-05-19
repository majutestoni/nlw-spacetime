import { FastifyInstance } from "fastify";
import { z } from "zod";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function authRoutes(app: FastifyInstance) {
    
  const prisma = new PrismaClient();
  app.post("/register", async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    });

    console.log('oi')
    const { code } = bodySchema.parse(request.body);
    const accessToken = await axios.post("https://github.com/login/oauth/access_token", null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRETE,
          code,
        },
        headers: {
        Accept: "application/json",
        },
    });

    console.log(accessToken)
    const { access_token } = accessToken.data;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    });

    const userIn = userSchema.parse(userResponse.data);

    let user = await prisma.user.findUnique({
      where: {
        githubId: userIn.id,
      },
    });

    console.log(user)

    if (!user) {
      user = await prisma.user.create({
        data: {
            githubId: userIn.id,
            name: userIn.name,
            avatarUrl: userIn.avatar_url,
            login: userIn.login
        }
      });
    }


    const token = app.jwt.sign({
        // não pode ser informações sensiveis
        name: user.name,
        avatarUrl: user.avatarUrl
    }, {
        sub: user.id,
        expiresIn: '30 days'
  })

    console.log(token)
    return { token };
  });
}
