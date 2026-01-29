# Red Social - Full Stack

Sistema de red social con arquitectura de microservicios desarrollado con Node.js, NestJS, React y PostgreSQL.

## 🚀 Tecnologías

### Backend

- **NestJS** - Framework Node.js
- **TypeScript** - Tipado estático
- **PostgreSQL** - Base de datos
- **Prisma ORM** - ORM para PostgreSQL
- **JWT** - Autenticación
- **Docker** - Contenedorización

### Frontend

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Tailwind CSS v4** - Estilos
- **Zustand** - Manejo de estado
- **React Router** - Enrutamiento

## 🚀 Inicio Rápido

### Paso 1: Clonar el repositorio

```bash
git clone <repository-url>
cd fullstack-periferia-it-test
```

### Paso 2: Configurar variables de entorno

```bash
cp .env.example .env
cp backend/auth-service/.env.example backend/auth-service/.env
cp backend/post-service/.env.example backend/post-service/.env
```

> **Nota:** Los archivos `.env.example` ya contienen todos los valores necesarios. No necesitas editarlos.

### Paso 3: Levantar las bases de datos

```bash
cd backend
docker-compose up -d
```

Esto iniciará:

- **auth-db** (PostgreSQL) en puerto `5433`
- **post-db** (PostgreSQL) en puerto `5434`

### Paso 4: Iniciar Auth Service

En una nueva terminal:

```bash
cd backend/auth-service
pnpm install
pnpm prisma migrate dev
pnpm prisma db seed
pnpm run start:dev
```

Servicio corriendo en: **http://localhost:3000**

### Paso 5: Iniciar Post Service

En una nueva terminal:

```bash
cd backend/post-service
pnpm install
pnpm prisma migrate dev
pnpm prisma db seed
pnpm run start:dev
```

Servicio corriendo en: **http://localhost:3001**

### Paso 6: Iniciar Frontend

En una nueva terminal:

```bash
cd frontend
pnpm install
pnpm run dev
```

Aplicación disponible en: **http://localhost:5173**

### Paso 7: Iniciar sesión

Usa cualquiera de estos usuarios de prueba:

| Usuario      | Contraseña  |
| ------------ | ----------- |
| **admin**    | password123 |
| **jramirez** | password123 |
| **mlopez**   | password123 |

---

## 🐳 Instalación con Docker Compose

Si prefieres usar Docker para todo (incluyendo los servicios backend y frontend):

### 1. Configurar variables de entorno

```bash
cp .env.example .env
```

### 2. Levantar todos los servicios

```bash
docker compose up --build -d
```

Esto iniciará:

- **auth-db** (PostgreSQL) en puerto `5432`
- **post-db** (PostgreSQL) en puerto `5433`
- **auth-service** (NestJS) en puerto `3000`
- **post-service** (NestJS) en puerto `3001`
- **frontend** (React) en puerto `5173`

### 3. Ejecutar migraciones y seeders

**IMPORTANTE:** Después de levantar los servicios, debes ejecutar las migraciones para crear las tablas:

```bash
# Migrar y poblar base de datos de autenticación
docker exec auth-service sh -c "pnpm add -D tsx && pnpm prisma migrate deploy && pnpm prisma db seed"

# Migrar y poblar base de datos de posts
docker exec post-service sh -c "pnpm add -D tsx && pnpm prisma migrate deploy && pnpm prisma db seed"
```

> **Nota:** El comando `pnpm add -D tsx` es necesario solo la primera vez para instalar la dependencia de ejecución de TypeScript.

### 4. Verificar que todo esté corriendo

```bash
docker ps
```

Todos los contenedores deben estar en estado `Up`.

### 5. Acceder a la aplicación

Abrir navegador en: **http://localhost:5173**

### 6. Iniciar sesión

Usa cualquiera de estos usuarios de prueba:

