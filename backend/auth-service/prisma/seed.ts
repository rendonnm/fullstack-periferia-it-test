import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando semilla...');

  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      id: '0001',
      username: 'admin',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      city: 'Medellín',
      avatarUrl:
        'https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff&size=200',
    },
  });

  console.log('Usuario admin creado:', adminUser.username);

  const users = [
    {
      id: '0002',
      username: 'jramirez',
      firstName: 'Juan',
      lastName: 'Ramírez',
      city: 'Bogotá',
    },
    {
      id: '0003',
      username: 'mlopez',
      firstName: 'María',
      lastName: 'López',
      city: 'Medellín',
    },
    {
      id: '0004',
      username: 'pgomez',
      firstName: 'Pedro',
      lastName: 'Gómez',
      city: 'Cali',
    },
    {
      id: '0005',
      username: 'sgonzalez',
      firstName: 'Sofía',
      lastName: 'González',
      city: 'Manizales',
    },
    {
      id: '0006',
      username: 'jobando',
      firstName: 'Jessica',
      lastName: 'Obando',
      city: 'Medellín',
    },
    {
      id: '0007',
      username: 'hsanchez',
      firstName: 'Héctor',
      lastName: 'Sanchez',
      city: 'Cúcuta',
    },
    {
      id: '0008',
      username: 'kmosquera',
      firstName: 'Kibson',
      lastName: 'Mosquera',
      city: 'Armenia',
    },
    {
      id: '0009',
      username: 'dmesa',
      firstName: 'David',
      lastName: 'Mesa',
      city: 'Ibagué',
    },
  ];

  for (const userData of users) {
    const fullName = `${userData.firstName}+${userData.lastName}`;
    const avatarUrl = `https://ui-avatars.com/api/?name=${fullName}&background=random&size=200`;

    const user = await prisma.user.upsert({
      where: { username: userData.username },
      update: {},
      create: { ...userData, password: hashedPassword, avatarUrl },
    });
    console.log('Usuario creado:', user.username);
  }

  console.log('Proceos completado');
}

main()
  .catch((e) => {
    console.error('Error durante el proceso:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
