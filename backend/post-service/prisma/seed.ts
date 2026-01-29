import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando semilla...');

  const posts = [
    {
      userId: '0001',
      username: 'admin',
      title: 'Bienvenidos al sistema de posts',
      message:
        'Este es el primer post del sistema. Aquí podrán compartir sus ideas sobre tecnología, programación, IA y más. ¡Esperamos ver contenido interesante!',
    },
    {
      userId: '0002',
      username: 'jramirez',
      title: 'Introducción a TypeScript en 2026',
      message:
        'TypeScript se ha convertido en el estándar de facto para desarrollo web. Con el nuevo sistema de tipos y las mejoras en inferencia, escribir código type-safe nunca fue tan fácil. Les recomiendo migrar sus proyectos a TS si aún no lo han hecho.',
    },
    {
      userId: '0003',
      username: 'mlopez',
      title: 'Mi experiencia con Big Data en la nube',
      message:
        'Después de trabajar 2 años con Apache Spark y Databricks, puedo decir que el procesamiento distribuido ha revolucionado cómo manejamos datos masivos. La clave está en diseñar buenos pipelines y optimizar las transformaciones.',
    },
    {
      userId: '0004',
      username: 'pgomez',
      title: 'React vs Vue: Mi opinión en 2026',
      message:
        'Ambos frameworks son excelentes, pero React sigue liderando en el ecosistema empresarial. Sin embargo, Vue 4 ha traído mejoras increíbles en performance. La elección depende del equipo y el proyecto específico.',
    },
    {
      userId: '0005',
      username: 'sgonzalez',
      title: 'IA Generativa y el futuro del desarrollo',
      message:
        'Los modelos de lenguaje grandes (LLMs) están cambiando cómo programamos. GitHub Copilot y herramientas similares son ahora asistentes indispensables. Sin embargo, entender los fundamentos sigue siendo crucial.',
    },
    {
      userId: '0006',
      username: 'jobando',
      title: 'Arquitectura de Microservicios con NestJS',
      message:
        'NestJS es fantástico para construir microservicios escalables. Su arquitectura modular, el uso de decoradores y la integración con Prisma hacen que el desarrollo sea muy productivo. Además, TypeScript nativo es un plus.',
    },
    {
      userId: '0007',
      username: 'hsanchez',
      title: 'Machine Learning en producción',
      message:
        'Implementar modelos de ML en producción es todo un reto. No basta con entrenar un modelo con buen accuracy, hay que pensar en latencia, escalabilidad, monitoreo y reentrenamiento continuo. MLOps es el futuro.',
    },
    {
      userId: '0008',
      username: 'kmosquera',
      title: 'PostgreSQL: La base de datos que nunca falla',
      message:
        'Llevo años trabajando con Postgres y sigue siendo mi elección #1. Su soporte para JSON, full-text search, y extensiones como PostGIS lo hacen increíblemente versátil. Además, es open source y tiene una comunidad activa.',
    },
    {
      userId: '0009',
      username: 'dmesa',
      title: 'Docker y Kubernetes en el día a día',
      message:
        'Containerización cambió mi forma de desarrollar. Docker facilita los ambientes consistentes y Kubernetes orquesta todo en producción. Si trabajas en DevOps o cloud, son herramientas que debes dominar.',
    },
  ];

  for (const postData of posts) {
    const post = await prisma.post.create({
      data: postData,
    });
    console.log('Post creado:', post.title);
  }

  console.log('Proceso completado');
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
