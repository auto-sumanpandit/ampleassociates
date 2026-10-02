# Sanity Studio — Ample Associates

The website reads content through `src/lib/cms`. Without Sanity credentials it serves the typed content in `src/content/`. When `SANITY_PROJECT_ID` is set, it queries Sanity and falls back to local content if Sanity is unreachable or the dataset is empty.

## Set up

1. Create a project at sanity.io/manage and note the project ID.
2. `cd sanity && npm install`
3. Create `sanity/.env` with `SANITY_STUDIO_PROJECT_ID=...` and `SANITY_STUDIO_DATASET=production`
4. `npm run dev` → http://localhost:3333
5. Add the website origin to the project's CORS settings. For a private dataset, create a read token and set `SANITY_READ_TOKEN` on the website.
6. Migrate the content in `src/content/*.ts` into the Studio (document types mirror those files field for field).

## Roles

Use Sanity's built-in roles: **Administrator** (Admin), **Editor** (content editor / project manager), **Viewer**. Only administrators should change a `*Status` field to `VERIFIED`, and only with documentary evidence on file.

## Private documents

Do **not** upload restricted investor documents (title deeds, financials) to Sanity assets — asset URLs are public. Restricted documents belong in the Phase-5 investor portal with access control.
