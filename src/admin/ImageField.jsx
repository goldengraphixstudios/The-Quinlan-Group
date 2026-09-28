import { useRef, useState } from 'react'
import { writeBinary } from './github'
import { assetUrl } from '../content'

const MAX_W = 1600
const QUALITY = 0.82

/** Strip accents/spaces so the committed filename is URL-safe and stable. */
function slugFilename(name) {
  const base = name.replace(/\.[^.]+$/, '')
  return (
    base
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'image'
  )
}

/**
 * Downscale and re-encode in the browser before upload. The site previously
 * shipped 3MB PNGs; compressing here means an editor cannot reintroduce that
 * by dragging in a phone photo.
 */
function compress(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const scale = Math.min(1, MAX_W / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => (blob ? resolve({ blob, w: canvas.width, h: canvas.height }) : reject(new Error('Could not encode image'))),
        'image/jpeg',
        QUALITY
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('That file is not a readable image'))
    }
    img.src = url
  })
}

const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => resolve(String(fr.result).split(',')[1])
    fr.onerror = () => reject(new Error('Could not read file'))
    fr.readAsDataURL(blob)
  })

export default function ImageField({ token, value, onChange, label = 'Image' }) {
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  async function handleFile(file) {
    if (!file) return
    setError('')
    try {
      setBusy('Compressing…')
      const { blob, w, h } = await compress(file)
      const name = `${slugFilename(file.name)}-${Date.now().toString(36)}.jpg`
      const path = `public/uploads/${name}`

      setBusy(`Uploading ${(blob.size / 1024).toFixed(0)}KB…`)
      await writeBinary(token, path, await blobToBase64(blob), `Upload image ${name}`)

      onChange(`uploads/${name}`)
      setBusy('')
      setError(
        `Uploaded — ${(file.size / 1048576).toFixed(2)}MB compressed to ` +
          `${(blob.size / 1024).toFixed(0)}KB at ${w}×${h}.`
      )
    } catch (err) {
      setBusy('')
      setError(err.message)
    }
  }

  return (
    <div className="a-field">
      <label className="a-label">{label}</label>
      <div className="a-image-row">
        <div className="a-image-preview">
          {value ? <img src={assetUrl(value)} alt="" /> : <span>No image</span>}
        </div>
        <div className="a-image-actions">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              handleFile(e.target.files?.[0])
              e.target.value = ''
            }}
          />
          <button
            type="button"
            className="a-btn"
            disabled={!!busy}
            onClick={() => inputRef.current?.click()}
          >
            {busy || (value ? 'Replace image' : 'Upload image')}
          </button>
          {value && (
            <button type="button" className="a-btn a-btn--quiet" onClick={() => onChange('')}>
              Remove
            </button>
          )}
          <p className="a-hint">{value || 'JPEG/PNG. Resized to 1600px and compressed automatically.'}</p>
          {error && <p className="a-hint a-hint--note">{error}</p>}
        </div>
      </div>
    </div>
  )
}
