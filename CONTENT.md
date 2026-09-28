# Content Manager

Edit articles, closings, and news at
**<https://goldengraphixstudios.github.io/The-Quinlan-Group/#/admin>**

No developer, no local setup. Changes go live on their own in about a minute.

---

## How it works

The site is hosted on GitHub Pages, which serves static files only — there is
no server to run a CMS on. So the repo itself is the database:

```
Admin panel  →  commits JSON + images to main  →  Actions rebuilds  →  live site
```

Content lives in `src/content/*.json`. Uploaded images land in `public/uploads/`.
Both are ordinary commits, so every edit is version-controlled and revertable.

---

## First-time setup (once per person)

1. Go to **[GitHub → Fine-grained tokens → Generate new](https://github.com/settings/personal-access-tokens/new)**.
2. **Repository access** → *Only select repositories* → **The-Quinlan-Group**.
3. **Permissions → Repository permissions** → set **Contents** to **Read and write**.
   Nothing else is needed.
4. Generate, copy the token, paste it into the admin sign-in screen.

The token is stored in that browser only. It is never committed and never sent
anywhere except `api.github.com`.

**Treat the token like a password.** Anyone holding it can change the site.
Scope it to this one repo, give it an expiry, and generate a separate one per
person so access can be revoked individually.

---

## Using it

**Articles** — the Insights & Resources section. Title, cover image, intro,
and any number of body sections. The three most recent published articles
appear as cards; the rest become the "More reading" list.

**Closings** — the Recent Closings carousel. Caption plus image.

**News** — feeds *both* the ticker above the nav and the popup card. The
"Ticker line" is the one-liner in the bar; the rest fills the popup. These used
to be two separate hard-coded lists that had to be kept in sync by hand.

Common to all three:

- **Draft / Published** — drafts are saved but never shown on the site.
- **↑ ↓** — controls display order.
- **Delete** — removes the item on the next publish.
- **Publish changes** — commits and triggers the rebuild. The banner links to
  the build log; the site updates once it goes green.

Nothing is saved until you press **Publish changes**. The browser will warn you
if you try to leave with unsaved edits.

---

## Images

Uploads are **resized to 1600px and compressed to JPEG in the browser** before
they are committed. Drag in a 4MB phone photo and roughly 200KB gets stored.

This matters: the site previously shipped ~29MB of images (one PNG alone was
3.3MB), which is now ~6.5MB. The automatic compression is what stops that
creeping back.

To re-compress the original bundled assets after adding new ones by hand:

```bash
node scripts/compress-images.mjs          # report
node scripts/compress-images.mjs --write  # apply
```

---

## Notes

- Two people publishing at once: whoever saves second gets a conflict warning
  and should reload and redo. Nothing is silently overwritten.
- The `/#/admin` URL is public but useless without a valid token.
- `npm run deploy` still works for manual deploys, but is no longer needed —
  `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
