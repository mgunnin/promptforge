# .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}

```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

# docker-compose.yml

```yml
services:
  postgres:
    image: postgres:15
    container_name: promptforge-db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: promptforge
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

# next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
}

module.exports = nextConfig

```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

# package.json

```json
{
  "name": "promptforge",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-slot": "^1.1.0",
    "@types/uuid": "^10.0.0",
    "bcryptjs": "^2.4.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.456.0",
    "next": "15.0.3",
    "next-auth": "^4.24.10",
    "next-themes": "^0.4.3",
    "openai": "^4.71.1",
    "prisma": "^5.22.0",
    "react": "19.0.0-rc-66855b96-20241106",
    "react-dom": "19.0.0-rc-66855b96-20241106",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-animate": "^1.0.7",
    "uuid": "^11.0.3",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@auth/prisma-adapter": "^2.7.3",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "15.0.3",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  },
  "packageManager": "yarn@1.22.22+sha512.a6b2f7906b721bba3d67d4aff083df04dad64c399707841b7acf00f6b133b7ac24255f2652fa22ae3534329dc6180534e98d17432037ff6fd140556e2bb3137e"
}

```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# prisma/migrations/20241112155546_init/migration.sql

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsed" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "model" TEXT NOT NULL,
    "tags" TEXT[],
    "category" TEXT,
    "aiGenerated" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptVersion" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "model" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "promptId" TEXT NOT NULL,
    "metrics" JSONB,

    CONSTRAINT "PromptVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptVariable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "defaultValue" TEXT,
    "promptId" TEXT NOT NULL,

    CONSTRAINT "PromptVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptTest" (
    "id" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "output" TEXT NOT NULL,
    "metrics" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "promptId" TEXT NOT NULL,

    CONSTRAINT "PromptTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_userId_teamId_key" ON "TeamMember"("userId", "teamId");

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptVersion" ADD CONSTRAINT "PromptVersion_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptVariable" ADD CONSTRAINT "PromptVariable_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptTest" ADD CONSTRAINT "PromptTest_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

# prisma/migrations/migration_lock.toml

```toml
# Please do not edit this file manually
# It should be added in your version-control system (i.e. Git)
provider = "postgresql"
```

# prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(cuid())
  name      String?
  email     String    @unique
  password  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  apiKeys   ApiKey[]
  prompts   Prompt[]
  teams     Team[]    @relation("TeamMembers")
  ownedTeams Team[]   @relation("TeamOwner")
}

model ApiKey {
  id        String   @id @default(cuid())
  name      String
  key       String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Team {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  ownerId     String
  owner       User     @relation("TeamOwner", fields: [ownerId], references: [id])
  members     User[]   @relation("TeamMembers")
  prompts     Prompt[]
}

model Prompt {
  id          String       @id @default(cuid())
  name        String
  content     String
  description String?
  model       String
  tags        String[]
  category    String?
  metrics     Json?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  userId      String
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  teamId      String?
  team        Team?        @relation(fields: [teamId], references: [id])
  versions    Version[]
  tests       PromptTest[]
}

model Version {
  id          String   @id @default(cuid())
  content     String
  description String?
  model       String
  metrics     Json?
  createdAt   DateTime @default(now())
  promptId    String
  prompt      Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)
}

model PromptTest {
  id        String   @id @default(cuid())
  input     Json
  output    String
  metrics   Json?
  createdAt DateTime @default(now())
  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)
}

```

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

# src/app/api/auth/[...nextauth]/route.ts

```ts
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

```

# src/app/api/auth/register/route.ts

```ts
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Create default API key for the user
    await prisma.apiKey.create({
      data: {
        name: "Default Key",
        key: `pk_${user.id}_${Math.random().toString(36).substring(2)}`,
        userId: user.id,
      },
    })

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

```

# src/app/api/v1/keys/route.ts

```ts
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { z } from "zod"
import { AuthService } from "@/lib/services/auth.service"
import { UserService } from "@/lib/services/user.service"

const createKeySchema = z.object({
  name: z.string().min(1, "Name is required"),
})

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const keys = await AuthService.listApiKeys(token.id)
    return NextResponse.json({ keys })
  } catch (error) {
    console.error("Error fetching API keys:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name } = createKeySchema.parse(body)

    const apiKey = await UserService.createApiKey(token.id, name)
    return NextResponse.json({ apiKey }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating API key:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const keyId = searchParams.get("id")

    if (!keyId) {
      return NextResponse.json(
        { message: "API key ID is required" },
        { status: 400 }
      )
    }

    await AuthService.deleteApiKey(token.id, keyId)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting API key:", error)
    if (error instanceof Error && error.message === "API key not found") {
      return NextResponse.json({ message: error.message }, { status: 404 })
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const keyId = searchParams.get("id")

    if (!keyId) {
      return NextResponse.json(
        { message: "API key ID is required" },
        { status: 400 }
      )
    }

    const newKey = await AuthService.rotateApiKey(token.id, keyId)
    return NextResponse.json({ apiKey: newKey })
  } catch (error) {
    console.error("Error rotating API key:", error)
    if (error instanceof Error && error.message === "API key not found") {
      return NextResponse.json({ message: error.message }, { status: 404 })
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

```

# src/app/api/v1/prompts/route.ts

```ts
import { PromptService } from "@/lib/services/prompt.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const createPromptSchema = z.object({
  name: z.string().min(1, "Name is required"),
  content: z.string().min(1, "Content is required"),
  description: z.string().optional(),
  tags: z.array(z.string()),
  model: z.enum(["gpt-4", "gpt-4o", "claude-3-5-sonnet-20241022"] as const),
  category: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = createPromptSchema.parse(body)

    const prompt = await PromptService.createPrompt({
      ...validatedData,
      userId: token.id,
    })

    return NextResponse.json(prompt, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")

    let prompts
    if (category) {
      prompts = await PromptService.getPromptsByCategory(token.id, category)
    } else if (tag) {
      prompts = await PromptService.getPromptsByTag(token.id, tag)
    } else {
      prompts = await PromptService.listPrompts(token.id)
    }

    return NextResponse.json(prompts)
  } catch (error) {
    console.error("Error fetching prompts:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

const updatePromptSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  model: z
    .enum(["gpt-4", "gpt-4o", "claude-3-5-sonnet-20241022"] as const)
    .optional(),
  category: z.string().optional(),
})

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const promptId = searchParams.get("id")

    if (!promptId) {
      return NextResponse.json(
        { message: "Prompt ID is required" },
        { status: 400 }
      )
    }

    const body = await req.json()
    const validatedData = updatePromptSchema.parse(body)

    const prompt = await PromptService.updatePrompt(
      promptId,
      token.id,
      validatedData
    )

    return NextResponse.json(prompt)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Error updating prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const promptId = searchParams.get("id")

    if (!promptId) {
      return NextResponse.json(
        { message: "Prompt ID is required" },
        { status: 400 }
      )
    }

    await PromptService.deletePrompt(promptId, token.id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

```

