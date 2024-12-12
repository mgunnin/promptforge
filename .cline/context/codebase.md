# .aider.conf.yml

```yml
##########################################################
# Sample .aider.conf.yml
# This file lists *all* the valid configuration entries.
# Place in your home dir, or at the root of your git repo.
##########################################################

# Note: You can only put OpenAI and Anthropic API keys in the yaml
# config file. Keys for all APIs can be stored in a .env file
# https://aider.chat/docs/config/dotenv.html

##########
# options:

## show this help message and exit
#help: xxx

#######
# Main:

## Specify the OpenAI API key
#openai-api-key: xxx

## Specify the Anthropic API key
#anthropic-api-key: xxx

## Specify the model to use for the main chat
#model: xxx

## Use claude-3-opus-20240229 model for the main chat
#opus: false

## Use claude-3-5-sonnet-20241022 model for the main chat
sonnet: true
## Use claude-3-5-haiku-20241022 model for the main chat
#haiku: false

## Use gpt-4-0613 model for the main chat
#4: false

## Use gpt-4o-2024-08-06 model for the main chat
#4o: false

## Use gpt-4o-mini model for the main chat
#mini: false

## Use gpt-4-1106-preview model for the main chat
#4-turbo: false

## Use gpt-3.5-turbo model for the main chat
#35turbo: false

## Use deepseek/deepseek-coder model for the main chat
#deepseek: false

## Use o1-mini model for the main chat
#o1-mini: false

## Use o1-preview model for the main chat
#o1-preview: false

#################
# Model Settings:

## List known models which match the (partial) MODEL name
#list-models: xxx

## Specify the api base url
#openai-api-base: xxx

## Specify the api_type
#openai-api-type: xxx

## Specify the api_version
#openai-api-version: xxx

## Specify the deployment_id
#openai-api-deployment-id: xxx

## Specify the OpenAI organization ID
#openai-organization-id: xxx

## Specify a file with aider model settings for unknown models
#model-settings-file: .aider.model.settings.yml

## Specify a file with context window and costs for unknown models
#model-metadata-file: .aider.model.metadata.json

## Verify the SSL cert when connecting to models (default: True)
#verify-ssl: true

## Specify what edit format the LLM should use (default depends on model)
#edit-format: xxx

## Use architect edit format for the main chat
#architect: false

## Specify the model to use for commit messages and chat history summarization (default depends on --model)
#weak-model: xxx

## Specify the model to use for editor tasks (default depends on --model)
#editor-model: xxx

## Specify the edit format for the editor model (default: depends on editor model)
#editor-edit-format: xxx

## Only work with models that have meta-data available (default: True)
#show-model-warnings: true

## Soft limit on tokens for chat history, after which summarization begins. If unspecified, defaults to the model's max_chat_history_tokens.
#max-chat-history-tokens: xxx

## Specify the .env file to load (default: .env in git root)
#env-file: .env

#################
# Cache Settings:

## Enable caching of prompts (default: False)
#cache-prompts: false

## Number of times to ping at 5min intervals to keep prompt cache warm (default: 0)
#cache-keepalive-pings: false

###################
# Repomap Settings:

## Suggested number of tokens to use for repo map, use 0 to disable (default: 1024)
#map-tokens: xxx

## Control how often the repo map is refreshed. Options: auto, always, files, manual (default: auto)
#map-refresh: auto

## Multiplier for map tokens when no files are specified (default: 2)
#map-multiplier-no-files: true

################
# History Files:

## Specify the chat input history file (default: .aider.input.history)
#input-history-file: .aider.input.history

## Specify the chat history file (default: .aider.chat.history.md)
#chat-history-file: .aider.chat.history.md

## Restore the previous chat history messages (default: False)
#restore-chat-history: false

## Log the conversation with the LLM to this file (for example, .aider.llm.history)
#llm-history-file: xxx

##################
# Output Settings:

## Use colors suitable for a dark terminal background (default: False)
dark-mode: true
## Use colors suitable for a light terminal background (default: False)
#light-mode: false

## Enable/disable pretty, colorized output (default: True)
#pretty: true

## Enable/disable streaming responses (default: True)
#stream: true

## Set the color for user input (default: #00cc00)
#user-input-color: #00cc00

## Set the color for tool output (default: None)
#tool-output-color: xxx

## Set the color for tool error messages (default: #FF2222)
#tool-error-color: #FF2222

## Set the color for tool warning messages (default: #FFA500)
#tool-warning-color: #FFA500

## Set the color for assistant output (default: #0088ff)
#assistant-output-color: #0088ff

## Set the color for the completion menu (default: terminal's default text color)
#completion-menu-color: xxx

## Set the background color for the completion menu (default: terminal's default background color)
#completion-menu-bg-color: xxx

## Set the color for the current item in the completion menu (default: terminal's default background color)
#completion-menu-current-color: xxx

## Set the background color for the current item in the completion menu (default: terminal's default text color)
#completion-menu-current-bg-color: xxx

## Set the markdown code theme (default: default, other options include monokai, solarized-dark, solarized-light)
#code-theme: default

## Show diffs when committing changes (default: False)
#show-diffs: false

###############
# Git Settings:

## Enable/disable looking for a git repo (default: True)
#git: true

## Enable/disable adding .aider* to .gitignore (default: True)
#gitignore: true

## Specify the aider ignore file (default: .aiderignore in git root)
#aiderignore: .aiderignore

## Only consider files in the current subtree of the git repository
#subtree-only: false

## Enable/disable auto commit of LLM changes (default: True)
#auto-commits: true

## Enable/disable commits when repo is found dirty (default: True)
#dirty-commits: true

## Attribute aider code changes in the git author name (default: True)
#attribute-author: true

## Attribute aider commits in the git committer name (default: True)
#attribute-committer: true

## Prefix commit messages with 'aider: ' if aider authored the changes (default: False)
#attribute-commit-message-author: false

## Prefix all commit messages with 'aider: ' (default: False)
#attribute-commit-message-committer: false

## Commit all pending changes with a suitable commit message, then exit
#commit: false

## Specify a custom prompt for generating commit messages
#commit-prompt: xxx

## Perform a dry run without modifying files (default: False)
#dry-run: false

## Skip the sanity check for the git repository (default: False)
#skip-sanity-check-repo: false

########################
# Fixing and committing:

## Lint and fix provided files, or dirty files if none provided
#lint: false

## Specify lint commands to run for different languages, eg: "python: flake8 --select=..." (can be used multiple times)
#lint-cmd: xxx
## Specify multiple values like this:
#lint-cmd:
#  - xxx
#  - yyy
#  - zzz

## Enable/disable automatic linting after changes (default: True)
#auto-lint: true

## Specify command to run tests
#test-cmd: xxx

## Enable/disable automatic testing after changes (default: False)
#auto-test: false

## Run tests and fix problems found
#test: false

############
# Analytics:

## Enable/disable analytics for one session (default: False)
#analytics: false

## Specify a file to log analytics events
#analytics-log: xxx

## Permanently disable analytics
#analytics-disable: false

#################
# Other Settings:

## specify a file to edit (can be used multiple times)
#file: xxx
## Specify multiple values like this:
#file:
#  - xxx
#  - yyy
#  - zzz

## specify a read-only file (can be used multiple times)
#read: xxx
## Specify multiple values like this:
#read:
#  - xxx
#  - yyy
#  - zzz

## Use VI editing mode in the terminal (default: False)
#vim: false

## Specify the language to use in the chat (default: None, uses system settings)
#chat-language: xxx

## Show the version number and exit
#version: xxx

## Check for updates and return status in the exit code
#just-check-update: false

## Check for new aider versions on launch
#check-update: true

## Install the latest version from the main branch
#install-main-branch: false

## Upgrade aider to the latest version from PyPI
#upgrade: false

## Apply the changes from the given file instead of running the chat (debug)
#apply: xxx

## Apply clipboard contents as edits using the main model's editor format
#apply-clipboard-edits: false

## Always say yes to every confirmation
#yes-always: false

## Enable verbose output
#verbose: false

## Print the repo map and exit (debug)
#show-repo-map: true

## Print the system prompts and exit (debug)
#show-prompts: false

## Do all startup activities then exit before accepting user input (debug)
#exit: false

## Specify a single message to send the LLM, process reply then exit (disables chat mode)
#message: xxx

## Specify a file containing the message to send the LLM, process reply, then exit (disables chat mode)
#message-file: xxx

## Load and execute /commands from a file on launch
#load: xxx

## Specify the encoding for input and output (default: utf-8)
#encoding: utf-8

## Specify the config file (default: search for .aider.conf.yml in git root, cwd or home directory)
#config: xxx

## Run aider in your browser (default: False)
#gui: false

## Enable/disable suggesting shell commands (default: True)
#suggest-shell-commands: true

## Enable/disable fancy input with history and completion (default: True)
#fancy-input: true

#################
# Voice Settings:

## Audio format for voice recording (default: wav). webm and mp3 require ffmpeg
#voice-format: wav

## Specify the language for voice using ISO 639-1 code (default: auto)
#voice-language: en

```

# .cline/context/project.md

```md
# Progress Report

## 1. Project Structure & Configuration

- Set up a Next.js project with TypeScript
- Configured Tailwind CSS and shadcn/ui components
- Created Docker configuration for PostgreSQL database
- Set up environment variables for database, auth, and API keys

## 2. Database Schema (prisma/schema.prisma)

- Created Prisma schema with the following models:
  - User: For user authentication and profile management
  - ApiKey: For API access management
  - Team: For collaborative prompt management
  - Prompt: Core model for storing prompts
  - Version: For prompt version control
  - PromptTest: For storing test results and metrics

## 3. Core Services (Created several service classes to handle business logic:)

- AIService (src/lib/services/ai.service.ts)
  - Handles interactions with LLM providers (OpenAI, Claude)
  - Provides methods for:
    - Generating completions
    - Analyzing prompts
    - Suggesting improvements
    - Generating test cases
    - Analyzing metrics
- AuthService (src/lib/services/auth.service.ts)
  - Manages authentication and API keys
  - Provides:
    - User registration
    - Credential validation
    - Password management
    - API key operations (CRUD, rotation)
- PromptService (src/lib/services/prompt.service.ts)
  - Manages prompt operations
  - Provides:
    - CRUD operations for prompts
    - Version control
    - Search and filtering
    - Team sharing functionality
- UserService (src/lib/services/user.service.ts)
  - Handles user management
  - Provides:
    - User CRUD operations
    - Profile management
    - API key management

## 4. Authentication

- Implemented NextAuth.js for authentication
- Created custom auth pages (login, register)
- Set up middleware for route protection
- Added session management

## 5. Components

- Card: For content containers
- Button: Reusable button component
- Input: Form input component
- DropdownMenu: For navigation and actions
- PromptTester: For testing prompts
- MainNav: Main navigation component
- UserNav: User-related navigation
- ThemeProvider: For dark/light mode support

## 6. API Routes

- Authentication routes
- Prompt management routes
- API key management routes
- Testing endpoints

## 7. Pages

- Dashboard/Home
- Prompt listing
- Prompt detail view
- New prompt creation
- Settings page
- Authentication pages

## 8. Type Definitions

- Prompt-related types
- Authentication types
- API responses
- Service interfaces

## 9. Features Implemented

- User authentication and authorization
- Prompt management (create, read, update, delete)
- Version control for prompts
- API key management
- Team collaboration support
- Prompt testing interface
- Dark/light mode theming
- Responsive design

## 10. Security Features

- Password hashing with bcrypt
- JWT-based authentication
- API key validation
- Route protection with middleware
- Secure database access

```

# .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}

```

# .gitignore

```
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

# env files
.env*
.aider*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
node_modules/
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/

```

# .vscode/settings.json

```json
{}

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
    image: ankane/pgvector:latest
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
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

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
    "lint": "next lint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.1",
    "@prisma/client": "^5.22.0",
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-scroll-area": "^1.2.1",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "@types/uuid": "^10.0.0",
    "bcryptjs": "^2.4.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.456.0",
    "next": "^15.1.0",
    "next-auth": "^4.24.10",
    "next-themes": "^0.4.3",
    "openai": "^4.71.1",
    "prisma": "^5.22.0",
    "react": "19.0.0-rc-66855b96-20241106",
    "react-dom": "19.0.0-rc-66855b96-20241106",
    "react-dropzone": "^14.3.5",
    "react-hook-form": "^7.53.2",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-animate": "^1.0.7",
    "uuid": "^11.0.3",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@auth/prisma-adapter": "^2.7.3",
    "@playwright/test": "^1.48.2",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "eslint": "9.15.0",
    "eslint-config-next": "15.0.3",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  },
  "packageManager": "bun@1.0.0"
}

```

# playwright.config.ts

```ts
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

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

# prisma/migrations/20241127215020_init/migration.sql

