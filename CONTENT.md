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

| | |
|---|---|
| **Email** | `bryanquinlan` |
| **Password** | `bryanq12345` |

That is the whole login. No setup screen, no token to paste.

### One-time seeding (done once, by a developer)

The browser needs a GitHub token to commit — that is simply how the GitHub
API works. It is sealed into the repo once and nobody sees it again:

```bash
GITHUB_TOKEN=github_pat_xxx node scripts/set-admin.mjs
git add public/admin-auth.json && git commit -m "Configure admin sign-in" && git push
```

Create the token at
**[GitHub → Fine-grained tokens → Generate new](https://github.com/settings/personal-access-tokens/new)**:

- **Repository access** → *Only select repositories* → **The-Quinlan-Group**
- **Permissions → Repository permissions → Contents** → **Read and write**

The script encrypts it under the password (PBKDF2-SHA256, 600k iterations,
AES-GCM) and writes `public/admin-auth.json`. The password is never stored —
it is the decryption key, so typing it correctly *is* the check. A wrong
password cannot decrypt, it fails.

### Know this about the current password

`bryanq12345` is short and guessable. Because the site is static, the
encrypted token ships publicly with the site, so anyone can download it and
try passwords offline at full speed. This one would not last long against
that, and whoever cracked it could edit the site.

That is an accepted trade-off for convenience, not a mistake — but it is worth
knowing. Two ways to improve it whenever you want:

1. **Stronger password** — rerun `set-admin.mjs` after changing `PASSWORD` in
   the script. Four random words is enormously stronger and no harder to type.
2. **Real server-side auth** — a small free Cloudflare Worker holds the token
   so it never reaches the browser at all. The CMS itself would not change.

Either way, keep the token scoped to this one repo so the blast radius stays
limited to this site.

### Changing the password

Edit `PASSWORD` at the top of `scripts/set-admin.mjs`, rerun it with a token,
commit the regenerated `public/admin-auth.json`.

Sessions live in the tab and end when it closes.

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
