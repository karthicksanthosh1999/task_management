# 🚀 Task Manager — Next.js + Prisma + PostgreSQL

A modern Task Manager application built with **Next.js App Router**, **Prisma**, **PostgreSQL**, **TypeScript**, and **TailwindCSS**. This README includes setup steps, environment configuration, Prisma setup, and deployment instructions.

---

## 📦 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Prisma ORM** (with @prisma/adapter-pg)
- **PostgreSQL**
- **Tailwind CSS**

---

## 🛠️ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2️⃣ Install Dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Example for local PostgreSQL:

```
DATABASE_URL="postgresql://postgres:admin@localhost:5432/task_manager?schema=public"
```

---

## 🧩 Prisma Setup

### 1️⃣ Generate Prisma Client

```bash
npx prisma generate
```

### 2️⃣ Run Migrations

```bash
npx prisma migrate dev --name init
```

---

## 🔌 Prisma Client Initialization

Create file: `lib/prisma.ts`

```ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

export const prisma = new PrismaClient({ adapter });
```

---

## 📁 Project Structure

```
├── app
│   ├── api
│   │   ├── tasks
│   │   │   ├── route.ts
│   │   └── projects
│   ├── layout.tsx
│   └── page.tsx
├── prisma
│   └── schema.prisma
├── lib
│   └── prisma.ts
└── package.json
```

---

## ▶️ Running the Application

```bash
npm run dev
```

Application runs at:
**[http://localhost:3000](http://localhost:3000)**

---

## 🚀 Deployment (Vercel + Railway/Supabase)

### Step 1: Host PostgreSQL

Use **Railway**, **Supabase**, or **NeonDB** → copy the DB URL.

### Step 2: Add `DATABASE_URL` in Vercel Dashboard

```
DATABASE_URL=your_production_postgres_url
```

### Step 3: Push Prisma Schema

```bash
npx prisma migrate deploy
```

### Step 4: Deploy to Vercel

```bash
vercel
```

---

## 🧪 Testing Prisma

Run a quick test inside route file:

```ts
const projects = await prisma.project.findMany();
return NextResponse.json(projects);
```

If you receive data → Prisma setup is correct.

---

## 📚 Scripts

```
npm run dev       # start local dev server
npm run build     # production build
npm run start     # start production server
```

---

## 🤝 Contributing

Feel free to submit pull requests or improvements!

---

## 📄 License

MIT License — free to use and modify.
