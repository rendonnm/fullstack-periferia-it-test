import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PostService', () => {
  let service: PostService;

  const mockPost = {
    id: '1',
    userId: 'user1',
    username: 'testuser',
    title: 'Test Post',
    message: 'This is a test post',
    createdAt: new Date(),
  };

  const mockPrismaService = {
    post: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const createPostData = {
        userId: 'user1',
        username: 'testuser',
        title: 'Test Post',
        message: 'This is a test post',
      };

      mockPrismaService.post.create.mockResolvedValue(mockPost);

      const result = await service.create(createPostData);

      expect(result).toEqual(mockPost);
      expect(mockPrismaService.post.create).toHaveBeenCalledWith({
        data: {
          userId: createPostData.userId,
          username: createPostData.username,
          title: createPostData.title,
          message: createPostData.message,
        },
      });
    });

    it('should create post with empty title if not provided', async () => {
      const createPostData = {
        userId: 'user1',
        username: 'testuser',
        message: 'This is a test post',
      };

      mockPrismaService.post.create.mockResolvedValue({
        ...mockPost,
        title: '',
      });

      await service.create(createPostData);

      expect(mockPrismaService.post.create).toHaveBeenCalledWith({
        data: {
          userId: 'user1',
          username: 'testuser',
          title: '',
          message: 'This is a test post',
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all posts ordered by createdAt desc', async () => {
      const posts = [mockPost, { ...mockPost, id: '2' }];
      mockPrismaService.post.findMany.mockResolvedValue(posts);

      const result = await service.findAll();

      expect(result).toEqual(posts);
      expect(mockPrismaService.post.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array if no posts found', async () => {
      mockPrismaService.post.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a post by id', async () => {
      mockPrismaService.post.findUnique.mockResolvedValue(mockPost);

      const result = await service.findOne('1');

      expect(result).toEqual(mockPost);
      expect(mockPrismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return null if post not found', async () => {
      mockPrismaService.post.findUnique.mockResolvedValue(null);

      const result = await service.findOne('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('findByUserId', () => {
    it('should return posts by userId ordered by createdAt desc', async () => {
      const userPosts = [mockPost];
      mockPrismaService.post.findMany.mockResolvedValue(userPosts);

      const result = await service.findByUserId('user1');

      expect(result).toEqual(userPosts);
      expect(mockPrismaService.post.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array if user has no posts', async () => {
      mockPrismaService.post.findMany.mockResolvedValue([]);

      const result = await service.findByUserId('userWithNoPosts');

      expect(result).toEqual([]);
    });
  });
});
