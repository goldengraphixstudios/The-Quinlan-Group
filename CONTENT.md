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

## Signing in

Username and password. That is it.

**The very first visit** shows a one-time setup screen instead: pick a username
(defaults to `bryan`) and a password, and paste a GitHub token once. After that
the token is never needed again — it is encrypted with your password and stored,
and everyone signs in normally.

Get the token from
**[GitHub → Fine-grained tokens → Generate new](https://github.com/settings/personal-access-tokens/new)**:

- **Repository access** → *Only select repositories* → **The-Quinlan-Group**
- **Permissions → Repository permissions → Contents** → **Read and write**

Nothing else is needed.

### Why the password has to be a strong one

The site is static — there is no server to check a password against. So the
GitHub token is stored **encrypted with your password** (PBKDF2, 600,000
iterations, AES-GCM) in `public/admin-auth.json`.

That file is public, like everything else in the repo. A wrong password cannot
decrypt it, but someone who downloaded it could guess passwords offline. The
password is the only thing protecting the token, so:

- Use a **long passphrase** — four random words beats a short complex string.
- Do not reuse a password from anywhere else.
- Scope the token to this one repo, so worst case is limited to this site.

The setup screen enforces a 12-character minimum and rejects obvious guesses.

If you want proper server-side authentication instead — where the token never
reaches the browser at all — that needs a small free API (a Cloudflare Worker).
Ask and it can be added without changing anything else.

### Your password is not recoverable

It is never stored, only used to derive a key. If it is lost, delete
`public/admin-auth.json` from the repo and the setup screen returns; you will
need a fresh GitHub token.

Signing out clears the session immediately, and sessions end when the tab
closes.

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