```sql
-- CreateEnum
CREATE TYPE "PromptCategory" AS ENUM ('General', 'CodeGeneration', 'ContentCreation', 'DataAnalysis', 'Translation', 'Summarization', 'QuestionAnswering', 'TaskPlanning', 'Roleplay', 'SystemDesign', 'Debugging', 'Testing', 'Documentation', 'CreativeWriting', 'Business', 'Education', 'Research');

-- CreateEnum
CREATE TYPE "VersionType" AS ENUM ('original', 'optimized');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "model" TEXT NOT NULL,
    "tags" TEXT[],
    "category" "PromptCategory" NOT NULL DEFAULT 'General',
    "metrics" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "model" TEXT NOT NULL,
    "type" "VersionType" NOT NULL DEFAULT 'original',
    "metrics" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "promptId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptTest" (
    "id" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "output" TEXT NOT NULL,
    "metrics" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "promptId" TEXT NOT NULL,

    CONSTRAINT "PromptTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- CreateIndex
CREATE INDEX "Version_promptId_idx" ON "Version"("promptId");

-- CreateIndex
CREATE INDEX "Version_type_idx" ON "Version"("type");

-- CreateIndex
CREATE INDEX "Version_isActive_idx" ON "Version"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamMembers_AB_unique" ON "_TeamMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamMembers_B_index" ON "_TeamMembers"("B");

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptTest" ADD CONSTRAINT "PromptTest_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMembers" ADD CONSTRAINT "_TeamMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMembers" ADD CONSTRAINT "_TeamMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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

enum PromptCategory {
  General
  CodeGeneration
  ContentCreation
  DataAnalysis
  Translation
  Summarization
  QuestionAnswering
  TaskPlanning
  Roleplay
  SystemDesign
  Debugging
  Testing
  Documentation
  CreativeWriting
  Business
  Education
  Research
}

enum VersionType {
  original
  optimized
}

model Prompt {
  id          String        @id @default(cuid())
  name        String
  content     String
  description String?
  model       String
  tags        String[]
  category    PromptCategory @default(General)
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
  id          String      @id @default(cuid())
  content     String
  description String?
  model       String
  type        VersionType @default(original)
  metrics     Json?       // { tokenCount: number, estimatedCost: number, performance?: Record<string, any> }
  createdAt   DateTime    @default(now())
  promptId    String
  prompt      Prompt      @relation(fields: [promptId], references: [id], onDelete: Cascade)
  isActive    Boolean     @default(false)

  @@index([promptId])
  @@index([type])
  @@index([isActive])
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
# PromptForge

PromptForge is a modern prompt management application built for AI development. It provides a robust platform for creating, testing, and managing prompts with advanced features for collaboration and version control.

## Features

### Core Functionality

- 🔄 Prompt version control
- 🧪 Interactive prompt testing environment
- 📊 Performance metrics and analytics
- 🤝 Team collaboration support
- 🔑 API key management
- 🌓 Dark/light mode theming
- 📱 Responsive design

### Prompt Management

- Create and edit prompts with rich text support
- Import prompts from JSON, CSV, or TXT files
- Variable detection and management
- Test prompts with different models and parameters
- Track metrics including response time, token usage, and success rate

### Collaboration

- Team-based prompt sharing
- Role-based access control
- Version history tracking
- Collaborative editing features

### Security

- JWT-based authentication
- Secure API key rotation
- Password hashing with bcrypt
- Protected routes with middleware
- Secure database access

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **API Integration**: OpenAI API support
- **State Management**: React Context API
- **Testing**: Built-in test environment

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- OpenAI API key
- Bun package manager

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/mgunnin/vl-promptforge.git
cd vl-promptforge
\`\`\`

2. Install dependencies:

\`\`\`bash
bun i
\`\`\`

3. Set up environment variables:

\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update the `.env.local` file with your database and API key details.

DATABASE_URL="postgresql://user:password@localhost:5432/promptforge"
NEXTAUTH_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-api-key"

5. Run the development server:

\`\`\`bash
bun dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## Project Structure

\`\`\`plaintext
src/
├── app/ # Next.js 14 app directory
│ ├── api/ # API routes
│ ├── auth/ # Authentication pages
│ ├── prompts/ # Prompt management pages
│ └── test/ # Prompt testing environment
├── components/ # Reusable UI components
├── contexts/ # React contexts
├── lib/ # Utility functions and services
│ ├── services/ # Core service classes
│ └── utils/ # Helper functions
├── prisma/ # Database schema and migrations
│ └── types/ # TypeScript type definitions
├── public/ # Public assets
├── styles/ # Global styles
├── types/ # TypeScript type definitions
├── utils/ # Utility functions
└── .env.local # Local environment variables
\`\`\`

## Core Services

- **AIService**: Handles LLM provider interactions
- **AuthService**: Manages authentication and API keys
- **PromptService**: Handles prompt operations
- **UserService**: Manages user-related functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)

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

# src/app/api/v1/prompts/[id]/versions/[versionId]/activate/route.ts

```ts
import { authOptions } from "@/lib/auth"
import { PromptService } from "@/lib/services/prompt.service"
import { VersionService } from "@/lib/services/version.service"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; versionId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // Check if user has access to this prompt
    const prompt = await PromptService.getPromptById(params.id, session.user.id)
    if (!prompt) {
      return new NextResponse("Not found", { status: 404 })
    }

    const version = await VersionService.setActiveVersion(params.versionId)
    return NextResponse.json(version)
  } catch (error) {
    console.error("Error activating version:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 
```

# src/app/api/v1/prompts/[id]/versions/[versionId]/delete/route.ts

```ts
import { VersionService } from "@/lib/services/version.service"
import { NextResponse } from "next/server"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; versionId: string } }
) {
  try {
    await VersionService.deleteVersion(params.versionId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting version:", error)
    return NextResponse.json(
      { error: "Failed to delete version" },
      { status: 500 }
    )
  }
}

```

# src/app/api/v1/prompts/[id]/versions/create/route.ts

```ts
import { VersionService } from "@/lib/services/version.service"
import { NextResponse } from "next/server"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { content, model } = body

    const version = await VersionService.createVersion({
      promptId: params.id,
      content,
      model,
      type: "original",
    })

    return NextResponse.json(version)
  } catch (error) {
    console.error("Error creating version:", error)
    return NextResponse.json(
      { error: "Failed to create version" },
      { status: 500 }
    )
  }
}

```

# src/app/api/v1/prompts/[id]/versions/optimize/route.ts

```ts
import { VersionService } from "@/lib/services/version.service"
import { NextResponse } from "next/server"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params?.id) {
    return NextResponse.json({ error: "Missing prompt ID" }, { status: 400 })
  }

  try {
    const body = await request.json()
    const { content, model, metrics } = body

    const version = await VersionService.createVersion({
      promptId: params.id,
      content,
      model,
      type: "optimized",
      metrics,
    })

    return NextResponse.json(version)
  } catch (error) {
    console.error("Error creating optimized version:", error)
    return NextResponse.json(
      { error: "Failed to create optimized version" },
      { status: 500 }
    )
  }
}

```

# src/app/api/v1/prompts/[id]/versions/route.ts

```ts
import { authOptions } from "@/lib/auth"
import { PromptService } from "@/lib/services/prompt.service"
import { VersionService } from "@/lib/services/version.service"
import { VersionType } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const createVersionSchema = z.object({
  content: z.string(),
  description: z.string().optional().nullable(),
  model: z.string(),
  metrics: z.record(z.number()).optional(),
})

const updateVersionSchema = z.object({
  content: z.string().optional(),
  description: z.string().optional().nullable(),
  model: z.string().optional(),
  metrics: z.record(z.number()).optional(),
})

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // Check if user has access to this prompt
    const prompt = await PromptService.getPromptById(params.id, session.user.id)
    if (!prompt) {
      return new NextResponse("Not found", { status: 404 })
    }

    const versions = await VersionService.getVersions(params.id)
    return NextResponse.json(versions)
  } catch (error) {
    console.error("Error fetching versions:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const json = await req.json()
    const body = createVersionSchema.parse(json)

    // Check if user has access to this prompt
    const prompt = await PromptService.getPromptById(params.id, session.user.id)
    if (!prompt) {
      return new NextResponse("Not found", { status: 404 })
    }

    const version = await VersionService.createVersion({
      ...body,
      promptId: params.id,
      type: VersionType.original,
    })

    return NextResponse.json(version)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    console.error("Error creating version:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; versionId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const json = await req.json()
    const body = updateVersionSchema.parse(json)

    // Check if user has access to this prompt
    const prompt = await PromptService.getPromptById(params.id, session.user.id)
    if (!prompt) {
      return new NextResponse("Not found", { status: 404 })
    }

    const version = await VersionService.updateVersion({
      id: params.versionId,
      ...body,
    })

    return NextResponse.json(version)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    console.error("Error updating version:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; versionId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // Check if user has access to this prompt
    const prompt = await PromptService.getPromptById(params.id, session.user.id)
    if (!prompt) {
      return new NextResponse("Not found", { status: 404 })
    }

    await VersionService.deleteVersion(params.versionId)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting version:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

```

# src/app/api/v1/prompts/analyze/route.ts

```ts
import { AIService } from "@/lib/services/ai.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { content } = await req.json()
    if (!content) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      )
    }

    const analysis = await AIService.analyzePrompt(content)
    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing prompt:", error)
    return NextResponse.json(
      { message: "Failed to analyze prompt" },
      { status: 500 }
    )
  }
}

```

# src/app/api/v1/prompts/import/route.ts

```ts
import { ImportService } from "@/lib/services/import.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    const prompts = await ImportService.parseFile(file)
    const results = await ImportService.processPrompts(prompts, token.id)

    return NextResponse.json({
      message: `Successfully imported ${results.length} prompts`,
      prompts: results,
    })
  } catch (error) {
    console.error("Error importing prompts:", error)
    return NextResponse.json(
      { message: "Failed to import prompts" },
      { status: 500 }
    )
  }
}

```

# src/app/api/v1/prompts/optimize/route.ts

```ts
import { AIService } from "@/lib/services/ai.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { content, model } = await req.json()
    if (!content) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      )
    }

    const optimizedContent = await AIService.suggestImprovements(content, model)

    // Calculate metrics
    const metrics = {
      tokenCount: Math.ceil(optimizedContent.length / 4), // Rough estimate
      estimatedCost: calculateCost(optimizedContent.length, model),
    }

    return NextResponse.json({ optimizedContent, metrics })
  } catch (error) {
    console.error("Error optimizing prompt:", error)
    return NextResponse.json(
      { message: "Failed to optimize prompt" },
      { status: 500 }
    )
  }
}

function calculateCost(length: number, model: string): number {
  // Cost per 1K tokens (in USD)
  const costPer1K: Record<string, number> = {
    "gpt-4o": 0.01,
    "gpt-4-turbo": 0.01,
    "gpt-3.5-turbo": 0.0005,
    "claude-3-opus": 0.015,
    "claude-3-sonnet-20241022": 0.003,
    "gemini-pro": 0.0005,
    "mixtral-8x7b": 0.0002,
    "llama-2-70b": 0.0001,
  }

  const tokens = Math.ceil(length / 4)
  return (tokens / 1000) * (costPer1K[model] || 0.01)
}

