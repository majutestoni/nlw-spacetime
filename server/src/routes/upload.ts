import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { createWriteStream } from "fs";
import { extname, resolve } from "path";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

export async function uploadRoutes(app: FastifyInstance) {
  app.post("upload", async (request, reply) => {
    const upload = await request.file({
      limits: {
        fieldSize: 5_242_880,
      },
    });

    if (!upload) {
      return reply.status(400).send();
    }

    const mimType = /^(image|video)\/[a-zA-Z]+/;
    const isValidFormat = mimType.test(upload.mimetype);

    if (!isValidFormat) {
      return reply.status(400).send();
    }

    const id = randomUUID();

    const extension = extname(upload.filename);
    const fileName = id.concat(extension);

    const writeString = createWriteStream(resolve(__dirname, "../../uploads/", fileName));
    await pump(upload.file, writeString);

    const fullUrl = request.protocol.concat("://").concat(request.hostname);
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()
  });
}