# src/app/api/v1/prompts/test/route.ts

```ts
import { prisma } from "@/lib/prisma"
import { PromptService } from "@/lib/services/prompt.service"
import { Prisma } from "@prisma/client"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { z } from "zod"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const testPromptSchema = z.object({
  promptId: z.string(),
  content: z.string(),
  model: z.enum(["gpt-4", "gpt-4o", "claude-3-5-sonnet-20241022"] as const),
})

type JsonMetrics = {
  responseTime: number
  tokenUsage: number
  success: boolean
  error: string | null
  cost: number
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { promptId, content, model } = testPromptSchema.parse(body)

    // Verify prompt ownership
    const prompt = await PromptService.getPromptById(promptId, token.id)
    if (!prompt) {
      return NextResponse.json({ message: "Prompt not found" }, { status: 404 })
    }

    const startTime = Date.now()
    let result: string
    let tokenUsage = 0
    let success = true
    let error: string | null = null

    try {
      switch (model) {
        case "gpt-4":
        case "gpt-4o": {
          const response = await openai.chat.completions.create({
            model,
            messages: [{ role: "user", content }],
          })
          result =
            response.choices[0]?.message?.content || "No response generated"
          tokenUsage = response.usage?.total_tokens || 0
          break
        }
        case "claude-3-5-sonnet-20241022": {
          // TODO: Implement Claude integration
          throw new Error("Claude integration not implemented yet")
        }
        default: {
          throw new Error(`Unsupported model: ${model}`)
        }
      }
    } catch (err) {
      success = false
      error = err instanceof Error ? err.message : "Unknown error occurred"
      result = "Error: " + error
    }

    const endTime = Date.now()
    const responseTime = endTime - startTime

    // Calculate cost based on token usage and model
    const costPerToken = model === "gpt-4" ? 0.00003 : 0.000002
    const cost = tokenUsage * costPerToken

    const testMetrics: JsonMetrics = {
      responseTime,
      tokenUsage,
      success,
      error,
      cost,
    }

    // Create test record
    await prisma.promptTest.create({
      data: {
        promptId,
        input: { content } as Prisma.JsonObject,
        output: result,
        metrics: testMetrics as Prisma.JsonObject,
      },
    })

    // Update prompt metrics
    const tests = await prisma.promptTest.findMany({
      where: { promptId },
      select: { metrics: true },
    })

    const totalTests = tests.length
    const avgResponseTime =
      tests.reduce(
        (sum: number, test) =>
          sum + (test.metrics as unknown as JsonMetrics).responseTime,
        0
      ) / totalTests
    const avgTokenUsage =
      tests.reduce(
        (sum: number, test) =>
          sum + (test.metrics as unknown as JsonMetrics).tokenUsage,
        0
      ) / totalTests
    const successCount = tests.filter(
      (test) => (test.metrics as unknown as JsonMetrics).success
    ).length
    const successRate = (successCount / totalTests) * 100
    const totalCost = tests.reduce(
      (sum: number, test) =>
        sum + ((test.metrics as unknown as JsonMetrics).cost || 0),
      0
    )

    const promptMetrics = {
      responseTime: avgResponseTime,
      tokenUsage: avgTokenUsage,
      success: successRate >= 50,
      error: null,
      cost: totalCost,
    } satisfies JsonMetrics

    await prisma.$executeRaw`
      UPDATE "Prompt"
      SET metrics = ${promptMetrics as unknown as Prisma.JsonObject}
      WHERE id = ${promptId}
    `

    return NextResponse.json({
      result,
      metrics: testMetrics,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Error testing prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/fonts/GeistMonoVF.woff

This is a binary file of the type: Binary

# src/app/fonts/GeistVF.woff

This is a binary file of the type: Binary

# src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, Helvetica, sans-serif;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

# src/app/layout.tsx

```tsx
import { MainNav } from "@/components/main-nav"
import { SessionProvider } from "@/components/session-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { UserNav } from "@/components/user-nav"
import { PromptProvider } from "@/contexts/prompt-context"
import { authOptions } from "@/lib/auth"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import "./globals.css"

export const metadata: Metadata = {
  title: "PromptForge",
  description: "Modern prompt management application for AI development",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PromptProvider>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative flex min-h-screen flex-col">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="container flex h-14 items-center">
                    <div className="mr-4 flex items-center space-x-2">
                      <span className="font-bold">PromptForge</span>
                    </div>
                    <MainNav />
                    <div className="ml-auto flex items-center space-x-4">
                      <UserNav />
                    </div>
                  </div>
                </header>
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </ThemeProvider>
          </SessionProvider>
        </PromptProvider>
      </body>
    </html>
  )
}