```

# src/app/api/v1/prompts/route.ts

```ts
import { PromptService } from "@/lib/services/prompt.service"
import { LLMModel } from "@/types/prompt"
import { PromptCategory } from "@prisma/client"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const createPromptSchema = z.object({
  name: z.string().min(1, "Name is required"),
  content: z.string().min(1, "Content is required"),
  description: z.string().optional(),
  tags: z.array(z.string()),
  model: z.custom<LLMModel>((val) => {
    return (
      typeof val === "string" &&
      [
        "gpt-4o",
        "gpt-4-turbo",
        "gpt-3.5-turbo",
        "claude-3-opus",
        "claude-3-sonnet-20241022",
        "gemini-pro",
        "mixtral-8x7b",
        "llama-2-70b",
      ].includes(val as string)
    )
  }, "Invalid model"),
  category: z.nativeEnum(PromptCategory).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      )
    }

    if (!token.id) {
      return NextResponse.json(
        { message: "Invalid authentication token" },
        { status: 401 }
      )
    }

    const body = await req.json()
    console.log("Request body:", body)
    console.log("User ID from token:", token.id)

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

    const errorDetails = {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    }

    console.error("Error creating prompt:", errorDetails)

    if (
      error instanceof Error &&
      error.message.includes("Foreign key constraint")
    ) {
      return NextResponse.json(
        {
          message: "User not found in database",
          error: "Invalid user ID",
          userId: error.message.includes("Prompt_userId_fkey")
            ? "User ID constraint violation"
            : "Other constraint violation",
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Internal server error", error: errorDetails },
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
    .custom<LLMModel>((val) => {
      return (
        typeof val === "string" &&
        [
          "gpt-4o",
          "gpt-4-turbo",
          "gpt-3.5-turbo",
          "claude-3-opus",
          "claude-3-sonnet-20241022",
          "gemini-pro",
          "mixtral-8x7b",
          "llama-2-70b",
        ].includes(val as string)
      )
    }, "Invalid model")
    .optional(),
  category: z.nativeEnum(PromptCategory).optional(),
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

# src/app/api/v1/prompts/search/route.ts

```ts
import { SearchService } from "@/lib/services/search.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const searchParamsSchema = z.object({
  query: z.string(),
  type: z.enum(["semantic", "text"]).default("semantic"),
  filters: z
    .object({
      tags: z.array(z.string()).optional(),
      category: z.string().optional(),
      model: z.string().optional(),
      dateRange: z
        .object({
          start: z.string().transform((str) => new Date(str)),
          end: z.string().transform((str) => new Date(str)),
        })
        .optional(),
    })
    .optional(),
  sort: z
    .object({
      field: z
        .enum(["relevance", "createdAt", "updatedAt"])
        .default("relevance"),
      direction: z.enum(["asc", "desc"]).default("desc"),
    })
    .optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
})

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const validatedParams = searchParamsSchema.parse({
      query: searchParams.get("query") || "",
      type: searchParams.get("type") || "semantic",
      filters: searchParams.get("filters")
        ? JSON.parse(searchParams.get("filters") || "{}")
        : undefined,
      sort: searchParams.get("sort")
        ? JSON.parse(searchParams.get("sort") || "{}")
        : undefined,
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
    })

    const searchFunction =
      validatedParams.type === "semantic"
        ? SearchService.semanticSearch
        : SearchService.textSearch

    const results = await searchFunction({
      userId: token.id,
      ...validatedParams,
    })

    return NextResponse.json(results)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid search parameters", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Search error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

```

# src/app/api/v1/prompts/suggest/route.ts

```ts
import { authOptions } from "@/lib/auth"
import { AIService } from "@/lib/services/ai.service"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { promptId, content } = await req.json()
    if (!content) {
      return new NextResponse("Content is required", { status: 400 })
    }

    const suggestions = await AIService.suggestImprovements(content)
    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("[PROMPT_SUGGESTIONS]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

```

# src/app/api/v1/prompts/test-cases/route.ts

```ts
import { authOptions } from "@/lib/auth"
import { AIService } from "@/lib/services/ai.service"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { promptId, content } = await req.json()
    if (!content) {
      return new NextResponse("Content is required", { status: 400 })
    }

    const testCases = await AIService.generateTestCases(content)
    return NextResponse.json({ testCases })
  } catch (error) {
    console.error("[PROMPT_TEST_CASES]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

```

# src/app/api/v1/prompts/test/route.ts

```ts
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { prompt, model, temperature, maxTokens, input } = await req.json()

    // Parse input variables if provided
    let processedPrompt = prompt
    if (input) {
      try {
        const variables = JSON.parse(input)
        processedPrompt = Object.entries(variables).reduce(
          (acc, [key, value]) => acc.replace(`{${key}}`, String(value)),
          prompt
        )
      } catch {
        return NextResponse.json(
          { message: "Invalid input variables format" },
          { status: 400 }
        )
      }
    }

    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: processedPrompt,
        },
      ],
      temperature: temperature,
      max_tokens: maxTokens,
    })

    const output = response.choices[0]?.message?.content
    if (!output) {
      throw new Error("No output generated")
    }

    return NextResponse.json({ output })
  } catch (error) {
    console.error("Error testing prompt:", error)
    return NextResponse.json(
      { message: "Failed to test prompt" },
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
import { Toaster } from "@/components/toaster"
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
      <body className="min-h-screen bg-background" suppressHydrationWarning>
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
                  <div className="container flex h-14 items-center px-8">
                    <MainNav />
                    <div className="ml-auto flex items-center space-x-4">
                      <UserNav />
                    </div>
                  </div>
                </header>
                <main className="flex-1 px-8">{children}</main>
              </div>
              <Toaster />
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
import { ImportDialog } from "@/components/import-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authOptions } from "@/lib/auth"
import { Beaker, FileText, Plus } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Create, manage, and optimize your AI prompts
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Create Prompt</CardTitle>
            <CardDescription>
              Create a new prompt with AI-powered optimization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/prompts/new">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Import Prompts</CardTitle>
            <CardDescription>
              Import prompts from JSON, CSV, or TXT files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImportDialog />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Environment</CardTitle>
            <CardDescription>
              Try out prompts with different models and parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/test">
              <Button variant="outline" className="w-full">
                <Beaker className="mr-2 h-4 w-4" />
                Open Playground
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browse Prompts</CardTitle>
            <CardDescription>
              View and manage your prompt collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/prompts">
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View All
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

```

# src/app/prompts/[id]/page.tsx

```tsx
import { AIAnalytics } from "@/components/ai-analytics"
import { PromptTester } from "@/components/prompt-tester"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { authOptions } from "@/lib/auth"
import { PromptService } from "@/lib/services/prompt.service"
import { formatDate } from "@/lib/utils"
import { GitFork, Heart, History, MessageSquare, Share2, Star, Zap } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

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
    likes: number
    saves: number
    forks: number
    comments: number
    runs: number
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
        likes: metrics?.likes || 0,
        saves: metrics?.saves || 0,
        forks: metrics?.forks || 0,
        comments: metrics?.comments || 0,
        runs: metrics?.runs || 0,
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

    // Extract variables from prompt content
    const variableRegex = /{{([^}]+)}}/g
    const matches = [...prompt.content.matchAll(variableRegex)]
    const variables = matches.map(match => ({
        name: match[1],
        description: null,
        required: true,
        defaultValue: null,
    }))

    // Get related prompts (placeholder)
    const relatedPrompts = await PromptService.listPrompts(session.user.id, {
        category: prompt.category || undefined,
        limit: 3,
        excludeId: prompt.id,
    })

    return (
        <div className="container py-6">
            {/* Header Section */}
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
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src="/placeholder-avatar.jpg" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                                Created by {session.user.name || "Anonymous"}
                            </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {formatDate(prompt.createdAt)}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Heart className="h-4 w-4" />
                        <span>{prompt.metrics.likes}</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Star className="h-4 w-4" />
                        <span>{prompt.metrics.saves}</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <GitFork className="h-4 w-4" />
                        <span>{prompt.metrics.forks}</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                    <Button>Edit Prompt</Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList>
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="versions">
                                <History className="h-4 w-4 mr-2" />
                                Versions ({prompt.versions.length})
                            </TabsTrigger>
                            <TabsTrigger value="test">
                                <Zap className="h-4 w-4 mr-2" />
                                Test
                            </TabsTrigger>
                            <TabsTrigger value="comments">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Comments ({prompt.metrics.comments})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="content" className="space-y-6">
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

                            {variables.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Variables</CardTitle>
                                        <CardDescription>
                                            Variables that can be customized in this prompt
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {variables.map((variable) => (
                                                <div key={variable.name} className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium">{variable.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {variable.description || "No description"}
                                                        </div>
                                                    </div>
                                                    {variable.required && (
                                                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                                            Required
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="versions">
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
                                                        {formatDate(version.createdAt)}
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
                        </TabsContent>

                        <TabsContent value="test">
                            <PromptTester
                                promptId={prompt.id}
                                content={prompt.content}
                                model={prompt.model}
                                variables={variables}
                            />
                        </TabsContent>

                        <TabsContent value="comments">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Comments</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Placeholder for comments */}
                                        <div className="text-center text-muted-foreground py-8">
                                            No comments yet. Be the first to comment!
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
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
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Total Runs
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.runs}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Analytics Component */}
                    <AIAnalytics promptId={prompt.id} content={prompt.content} />

                    {relatedPrompts.prompts.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Related Prompts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {relatedPrompts.prompts.map((relatedPrompt) => (
                                        <Link
                                            key={relatedPrompt.id}
                                            href={`/prompts/${relatedPrompt.id}`}
                                            className="block p-4 rounded-lg border hover:border-primary/50 transition-colors"
                                        >
                                            <div className="font-medium">{relatedPrompt.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {relatedPrompt.description || "No description"}
                                            </div>
                                        </Link>
                                    ))}
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

# src/app/prompts/new/page.tsx

```tsx
"use client"

import { PromptEditor } from "@/components/prompt-editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { PromptCategory, Version } from "@prisma/client"
import { X } from "lucide-react"
import { useState } from "react"
import { useSession } from "next-auth/react"

const AVAILABLE_MODELS = [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    { id: "claude-3-opus", name: "Claude 3 Opus" },
    { id: "claude-3-sonnet-20241022", name: "Claude 3.5 Sonnet" },
    { id: "gemini-pro", name: "Gemini Pro" },
    { id: "mixtral-8x7b", name: "Mixtral 8x7B" },
    { id: "llama-2-70b", name: "Llama 2 70B" },
] as const

const PROMPT_CATEGORIES = [
    { id: "General", name: "General" },
    { id: "CodeGeneration", name: "Code Generation" },
    { id: "ContentCreation", name: "Content Creation" },
    { id: "DataAnalysis", name: "Data Analysis" },
    { id: "Translation", name: "Translation" },
    { id: "Summarization", name: "Summarization" },
    { id: "QuestionAnswering", name: "Question Answering" },
    { id: "TaskPlanning", name: "Task Planning" },
    { id: "Roleplay", name: "Roleplay" },
    { id: "SystemDesign", name: "System Design" },
    { id: "Debugging", name: "Debugging" },
    { id: "Testing", name: "Testing" },
    { id: "Documentation", name: "Documentation" },
    { id: "CreativeWriting", name: "Creative Writing" },
    { id: "Business", name: "Business" },
    { id: "Education", name: "Education" },
    { id: "Research", name: "Research" },
] as const

export default function NewPromptPage() {
    const { data: session } = useSession()
    const [content, setContent] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [model, setModel] = useState<string>(AVAILABLE_MODELS[0].id)
    const [category, setCategory] = useState<PromptCategory>("General")
    const [tags, setTags] = useState<string[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [isOptimizing, setIsOptimizing] = useState(false)
    const [versions, setVersions] = useState<Version[]>([])
    const [activeVersionId, setActiveVersionId] = useState<string | null>(null)
    const [isComparing, setIsComparing] = useState(false)
    const [compareVersions, setCompareVersions] = useState<{
        version1: Version
        version2: Version
    }>()
    const { toast } = useToast()

    const handleAnalyze = async () => {
        if (!content) {
            toast({
                title: "No Content",
                description: "Please write your prompt first.",
                variant: "destructive",
            })
            return
        }

        setIsAnalyzing(true)
        try {
            const response = await fetch("/api/v1/prompts/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            })

            if (!response.ok) throw new Error("Failed to analyze prompt")
            const analysis = await response.json()

            setName(analysis.suggestedName || "")
            setDescription(analysis.description || "")
            setCategory(analysis.category || "General")
            setTags(analysis.tags || [])

            toast({
                title: "Prompt Analyzed",
                description: "We've analyzed your prompt and suggested metadata.",
            })
        } catch (error) {
            console.error("Error analyzing prompt:", error)
            toast({
                title: "Analysis Failed",
                description: "Failed to analyze the prompt. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleOptimize = async () => {
        if (!content || !activeVersionId) {
            toast({
                title: "Cannot Optimize",
                description: "Please save the prompt first.",
                variant: "destructive",
            })
            return
        }

        setIsOptimizing(true)
        try {
            // First, get the optimized content
            const optimizeResponse = await fetch("/api/v1/prompts/optimize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, model }),
            })

            if (!optimizeResponse.ok) throw new Error("Failed to optimize prompt")
            const { optimizedContent, metrics } = await optimizeResponse.json()

            // Then, create a new version through the API
            const versionResponse = await fetch(`/api/v1/prompts/${activeVersionId}/versions/optimize`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: optimizedContent,
                    model,
                    metrics,
                }),
            })

            if (!versionResponse.ok) throw new Error("Failed to create version")
            const version = await versionResponse.json()

            setVersions([...versions, version])
            setCompareVersions({
                version1: versions.find((v) => v.type === "original")!,
                version2: version,
            })
            setIsComparing(true)

            toast({
                title: "Prompt Optimized",
                description: "Your prompt has been optimized for better results.",
            })
        } catch (error) {
            console.error("Error optimizing prompt:", error)
            toast({
                title: "Optimization Failed",
                description: "Failed to optimize the prompt. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsOptimizing(false)
        }
    }

    const handleSave = async () => {
        if (!session) {
            toast({
                title: "Authentication Required",
                description: "Please sign in to save your prompt.",
                variant: "destructive",
            })
            return
        }

        if (!content) {
            toast({
                title: "No Content",
                description: "Please write your prompt first.",
                variant: "destructive",
            })
            return
        }

        try {
            // Auto-analyze if metadata is empty
            if (!name || !description || !category || tags.length === 0) {
                setIsAnalyzing(true)
                const analysisResponse = await fetch("/api/v1/prompts/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content }),
                })

                if (!analysisResponse.ok) throw new Error("Failed to analyze prompt")
                const analysis = await analysisResponse.json()

                // Update state with analysis results
                const analyzedName = analysis.suggestedName || name
                const analyzedDescription = analysis.description || description
                const analyzedCategory = analysis.category || category
                const analyzedTags = analysis.tags || tags

                // Create the prompt with analyzed data
                const response = await fetch("/api/v1/prompts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: analyzedName,
                        content,
                        description: analyzedDescription,
                        model,
                        category: analyzedCategory,
                        tags: analyzedTags,
                    }),
                })

                if (!response.ok) throw new Error("Failed to create prompt")
                const prompt = await response.json()

                // Update state with the created prompt
                setName(analyzedName)
                setDescription(analyzedDescription)
                setCategory(analyzedCategory)
                setTags(analyzedTags)
                setActiveVersionId(prompt.id)
                setVersions(prompt.versions || [])

            } else {
                // Create the prompt with existing data
                const response = await fetch("/api/v1/prompts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name,
                        content,
                        description,
                        model,
                        category,
                        tags,
                    }),
                })

                if (!response.ok) throw new Error("Failed to create prompt")
                const prompt = await response.json()

                // Update state with the created prompt
                setActiveVersionId(prompt.id)
                setVersions(prompt.versions || [])
            }

            toast({
                title: "Prompt Saved",
                description: "Your prompt has been saved successfully.",
            })
        } catch (error) {
            console.error("Error saving prompt:", error)
            toast({
                title: "Save Failed",
                description: "Failed to save the prompt. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleVersionSelect = (version: Version) => {
        setContent(version.content)
        setIsComparing(false)
    }

    const handleVersionCompare = (version1: Version, version2: Version) => {
        setCompareVersions({ version1, version2 })
        setIsComparing(true)
    }

    const handleVersionDelete = async (version: Version) => {
        try {
            const response = await fetch(`/api/v1/prompts/${version.promptId}/versions/${version.id}/delete`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete version")
            setVersions(versions.filter((v) => v.id !== version.id))
            toast({
                title: "Version Deleted",
                description: "The version has been deleted successfully.",
            })
        } catch (error) {
            console.error("Error deleting version:", error)
            toast({
                title: "Delete Failed",
                description: "Failed to delete the version. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleVersionActivate = async (version: Version) => {
        try {
            const response = await fetch(`/api/v1/prompts/${version.promptId}/versions/${version.id}/activate`, {
                method: "POST",
            })

            if (!response.ok) throw new Error("Failed to activate version")
            setVersions(
                versions.map((v) => ({
                    ...v,
                    isActive: v.id === version.id,
                }))
            )
            setActiveVersionId(version.id)
            setContent(version.content)
            toast({
                title: "Version Activated",
                description: "The version has been set as active.",
            })
        } catch (error) {
            console.error("Error activating version:", error)
            toast({
                title: "Activation Failed",
                description: "Failed to activate the version. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleAcceptOptimized = () => {
        if (!compareVersions) return
        handleVersionActivate(compareVersions.version2)
        setIsComparing(false)
    }

    const handleRejectOptimized = () => {
        if (!compareVersions) return
        handleVersionDelete(compareVersions.version2)
        setIsComparing(false)
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    return (
        <div className="container py-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Create New Prompt</h2>
                <p className="text-muted-foreground">
                    Write your prompt and let AI handle the rest
                </p>
            </div>

            <div className="grid gap-6">
                <PromptEditor
                    promptId={activeVersionId || ""}
                    content={content}
                    onChange={setContent}
                    onAnalyze={handleAnalyze}
                    isAnalyzing={isAnalyzing}
                    versions={versions}
                    onVersionSelect={handleVersionSelect}
                    onVersionCompare={handleVersionCompare}
                    onVersionDelete={handleVersionDelete}
                    onVersionActivate={handleVersionActivate}
                    activeVersionId={activeVersionId}
                    isComparing={isComparing}
                    compareVersions={compareVersions}
                    onAcceptOptimized={handleAcceptOptimized}
                    onRejectOptimized={handleRejectOptimized}
                />

                <div className="flex gap-2">
                    <Button
                        onClick={handleOptimize}
                        variant="secondary"
                        disabled={isOptimizing || !content}
                    >
                        {isOptimizing ? "Optimizing..." : "Optimize Prompt"}
                    </Button>
                </div>

                <Card className="p-6">
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setName(e.target.value)
                                }
                                placeholder="Click 'Analyze' to generate a name"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Click 'Analyze' to generate a description"
                            />
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={category} onValueChange={(value: PromptCategory) => setCategory(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PROMPT_CATEGORIES.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Tags</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 hover:text-destructive"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                                {tags.length === 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        Click &apos;Analyze&apos; to generate tags
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="model">Model</Label>
                            <Select value={model} onValueChange={setModel}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a model" />
                                </SelectTrigger>
                                <SelectContent>
                                    {AVAILABLE_MODELS.map((m) => (
                                        <SelectItem key={m.id} value={m.id}>
                                            {m.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button onClick={handleSave} className="w-full">
                            Save Prompt
                        </Button>
                    </div>
                </Card>
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

# src/app/prompts/search/page.tsx

```tsx
import { PromptSearch } from "@/components/prompt-search"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function SearchPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/login")
    }

    return (
        <div className="container py-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Search Prompts</h2>
                <p className="text-muted-foreground">
                    Find prompts using semantic or text-based search
                </p>
            </div>

            <PromptSearch />
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

# src/app/test/page.tsx

```tsx
import { TestEnvironment } from "@/components/test-environment"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function TestPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/login")
    }

    return (
        <div className="container py-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Test Environment</h2>
                <p className="text-muted-foreground">
                    Test your prompts with different models and parameters
                </p>
            </div>

            <TestEnvironment userId={session.user.id} />
        </div>
    )
} 
```

# src/components/ai-analytics.tsx

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Sparkles, TestTube } from "lucide-react"
import { useState } from "react"

interface AIAnalyticsProps {
    promptId: string
    content: string
}

export function AIAnalytics({ promptId, content }: AIAnalyticsProps) {
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
    const [isLoadingTestCases, setIsLoadingTestCases] = useState(false)
    const [suggestions, setSuggestions] = useState<string | null>(null)
    const [testCases, setTestCases] = useState<string | null>(null)
    const { toast } = useToast()

    const generateSuggestions = async () => {
        setIsLoadingSuggestions(true)
        toast({
            title: "Generating Suggestions",
            description: "AI is analyzing your prompt...",
        })

        try {
            const response = await fetch("/api/v1/prompts/suggest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ promptId, content }),
            })

            if (!response.ok) throw new Error("Failed to generate suggestions")
            const data = await response.json()
            setSuggestions(data.suggestions)

            toast({
                title: "Suggestions Ready",
                description: "AI has analyzed your prompt and generated suggestions.",
            })
        } catch (error) {
            console.error("Error generating suggestions:", error)
            toast({
                title: "Generation Failed",
                description: "Failed to generate suggestions. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoadingSuggestions(false)
        }
    }

    const generateTestCases = async () => {
        setIsLoadingTestCases(true)
        toast({
            title: "Generating Test Cases",
            description: "AI is creating test cases...",
        })

        try {
            const response = await fetch("/api/v1/prompts/test-cases", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ promptId, content }),
            })

            if (!response.ok) throw new Error("Failed to generate test cases")
            const data = await response.json()
            setTestCases(data.testCases)

            toast({
                title: "Test Cases Ready",
                description: "AI has generated test cases for your prompt.",
            })
        } catch (error) {
            console.error("Error generating test cases:", error)
            toast({
                title: "Generation Failed",
                description: "Failed to generate test cases. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoadingTestCases(false)
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        AI Suggestions
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={generateSuggestions}
                            disabled={isLoadingSuggestions}
                        >
                            {isLoadingSuggestions ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate
                                </>
                            )}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {suggestions ? (
                        <div className="prose prose-sm dark:prose-invert">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: suggestions.replace(/\n/g, "<br />"),
                                }}
                            />
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            Click generate to get AI suggestions for improving your prompt.
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Test Cases
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={generateTestCases}
                            disabled={isLoadingTestCases}
                        >
                            {isLoadingTestCases ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <TestTube className="mr-2 h-4 w-4" />
                                    Generate
                                </>
                            )}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {testCases ? (
                        <div className="prose prose-sm dark:prose-invert">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: testCases.replace(/\n/g, "<br />"),
                                }}
                            />
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            Click generate to create AI test cases for your prompt.
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
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

# src/components/import-dialog.tsx

```tsx
"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export function ImportDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", acceptedFiles[0])

        try {
            const response = await fetch("/api/v1/prompts/import", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to import prompts")
            }

            toast({
                title: "Success",
                description: data.message,
            })

            setIsOpen(false)
            router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to import prompts",
                variant: "destructive",
            })
        } finally {
            setIsUploading(false)
        }
    }, [toast, router])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/json": [".json"],
            "text/csv": [".csv"],
            "text/plain": [".txt"],
        },
        maxFiles: 1,
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Prompts
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import Prompts</DialogTitle>
                    <DialogDescription>
                        Upload a file containing prompts to import. Supported formats: JSON, CSV, TXT
                    </DialogDescription>
                </DialogHeader>

                <div
                    {...getRootProps()}
                    className={`
            mt-4 rounded-lg border-2 border-dashed p-6 text-center
            ${isDragActive ? "border-primary bg-primary/10" : "border-muted"}
            ${isUploading ? "opacity-50" : ""}
          `}
                >
                    <input {...getInputProps()} />
                    {isUploading ? (
                        <p className="text-sm text-muted-foreground">Uploading...</p>
                    ) : isDragActive ? (
                        <p className="text-sm text-muted-foreground">Drop the file here</p>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Drag and drop a file here, or click to select
                        </p>
                    )}
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 
```

# src/components/main-nav.tsx

```tsx
"use client"

import { cn } from "@/lib/utils"
import { FileText, Plus, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="mr-4 flex items-center space-x-4 lg:space-x-6">
            <Link
                href="/"
                className="flex items-center space-x-2 font-bold text-xl"
            >
                <span className="hidden sm:inline">PromptForge</span>
            </Link>
            <nav className="flex items-center space-x-4 lg:space-x-6">
                <Link
                    href="/prompts"
                    className={cn(
                        "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                        pathname === "/prompts"
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    <FileText className="h-4 w-4" />
                    <span>Prompts</span>
                </Link>
                <Link
                    href="/prompts/search"
                    className={cn(
                        "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                        pathname === "/prompts/search"
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                </Link>
                <Link
                    href="/prompts/new"
                    className={cn(
                        "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                        pathname === "/prompts/new"
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    <Plus className="h-4 w-4" />
                    <span>Create</span>
                </Link>
            </nav>
        </div>
    )
}

```

# src/components/prompt-editor.tsx

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Version, VersionMetrics } from "@/types/version"
import { VersionType } from "@prisma/client"
import { JsonValue } from "@prisma/client/runtime/library"
import { useEffect, useRef, useState } from "react"
import { VersionCompare } from "./version-compare"
import { VersionHistory } from "./version-history"

interface PromptEditorProps {
  promptId: string
  content: string
  onChange: (content: string) => void
  onAnalyze: (content: string) => void
  isAnalyzing: boolean
  versions: RawVersion[]
  onVersionSelect: (version: Version) => void
  onVersionCompare: (version1: Version, version2: Version) => void
  onVersionDelete: (version: Version) => void
  onVersionActivate: (version: Version) => void
  activeVersionId: string | null
  isComparing: boolean
  compareVersions?: {
    version1: RawVersion
    version2: RawVersion
  }
  onAcceptOptimized: () => void
  onRejectOptimized: () => void
}

interface Suggestion {
  text: string
  description: string
}

interface RawVersion {
  id: string;
  promptId: string;
  content: string;
  description: string | null;
  model: string;
  type: VersionType;
  metrics: JsonValue;
  createdAt: string | Date;
  isActive: boolean;
}

function convertMetrics(metrics: JsonValue): VersionMetrics | null {
  if (!metrics || typeof metrics !== 'object') return null
  const m = metrics as Record<string, number>
  return {
    tokenCount: m.tokenCount ?? 0,
    estimatedCost: m.estimatedCost ?? 0,
    responseTime: m.responseTime ?? 0,
    successRate: m.successRate ?? 0,
    ...m
  }
}

function convertVersion(v: RawVersion): Version {
  return {
    ...v,
    metrics: convertMetrics(v.metrics),
    createdAt: v.createdAt instanceof Date ? v.createdAt : new Date(v.createdAt)
  }
}

export function PromptEditor({
  promptId,
  content,
  onChange,
  onAnalyze,
  isAnalyzing,
  versions,
  onVersionSelect,
  onVersionCompare,
  onVersionDelete,
  onVersionActivate,
  activeVersionId,
  isComparing,
  compareVersions,
  onAcceptOptimized,
  onRejectOptimized
}: PromptEditorProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [cursorPosition, setCursorPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const [editorContent, setEditorContent] = useState(content || '')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "{" && !showSuggestions) {
      e.preventDefault()
      const textarea = e.currentTarget
      const { selectionStart, selectionEnd } = textarea
      const textBeforeCursor = textarea.value.substring(0, selectionStart)
      const textAfterCursor = textarea.value.substring(selectionEnd)

      // Insert the opening brace
      const newText = textBeforeCursor + "{" + textAfterCursor
      onChange(newText)

      // Get cursor position for suggestions
      const rect = textarea.getBoundingClientRect()
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
      const lines = textBeforeCursor.split("\n")
      const currentLine = lines.length
      const left = rect.left +
        (textBeforeCursor.length - lines[lines.length - 1].length) * 8
      const top = rect.top + (currentLine - 1) * lineHeight

      setCursorPosition({ top, left })
      setShowSuggestions(true)

      // Get suggestions from API
      try {
        const response = await fetch("/api/v1/prompts/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: textBeforeCursor }),
        })

        if (!response.ok) throw new Error("Failed to get suggestions")
        const data = await response.json()
        setSuggestions(data.suggestions || [])
      } catch (error) {
        console.error("Failed to get suggestions:", error)
      }
    } else if (e.key === "Tab" && showSuggestions) {
      e.preventDefault()
      if (suggestions.length > 0) {
        const suggestion = suggestions[0]
        insertSuggestion(suggestion.text)
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const insertSuggestion = (text: string) => {
    if (!editorRef.current) return

    const textarea = editorRef.current
    const { selectionStart } = textarea
    const textBeforeCursor = textarea.value.substring(0, selectionStart)
    const textAfterCursor = textarea.value.substring(selectionStart)

    const newText = textBeforeCursor + text + "}" + textAfterCursor
    onChange(newText)
    setShowSuggestions(false)

    // Set cursor position after the inserted suggestion
    const newCursorPosition = selectionStart + text.length + 1
    textarea.setSelectionRange(newCursorPosition, newCursorPosition)
  }

  const handleAnalyze = async () => {
    try {
      onAnalyze(editorContent)
    } catch (error) {
      console.error('Failed to analyze prompt:', error)
    }
  }

  return (
    <div className="flex h-[calc(100vh-12rem)]">
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Prompt Editor</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-5rem)]">
            {isComparing && compareVersions ? (
              <VersionCompare
                version1={convertVersion(compareVersions.version1)}
                version2={convertVersion(compareVersions.version2)}
                onAccept={onAcceptOptimized!}
                onReject={onRejectOptimized!}
                className="h-full"
              />
            ) : (
              <div className="relative h-full">
                <textarea
                  ref={editorRef}
                  value={content}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-[calc(100%-4rem)] p-4 font-mono text-sm bg-background resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Write your prompt here..."
                />
                {showSuggestions && (
                  <div
                    ref={suggestionsRef}
                    className="absolute z-10 w-64 max-h-48 overflow-y-auto bg-background border rounded-md shadow-lg"
                    style={{
                      top: cursorPosition.top + "px",
                      left: cursorPosition.left + "px",
                    }}
                  >
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-accent cursor-pointer"
                        onClick={() => insertSuggestion(suggestion.text)}
                      >
                        <div className="font-medium">{suggestion.text}</div>
                        <div className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {onAnalyze && (
                  <Button
                    onClick={() => onAnalyze(editorContent)}
                    disabled={isAnalyzing || !content}
                    className="w-full mt-4"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze"}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {versions && (
        <VersionHistory
          versions={versions.map(convertVersion)}
          activeVersionId={activeVersionId || undefined}
          onVersionSelect={onVersionSelect}
          onVersionCompare={onVersionCompare}
          onVersionDelete={onVersionDelete}
          onVersionActivate={onVersionActivate}
        />
      )}
    </div>
  )
} 
```

# src/components/prompt-search.tsx

```tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDebounce } from "@/hooks/use-debounce"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

interface SearchResult {
    id: string
    name: string
    content: string
    description: string | null
    model: string
    tags: string[]
    category: string | null
    score: number
    metrics: Record<string, unknown>
    createdAt: Date
    updatedAt: Date
}

interface SearchFilters {
    tags?: string[]
    category?: string
    model?: string
    dateRange?: {
        start: Date
        end: Date
    }
}

interface SearchSort {
    field: "relevance" | "createdAt" | "updatedAt"
    direction: "asc" | "desc"
}

export function PromptSearch() {
    const [query, setQuery] = useState("")
    const [searchType, setSearchType] = useState<"semantic" | "text">("semantic")
    const [filters, setFilters] = useState<SearchFilters>({})
    const [sort, setSort] = useState<SearchSort>({
        field: "relevance",
        direction: "desc",
    })
    const [page, setPage] = useState(1)
    const [results, setResults] = useState<SearchResult[]>([])
    const [totalResults, setTotalResults] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const debouncedQuery = useDebounce(query, 300)

    const performSearch = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)

            const searchParams = new URLSearchParams({
                query: debouncedQuery,
                type: searchType,
                page: page.toString(),
                limit: "10",
            })

            if (Object.keys(filters).length > 0) {
                searchParams.append("filters", JSON.stringify(filters))
            }

            if (sort) {
                searchParams.append("sort", JSON.stringify(sort))
            }

            const response = await fetch(`/api/v1/prompts/search?${searchParams}`)
            if (!response.ok) throw new Error("Search failed")

            const data = await response.json()
            setResults(data.results)
            setTotalResults(data.total)
            setTotalPages(data.totalPages)
        } catch (err) {
            setError("Failed to perform search")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }, [debouncedQuery, searchType, filters, sort, page])

    useEffect(() => {
        if (debouncedQuery) {
            performSearch()
        } else {
            setResults([])
            setTotalResults(0)
            setTotalPages(0)
        }
    }, [debouncedQuery, performSearch])

    const handleFilterChange = (
        type: keyof SearchFilters,
        value: string | string[] | { start: Date; end: Date } | null
    ) => {
        setFilters((prev) => ({
            ...prev,
            [type]: value,
        }))
        setPage(1)
    }

    const handleSortChange = (field: SearchSort["field"]) => {
        setSort((prev) => ({
            field,
            direction:
                prev.field === field
                    ? prev.direction === "asc"
                        ? "desc"
                        : "asc"
                    : "desc",
        }))
        setPage(1)
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search prompts..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full"
                    />
                </div>
                <Select
                    value={searchType}
                    onValueChange={(value: string) =>
                        setSearchType(value as "semantic" | "text")
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Search type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="semantic">Semantic Search</SelectItem>
                        <SelectItem value="text">Text Search</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-4">
                <Select
                    value={filters.category || ""}
                    onValueChange={(value: string) =>
                        handleFilterChange("category", value || null)
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="coding">Coding</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="analysis">Analysis</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.model || ""}
                    onValueChange={(value: string) =>
                        handleFilterChange("model", value || null)
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All Models</SelectItem>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="claude-3-5-sonnet-20241022">Claude</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex gap-2">
                    <Button
                        variant={sort.field === "relevance" ? "default" : "outline"}
                        onClick={() => handleSortChange("relevance")}
                    >
                        Relevance{" "}
                        {sort.field === "relevance" && (sort.direction === "desc" ? "↓" : "↑")}
                    </Button>
                    <Button
                        variant={sort.field === "createdAt" ? "default" : "outline"}
                        onClick={() => handleSortChange("createdAt")}
                    >
                        Date{" "}
                        {sort.field === "createdAt" && (sort.direction === "desc" ? "↓" : "↑")}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : results.length > 0 ? (
                    <>
                        {results.map((result) => (
                            <Link key={result.id} href={`/prompts/${result.id}`}>
                                <Card className="hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>{result.name}</CardTitle>
                                            <div className="text-sm text-muted-foreground">
                                                Score: {result.score.toFixed(2)}
                                            </div>
                                        </div>
                                        <CardDescription>{result.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="font-mono text-sm line-clamp-2">
                                                {result.content}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {result.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {result.category} • {result.model} •{" "}
                                                {new Date(result.updatedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}

                        <div className="flex justify-center gap-2 mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Page {page} of {totalPages} • {totalResults} results
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                ) : (
                    query && (
                        <div className="text-center py-8 text-muted-foreground">
                            No results found
                        </div>
                    )
                )}
            </div>
        </div>
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

# src/components/test-environment.tsx

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Play, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    prompt: z.string().min(1, "Prompt is required"),
    model: z.string().min(1, "Model is required"),
    temperature: z.coerce
        .number()
        .min(0, "Temperature must be between 0 and 2")
        .max(2, "Temperature must be between 0 and 2"),
    maxTokens: z.coerce
        .number()
        .min(1, "Max tokens must be at least 1")
        .max(4096, "Max tokens cannot exceed 4096"),
    input: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: Partial<FormValues> = {
    model: "gpt-4o",
    temperature: 0.7,
    maxTokens: 1024,
}

interface TestEnvironmentProps {
    userId: string
}

export function TestEnvironment({ userId }: TestEnvironmentProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<string>("")
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    async function onSubmit(data: FormValues) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/v1/prompts/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to test prompt")
            }

            const result = await response.json()
            setResult(result.output)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to test prompt",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function onSave() {
        const values = form.getValues()
        try {
            const response = await fetch("/api/v1/prompts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: values.prompt,
                    model: values.model,
                    userId,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to save prompt")
            }

            const prompt = await response.json()
            toast({
                title: "Success",
                description: "Prompt saved successfully",
            })

            router.push(`/prompts/${prompt.id}`)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to save prompt",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Prompt Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prompt</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter your prompt here..."
                                                className="h-32"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a model" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                                                <SelectItem value="claude-3-5-sonnet-20241022">
                                                    Claude 3.5 Sonnet
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="temperature"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Temperature</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.1" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Controls randomness (0-2)
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="maxTokens"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max Tokens</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Maximum response length
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="input"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Input Variables (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter any input variables as JSON..."
                                                className="h-20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            JSON object with variables referenced in your prompt
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Play className="mr-2 h-4 w-4" />
                                    )}
                                    Test Prompt
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onSave}
                                    disabled={isLoading}
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Prompt
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <Textarea
                            value={result}
                            readOnly
                            className="h-[500px] font-mono"
                            placeholder="Result will appear here..."
                        />
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
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

# src/components/toaster.tsx

```tsx
"use client"

import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && (
                                <ToastDescription>{description}</ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
} 
```

# src/components/ui/avatar.tsx

```tsx
"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"
import * as React from "react"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            className
        )}
        {...props}
    />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
    />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
            "flex h-full w-full items-center justify-center rounded-full bg-muted",
            className
        )}
        {...props}
    />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }

```

# src/components/ui/badge.tsx

```tsx
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const badgeVariants = cva(
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }

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

# src/components/ui/dialog.tsx

```tsx
"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger
}

```

# src/components/ui/dropdown-menu.tsx

```tsx
"use client"

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
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

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

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

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger, DropdownMenuTrigger
}


```

# src/components/ui/form.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    FormProvider,
    useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
)

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>")
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}

type FormItemContextValue = {
    id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
)

const FormItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const id = React.useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
        <Label
            ref={ref}
            className={cn(error && "text-destructive", className)}
            htmlFor={formItemId}
            {...props}
        />
    )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
        return null
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn("text-sm font-medium text-destructive", className)}
            {...props}
        >
            {body}
        </p>
    )
})
FormMessage.displayName = "FormMessage"

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
} 
```

# src/components/ui/input.tsx

```tsx
import { cn } from "@/lib/utils"
import * as React from "react"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
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
    }
)
Input.displayName = "Input"

