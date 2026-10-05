# Flowline

A sales pipeline CRM for small B2B teams. Track contacts, move deals through pipeline stages, log activities, and see which deals need attention.

**Live demo:** https://flowline-five.vercel.app/

Click **Sign in with demo account** on the login page to explore the app with sample data. No sign-up needed.

<!-- screenshots: added in a later step -->

## Features

- **Contacts** – create, edit, delete, search by name or company, sort, paginate
- **Deals** – pipeline board grouped by stage, with detail, create, edit and delete
- **Activities** – tasks (with due dates) and notes linked to deals; tasks can be marked as completed
- **Dashboard** – weighted pipeline value, overdue tasks, at-risk deals, deals per stage
- **Business rules** beyond plain CRUD:
  - **Weighted pipeline value** – deal value × stage probability, open deals only
  - **Stale deal detection** – an open deal with no activity for longer than its stage allows (3 to 7 days depending on the stage)
  - **Actionless deal detection** – an open deal with no open task
- **Light and dark theme**, saved in the browser and applied before first paint
- **Responsive layout** – the sidebar becomes a drawer on small screens
- **Accessibility basics** – skip link, Esc closes the mobile drawer, labelled icon buttons

## Tech stack

- React 19, JavaScript, Vite
- Tailwind CSS v4
- React Router
- TanStack Query (server state)
- React Hook Form + Zod (forms and validation)
- Supabase (Postgres, Auth, Row Level Security)
- date-fns
- Vitest + React Testing Library
- ESLint + Prettier
- Deployed on Vercel (every push to `main`)

## Getting started

The live demo is the quickest way to try the app. To run it locally you need your own Supabase project with `contacts`, `deals` and `activities` tables. Each table has an `owner_id` column and a Row Level Security policy `owner_id = auth.uid()`.

```bash
git clone https://github.com/FiratCanTas/flowline.git
cd flowline
npm install
```

Copy `.env.example` to `.env` and fill in your Supabase project values:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Then start the dev server:

```bash
npm run dev
```

Optional: `supabase/flowline-demo-seed.sql` fills a demo user (`demo@example.com`, created in Supabase Authentication first) with sample data. Run it in the Supabase SQL Editor.

## Scripts

| Command           | What it does                       |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the dev server               |
| `npm run build`   | Production build                   |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Run ESLint                         |
| `npm run format`  | Format the code with Prettier      |
| `npm test`        | Run tests (watch mode)             |

## Tests

Vitest + React Testing Library. Covered: deal business rules, data mappers, dashboard helpers, and the `DealForm` flow.

## Project structure

```
src/
  components/
    ui/          shared primitives (Button, Input, Select, ...)
    layout/      app shell and navigation
  features/      auth, contacts, deals, activities, dashboard
                 (each with api/, components/, schema.js, utils.js as needed)
  lib/           Supabase client
  pages/         route-level screens
  routes/        protected route wrapper
  test/          test setup
supabase/        demo seed script
```

## Known limitations

- Very long titles in inputs are truncated (no multiline field yet).
- Activities on the deal detail page are not clickable, and there is no activity detail page (intentional).
- The mobile drawer closes with Esc only while focus is inside the app; clicking empty space moves focus to `body`.
- The stale threshold depends on the deal's stage, and changing the stage does not reset the clock.
- Single-user accounts only; multi-user teams are out of scope.
- The demo account is public. Row Level Security keeps it limited to its own data.
