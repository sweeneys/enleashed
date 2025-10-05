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
```

Open http://localhost:3000

- Home lists works.
- Click a work to read. Select text → choose comment or highlight.
- Admin at `/admin` (you will be prompted; server also checks header).

## Deploy

- Vercel for frontend.
- Use Neon/Supabase Postgres for `DATABASE_URL` in production.
- Run `npx prisma migrate deploy` on deploy.
- Add a cron (Vercel Cron) to POST to `/api/summarize` daily with `{ "workSlug": "thesis-overview", "period":"rolling-7d" }`.

## Notes

- Selections are stored as offsets per block. If you drastically change block text,
  old offsets may drift. Prefer stable editing or reflow in the admin to minimize drift.
- Swap to a richer editor (Tiptap/ProseMirror) later for resilient ranges (e.g.,
  position mapping). This MVP keeps it simple and auditable.
- Extend the `Highlight.reaction` to be enum-like: love/insightful/unclear/disagree.
- Add auth (NextAuth) if you want named users.