export { Input }

```

# src/components/ui/label.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label } 
```

# src/components/ui/scroll-area.tsx

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
    >
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
            "flex touch-none select-none transition-colors",
            orientation === "vertical" &&
            "h-full w-2.5 border-l border-l-transparent p-[1px]",
            orientation === "horizontal" &&
            "h-2.5 border-t border-t-transparent p-[1px]",
            className
        )}
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar } 
```

# src/components/ui/select.tsx

```tsx
"use client"

import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                className
            )}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport
                className={cn(
                    "p-1",
                    position === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Label
        ref={ref}
        className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
        {...props}
    />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </SelectPrimitive.ItemIndicator>
        </span>

        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        {...props}
    />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
    Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue
}

```

# src/components/ui/separator.tsx

```tsx
"use client"

import { cn } from "@/lib/utils"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as React from "react"

const Separator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
    (
        { className, orientation = "horizontal", decorative = true, ...props },
        ref
    ) => (
        <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn(
                "shrink-0 bg-border",
                orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                className
            )}
            {...props}
        />
    )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

# src/components/ui/tabs.tsx

```tsx
"use client"

import { cn } from "@/lib/utils"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as React from "react"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            className
        )}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
            className
        )}
        {...props}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }

```

# src/components/ui/textarea.tsx

