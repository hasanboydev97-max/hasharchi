import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public', 'icons');
const srcLogo = path.join(process.cwd(), 'src', 'assets', 'logo-hasharchi.webp');

async function generateIcons() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 192x192
  await sharp(srcLogo)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'icon-192x192.png'));

  // 512x512
  await sharp(srcLogo)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'icon-512x512.png'));
    
  // Maskable icon (usually with some padding)
  await sharp(srcLogo)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({ top: 50, bottom: 50, left: 50, right: 50, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512x512-maskable.png'));

  console.log('PWA icons generated successfully in public/icons');
}

generateIcons().catch(console.error);
