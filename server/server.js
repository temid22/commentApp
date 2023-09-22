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
app.get('/api/posts/:id', async (req, res) => {
  return await commitTODb(
    prisma.post.findUnique({
      where: { id: req.params.id },
      select: {
        body: true,
        title: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            message: true,
            parentId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
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