```tsx
import { cn } from "@/lib/utils"
import * as React from "react"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }

```

# src/components/ui/toast.tsx

```tsx
"use client"

import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Viewport>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
            className
        )}
        {...props}
    />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
        variants: {
            variant: {
                default: "border bg-background",
                destructive:
                    "destructive group border-destructive bg-destructive text-destructive-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Toast = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
    return (
        <ToastPrimitives.Root
            ref={ref}
            className={cn(toastVariants({ variant }), className)}
            {...props}
        />
    )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Action>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Action
        ref={ref}
        className={cn(
            "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
            className
        )}
        {...props}
    />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Close>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Close
        ref={ref}
        className={cn(
            "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
            className
        )}
        toast-close=""
        {...props}
    >
        <X className="h-4 w-4" />
    </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Title>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Title
        ref={ref}
        className={cn("text-sm font-semibold", className)}
        {...props}
    />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Description>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Description
        ref={ref}
        className={cn("text-sm opacity-90", className)}
        {...props}
    />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
    Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, type ToastActionElement, type ToastProps
}

```

# src/components/ui/use-toast.ts

```ts
// Inspired by react-hot-toast library
import * as React from "react"

import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    })
  const dismiss = () =>
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

export { toast, useToast }

```

# src/components/user-nav.tsx

```tsx
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Key, LogOut, Settings, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function UserNav() {
    const { data: session } = useSession()
    const router = useRouter()

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

    const initials = session.user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || session.user.email?.[0].toUpperCase() || "?"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                >
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={session.user.image || undefined}
                            alt={session.user.name || "User avatar"}
                        />
                        <AvatarFallback className="bg-primary/10">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
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
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings#api-keys")}>
                        <Key className="mr-2 h-4 w-4" />
                        API Keys
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => signOut()}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

```

