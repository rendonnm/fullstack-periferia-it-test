import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'admin',
    description: 'Nombre de usuario',
  })
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  password: string;
}
