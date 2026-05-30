import sharp from 'sharp'
import { mkdirSync } from 'fs'

mkdirSync('public', { recursive: true })

const info = await sharp('app/assets/og.png')
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .flatten({ background: '#07070a' })
  .webp({ quality: 85, effort: 6 })
  .withMetadata(false)
  .toFile('public/og.webp')

console.log(`og.webp — ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`)
