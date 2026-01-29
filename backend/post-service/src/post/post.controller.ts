import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import type { CreatePostDto } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: string;
    username: string;
  };
}

@ApiTags('posts')
@Controller('posts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva publicación' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Mi primera publicación' },
        content: {
          type: 'string',
          example: 'Este es el contenido de mi publicación',
        },
      },
      required: ['title', 'content'],
    },
  })
  @ApiResponse({ status: 201, description: 'Publicación creada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.create({
      ...createPostDto,
      userId: req.user.id,
      username: req.user.username,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las publicaciones' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filtrar por ID de usuario',
  })
  @ApiResponse({ status: 200, description: 'Lista de publicaciones' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.postService.findByUserId(userId);
    }
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener publicación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la publicación' })
  @ApiResponse({ status: 200, description: 'Publicación encontrada' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }
}