# src/components/version-compare.tsx

```tsx
"use client"

import { cn } from "@/lib/utils"
import { Version } from "@/types/version"
import { Check, X } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

interface VersionCompareProps {
    version1: Version
    version2: Version
    onAccept: () => void
    onReject: () => void
    className?: string
}

export function VersionCompare({
    version1,
    version2,
    onAccept,
    onReject,
    className,
}: VersionCompareProps) {
    const tokenDiff = (version2.metrics?.tokenCount || 0) - (version1.metrics?.tokenCount || 0)
    const costDiff = (version2.metrics?.estimatedCost || 0) - (version1.metrics?.estimatedCost || 0)

    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Compare Versions</h3>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={onReject}
                    >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary"
                        onClick={onAccept}
                    >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                    </Button>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-2 divide-x">
                <div className="flex flex-col">
                    <div className="p-3 border-b bg-muted/50">
                        <h4 className="text-sm font-medium">Original Version</h4>
                        <div className="text-xs text-muted-foreground mt-1">
                            {version1.metrics && (
                                <>
                                    <span>Tokens: {version1.metrics.tokenCount}</span>
                                    <span className="mx-2">•</span>
                                    <span>Cost: ${version1.metrics.estimatedCost?.toFixed(4)}</span>
                                </>
                            )}
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <pre className="p-4 text-sm whitespace-pre-wrap">{version1.content}</pre>
                    </ScrollArea>
                </div>
                <div className="flex flex-col">
                    <div className="p-3 border-b bg-muted/50">
                        <h4 className="text-sm font-medium">Optimized Version</h4>
                        <div className="text-xs text-muted-foreground mt-1">
                            {version2.metrics && (
                                <>
                                    <span>
                                        Tokens: {version2.metrics.tokenCount}{" "}
                                        <span className={cn("ml-1", tokenDiff > 0 ? "text-red-500" : "text-green-500")}>
                                            ({tokenDiff > 0 ? "+" : ""}
                                            {tokenDiff})
                                        </span>
                                    </span>
                                    <span className="mx-2">•</span>
                                    <span>
                                        Cost: ${version2.metrics.estimatedCost?.toFixed(4)}{" "}
                                        <span className={cn("ml-1", costDiff > 0 ? "text-red-500" : "text-green-500")}>
                                            ({costDiff > 0 ? "+" : ""}${costDiff.toFixed(4)})
                                        </span>
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <pre className="p-4 text-sm whitespace-pre-wrap">{version2.content}</pre>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
} 
```

# src/components/version-history.tsx

```tsx
"use client"

import { cn } from "@/lib/utils"
import { Version } from "@/types/version"
import { formatDistanceToNow } from "date-fns"
import { Check, Clock, GitCompare, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

interface VersionHistoryProps {
    versions: Version[]
    activeVersionId?: string
    onVersionSelect: (version: Version) => void
    onVersionCompare: (version1: Version, version2: Version) => void
    onVersionDelete: (version: Version) => void
    onVersionActivate: (version: Version) => void
    className?: string
}

export function VersionHistory({
    versions,
    activeVersionId,
    onVersionSelect,
    onVersionCompare,
    onVersionDelete,
    onVersionActivate,
    className,
}: VersionHistoryProps) {
    const sortedVersions = [...versions].sort((a, b) => {
        if (a.type === "original" && b.type !== "original") return -1
        if (a.type !== "original" && b.type === "original") return 1
        return b.createdAt.getTime() - a.createdAt.getTime()
    })

    const originalVersion = versions.find((v) => v.type === "original")

    return (
        <div className={cn("w-80 border-l", className)}>
            <div className="p-4 border-b">
                <h3 className="font-semibold">Version History</h3>
            </div>
            <ScrollArea className="h-[calc(100vh-10rem)]">
                <div className="p-4 space-y-4">
                    {sortedVersions.map((version) => {
                        const isActive = version.id === activeVersionId
                        const isOriginal = version.type === "original"
                        const timeAgo = formatDistanceToNow(version.createdAt, { addSuffix: true })

                        return (
                            <div
                                key={version.id}
                                className={cn(
                                    "p-3 rounded-lg border transition-colors",
                                    isActive && "border-primary bg-muted",
                                    "hover:bg-muted/50 cursor-pointer"
                                )}
                                onClick={() => onVersionSelect(version)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">
                                            {isOriginal ? "Original" : `Optimized (${version.model})`}
                                        </span>
                                        {version.isActive && (
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {!isOriginal && originalVersion && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onVersionCompare(originalVersion, version)
                                                }}
                                            >
                                                <GitCompare className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {!version.isActive && (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onVersionActivate(version)
                                                    }}
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onVersionDelete(version)
                                                    }}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{timeAgo}</span>
                                </div>
                                {version.metrics && (
                                    <div className="mt-2 text-xs text-muted-foreground">
                                        <div>Tokens: {version.metrics.tokenCount}</div>
                                        <div>Cost: ${version.metrics.estimatedCost?.toFixed(4)}</div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
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

# src/hooks/use-debounce.ts

```ts
import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

```

# src/hooks/use-versions.ts

```ts
import { useState, useCallback } from "react"
import { Version, VersionComparison } from "@/types/version"
import { useToast } from "@/components/ui/use-toast"

interface UseVersionsOptions {
  promptId: string
}

export function useVersions({ promptId }: UseVersionsOptions) {
  const [versions, setVersions] = useState<Version[]>([])
  const [activeVersionId, setActiveVersionId] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [isComparing, setIsComparing] = useState(false)
  const [compareVersions, setCompareVersions] = useState<VersionComparison>()
  const { toast } = useToast()

  const fetchVersions = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/versions`)
      if (!response.ok) throw new Error("Failed to fetch versions")
      const data = await response.json()
      setVersions(data)
      const activeVersion = data.find((v: Version) => v.isActive)
      if (activeVersion) {
        setActiveVersionId(activeVersion.id)
      }
    } catch (error) {
      console.error("Error fetching versions:", error)
      toast({
        title: "Error",
        description: "Failed to fetch versions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [promptId, toast])

  const createVersion = useCallback(async (data: {
    content: string
    description?: string | null
    model: string
    metrics?: Record<string, number>
  }) => {
    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create version")
      const version = await response.json()
      setVersions((prev) => [...prev, version])
      toast({
        title: "Success",
        description: "Version created successfully.",
      })
      return version
    } catch (error) {
      console.error("Error creating version:", error)
      toast({
        title: "Error",
        description: "Failed to create version. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }, [promptId, toast])

  const updateVersion = useCallback(async (versionId: string, data: {
    content?: string
    description?: string | null
    model?: string
    metrics?: Record<string, number>
  }) => {
    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/versions/${versionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update version")
      const updatedVersion = await response.json()
      setVersions((prev) =>
        prev.map((v) => (v.id === versionId ? updatedVersion : v))
      )
      toast({
        title: "Success",
        description: "Version updated successfully.",
      })
      return updatedVersion
    } catch (error) {
      console.error("Error updating version:", error)
      toast({
        title: "Error",
        description: "Failed to update version. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }, [promptId, toast])

  const deleteVersion = useCallback(async (versionId: string) => {
    try {
      const response = await fetch(
        `/api/v1/prompts/${promptId}/versions/${versionId}`,
        { method: "DELETE" }
      )
      if (!response.ok) throw new Error("Failed to delete version")
      setVersions((prev) => prev.filter((v) => v.id !== versionId))
      if (activeVersionId === versionId) {
        setActiveVersionId(undefined)
      }
      toast({
        title: "Success",
        description: "Version deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting version:", error)
      toast({
        title: "Error",
        description: "Failed to delete version. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }, [promptId, activeVersionId, toast])

  const activateVersion = useCallback(async (versionId: string) => {
    try {
      const response = await fetch(
        `/api/v1/prompts/${promptId}/versions/${versionId}/activate`,
        { method: "POST" }
      )
      if (!response.ok) throw new Error("Failed to activate version")
      const activatedVersion = await response.json()
      setVersions((prev) =>
        prev.map((v) => ({
          ...v,
          isActive: v.id === versionId,
        }))
      )
      setActiveVersionId(versionId)
      toast({
        title: "Success",
        description: "Version activated successfully.",
      })
      return activatedVersion
    } catch (error) {
      console.error("Error activating version:", error)
      toast({
        title: "Error",
        description: "Failed to activate version. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }, [promptId, toast])

  const compareVersion = useCallback(async (version1Id: string, version2Id: string) => {
    try {
      const version1 = versions.find((v) => v.id === version1Id)
      const version2 = versions.find((v) => v.id === version2Id)
      if (!version1 || !version2) throw new Error("Version not found")

      setCompareVersions({
        version1,
        version2,
        metrics: {
          tokenDiff:
            (version2.metrics?.tokenCount || 0) - (version1.metrics?.tokenCount || 0),
          costDiff:
            (version2.metrics?.estimatedCost || 0) - (version1.metrics?.estimatedCost || 0),
        },
      })
      setIsComparing(true)
    } catch (error) {
      console.error("Error comparing versions:", error)
      toast({
        title: "Error",
        description: "Failed to compare versions. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }, [versions, toast])

  return {
    versions,
    activeVersionId,
    isLoading,
    isComparing,
    compareVersions,
    fetchVersions,
    createVersion,
    updateVersion,
    deleteVersion,
    activateVersion,
    compareVersion,
    setIsComparing,
  }
} 
```

# src/lib/auth.ts

```ts
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await compare(
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
        } catch (error) {
          console.error("Auth error:", error)
          return null
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
      if (token && session.user) {
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
import { PromptCategory } from "@prisma/client"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const PROMPT_CATEGORIES = [
  "Business",
  "CodeGeneration",
  "ContentCreation",
  "CreativeWriting",
  "CustomerSupport",
  "DataAnalysis",
  "Debugging",
  "Design",
  "Documentation",
  "Education",
  "Entertainment",
  "EthicsAndPhilosophy",
  "General",
  "KnowledgeManagement",
  "Legal",
  "Marketing",
  "MediaProduction",
  "NetworkingAndOutreach",
  "Optimization",
  "PersonalDevelopment",
  "Presentation",
  "Productivity",
  "ProjectManagement",
  "QuestionAnswering",
  "Research",
  "Roleplay",
  "Sales",
  "ScienceExploration",
  "SocialMedia",
  "Summarization",
  "SystemDesign",
  "TaskPlanning",
  "Testing",
  "Translation",
  "UserInterfaceDesign",
  "UXResearch",
  "Visualization",
] as const

interface AIAnalysis {
  category: PromptCategory
  tags: string[]
  suggestedName: string
  description: string
}

interface Suggestion {
  text: string
  description: string
}

export class AIService {
  static async analyzePrompt(content: string): Promise<AIAnalysis> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an advanced AI assistant specializing in prompt analysis. Your task is to analyze prompts, infer their intent and context, and provide structured metadata about them.
      
            Available categories: ${PROMPT_CATEGORIES.join(", ")}

            Your analysis should follow these rules:
            1. **Category Selection**: Choose exactly ONE category from the available list that best aligns with the primary purpose of the prompt. Use the exact category name.
            2. **Tag Generation**: Generate 3-5 concise, relevant tags that highlight key aspects, use cases, or techniques of the prompt. Tags must be single words or short phrases.
            3. **Name Suggestion**: Suggest a clear and concise name for the prompt that reflects its purpose or goal.
            4. **Description Creation**: Provide a brief but informative description that explains the intent, use case, and expected output of the prompt.
            5. **Contextual Enrichment**: Use reasoning to infer implicit goals or missing details if the prompt lacks clarity, and include them in your analysis where applicable.
            6. **Consistency**: Ensure your analysis is concise, precise, and uses consistent terminology aligned with the categories and tags.`,
          },
          {
            role: "user",
            content: `Analyze this prompt and provide:
            1. Category (choose one): ${PROMPT_CATEGORIES.join(", ")}
            2. Tags (3-5 relevant tags)
            3. Suggested name
            4. Brief description
            
            Prompt: ${content}
            
            Respond in this exact format:
            Category: [category]
            Tags: [tag1], [tag2], [tag3], [tag4], [tag5]
            Name: [name]
            Description: [description]`,
          },
        ],
        temperature: 0.3,
      })

      const analysis = response.choices[0]?.message?.content
      if (!analysis) throw new Error("No analysis generated")

      // Parse the analysis into structured data
      const lines = analysis.split("\n")

      // Extract and validate category
      const categoryLine = lines.find((l) => l.startsWith("Category:"))
      const categoryText = categoryLine?.split(":")[1]?.trim()
      const category = PROMPT_CATEGORIES.includes(
        categoryText as PromptCategory
      )
        ? (categoryText as PromptCategory)
        : "General"

      // Extract and clean tags
      const tagsLine = lines.find((l) => l.startsWith("Tags:"))
      const tags =
        tagsLine
          ?.split(":")[1]
          ?.split(",")
          .map((t) => t.trim())
          .filter(Boolean) || []

      // Extract name and description
      const name =
        lines
          .find((l) => l.startsWith("Name:"))
          ?.split(":")[1]
          ?.trim() || "Untitled Prompt"

      const description =
        lines
          .find((l) => l.startsWith("Description:"))
          ?.split(":")[1]
          ?.trim() || ""

      return {
        category,
        tags,
        suggestedName: name,
        description,
      }
    } catch (error) {
      console.error("Error analyzing prompt:", error)
      throw new Error("Failed to analyze prompt")
    }
  }

  static async suggestImprovements(content: string): Promise<string> {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are an expert at analyzing and improving AI prompts. Provide specific, actionable suggestions to improve the prompt's effectiveness, clarity, and reliability.",
        },
        {
          role: "user",
          content: `Please analyze this prompt and suggest improvements:\n\n${content}`,
        },
      ],
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || "No suggestions available."
  }

  static async generateTestCases(content: string): Promise<string> {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are an expert at creating test cases for AI prompts. Generate diverse test cases that cover different scenarios, edge cases, and potential failure modes.",
        },
        {
          role: "user",
          content: `Please generate test cases for this prompt:\n\n${content}`,
        },
      ],
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || "No test cases available."
  }

  static async getSuggestions(context: string): Promise<Suggestion[]> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that suggests variables and templates for prompts.",
          },
          {
            role: "user",
            content: `Based on this prompt context, suggest relevant variables or templates:

              Context: ${context}
              
              Provide suggestions in this format:
              - text: The variable or template text
              - description: A brief description of what it does`,
          },
        ],
      })

      const content = response.choices[0]?.message?.content
      if (!content) return []

      // Parse the suggestions into structured data
      const suggestions: Suggestion[] = content
        .split("\n")
        .filter((line) => line.includes("text:"))
        .map((line) => {
          const [text, description] = line.split(" - description: ")
          return {
            text: text.replace("- text: ", "").trim(),
            description: description?.trim() || "",
          }
        })

      return suggestions
    } catch (error) {
      console.error("Error getting suggestions:", error)
      return []
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
  updatedAt: Date
  userId: string
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

    const { ...userWithoutPassword } = user
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
        updatedAt: new Date(),
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
        updatedAt: true,
        userId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return apiKeys
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
        updatedAt: new Date(),
      },
    })

    return updatedApiKey
  }
}

