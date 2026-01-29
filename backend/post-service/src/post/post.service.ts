import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreatePostDto {
  title?: string;
  message: string;
}

export interface CreatePostData {
  userId: string;
  username: string;
  title?: string;
  message: string;
}

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostData: CreatePostData) {
    return this.prisma.post.create({
      data: {
        userId: createPostData.userId,
        username: createPostData.username,
        title: createPostData.title ?? '',
        message: createPostData.message,
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