| Usuario      | Contraseña  |
| ------------ | ----------- |
| **admin**    | password123 |
| **jramirez** | password123 |
| **mlopez**   | password123 |

### Comandos útiles de Docker

```bash
# Ver logs de un servicio
docker logs auth-service -f
docker logs post-service -f

# Detener todos los servicios
docker compose down

# Detener y eliminar volúmenes (borra la base de datos)
docker compose down -v

# Reconstruir imágenes
docker compose up --build -d
```

---

## 💻 Modo Desarrollo Local (Sin Docker para servicios)

### Requisitos adicionales

- PostgreSQL instalado localmente o usar Docker solo para las DBs

### Backend - Auth Service

```bash
cd backend/auth-service
cp .env.example .env
pnpm install
pnpm prisma migrate dev
pnpm prisma db seed
pnpm run start:dev
```

### Backend - Post Service

```bash
cd backend/post-service
cp .env.example .env
pnpm install
pnpm prisma migrate dev
pnpm prisma db seed
pnpm run start:dev
```

### Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

## 👤 Usuarios de Prueba

Después de ejecutar los seeders, puedes usar estos usuarios:

| Usuario   | Contraseña  | Nombre          |
| --------- | ----------- | --------------- |
| admin     | password123 | Admin User      |
| jramirez  | password123 | Juan Ramírez    |
| mlopez    | password123 | María López     |
| pgomez    | password123 | Pedro Gómez     |
| sgonzalez | password123 | Sandra González |

## 📁 Estructura del Proyecto

```
.
├── backend/
│   ├── auth-service/         # Servicio de autenticación
│   │   ├── src/
│   │   ├── prisma/
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── post-service/         # Servicio de publicaciones
│   │   ├── src/
│   │   ├── prisma/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── docker-compose.yml    # Docker compose solo para DBs
├── frontend/                 # Aplicación React
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml        # Docker compose completo
└── README.md
```

## 🔌 Endpoints API

### Auth Service (puerto 3000)

#### POST /auth/login

Login de usuario

**Request:**

```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Post Service (puerto 3001)

Todos los endpoints requieren autenticación (Bearer token).

#### GET /posts

Listar todas las publicaciones

**Response:**

```json
[
  {
    "id": "uuid",
    "userId": "0001",
    "username": "admin",
    "title": "Título del post",
    "message": "Contenido del post",
    "createdAt": "2026-01-28T...",
    "updatedAt": "2026-01-28T..."
  }
]
```

#### POST /posts

Crear una publicación

**Request:**

```json
{
  "title": "Mi nuevo post",
  "message": "Contenido de mi publicación"
}
```

#### GET /posts/:id

Obtener una publicación específica

## 🛠️ Comandos Útiles

### Docker

```bash
# Levantar servicios
docker-compose up

# Levantar en modo detached (background)
docker-compose up -d

# Reconstruir imágenes
docker-compose up --build

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

### Base de Datos

```bash
# Ver logs de base de datos
docker-compose logs auth-db
docker-compose logs post-db

# Conectar a PostgreSQL
docker exec -it auth-db psql -U postgres -d auth_db
docker exec -it post-db psql -U postgres -d post_db
```

## 🧪 Testing

```bash
# Tests unitarios - Auth Service
cd backend/auth-service
pnpm run test

# Tests unitarios - Post Service
cd backend/post-service
pnpm run test

# Tests E2E
pnpm run test:e2e
```

## 🔒 Seguridad

- Las contraseñas se hashean con bcrypt
- JWT con firma secreta
- CORS configurado para orígenes específicos
- Validación de datos en endpoints
- Variables de entorno para secretos

## 📝 Notas

- El JWT_SECRET debe cambiarse en producción
- Los seeders crean datos de prueba automáticamente
- El frontend usa Zustand con persistencia en localStorage
- Las rutas están protegidas con guards en backend y frontend

## 🤝 Contribución

Este proyecto fue desarrollado como prueba técnica.
