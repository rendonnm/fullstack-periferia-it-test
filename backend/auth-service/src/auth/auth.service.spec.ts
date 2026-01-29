import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: '1',
    username: 'testuser',
    password: 'hashedpassword',
    firstName: 'Test',
    lastName: 'User',
    city: 'Medellín',
    avatarUrl: 'https://example.com/avatar.jpg',
    createdAt: new Date(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token for valid credentials', async () => {
      const username = 'testuser';
      const password = 'password123';
      const token = 'jwt-token';

      mockUsersService.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.signAsync.mockResolvedValue(token);

      const result = await service.signIn(username, password);

      expect(result).toEqual({ access_token: token });
      expect(mockUsersService.findOne).toHaveBeenCalledWith(username);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        username: mockUser.username,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        city: mockUser.city,
        avatarUrl: mockUser.avatarUrl,
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(service.signIn('nonexistent', 'password')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUsersService.findOne).toHaveBeenCalledWith('nonexistent');
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signIn('testuser', 'wrongpassword')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongpassword',
        mockUser.password,
      );
    });

    it('should use default avatar URL if user has no avatar', async () => {
      const userWithoutAvatar = { ...mockUser, avatarUrl: null };
      const token = 'jwt-token';

      mockUsersService.findOne.mockResolvedValue(userWithoutAvatar);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.signAsync.mockResolvedValue(token);

      await service.signIn('testuser', 'password123');

      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          avatarUrl: expect.stringContaining('ui-avatars.com'),
        }),
      );
    });
  });
});
