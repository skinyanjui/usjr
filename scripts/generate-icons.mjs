import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import toIco from 'png-to-ico'

async function ensurePngFromSvg(svgPath, size, outPath) {
  await sharp(svgPath)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath)
}

async function main() {
  const rootDir = process.cwd()
  const appDir = path.join(rootDir, 'app')
  const svgPath = path.join(appDir, 'icon.svg')

  try {
    await fs.access(svgPath)
  } catch {
    console.error(`Base SVG not found at ${svgPath}`)
    process.exit(1)
  }

  const png16 = path.join(appDir, 'icon-16.png')
  const png32 = path.join(appDir, 'icon-32.png')
  const png48 = path.join(appDir, 'icon-48.png')
  const png192 = path.join(appDir, 'icon-192.png')
  const png512 = path.join(appDir, 'icon-512.png')
  const pngMain = path.join(appDir, 'icon.png')
  const applePng = path.join(appDir, 'apple-icon.png')

  await Promise.all([
    ensurePngFromSvg(svgPath, 16, png16),
    ensurePngFromSvg(svgPath, 32, png32),
    ensurePngFromSvg(svgPath, 48, png48),
    ensurePngFromSvg(svgPath, 180, applePng),
    ensurePngFromSvg(svgPath, 192, png192),
    ensurePngFromSvg(svgPath, 512, png512),
    ensurePngFromSvg(svgPath, 512, pngMain),
  ])

  const icoBuffer = await toIco([png16, png32, png48])
  await fs.writeFile(path.join(appDir, 'icon.ico'), icoBuffer)

  console.log('Icons generated:')
  console.log('- app/icon.png (512x512)')
  console.log('- app/icon-192.png')
  console.log('- app/icon-512.png')
  console.log('- app/icon-16.png, icon-32.png, icon-48.png')
  console.log('- app/icon.ico')
  console.log('- app/apple-icon.png (180x180)')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
