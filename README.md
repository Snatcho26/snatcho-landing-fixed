# Snatcho — Minimal landing + welcome-email (Supabase + Resend)

This bundle contains the minimal files you asked for:

- `app/page.tsx` — client page with the waitlist form (supabase insert + POST to /api/send-email)
- `pages/api/send-email.ts` — Next.js API route that sends a welcome email using **Resend**
- `package.json`, `tsconfig.json`, `next-env.d.ts` — minimal project setup
- `.env.example` — environment variable template

> This README will spoonfeed you the exact steps to get this running locally and on Vercel.

---

## 1) Download & unzip
1. Download the zip and extract:
   - On macOS / Linux: `unzip snatcho-setup.zip`
   - On Windows: right-click → Extract All

2. `cd snatcho-setup`

## 2) Create local env
Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```
- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon/public key
- `RESEND_API_KEY` — your Resend API key (from https://resend.com)

**Important (legality & consent):**
- Ensure you only send emails to users who consented. Keep a record of consent (`consent: true` is being stored in Supabase).
- Add a link to your Privacy Policy on the site and include an unsubscribe method in emails. This helps with compliance under Indian electronic communications practice and general best practice.

## 3) Install dependencies
```bash
npm install
```
This adds `resend` and `@supabase/supabase-js` to `node_modules` and writes `package-lock.json`.

## 4) Run locally (and fix the SWC lockfile warning)
Run:
```bash
npm run dev
```
- Next.js may show: `⚠ Found lockfile missing swc dependencies, run next locally to automatically patch`
- Running `npm run dev` will **auto-patch** the lockfile. After it finishes, commit the generated `package-lock.json`.

## 5) Test the flow
1. Open `http://localhost:3000`
2. Fill name + email → click **Join the Waitlist**
3. Check terminal where `npm run dev` is running for any server logs from `/api/send-email`
4. Check the email inbox for the welcome email (if using a test email provider, Resend will show activity in their dashboard)

## 6) Vercel deployment checklist
1. Commit & push your repo to GitHub/GitLab/Bitbucket.
2. Connect the repository to Vercel.
3. In Vercel project settings → Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
4. Make sure `resend` is listed under `dependencies` in `package.json` and `package-lock.json` is committed. Vercel installs production deps during build.
5. If you still see `Module not found: Can't resolve 'resend'` on Vercel, double-check you pushed `package-lock.json` and `package.json` changes and redeploy.

## 7) Verify your sending domain (Resend)
- In Resend dashboard: add/verify your sending domain (hello@snatchoindia.com).
- Follow Resend's DNS instructions (add TXT / MX / DKIM records) — this is required so emails are not flagged as spam.

## 8) Troubleshooting common errors
- **Can't resolve 'resend'**: Run `npm install resend` and commit `package-lock.json`. Confirm `resend` is in `dependencies` (not devDependencies).
- **Missing env vars in Vercel**: Set them in Project → Settings → Environment Variables.
- **Build warning about SWC**: Run `npm run dev` locally once; commit `package-lock.json`.

## 9) Small legal checklist (India-focused, high level)
- Obtain explicit consent before sending marketing emails. Store consent records.
- Provide an easy unsubscribe mechanism.
- Publish a Privacy Policy and link to it on your landing page.
- Do not send unsolicited promotional messages — this can conflict with Telecom/IT rules.
- If you plan to scale (SMS, transactional emails), consult a legal expert to review compliance with applicable Indian laws (IT Act / TRAI / Consumer Protection). This README is not legal advice.

---

If anything fails, paste the terminal/Vercel build logs here and I’ll diagnose the exact error. I’ll also walk you step-by-step through the fix.
