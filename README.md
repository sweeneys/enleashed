# PhD Feedback Site (Next.js + Prisma + Tailwind)

A minimal, production-quality starter that lets visitors **highlight** passages,
leave **inline comments**, and lets you run **AI synthesis** jobs to spot trends.

## Features

- Next.js App Router + TypeScript
- MDX content per "Work" (thesis chapter, paper, etc.)
- Client-side selection → highlight or comment (stored by block + offsets)
- Comments sidebar
- Admin page to add/edit works (guarded by `ADMIN_SECRET`)
- Prisma + SQLite (easy local start; swap to Postgres later)
- `/api/summarize` endpoint that aggregates recent feedback and calls OpenAI

## Quick start

```bash
# 1) Install
npm i

# 2) Configure env
cp .env.example .env
# set ADMIN_SECRET and OPENAI_API_KEY (optional for AI synthesis)

# 3) DB
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed

# 4) Dev
npm run dev


# Enleashed Tech
First deploy via GitHub Desktop 🚀