```

# src/lib/services/import.service.ts

```ts
import { prisma } from "@/lib/prisma"
import { PromptCategory } from "@prisma/client"
import { AIService } from "./ai.service"

interface ImportedPrompt {
  content: string
  name?: string
  description?: string
  model?: string
  tags?: string[]
  category?: PromptCategory
}

export class ImportService {
  static async parseFile(file: File): Promise<ImportedPrompt[]> {
    const text = await file.text()
    const extension = file.name.split(".").pop()?.toLowerCase()

    try {
      switch (extension) {
        case "json":
          return this.parseJSON(text)
        case "csv":
          return this.parseCSV(text)
        case "txt":
          return this.parseTXT(text)
        default:
          throw new Error("Unsupported file format")
      }
    } catch (error) {
      console.error("Error parsing file:", error)
      throw new Error("Failed to parse file")
    }
  }

  private static parseJSON(text: string): ImportedPrompt[] {
    const data = JSON.parse(text)
    if (Array.isArray(data)) {
      return data.map((item) => ({
        content: typeof item === "string" ? item : item.content,
        name: typeof item === "object" ? item.name : undefined,
        description: typeof item === "object" ? item.description : undefined,
        model: typeof item === "object" ? item.model : undefined,
        tags: typeof item === "object" ? item.tags : undefined,
        category:
          typeof item === "object"
            ? (item.category as PromptCategory)
            : undefined,
      }))
    }
    throw new Error("Invalid JSON format")
  }

  private static parseCSV(text: string): ImportedPrompt[] {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
    const prompts: ImportedPrompt[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim())
      const prompt: ImportedPrompt = {
        content: "",
      }

      headers.forEach((header, index) => {
        const value = values[index]
        if (!value) return

        switch (header) {
          case "content":
          case "prompt":
          case "text":
            prompt.content = value
            break
          case "name":
          case "title":
            prompt.name = value
            break
          case "description":
            prompt.description = value
            break
          case "model":
            prompt.model = value
            break
          case "tags":
            prompt.tags = value.split(";").map((t) => t.trim())
            break
          case "category":
            prompt.category = value as PromptCategory
            break
        }
      })

      if (prompt.content) {
        prompts.push(prompt)
      }
    }

    return prompts
  }

  private static parseTXT(text: string): ImportedPrompt[] {
    return text
      .split("\n\n")
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block) => ({
        content: block,
      }))
  }

  static async processPrompts(prompts: ImportedPrompt[], userId: string) {
    const results = []

    for (const prompt of prompts) {
      try {
        // If name/description/tags/category not provided, analyze the prompt
        if (
          !prompt.name ||
          !prompt.description ||
          !prompt.tags ||
          !prompt.category
        ) {
          const analysis = await AIService.analyzePrompt(prompt.content)

          results.push(
            await prisma.prompt.create({
              data: {
                content: prompt.content,
                name:
                  prompt.name || analysis.suggestedName || "Untitled Prompt",
                description: prompt.description || analysis.description || "",
                model: prompt.model || "gpt-4o",
                tags: prompt.tags || analysis.tags || [],
                category: (prompt.category ||
                  analysis.category ||
                  "General") as PromptCategory,
                userId,
              },
            })
          )
        } else {
          // Use provided metadata
          results.push(
            await prisma.prompt.create({
              data: {
                content: prompt.content,
                name: prompt.name,
                description: prompt.description || "",
                model: prompt.model || "gpt-4o",
                tags: prompt.tags,
                category: prompt.category,
                userId,
              },
            })
          )
        }
      } catch (error) {
        console.error("Error processing prompt:", error)
        // Continue with other prompts even if one fails
      }
    }

    return results
  }
}

```

# src/lib/services/prompt.service.ts

```ts
import { prisma } from "@/lib/prisma"
import { LLMModel } from "@/types/prompt"
import { Prisma, PromptCategory } from "@prisma/client"

export interface ListPromptsOptions {
  category?: string
  tag?: string
  search?: string
  page?: number
  limit?: number
  excludeId?: string
}

