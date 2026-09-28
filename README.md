# Jayeola Olasunkanmi Idyat — Portfolio

Personal portfolio for Jayeola Olasunkanmi Idyat, data analyst. Built with Next.js 16 (App Router), TypeScript and Tailwind CSS 4.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Structure

- `content/` — all portfolio content as typed data: `profile.ts`, `projects.ts`, `experience.ts`, `credentials.ts`, `skills.ts`. Adding a project means adding one entry to `projects.ts`; the listing, case-study page, filters, sitemap and skill counts update automatically.
- `app/` — routes: `/`, `/projects`, `/projects/[slug]`, `/resume`, plus `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` and the contact server action (`actions.ts`).
- `components/` — `layout/`, `sections/` (home page), `projects/` (cards, case-study media, charts, filter), `ui/`.
- `public/images`, `public/documents` — portrait, project screenshots, certificate images, CV and project files.

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — production URL, used for canonical URLs, the sitemap and Open Graph tags. On Vercel it falls back to the production domain.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — optional. With a Resend key the Contact section shows a validated, spam-protected form; without one it shows email, phone and CV links only.
