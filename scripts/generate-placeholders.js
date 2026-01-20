// scripts/generate-placeholders.js
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Generating placeholders...');

const images = [
    // Web
    { src: 'src/assets/sam/web/cons1.jpg', name: 'cons1' },
    { src: 'src/assets/sam/web/cons2.jpg', name: 'cons2' },
    { src: 'src/assets/sam/web/cons3.jpg', name: 'cons3' },
    { src: 'src/assets/sam/web/cosmetics1.jpg', name: 'cosmetics1' },
    { src: 'src/assets/sam/web/cosmetics2.jpg', name: 'cosmetics2' },
    { src: 'src/assets/sam/web/cosmetics3.jpg', name: 'cosmetics3' },
    { src: 'src/assets/sam/web/consul1.jpg', name: 'consul1' },
    { src: 'src/assets/sam/web/consul2.jpg', name: 'consul2' },
    { src: 'src/assets/sam/web/consul3.jpg', name: 'consul3' },
    { src: 'src/assets/sam/web/consul4.jpg', name: 'consul4' },
    { src: 'src/assets/sam/web/gym1.jpg', name: 'gym1' },
    { src: 'src/assets/sam/web/gym2.jpg', name: 'gym2' },
    { src: 'src/assets/sam/web/gym3.jpg', name: 'gym3' },
    { src: 'src/assets/sam/web/gym4.jpg', name: 'gym4' },
    { src: 'src/assets/sam/web/gym5.jpg', name: 'gym5' },
    { src: 'src/assets/sam/web/travel1.jpg', name: 'travel1' },
    { src: 'src/assets/sam/web/travel2.jpg', name: 'travel2' },
    { src: 'src/assets/sam/web/travel3.jpg', name: 'travel3' },
    { src: 'src/assets/sam/web/travel4.jpg', name: 'travel4' },
    { src: 'src/assets/sam/web/real1.jpg', name: 'real1' },
    { src: 'src/assets/sam/web/real2.jpg', name: 'real2' },
    { src: 'src/assets/sam/web/real3.jpg', name: 'real3' },
    { src: 'src/assets/sam/web/res1.jpg', name: 'res1' },
    { src: 'src/assets/sam/web/res2.jpg', name: 'res2' },
    { src: 'src/assets/sam/web/res3.jpg', name: 'res3' },
    // SaaS
    { src: 'src/assets/saas/saas1.webp', name: 'saas1' },
    { src: 'src/assets/saas/saas2.webp', name: 'saas2' },
    { src: 'src/assets/saas/saas3.webp', name: 'saas3' },
    { src: 'src/assets/saas/saas4.webp', name: 'saas4' },
    // Ads
    { src: 'src/assets/ads/ad1.jpg', name: 'ad1' },
    { src: 'src/assets/ads/ad2.jpg', name: 'ad2' },
    { src: 'src/assets/ads/ad3.jpg', name: 'ad3' },
    { src: 'src/assets/ads/ad4.jpg', name: 'ad4' },
    { src: 'src/assets/ads/ad5.jpg', name: 'ad5' },
    { src: 'src/assets/ads/ad6.jpg', name: 'ad6' },
    { src: 'src/assets/ads/ad7.jpg', name: 'ad7' },
    { src: 'src/assets/ads/ad8.jpg', name: 'ad8' },
    { src: 'src/assets/ads/ad9.jpg', name: 'ad9' },
    // Logo
    { src: 'src/assets/logo/1.jpg', name: 'logo1' },
    { src: 'src/assets/logo/2.jpg', name: 'logo2' },
    { src: 'src/assets/logo/3.jpg', name: 'logo3' },
    { src: 'src/assets/logo/4.jpg', name: 'logo4' },
    { src: 'src/assets/logo/5.jpg', name: 'logo5' },
    { src: 'src/assets/logo/6.jpg', name: 'logo6' },
    { src: 'src/assets/logo/7.jpeg', name: 'logo7' },
];

const outDir = path.resolve('src/assets/placeholders');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
    console.log('Created:', outDir);
}

let success = 0;
let failed = 0;

await Promise.all(
    images.map(async({ src, name }) => {
        const fullPath = path.resolve(src);
        if (!fs.existsSync(fullPath)) {
            console.error(`Not found: ${fullPath}`);
            failed++;
            return;
        }

        try {
            const buffer = await sharp(fullPath)
                .resize(40)
                .jpeg({ quality: 20 })
                .toBuffer();

            const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
            const filePath = path.join(outDir, `${name}.ts`);
            fs.writeFileSync(filePath, `export const placeholder_${name} = "${base64}";\n`);
            console.log(`Generated: ${name}.ts`);
            success++;
        } catch (err) {
            console.error(`Failed ${name}:`, err.message);
            failed++;
        }
    })
);

// Generate index.ts
const indexPath = path.join(outDir, 'index.ts');
const exports = images
    .map(({ name }) => `export { placeholder_${name} } from './${name}';`)
    .join('\n');
fs.writeFileSync(indexPath, exports + '\n');

console.log(`index.ts generated with ${images.length} exports`);
console.log(`Success: ${success} | Failed: ${failed}`);
console.log('All done! Restart Vite.');