export class PromptService {
  static async createPrompt(data: {
    name: string
    content: string
    description?: string | null
    model: LLMModel
    tags: string[]
    category?: PromptCategory | null
    userId: string
    teamId?: string | null
  }) {
    // Verify user exists first
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    })

    if (!user) {
      throw new Error(`User not found with ID: ${data.userId}`)
    }

    const { category, ...restData } = data

    const prompt = await prisma.prompt.create({
      data: {
        ...restData,
        // Convert null to undefined for category
        ...(category && { category }),
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
    const { category, tag, search, page = 1, limit = 10, excludeId } = options
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
      baseWhere.category = category as PromptCategory
    }

    if (tag) {
      baseWhere.tags = { has: tag }
    }

    if (excludeId) {
      baseWhere.id = { not: excludeId }
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
      category?: PromptCategory | null
      teamId?: string | null
    }
  ) {
    const { category, teamId, ...restData } = data

    const existingPrompt = await prisma.prompt.findFirst({
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

    if (!existingPrompt) {
      throw new Error("Prompt not found")
    }

    const updatedPrompt = await prisma.prompt.update({
      where: { id },
      data: {
        ...restData,
        ...(category && { category }),
        ...(teamId && { teamId }),
        ...(data.content && {
          versions: {
            create: {
              content: data.content,
              description: data.description,
              model: data.model || existingPrompt.model,
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

# src/lib/services/search.service.ts

```ts
import { prisma } from "@/lib/prisma"
import { Prisma, PromptCategory } from "@prisma/client"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface SearchResult {
  id: string
  name: string
  content: string
  description: string | null
  model: string
  tags: string[]
  category: string | null
  score: number
  metrics: Prisma.JsonValue
  createdAt: Date
  updatedAt: Date
}

interface SearchOptions {
  userId: string
  query: string
  filters?: {
    tags?: string[]
    category?: string
    model?: string
    dateRange?: {
      start: Date
      end: Date
    }
  }
  sort?: {
    field: "relevance" | "createdAt" | "updatedAt"
    direction: "asc" | "desc"
  }
  page?: number
  limit?: number
}

export class SearchService {
  static async semanticSearch({
    userId,
    query,
    filters,
    sort = { field: "relevance", direction: "desc" },
    page = 1,
    limit = 10,
  }: SearchOptions): Promise<{
    results: SearchResult[]
    total: number
    page: number
    totalPages: number
  }> {
    try {
      // Generate embedding for the search query
      const embedding = await this.generateEmbedding(query)

      // Build the base query
      const whereClause: Prisma.PromptWhereInput = { userId }

      // Apply filters
      if (filters) {
        if (filters.tags?.length) {
          whereClause.tags = { hasEvery: filters.tags }
        }
        if (filters.category) {
          whereClause.category = filters.category as PromptCategory
        }
        if (filters.model) {
          whereClause.model = filters.model
        }
        if (filters.dateRange) {
          whereClause.createdAt = {
            gte: filters.dateRange.start,
            lte: filters.dateRange.end,
          }
        }
      }

      // Get total count for pagination
      const total = await prisma.prompt.count({ where: whereClause })
      const totalPages = Math.ceil(total / limit)

      // Get prompts with vector similarity search
      const prompts = await prisma.$queryRaw<SearchResult[]>`
        WITH prompt_matches AS (
          SELECT 
            p.*,
            1 - (p.embedding <=> ${embedding}::vector) as similarity_score
          FROM "Prompt" p
          WHERE p."userId" = ${userId}
          ${
            filters?.category
              ? Prisma.sql`AND p.category = ${filters.category}`
              : Prisma.sql``
          }
          ${
            filters?.model
              ? Prisma.sql`AND p.model = ${filters.model}`
              : Prisma.sql``
          }
          ${
            filters?.tags?.length
              ? Prisma.sql`AND p.tags @> ${filters.tags}::text[]`
              : Prisma.sql``
          }
          ${
            filters?.dateRange
              ? Prisma.sql`AND p."createdAt" BETWEEN ${filters.dateRange.start} AND ${filters.dateRange.end}`
              : Prisma.sql``
          }
        )
        SELECT 
          id,
          name,
          content,
          description,
          model,
          tags,
          category,
          similarity_score as score,
          metrics,
          "createdAt",
          "updatedAt"
        FROM prompt_matches
        ORDER BY 
          ${
            sort.field === "relevance"
              ? Prisma.sql`similarity_score ${
                  sort.direction === "desc" ? Prisma.sql`DESC` : Prisma.sql`ASC`
                }`
              : sort.field === "createdAt"
              ? Prisma.sql`"createdAt" ${
                  sort.direction === "desc" ? Prisma.sql`DESC` : Prisma.sql`ASC`
                }`
              : Prisma.sql`"updatedAt" ${
                  sort.direction === "desc" ? Prisma.sql`DESC` : Prisma.sql`ASC`
                }`
          }
        LIMIT ${limit}
        OFFSET ${(page - 1) * limit}
      `

      return {
        results: prompts,
        total,
        page,
        totalPages,
      }
    } catch (error) {
      console.error("Error in semantic search:", error)
      throw new Error("Failed to perform semantic search")
    }
  }

  static async textSearch({
    userId,
    query,
    filters,
    sort = { field: "relevance", direction: "desc" },
    page = 1,
    limit = 10,
  }: SearchOptions): Promise<{
    results: SearchResult[]
    total: number
    page: number
    totalPages: number
  }> {
    try {
      // Build the base query
      const whereClause: Prisma.PromptWhereInput = {
        userId,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      }

      // Apply filters
      if (filters) {
        if (filters.tags?.length) {
          whereClause.tags = { hasEvery: filters.tags }
        }
        if (filters.category) {
          whereClause.category = filters.category as PromptCategory
        }
        if (filters.model) {
          whereClause.model = filters.model
        }
        if (filters.dateRange) {
          whereClause.createdAt = {
            gte: filters.dateRange.start,
            lte: filters.dateRange.end,
          }
        }
      }

      // Get total count for pagination
      const total = await prisma.prompt.count({ where: whereClause })
      const totalPages = Math.ceil(total / limit)

      // Get prompts with text search
      const prompts = await prisma.prompt.findMany({
        where: whereClause,
        orderBy: {
          [sort.field === "relevance" ? "updatedAt" : sort.field]:
            sort.direction,
        },
        take: limit,
        skip: (page - 1) * limit,
      })

      return {
        results: prompts.map((prompt) => ({
          ...prompt,
          score: 1, // Default score for text search
        })),
        total,
        page,
        totalPages,
      }
    } catch (error) {
      console.error("Error in text search:", error)
      throw new Error("Failed to perform text search")
    }
  }

  private static async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
      })

      return response.data[0].embedding
    } catch (error) {
      console.error("Error generating embedding:", error)
      throw new Error("Failed to generate embedding")
    }
  }
}

```

# src/lib/services/user.service.ts

```ts
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import bcrypt from "bcryptjs"

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
            id: true,
            name: true,
            description: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error("User not found")
    }

    return user
  }

  static async updateUser(
    id: string,
    data: Partial<{
      name: string
      email: string
      password: string
    }>
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

    const updateData: Prisma.UserUpdateInput = { ...data }
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

# src/lib/services/version.service.ts

```ts
import { prisma } from "@/lib/prisma"
import { CreateVersionMetrics, Version } from "@/types/version"
import { Prisma, VersionType } from "@prisma/client"

interface CreateVersionParams {
  promptId: string
  content: string
  description?: string
  model: string
  type: VersionType
  metrics?: CreateVersionMetrics
}

interface UpdateVersionParams {
  id: string
  content?: string
  description?: string | null
  model?: string
  metrics?: CreateVersionMetrics
}

export class VersionService {
  static async createVersion(params: CreateVersionParams) {
    const { promptId, content, description, model, type, metrics } = params

    // Deactivate all other versions if this is being set as active
    if (type === "original") {
      await prisma.version.updateMany({
        where: { promptId },
        data: { isActive: false },
      })
    }

    // Create the new version
    const version = await prisma.version.create({
      data: {
        content,
        description,
        model,
        type,
        metrics: metrics ? (metrics as Prisma.InputJsonValue) : Prisma.JsonNull,
        promptId,
        isActive: type === "original",
      },
    })

    return this.mapVersion(version)
  }

  static async updateVersion(params: UpdateVersionParams) {
    const { id, content, description, model, metrics } = params

    const version = await prisma.version.update({
      where: { id },
      data: {
        content,
        description,
        model,
        metrics: metrics ? (metrics as Prisma.InputJsonValue) : undefined,
      },
    })

    return this.mapVersion(version)
  }

  static async getVersions(promptId: string) {
    const versions = await prisma.version.findMany({
      where: { promptId },
      orderBy: { createdAt: "desc" },
    })

    return versions.map(this.mapVersion)
  }

  static async getActiveVersion(promptId: string) {
    const version = await prisma.version.findFirst({
      where: { promptId, isActive: true },
    })

    return version ? this.mapVersion(version) : null
  }

  static async setActiveVersion(versionId: string) {
    const version = await prisma.version.findUnique({
      where: { id: versionId },
      include: { prompt: true },
    })

    if (!version) {
      throw new Error("Version not found")
    }

    // Deactivate all versions for this prompt
    await prisma.version.updateMany({
      where: { promptId: version.promptId },
      data: { isActive: false },
    })

    // Activate the selected version
    const updatedVersion = await prisma.version.update({
      where: { id: versionId },
      data: { isActive: true },
    })

    return this.mapVersion(updatedVersion)
  }

  static async compareVersions(versionId1: string, versionId2: string) {
    const [version1, version2] = await Promise.all([
      prisma.version.findUnique({ where: { id: versionId1 } }),
      prisma.version.findUnique({ where: { id: versionId2 } }),
    ])

    if (!version1 || !version2) {
      throw new Error("One or both versions not found")
    }

    const v1 = this.mapVersion(version1)
    const v2 = this.mapVersion(version2)

    return {
      version1: v1,
      version2: v2,
      metrics: {
        tokenDiff:
          (v2.metrics?.tokenCount || 0) - (v1.metrics?.tokenCount || 0),
        costDiff:
          (v2.metrics?.estimatedCost || 0) - (v1.metrics?.estimatedCost || 0),
      },
    }
  }

  static async deleteVersion(id: string) {
    const version = await prisma.version.delete({
      where: { id },
    })

    return this.mapVersion(version)
  }

  private static mapVersion(
    version: Prisma.VersionGetPayload<Record<string, never>>
  ): Version {
    const metrics = version.metrics as Record<string, number> | null
    return {
      id: version.id,
      content: version.content,
      description: version.description,
      model: version.model,
      type: version.type,
      metrics: metrics
        ? {
            tokenCount: metrics.tokenCount,
            estimatedCost: metrics.estimatedCost,
            responseTime: metrics.responseTime,
            successRate: metrics.successRate,
            ...metrics,
          }
        : null,
      createdAt: new Date(version.createdAt),
      promptId: version.promptId,
      isActive: version.isActive,
    }
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

export function formatDate(dateString: string | Date) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  )
  const day = date.getDate()
  return `${month} ${day}, ${year}`
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
export type LLMModel = 
  | "gpt-4o"
  | "gpt-4-turbo"
  | "gpt-3.5-turbo"
  | "claude-3-opus"
  | "claude-3-sonnet-20241022"
  | "gemini-pro"
  | "mixtral-8x7b"
  | "llama-2-70b"

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
  input: Record<string, string>
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

# src/types/version.ts

```ts
import { VersionType } from "@prisma/client"

export interface VersionMetrics {
  tokenCount?: number
  estimatedCost?: number
  responseTime?: number
  successRate?: number
  [key: string]: number | undefined
}

export interface CreateVersionMetrics extends VersionMetrics {}

export interface Version {
  id: string
  content: string
  description: string | null
  model: string
  type: VersionType
  metrics: VersionMetrics | null
  createdAt: Date
  promptId: string
  isActive: boolean
}

export interface VersionComparison {
  version1: Version
  version2: Version
  metrics: {
    tokenDiff: number
    costDiff: number
  }
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

# tests-examples/demo-todo-app.spec.ts

```ts
import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
] as const;

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Make sure the list only has one todo item.
    await expect(page.getByTestId('todo-title')).toHaveText([
      TODO_ITEMS[0]
    ]);

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    // Make sure the list now has two todo items.
    await expect(page.getByTestId('todo-title')).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1]
    ]);

    await checkNumberOfTodosInLocalStorage(page, 2);
  });

  test('should clear text input field when an item is added', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create one todo item.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Check that input is empty.
    await expect(newTodo).toBeEmpty();
    await checkNumberOfTodosInLocalStorage(page, 1);
  });

  test('should append new items to the bottom of the list', async ({ page }) => {
    // Create 3 items.
    await createDefaultTodos(page);

    // create a todo count locator
    const todoCount = page.getByTestId('todo-count')
  
    // Check test using different methods.
    await expect(page.getByText('3 items left')).toBeVisible();
    await expect(todoCount).toHaveText('3 items left');
    await expect(todoCount).toContainText('3');
    await expect(todoCount).toHaveText(/3/);

    // Check all items in one call.
    await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });
});

test.describe('Mark all as completed', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test.afterEach(async ({ page }) => {
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test('should allow me to mark all items as completed', async ({ page }) => {
    // Complete all todos.
    await page.getByLabel('Mark all as complete').check();

    // Ensure all todos have 'completed' class.
    await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);
  });

  test('should allow me to clear the complete state of all items', async ({ page }) => {
    const toggleAll = page.getByLabel('Mark all as complete');
    // Check and then immediately uncheck.
    await toggleAll.check();
    await toggleAll.uncheck();

    // Should be no completed classes.
    await expect(page.getByTestId('todo-item')).toHaveClass(['', '', '']);
  });

  test('complete all checkbox should update state when items are completed / cleared', async ({ page }) => {
    const toggleAll = page.getByLabel('Mark all as complete');
    await toggleAll.check();
    await expect(toggleAll).toBeChecked();
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);

    // Uncheck first todo.
    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').uncheck();

    // Reuse toggleAll locator and make sure its not checked.
    await expect(toggleAll).not.toBeChecked();

    await firstTodo.getByRole('checkbox').check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);

    // Assert the toggle all is checked again.
    await expect(toggleAll).toBeChecked();
  });
});

test.describe('Item', () => {

  test('should allow me to mark items as complete', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    // Check first item.
    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').check();
    await expect(firstTodo).toHaveClass('completed');

    // Check second item.
    const secondTodo = page.getByTestId('todo-item').nth(1);
    await expect(secondTodo).not.toHaveClass('completed');
    await secondTodo.getByRole('checkbox').check();

    // Assert completed class.
    await expect(firstTodo).toHaveClass('completed');
    await expect(secondTodo).toHaveClass('completed');
  });

  test('should allow me to un-mark items as complete', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    const firstTodo = page.getByTestId('todo-item').nth(0);
    const secondTodo = page.getByTestId('todo-item').nth(1);
    const firstTodoCheckbox = firstTodo.getByRole('checkbox');

    await firstTodoCheckbox.check();
    await expect(firstTodo).toHaveClass('completed');
    await expect(secondTodo).not.toHaveClass('completed');
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await firstTodoCheckbox.uncheck();
    await expect(firstTodo).not.toHaveClass('completed');
    await expect(secondTodo).not.toHaveClass('completed');
    await checkNumberOfCompletedTodosInLocalStorage(page, 0);
  });

  test('should allow me to edit an item', async ({ page }) => {
    await createDefaultTodos(page);

    const todoItems = page.getByTestId('todo-item');
    const secondTodo = todoItems.nth(1);
    await secondTodo.dblclick();
    await expect(secondTodo.getByRole('textbox', { name: 'Edit' })).toHaveValue(TODO_ITEMS[1]);
    await secondTodo.getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
    await secondTodo.getByRole('textbox', { name: 'Edit' }).press('Enter');

    // Explicitly assert the new text value.
    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2]
    ]);
    await checkTodosInLocalStorage(page, 'buy some sausages');
  });
});

test.describe('Editing', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test('should hide other controls when editing', async ({ page }) => {
    const todoItem = page.getByTestId('todo-item').nth(1);
    await todoItem.dblclick();
    await expect(todoItem.getByRole('checkbox')).not.toBeVisible();
    await expect(todoItem.locator('label', {
      hasText: TODO_ITEMS[1],
    })).not.toBeVisible();
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test('should save edits on blur', async ({ page }) => {
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).dispatchEvent('blur');

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
    await checkTodosInLocalStorage(page, 'buy some sausages');
  });

  test('should trim entered text', async ({ page }) => {
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('    buy some sausages    ');
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Enter');

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
    await checkTodosInLocalStorage(page, 'buy some sausages');
  });

  test('should remove the item if an empty text string was entered', async ({ page }) => {
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('');
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Enter');

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[2],
    ]);
  });

  test('should cancel edits on escape', async ({ page }) => {
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Escape');
    await expect(todoItems).toHaveText(TODO_ITEMS);
  });
});

test.describe('Counter', () => {
  test('should display the current number of todo items', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');
    
    // create a todo count locator
    const todoCount = page.getByTestId('todo-count')

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    await expect(todoCount).toContainText('1');

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');
    await expect(todoCount).toContainText('2');

    await checkNumberOfTodosInLocalStorage(page, 2);
  });
});

test.describe('Clear completed button', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test('should display the correct text', async ({ page }) => {
    await page.locator('.todo-list li .toggle').first().check();
    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
  });

  test('should remove completed items when clicked', async ({ page }) => {
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should be hidden when there are no items that are completed', async ({ page }) => {
    await page.locator('.todo-list li .toggle').first().check();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
  });
});

test.describe('Persistence', () => {
  test('should persist its data', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    const todoItems = page.getByTestId('todo-item');
    const firstTodoCheck = todoItems.nth(0).getByRole('checkbox');
    await firstTodoCheck.check();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoItems).toHaveClass(['completed', '']);

    // Ensure there is 1 completed item.
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    // Now reload.
    await page.reload();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoItems).toHaveClass(['completed', '']);
  });
});

test.describe('Routing', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    // make sure the app had a chance to save updated todos in storage
    // before navigating to a new view, otherwise the items can get lost :(
    // in some frameworks like Durandal
    await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
  });

  test('should allow me to display active items', async ({ page }) => {
    const todoItem = page.getByTestId('todo-item');
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(todoItem).toHaveCount(2);
    await expect(todoItem).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should respect the back button', async ({ page }) => {
    const todoItem = page.getByTestId('todo-item'); 
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await test.step('Showing all items', async () => {
      await page.getByRole('link', { name: 'All' }).click();
      await expect(todoItem).toHaveCount(3);
    });

    await test.step('Showing active items', async () => {
      await page.getByRole('link', { name: 'Active' }).click();
    });

    await test.step('Showing completed items', async () => {
      await page.getByRole('link', { name: 'Completed' }).click();
    });

    await expect(todoItem).toHaveCount(1);
    await page.goBack();
    await expect(todoItem).toHaveCount(2);
    await page.goBack();
    await expect(todoItem).toHaveCount(3);
  });

  test('should allow me to display completed items', async ({ page }) => {
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
  });

  test('should allow me to display all items', async ({ page }) => {
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole('link', { name: 'Active' }).click();
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.getByRole('link', { name: 'All' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(3);
  });

  test('should highlight the currently applied filter', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'All' })).toHaveClass('selected');
    
    //create locators for active and completed links
    const activeLink = page.getByRole('link', { name: 'Active' });
    const completedLink = page.getByRole('link', { name: 'Completed' });
    await activeLink.click();

    // Page change - active items.
    await expect(activeLink).toHaveClass('selected');
    await completedLink.click();

    // Page change - completed items.
    await expect(completedLink).toHaveClass('selected');
  });
});

async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['react-todos']).length === e;
  }, expected);
}

async function checkNumberOfCompletedTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['react-todos']).filter((todo: any) => todo.completed).length === e;
  }, expected);
}

async function checkTodosInLocalStorage(page: Page, title: string) {
  return await page.waitForFunction(t => {
    return JSON.parse(localStorage['react-todos']).map((todo: any) => todo.title).includes(t);
  }, title);
}

```

# tests/example.spec.ts

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

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

