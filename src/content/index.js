import articlesRaw from './articles.json'
import closingsRaw from './closings.json'
import newsRaw from './news.json'

/**
 * Content lives as JSON in the repo and is edited through the admin panel.
 * Images referenced here live in public/uploads/ rather than src/assets, so
 * their URLs stay stable — Vite content-hashes anything under src/assets at
 * build time, which the CMS could never predict.
 */

/** Resolve a stored path ("uploads/foo.jpg") against the deployed base path. */
export function assetUrl(p) {
  if (!p) return ''
  if (/^(https?:)?\/\//.test(p) || p.startsWith('data:')) return p
  return import.meta.env.BASE_URL + p.replace(/^\/+/, '')
}

const live = (items) =>
  items
    .filter((i) => i.published !== false)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

export const articles = live(articlesRaw).map((a) => ({
  ...a,
  img: assetUrl(a.image),
}))

export const closings = live(closingsRaw).map((c) => ({
  ...c,
  img: assetUrl(c.image),
}))

export const news = live(newsRaw).map((n) => ({
  ...n,
  img: assetUrl(n.image),
}))
