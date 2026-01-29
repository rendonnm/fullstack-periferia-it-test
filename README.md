# Technet - Red Social

Red social tecnológica desarrollada con NestJS, React y PostgreSQL.

## 🚀 Stack Tecnológico

- **Backend:** NestJS + TypeScript + Prisma + PostgreSQL
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4
- **Estado:** Zustand
- **Autenticación:** JWT
- **Containerización:** Docker

## ⚡ Inicio Rápido con Docker

```bash
# 1. Levantar todos los servicios
docker compose up --build -d

# 2. Ejecutar migraciones
docker exec auth-service pnpm prisma migrate deploy
docker exec post-service pnpm prisma migrate deploy

# 3. Poblar base de datos
docker exec auth-service pnpm prisma db seed
docker exec post-service pnpm prisma db seed
```

**Aplicación:** http://localhost:5173  
**Swagger Auth:** http://localhost:3000/api  
**Swagger Posts:** http://localhost:3001/api

## 👤 Usuarios de Prueba

| Usuario  | Contraseña  |
| -------- | ----------- |
| admin    | password123 |
| jramirez | password123 |
| mlopez   | password123 |

## 📂 Estructura

```
├── backend/
│   ├── auth-service/    # Autenticación (Puerto 3000)
│   └── post-service/    # Publicaciones (Puerto 3001)
└── frontend/            # React App (Puerto 5173)
```

## 🧪 Tests

```bash
# Backend
cd backend/auth-service && pnpm test
cd backend/post-service && pnpm test

# Frontend
cd frontend && pnpm test
```

## 🛠️ Desarrollo Local

```bash
# Backend
cd backend
docker-compose up -d  # Solo bases de datos

cd auth-service
pnpm install && pnpm prisma migrate dev && pnpm start:dev

cd ../post-service
pnpm install && pnpm prisma migrate dev && pnpm start:dev

# Frontend
cd frontend
pnpm install && pnpm dev
```
