/**
 * Minimal GitHub Contents API client.
 *
 * The site is hosted on GitHub Pages, which serves static files only — there
 * is no server to run a CMS on. So the repo itself is the database: the admin
 * panel commits JSON and images straight to `main`, and the deploy workflow
 * rebuilds the site on every push.
 *
 * The editor supplies their own fine-grained personal access token, scoped to
 * this one repo with Contents: read & write. It is kept in localStorage on
 * their machine and sent only to api.github.com.
 */

export const REPO_OWNER = 'goldengraphixstudios'
export const REPO_NAME = 'The-Quinlan-Group'
export const BRANCH = 'main'

const API = 'https://api.github.com'
const TOKEN_KEY = 'tqg_admin_token'

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export const setToken = (t) => {
  try {
    if (t) localStorage.setItem(TOKEN_KEY, t)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* private browsing — the session simply will not persist */
  }
}

/* base64 <-> UTF-8. The content is full of em-dashes and curly quotes, so
   btoa/atob alone would corrupt it. */
export function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  const CHUNK = 0x8000
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK))
  }
  return btoa(bin)
}

export function decodeBase64(b64) {
  const bin = atob(b64.replace(/\s/g, ''))
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

async function api(pathname, { token, method = 'GET', body } = {}) {
  const res = await fetch(`${API}${pathname}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${token}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401) throw new Error('Token rejected. Check that it has not expired.')
  if (res.status === 403) {
    throw new Error('Token lacks permission. It needs Contents: read & write on this repo.')
  }
  if (res.status === 404) {
    const err = new Error('Not found')
    err.status = 404
    throw err
  }
  if (res.status === 409) {
    throw new Error('Someone else saved first. Reload to get the latest, then redo your edit.')
  }
  if (!res.ok) {
    let detail = ''
    try {
      detail = (await res.json()).message || ''
    } catch {
      /* non-JSON error body */
    }
    throw new Error(detail || `GitHub returned ${res.status}`)
  }
  return res.status === 204 ? null : res.json()
}

const repoPath = (p) =>
  `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${p}?ref=${encodeURIComponent(BRANCH)}`

/** Confirm the token works and can actually write here. */
export async function verifyToken(token) {
  const repo = await api(`/repos/${REPO_OWNER}/${REPO_NAME}`, { token })
  if (!repo.permissions?.push) {
    throw new Error('That token can read this repo but not write to it.')
  }
  const user = await api('/user', { token }).catch(() => null)
  return { login: user?.login || 'token', repo: repo.full_name }
}

/** Read a text file. Returns { data, sha } — sha is required to update it. */
export async function readJson(token, filePath) {
  const file = await api(repoPath(filePath), { token })
  return { data: JSON.parse(decodeBase64(file.content)), sha: file.sha }
}

/** Commit a JSON file. Pass the sha you read, so a concurrent edit 409s. */
export async function writeJson(token, filePath, data, sha, message) {
  const res = await api(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
    token,
    method: 'PUT',
    body: {
      message,
      content: encodeBase64(JSON.stringify(data, null, 2) + '\n'),
      sha,
      branch: BRANCH,
    },
  })
  return res.content.sha
}

/** Commit a binary file (already base64). Overwrites if the path exists. */
export async function writeBinary(token, filePath, base64, message) {
  let sha
  try {
    const existing = await api(repoPath(filePath), { token })
    sha = existing.sha
  } catch (err) {
    if (err.status !== 404) throw err
  }
  await api(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
    token,
    method: 'PUT',
    body: { message, content: base64, sha, branch: BRANCH },
  })
  return filePath
}

/** Most recent deploy run, so the panel can say whether the site is live yet. */
export async function latestRun(token) {
  const res = await api(
    `/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs?per_page=1&branch=${BRANCH}`,
    { token }
  ).catch(() => null)
  const run = res?.workflow_runs?.[0]
  if (!run) return null
  return { status: run.status, conclusion: run.conclusion, url: run.html_url }
}

export const actionsUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/actions`