```

# src/app/login/page.tsx

```tsx
"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setErrorMessage("Invalid email or password")
                return
            }

            router.push("/prompts")
        } catch (err) {
            console.error("Login error:", err)
            setErrorMessage("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to sign in
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errorMessage && (
                            <div className="text-sm text-destructive text-center">
                                {errorMessage}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-primary hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

```

# src/app/page.tsx

```tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePrompt } from "@/contexts/prompt-context"

export default function Home() {
  const { prompts } = usePrompt()

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    if (minutes > 0) return `${minutes} min ago`
    return "just now"
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage and optimize your AI prompts
          </p>
        </div>
        <Link href="/prompts/new">
          <Button>New Prompt</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link href="/prompts/new" className="block">
              <Button variant="outline" className="w-full justify-start">
                Create New Prompt
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start">
              Import Prompts
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Test Environment
            </Button>
          </div>
        </div>

        {/* Recent Prompts */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Recent Prompts</h3>
          <div className="space-y-2">
            {prompts.length > 0 ? (
              prompts
                .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                .slice(0, 3)
                .map((prompt) => (
                  <div
                    key={prompt.id}
                    className="flex items-center justify-between p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <span>{prompt.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {formatTimeAgo(prompt.updatedAt)}
                    </span>
                  </div>
                ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No prompts created yet
              </p>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Response Time
                </span>
                <span className="text-sm font-medium">1.2s avg</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full w-3/4"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Success Rate
                </span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full w-[92%]"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Token Usage
                </span>
                <span className="text-sm font-medium">45.2k/100k</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

```

# src/app/prompts/[id]/page.tsx

```tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authOptions } from "@/lib/auth"
import { PromptService } from "@/lib/services/prompt.service"
import { AIService } from "@/lib/services/ai.service"
import { PromptTester } from "@/components/prompt-tester"

interface PromptDetailPageProps {
    params: {
        id: string
    }
}

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

interface PromptMetrics {
    responseTime: number
    tokenUsage: number
    successRate: number
    cost: number
}

interface DatabasePrompt {
    id: string
    name: string
    content: string
    description: string | null
    model: string
    tags: string[]
    category: string | null
    metrics: JsonValue
    createdAt: Date
    updatedAt: Date
    userId: string
    teamId: string | null
    versions: Array<{
        id: string
        content: string
        description: string | null
        model: string
        createdAt: Date
        metrics: JsonValue
        promptId: string
    }>
}

function parseMetrics(metricsJson: JsonValue): PromptMetrics {
    const metrics = metricsJson as Record<string, number>
    return {
        responseTime: metrics?.responseTime || 0,
        tokenUsage: metrics?.tokenUsage || 0,
        successRate: metrics?.successRate || 0,
        cost: metrics?.cost || 0,
    }
}

export default async function PromptDetailPage({ params }: PromptDetailPageProps) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/login")
    }

    const rawPrompt = await PromptService.getPromptById(params.id, session.user.id) as unknown as DatabasePrompt
    const prompt = {
        ...rawPrompt,
        metrics: parseMetrics(rawPrompt.metrics),
    }
    const suggestions = await AIService.suggestImprovements(prompt.content)
    const testCases = await AIService.generateTestCases(prompt.content)

    // Extract variables from prompt content
    const variableRegex = /{{([^}]+)}}/g
    const matches = [...prompt.content.matchAll(variableRegex)]
    const variables = matches.map(match => ({
        name: match[1],
        description: null,
        required: true,
        defaultValue: null,
    }))

    return (
        <div className="container py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2">
                        <Link href="/prompts">
                            <Button variant="ghost" size="sm">
                                ← Back
                            </Button>
                        </Link>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {prompt.name}
                        </h2>
                    </div>
                    <p className="text-muted-foreground mt-2">
                        {prompt.description || "No description"}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Delete</Button>
                    <Button>Edit Prompt</Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Prompt Content</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="font-mono text-sm whitespace-pre-wrap bg-muted p-4 rounded-md">
                                {prompt.content}
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {prompt.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Version History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {prompt.versions.map((version, index) => (
                                    <div
                                        key={version.id}
                                        className="border rounded-lg p-4"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium">
                                                Version {prompt.versions.length - index}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {new Date(version.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="font-mono text-sm whitespace-pre-wrap bg-muted p-4 rounded-md">
                                            {version.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <PromptTester
                        promptId={prompt.id}
                        content={prompt.content}
                        model={prompt.model}
                        variables={variables}
                    />

                    <Card>
                        <CardHeader>
                            <CardTitle>AI Suggestions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm dark:prose-invert">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: suggestions.replace(/\n/g, "<br />"),
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Test Cases</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm dark:prose-invert">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: testCases.replace(/\n/g, "<br />"),
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Response Time
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.responseTime}ms
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Token Usage
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.tokenUsage}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Success Rate
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.successRate}%
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Cost
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        ${prompt.metrics.cost.toFixed(4)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

```

# src/app/prompts/new/page.tsx

```tsx
"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AIService } from "@/lib/services/ai.service"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface AIAnalysis {
    category: string
    tags: string[]
    suggestedName: string
    description: string
}

export default function NewPrompt() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [aiSuggestions, setAiSuggestions] = useState<string | null>(null)
    const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        content: "",
        description: "",
        tags: "",
        model: "gpt-4" as const,
    })

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const analyzePrompt = async () => {
        if (!formData.content) return

        setIsAnalyzing(true)
        setError(null)

        try {
            const analysis = await AIService.analyzePrompt(formData.content)
            setAiAnalysis(analysis)
            setFormData(prev => ({
                ...prev,
                name: analysis.suggestedName,
                description: analysis.description,
                tags: analysis.tags.join(", "),
            }))

            const suggestions = await AIService.suggestImprovements(formData.content)
            setAiSuggestions(suggestions)
        } catch (err) {
            setError("Failed to analyze prompt")
            console.error(err)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleSave = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("/api/v1/prompts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(",").map(tag => tag.trim()),
                    category: aiAnalysis?.category || "Uncategorized",
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to save prompt")
            }

            router.push("/prompts")
        } catch (err) {
            setError("Failed to save prompt")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create New Prompt</h2>
                    <p className="text-muted-foreground">
                        Design and test your AI prompt
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href="/">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Prompt"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Editor Section */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Prompt Editor</CardTitle>
                            <CardDescription>
                                Write your prompt and let AI help you optimize it
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full min-h-[300px] p-4 bg-background resize-none border rounded-md"
                                    placeholder="Write your prompt here..."
                                />
                                <Button
                                    onClick={analyzePrompt}
                                    disabled={isAnalyzing || !formData.content}
                                    className="w-full"
                                >
                                    {isAnalyzing ? "Analyzing..." : "Analyze & Improve"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Prompt Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter prompt name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-background border rounded-md"
                                    rows={3}
                                    placeholder="Enter prompt description"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tags</label>
                                <Input
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="Add tags (comma separated)"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Model</label>
                                <select
                                    name="model"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-background border rounded-md"
                                >
                                    <option value="gpt-4">GPT-4</option>
                                    <option value="gpt-4o">GPT-4o</option>
                                    <option value="claude-3-5-sonnet-20241022">Claude</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* AI Analysis Section */}
                <div className="space-y-4">
                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {aiAnalysis && (
                        <Card>
                            <CardHeader>
                                <CardTitle>AI Analysis</CardTitle>
                                <CardDescription>
                                    Automatic analysis of your prompt
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Category</label>
                                    <p className="mt-1 text-muted-foreground">
                                        {aiAnalysis.category}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Suggested Tags
                                    </label>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {aiAnalysis.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {aiSuggestions && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Improvement Suggestions</CardTitle>
                                <CardDescription>
                                    AI-generated suggestions to enhance your prompt
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm dark:prose-invert">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: aiSuggestions.replace(
                                                /\n/g,
                                                "<br />"
                                            ),
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

```

# src/app/prompts/page.tsx

```tsx
import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/auth"
import { PromptService } from "@/lib/services/prompt.service"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

interface PromptMetrics {
    responseTime: number
    tokenUsage: number
    successRate: number
    cost: number
    [key: string]: number
}

interface PromptWithMetrics {
    id: string
    name: string
    content: string
    description: string | null
    model: string
    tags: string[]
    category: string | null
    metrics: PromptMetrics
    createdAt: string
    updatedAt: string
    versions: Array<{
        id: string
        content: string
        description: string | null
        model: string
        createdAt: string
    }>
}

type RawPromptData = {
    id: string,
    name: string,
    content: string,
    description: string | null,
    model: string,
    tags: string[],
    category: string | null,
    metrics: JsonValue,
    createdAt: Date,
    updatedAt: Date,
    versions: Array<{
        id: string
        content: string
        description: string | null
        model: string
        createdAt: Date
        metrics: JsonValue
        promptId: string
    }>
}

function formatDate(dateString: string | Date) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

function parseMetrics(metricsJson: JsonValue): PromptMetrics {
    const metrics = (metricsJson as Record<string, number>) || {}
    return {
        responseTime: metrics.responseTime || 0,
        tokenUsage: metrics.tokenUsage || 0,
        successRate: metrics.successRate || 0,
        cost: metrics.cost || 0,
    }
}

export default async function PromptsPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/login")
    }

    const { prompts: rawPrompts } = (await PromptService.listPrompts(
        session.user.id
    )) as unknown as {
        prompts: RawPromptData[],
        pagination: { page: number; limit: number; total: number; pages: number }
    }

    const prompts: PromptWithMetrics[] = rawPrompts.map(prompt => ({
        id: prompt.id,
        name: prompt.name,
        content: prompt.content,
        description: prompt.description,
        model: prompt.model,
        tags: prompt.tags,
        category: prompt.category,
        metrics: parseMetrics(prompt.metrics),
        createdAt: prompt.createdAt.toISOString(),
        updatedAt: prompt.updatedAt.toISOString(),
        versions: prompt.versions.map(v => ({
            id: v.id,
            content: v.content,
            description: v.description,
            model: v.model,
            createdAt: v.createdAt.toISOString(),
        })),
    }))

    return (
        <div className="container py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Prompts</h2>
                    <p className="text-muted-foreground">
                        Manage and organize your AI prompts
                    </p>
                </div>
                <Link href="/prompts/new">
                    <Button>Create New Prompt</Button>
                </Link>
            </div>

            <div className="grid gap-6">
                {prompts.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold mb-2">No prompts found</h3>
                        <p className="text-muted-foreground mb-4">
                            Get started by creating your first prompt
                        </p>
                        <Link href="/prompts/new">
                            <Button>Create New Prompt</Button>
                        </Link>
                    </div>
                ) : (
                    prompts.map((prompt) => (
                        <div
                            key={prompt.id}
                            className="border rounded-lg p-6 bg-card hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{prompt.name}</h3>
                                    <p className="text-muted-foreground mb-4">
                                        {prompt.description || "No description"}
                                    </p>
                                </div>
                                <Link href={`/prompts/${prompt.id}`}>
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {prompt.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div>Model: {prompt.model}</div>
                                <div>Category: {prompt.category || "Uncategorized"}</div>
                                <div>Updated: {formatDate(prompt.updatedAt)}</div>
                                <div>
                                    Versions: {prompt.versions ? prompt.versions.length : 0}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t grid grid-cols-4 gap-4">
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Response Time
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.responseTime}ms
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Token Usage
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.tokenUsage}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Success Rate
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.successRate}%
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Cost
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        ${prompt.metrics.cost.toFixed(4)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

```

# src/app/register/page.tsx

```tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage(null)

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match")
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || "Registration failed")
            }

            router.push("/login?registered=true")
        } catch (err) {
            console.error("Registration error:", err)
            setErrorMessage(
                err instanceof Error ? err.message : "Registration failed"
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errorMessage && (
                            <div className="text-sm text-destructive text-center">
                                {errorMessage}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Input
                                id="name"
                                name="name"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Create account"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-primary hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

```

# src/app/settings/page.tsx

```tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AuthService } from "@/lib/services/auth.service"
import { ApiKeyList } from "@/components/api-key-list"

interface ApiKeyWithDates {
    id: string
    name: string
    key: string
    createdAt: Date
    lastUsed: Date | null
    expiresAt: Date | null
}

function formatDate(date: Date | null): string {
    if (!date) return ""
    return date.toISOString()
}

function transformApiKeys(keys: ApiKeyWithDates[]) {
    return keys.map(key => ({
        ...key,
        createdAt: formatDate(key.createdAt),
        lastUsed: formatDate(key.lastUsed),
        expiresAt: formatDate(key.expiresAt),
    }))
}

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/login")
    }

    const apiKeys = await AuthService.listApiKeys(session.user.id)
    const formattedKeys = transformApiKeys(apiKeys)

    return (
        <div className="container py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and API keys
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                <div className="space-y-6">
                    <div className="text-lg font-semibold">API Access</div>
                    <ApiKeyList initialKeys={formattedKeys} />
                </div>

                <div className="space-y-6">
                    <div className="text-lg font-semibold">Account Settings</div>
                    <div className="rounded-lg border bg-card">
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            readOnly
                                            value={session.user.email || ""}
                                            className="w-full px-3 py-2 bg-muted border rounded-md text-muted-foreground"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Name</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            readOnly
                                            value={session.user.name || ""}
                                            className="w-full px-3 py-2 bg-muted border rounded-md text-muted-foreground"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="text-lg font-semibold">Usage & Billing</div>
                    <div className="rounded-lg border bg-card">
                        <div className="p-6">
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        API Requests
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">0</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Active Prompts
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">0</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Team Members
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

```

# src/components/api-key-list.tsx

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface ApiKey {
    id: string
    name: string
    key: string
    createdAt: string
    lastUsed?: string
}

interface ApiKeyListProps {
    initialKeys: ApiKey[]
}

export function ApiKeyList({ initialKeys }: ApiKeyListProps) {
    const [keys, setKeys] = useState<ApiKey[]>(initialKeys)
    const [isLoading, setIsLoading] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleCreateKey = async (name: string) => {
        try {
            setIsLoading("create")
            const response = await fetch("/api/v1/keys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            })

            if (!response.ok) throw new Error("Failed to create API key")

            const { apiKey } = await response.json()
            setKeys((prev) => [apiKey, ...prev])
        } catch {
            setError("Failed to create API key")
        } finally {
            setIsLoading(null)
        }
    }

    const handleRotateKey = async (keyId: string) => {
        try {
            setIsLoading(keyId)
            const response = await fetch(`/api/v1/keys?id=${keyId}`, {
                method: "PUT",
            })

            if (!response.ok) throw new Error("Failed to rotate API key")

            const { apiKey } = await response.json()
            setKeys((prev) =>
                prev.map((key) => (key.id === keyId ? apiKey : key))
            )
        } catch {
            setError("Failed to rotate API key")
        } finally {
            setIsLoading(null)
        }
    }

    const handleDeleteKey = async (keyId: string) => {
        try {
            setIsLoading(keyId)
            const response = await fetch(`/api/v1/keys?id=${keyId}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete API key")

            setKeys((prev) => prev.filter((key) => key.id !== keyId))
        } catch {
            setError("Failed to delete API key")
        } finally {
            setIsLoading(null)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                    Manage your API keys for accessing PromptForge programmatically
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <Button
                            onClick={() => handleCreateKey("Default")}
                            disabled={isLoading === "create"}
                        >
                            {isLoading === "create" ? "Creating..." : "Create API Key"}
                        </Button>
                    </div>

                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {keys.map((key) => (
                            <div
                                key={key.id}
                                className="flex items-center justify-between p-4 border rounded-lg bg-card"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium">{key.name}</p>
                                    <p className="text-sm text-muted-foreground font-mono">
                                        {key.key}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Created:{" "}
                                        {new Date(key.createdAt).toLocaleDateString()}
                                        {key.lastUsed &&
                                            ` • Last used: ${new Date(
                                                key.lastUsed
                                            ).toLocaleDateString()}`}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRotateKey(key.id)}
                                        disabled={isLoading === key.id}
                                    >
                                        {isLoading === key.id ? "Rotating..." : "Rotate"}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDeleteKey(key.id)}
                                        disabled={isLoading === key.id}
                                    >
                                        {isLoading === key.id ? "Deleting..." : "Delete"}
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {keys.length === 0 && (
                            <div className="text-center py-6 text-muted-foreground">
                                No API keys found. Create one to get started.
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

```

# src/components/main-nav.tsx

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
    {
        href: "/prompts",
        label: "Prompts",
    },
    {
        href: "/prompts/new",
        label: "Create",
    },
]

export function MainNav() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center space-x-4 lg:space-x-6">
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href
                            ? "text-foreground"
                            : "text-muted-foreground"
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}

```

# src/components/prompt-tester.tsx

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface PromptVariable {
    name: string
    description: string | null
    required: boolean
    defaultValue: string | null
}

interface PromptTesterProps {
    promptId: string
    content: string
    model: string
    variables: PromptVariable[]
}

export function PromptTester({ promptId, content, model, variables }: PromptTesterProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<string | null>(null)
    const [variableValues, setVariableValues] = useState<Record<string, string>>(() => {
        const initialValues: Record<string, string> = {}
        variables.forEach((variable) => {
            initialValues[variable.name] = variable.defaultValue || ""
        })
        return initialValues
    })

    const handleInputChange = (name: string, value: string) => {
        setVariableValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleTest = async () => {
        try {
            setIsLoading(true)
            setError(null)
            setResult(null)

            // Validate required variables
            const missingVariables = variables
                .filter((v) => v.required && !variableValues[v.name])
                .map((v) => v.name)

            if (missingVariables.length > 0) {
                setError(`Missing required variables: ${missingVariables.join(", ")}`)
                return
            }

            // Replace variables in prompt content
            let processedContent = content
            Object.entries(variableValues).forEach(([name, value]) => {
                processedContent = processedContent.replace(
                    new RegExp(`{{${name}}}`, "g"),
                    value
                )
            })

            const response = await fetch("/api/v1/prompts/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    promptId,
                    content: processedContent,
                    model,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to test prompt")
            }

            const data = await response.json()
            setResult(data.result)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Test Prompt</CardTitle>
                <CardDescription>
                    Fill in the variables below to test your prompt
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {variables.length > 0 ? (
                        <div className="grid gap-4">
                            {variables.map((variable) => (
                                <div key={variable.name}>
                                    <label className="text-sm font-medium">
                                        {variable.name}
                                        {variable.required && (
                                            <span className="text-destructive">*</span>
                                        )}
                                    </label>
                                    {variable.description && (
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {variable.description}
                                        </p>
                                    )}
                                    <Input
                                        value={variableValues[variable.name]}
                                        onChange={(e) =>
                                            handleInputChange(variable.name, e.target.value)
                                        }
                                        placeholder={`Enter ${variable.name}`}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            This prompt has no variables to configure.
                        </p>
                    )}

                    <div className="flex justify-end">
                        <Button onClick={handleTest} disabled={isLoading}>
                            {isLoading ? "Testing..." : "Test Prompt"}
                        </Button>
                    </div>

                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="space-y-2">
                            <div className="font-medium">Result:</div>
                            <div className="font-mono text-sm whitespace-pre-wrap bg-muted p-4 rounded-md">
                                {result}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

```

# src/components/session-provider.tsx

```tsx
"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

interface SessionProviderProps {
    children: React.ReactNode
    session: any // NextAuth doesn't export the session type properly
}

export function SessionProvider({ children, session }: SessionProviderProps) {
    return (
        <NextAuthSessionProvider session={session}>
            {children}
        </NextAuthSessionProvider>
    )
}

```

# src/components/theme-provider.tsx

```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
    children: React.ReactNode
} & Parameters<typeof NextThemesProvider>[0]

export function ThemeProvider({
    children,
    ...props
}: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

```

# src/components/theme-toggle.tsx

```tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

```

# src/components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

# src/components/ui/card.tsx

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
}

```

# src/components/ui/dropdown-menu.tsx

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
}

```

# src/components/ui/input.tsx

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = "Input"

export { Input }

```

# src/components/user-nav.tsx

```tsx
"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function UserNav() {
    const { data: session } = useSession()

    if (!session?.user) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/login">
                    <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/register">
                    <Button>Sign Up</Button>
                </Link>
            </div>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {session.user.name?.[0] || session.user.email?.[0] || "?"}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/prompts">Prompts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => signOut({ callbackUrl: "/" })}
                >
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

```

# src/contexts/prompt-context.tsx

```tsx
"use client"

import {
    LLMModel,
    Prompt,
    PromptContextType,
    PromptTestResult,
    PromptVersion,
} from "@/types/prompt"
import React, { createContext, useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const PromptContext = createContext<PromptContextType | undefined>(undefined)

export function PromptProvider({ children }: { children: React.ReactNode }) {
    const [prompts, setPrompts] = useState<Prompt[]>([])
    const [currentPrompt, setCurrentPrompt] = useState<Prompt>()

    const createPrompt = async (
        promptData: Omit<
            Prompt,
            "id" | "createdAt" | "updatedAt" | "versions" | "metrics"
        >
    ): Promise<Prompt> => {
        const now = new Date()
        const newPrompt: Prompt = {
            id: uuidv4(),
            ...promptData,
            createdAt: now,
            updatedAt: now,
            versions: [],
            metrics: {
                responseTime: 0,
                tokenUsage: 0,
                successRate: 0,
                cost: 0,
            },
        }

        setPrompts((prev) => [...prev, newPrompt])
        return newPrompt
    }

    const updatePrompt = async (
        id: string,
        updates: Partial<Prompt>
    ): Promise<Prompt> => {
        const updatedPrompts = prompts.map((prompt) => {
            if (prompt.id === id) {
                const updatedPrompt = {
                    ...prompt,
                    ...updates,
                    updatedAt: new Date(),
                }
                if (currentPrompt?.id === id) {
                    setCurrentPrompt(updatedPrompt)
                }
                return updatedPrompt
            }
            return prompt
        })

        setPrompts(updatedPrompts)
        const updatedPrompt = updatedPrompts.find((p) => p.id === id)
        if (!updatedPrompt) throw new Error("Prompt not found")
        return updatedPrompt
    }

    const deletePrompt = async (id: string): Promise<void> => {
        setPrompts((prev) => prev.filter((prompt) => prompt.id !== id))
        if (currentPrompt?.id === id) {
            setCurrentPrompt(undefined)
        }
    }

    const testPrompt = async (
        content: string,
        model: LLMModel,
        variables?: Record<string, string>
    ): Promise<PromptTestResult> => {
        // TODO: Implement actual API call to test prompt
        // This is a mock implementation
        const startTime = Date.now()
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

        // Use the parameters to simulate different responses
        const processedContent = variables
            ? Object.entries(variables).reduce(
                (text, [key, value]) => text.replace(`{${key}}`, value),
                content
            )
            : content

        const metrics = {
            responseTime: (Date.now() - startTime) / 1000,
            tokenUsage: Math.floor(processedContent.length / 4),
            successRate: 1,
            cost: (processedContent.length / 1000) * 0.02,
            lastTested: new Date(),
        }

        return {
            response: `Response for model ${model}: ${processedContent.substring(0, 100)}...`,
            metrics,
        }
    }

    const createVersion = async (
        promptId: string,
        versionData: Omit<PromptVersion, "id" | "createdAt">
    ): Promise<PromptVersion> => {
        const newVersion: PromptVersion = {
            id: uuidv4(),
            ...versionData,
            createdAt: new Date(),
        }

        const updatedPrompts = prompts.map((prompt) => {
            if (prompt.id === promptId) {
                const updatedPrompt = {
                    ...prompt,
                    versions: [...prompt.versions, newVersion],
                    updatedAt: new Date(),
                }
                if (currentPrompt?.id === promptId) {
                    setCurrentPrompt(updatedPrompt)
                }
                return updatedPrompt
            }
            return prompt
        })

        setPrompts(updatedPrompts)
        return newVersion
    }

    return (
        <PromptContext.Provider
            value={{
                prompts,
                currentPrompt,
                createPrompt,
                updatePrompt,
                deletePrompt,
                testPrompt,
                createVersion,
            }}
        >
            {children}
        </PromptContext.Provider>
    )
}

export function usePrompt() {
    const context = useContext(PromptContext)
    if (context === undefined) {
        throw new Error("usePrompt must be used within a PromptProvider")
    }
    return context
}

```

# src/lib/auth.ts

```ts
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "name@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name || "",
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
}

```

# src/lib/prisma.ts

```ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

```

# src/lib/services/ai.service.ts

```ts
import { AIAnalysis, LLMModel } from "@/types/prompt"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export class AIService {
  static async generateCompletion(prompt: string, model: LLMModel = "gpt-4") {
    try {
      if (model.startsWith("gpt")) {
        const response = await openai.chat.completions.create({
          model,
          messages: [{ role: "user", content: prompt }],
        })
        return response.choices[0]?.message?.content || ""
      } else if (model.startsWith("claude")) {
        // TODO: Implement Claude integration when needed
        throw new Error("Claude integration not implemented yet")
      }
      throw new Error(`Unsupported model: ${model}`)
    } catch (error) {
      console.error("Error generating completion:", error)
      throw error
    }
  }

  static async analyzePrompt(content: string): Promise<AIAnalysis> {
    const prompt = `
      Analyze this prompt and provide insights in JSON format:
      ---
      ${content}
      ---
      Return a JSON object with:
      - suggestedName: A concise name for the prompt
      - description: A clear description of what the prompt does
      - category: The primary category this prompt belongs to
      - tags: An array of relevant tags (max 5)
      - confidence: A number between 0 and 1 indicating analysis confidence
      - suggestions: An array of improvement suggestions
    `
    const response = await this.generateCompletion(prompt, "gpt-4")
    try {
      return JSON.parse(response) as AIAnalysis
    } catch (error) {
      console.error("Error parsing AI analysis:", error)
      return {
        suggestedName: "Untitled Prompt",
        description: "No description available",
        category: "Uncategorized",
        tags: [],
        confidence: 0,
        suggestions: ["Could not analyze prompt"],
      }
    }
  }

  static async suggestImprovements(content: string): Promise<string> {
    const prompt = `
      Analyze this prompt and suggest improvements:
      ---
      ${content}
      ---
      Consider:
      1. Clarity and specificity
      2. Context and background information
      3. Constraints and requirements
      4. Examples or references
      5. Potential ambiguities or edge cases

      Format your response as a bulleted list with clear, actionable suggestions.
    `
    const response = await this.generateCompletion(prompt, "gpt-4")
    return response || "Could not generate improvements"
  }

  static async generateTestCases(content: string): Promise<string> {
    const prompt = `
      Generate test cases for this prompt:
      ---
      ${content}
      ---
      Include:
      1. Happy path scenarios
      2. Edge cases
      3. Error cases
      4. Different input variations
      5. Expected outputs

      Format your response as a numbered list with clear test scenarios and expected outcomes.
    `
    const response = await this.generateCompletion(prompt, "gpt-4")
    return response || "Could not generate test cases"
  }

  static async analyzePromptMetrics(metrics: unknown): Promise<string> {
    const prompt = `
      Analyze these prompt metrics and provide insights:
      ---
      ${JSON.stringify(metrics, null, 2)}
      ---
      Consider:
      1. Performance trends
      2. Success rate patterns
      3. Cost efficiency
      4. Areas for optimization
      5. Recommendations for improvement

      Format your response as a clear analysis with sections for each consideration.
    `
    const response = await this.generateCompletion(prompt, "gpt-4")
    return response || "Could not analyze metrics"
  }

  static async categorizePrompt(content: string): Promise<{
    category: string
    tags: string[]
    confidence: number
  }> {
    const prompt = `
      Analyze this prompt and suggest appropriate categories and tags:
      ---
      ${content}
      ---
      Return a JSON object with:
      - category: The primary category
      - tags: An array of relevant tags (max 5)
      - confidence: A number between 0 and 1 indicating confidence
    `
    const response = await this.generateCompletion(prompt, "gpt-4")
    try {
      return JSON.parse(response) as {
        category: string
        tags: string[]
        confidence: number
      }
    } catch (error) {
      console.error("Error parsing categorization:", error)
      return {
        category: "Uncategorized",
        tags: [],
        confidence: 0,
      }
    }
  }
}

```

# src/lib/services/auth.service.ts

```ts
import { prisma } from "@/lib/prisma"
import { UserService } from "@/lib/services/user.service"
import bcrypt from "bcryptjs"

export interface ApiKeyWithDates {
  id: string
  name: string
  key: string
  createdAt: Date
  lastUsed: Date | null
  expiresAt: Date | null
}

export class AuthService {
  static async validateCredentials(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    })

    if (!user || !user.password) {
      return null
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return null
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static async register(data: {
    name: string
    email: string
    password: string
  }) {
    try {
      const user = await UserService.createUser(data)
      return user
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Registration failed")
    }
  }

  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        password: true,
      },
    })

    if (!user || !user.password) {
      throw new Error("User not found")
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      throw new Error("Current password is incorrect")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    })
  }

  static async resetPassword(userId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    })
  }

  static async validateApiKey(key: string) {
    const apiKey = await prisma.apiKey.findUnique({
      where: { key },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!apiKey) {
      return null
    }

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: {
        lastUsed: new Date(),
      },
    })

    return {
      id: apiKey.id,
      name: apiKey.name,
      user: apiKey.user,
    }
  }

  static async listApiKeys(userId: string): Promise<ApiKeyWithDates[]> {
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        key: true,
        createdAt: true,
        lastUsed: true,
        expiresAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return apiKeys
  }

  static async createApiKey(
    userId: string,
    name: string,
    expiresInDays?: number
  ) {
    const apiKey = await prisma.apiKey.create({
      data: {
        name,
        key: `pk_${userId}_${Math.random().toString(36).substring(2)}`,
        userId,
        expiresAt: expiresInDays
          ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
          : null,
      },
    })

    return apiKey
  }

  static async deleteApiKey(id: string, userId: string) {
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!apiKey) {
      throw new Error("API key not found")
    }

    await prisma.apiKey.delete({
      where: { id },
    })
  }

  static async rotateApiKey(id: string, userId: string) {
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!apiKey) {
      throw new Error("API key not found")
    }

    const updatedApiKey = await prisma.apiKey.update({
      where: { id },
      data: {
        key: `pk_${userId}_${Math.random().toString(36).substring(2)}`,
        lastUsed: null,
      },
    })

    return updatedApiKey
  }
}

```

# src/lib/services/prompt.service.ts

```ts
import { prisma } from "@/lib/prisma"
import { AIService } from "@/lib/services/ai.service"
import { Prompt, LLMModel } from "@/types/prompt"
import { Prisma } from "@prisma/client"

export interface ListPromptsOptions {
  category?: string
  tag?: string
  search?: string
  page?: number
  limit?: number
}

export class PromptService {
  static async createPrompt(data: {
    name: string
    content: string
    description?: string | null
    model: LLMModel
    tags: string[]
    category?: string | null
    userId: string
    teamId?: string | null
  }) {
    const prompt = await prisma.prompt.create({
      data: {
        ...data,
        versions: {
          create: {
            content: data.content,
            description: data.description,
            model: data.model,
          },
        },
      },
      include: {
        versions: true,
      },
    })

    return prompt
  }

  static async getPromptById(id: string, userId: string) {
    const prompt = await prisma.prompt.findFirst({
      where: {
        id,
        OR: [
          { userId },
          {
            team: {
              members: {
                some: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        versions: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })

    return prompt
  }

  static async getPrompts(userId: string) {
    const prompts = await prisma.prompt.findMany({
      where: {
        OR: [
          { userId },
          {
            team: {
              members: {
                some: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        versions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return prompts
  }

  static async listPrompts(userId: string, options: ListPromptsOptions = {}) {
    const { category, tag, search, page = 1, limit = 10 } = options
    const skip = (page - 1) * limit

    const baseWhere: Prisma.PromptWhereInput = {
      OR: [
        { userId },
        {
          team: {
            members: {
              some: {
                id: userId,
              },
            },
          },
        },
      ],
    }

    if (category) {
      baseWhere.category = category
    }

    if (tag) {
      baseWhere.tags = { has: tag }
    }

    if (search) {
      baseWhere.OR = [
        ...(baseWhere.OR || []),
        {
          name: { contains: search, mode: "insensitive" as Prisma.QueryMode },
        },
        {
          description: {
            contains: search,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
      ]
    }

    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where: baseWhere,
        include: {
          versions: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.prompt.count({ where: baseWhere }),
    ])

    return {
      prompts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  static async getPromptsByCategory(userId: string, category: string) {
    return this.listPrompts(userId, { category })
  }

  static async getPromptsByTag(userId: string, tag: string) {
    return this.listPrompts(userId, { tag })
  }

  static async updatePrompt(
    id: string,
    userId: string,
    data: {
      name?: string
      content?: string
      description?: string | null
      model?: LLMModel
      tags?: string[]
      category?: string | null
      teamId?: string | null
    }
  ) {
    const prompt = await prisma.prompt.findFirst({
      where: {
        id,
        OR: [
          { userId },
          {
            team: {
              members: {
                some: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
    })

    if (!prompt) {
      throw new Error("Prompt not found")
    }

    const updatedPrompt = await prisma.prompt.update({
      where: { id },
      data: {
        ...data,
        ...(data.content && {
          versions: {
            create: {
              content: data.content,
              description: data.description,
              model: data.model || prompt.model,
            },
          },
        }),
      },
      include: {
        versions: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })

    return updatedPrompt
  }

  static async deletePrompt(id: string, userId: string) {
    const prompt = await prisma.prompt.findFirst({
      where: {
        id,
        OR: [
          { userId },
          {
            team: {
              members: {
                some: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
    })

    if (!prompt) {
      throw new Error("Prompt not found")
    }

    await prisma.prompt.delete({
      where: { id },
    })
  }
}

```

# src/lib/services/user.service.ts

```ts
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { Prisma } from "@prisma/client"

export class UserService {
  static async createUser(data: {
    name: string
    email: string
    password: string
  }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new Error("Email already registered")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    })

    // Create default API key
    await prisma.apiKey.create({
      data: {
        name: "Default Key",
        key: `pk_${user.id}_${Math.random().toString(36).substring(2)}`,
        userId: user.id,
      },
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        apiKeys: {
          select: {
            id: true,
            name: true,
            key: true,
            createdAt: true,
          },
        },
        teams: {
          select: {
            team: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      throw new Error("User not found")
    }

    return {
      ...user,
      teams: user.teams.map((membership) => membership.team),
    }
  }

  static async updateUser(
    id: string,
    data: {
      name?: string
      email?: string
      password?: string
    }
  ) {
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: { id },
        },
      })

      if (existingUser) {
        throw new Error("Email already in use")
      }
    }

    const updateData: any = { ...data }
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10)
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return user
  }

  static async deleteUser(id: string) {
    await prisma.user.delete({
      where: { id },
    })
  }

  static async createApiKey(userId: string, name: string) {
    const apiKey = await prisma.apiKey.create({
      data: {
        name,
        key: `pk_${userId}_${Math.random().toString(36).substring(2)}`,
        userId,
      },
    })

    return apiKey
  }

  static async deleteApiKey(id: string, userId: string) {
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!apiKey) {
      throw new Error("API key not found")
    }

    await prisma.apiKey.delete({
      where: { id },
    })
  }

  static async getApiKeys(userId: string) {
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        key: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return apiKeys
  }
}

```

# src/lib/utils.ts

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# src/middleware.ts

```ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add CORS headers for API routes
    if (req.nextUrl.pathname.startsWith("/api/")) {
      const response = NextResponse.next()
      response.headers.append("Access-Control-Allow-Origin", "*")
      response.headers.append(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      )
      response.headers.append(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      )
      return response
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/prompts/:path*",
    "/settings/:path*",
    "/api/v1/:path*",
    "/api/auth/register",
  ],
}

```

# src/types/next-auth.d.ts

```ts
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    name: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}

```

# src/types/prompt.ts

```ts
export type LLMModel = "gpt-4" | "gpt-4o" | "claude-3-5-sonnet-20241022"

export interface Prompt {
  id: string
  name: string
  content: string
  description: string | null
  model: LLMModel
  tags: string[]
  category: string | null
  metrics: PromptMetrics | null
  createdAt: Date
  updatedAt: Date
  userId: string
  teamId: string | null
  versions: PromptVersion[]
}

export interface PromptVersion {
  id: string
  content: string
  description: string | null
  model: LLMModel
  createdAt: Date
  metrics: PromptMetrics | null
  promptId: string
}

export interface PromptMetrics {
  responseTime: number
  tokenUsage: number
  successRate: number
  cost: number
}

export interface PromptTestResult {
  response: string
  metrics: PromptMetrics
}

export interface PromptContextType {
  prompts: Prompt[]
  currentPrompt: Prompt | undefined
  createPrompt: (
    promptData: Omit<
      Prompt,
      "id" | "createdAt" | "updatedAt" | "versions" | "metrics"
    >
  ) => Promise<Prompt>
  updatePrompt: (id: string, updates: Partial<Prompt>) => Promise<Prompt>
  deletePrompt: (id: string) => Promise<void>
  testPrompt: (
    content: string,
    model: LLMModel,
    variables?: Record<string, string>
  ) => Promise<PromptTestResult>
  createVersion: (
    promptId: string,
    versionData: Omit<PromptVersion, "id" | "createdAt">
  ) => Promise<PromptVersion>
}

export interface AIAnalysis {
  suggestedName: string
  description: string
  category: string
  tags: string[]
  confidence: number
  suggestions: string[]
}

export interface PromptTest {
  id: string
  input: Record<string, any>
  output: string
  metrics: PromptTestMetrics
  createdAt: Date
  promptId: string
}

export interface PromptTestMetrics {
  responseTime: number
  tokenUsage: number
  success: boolean
  error: string | null
  cost: number
}

```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

