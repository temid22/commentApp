import fastify from 'fastify';
import dotenv from 'dotenv';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
dotenv.config();

const app = fastify();
app.register(sensible);
app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
});
const prisma = new PrismaClient();

app.get('/api/posts', async (req, res) => {
  return await commitTODb(
    prisma.post.findMany({
      select: {
        id: true,
        title: true,
      },
    })
  );
});

async function commitTODb(promise) {
  const [error, data] = await app.to(promise);
  if (error) return app.httpErrors.internalServerError(error.message);
  return data;
}

app.listen({ port: process.env.PORT });
