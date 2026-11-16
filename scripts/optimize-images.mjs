import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const src = "originals";
const out = "public/images/projects";

fs.mkdirSync(out, { recursive: true });

for (const file of fs.readdirSync(src)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
  const name = path.parse(file).name;
  const width = name.endsWith("-detail") ? 1100 : 900;

  const info = await sharp(path.join(src, file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 72, effort: 5 })
    .toFile(path.join(out, name + ".webp"));

  console.log(
    `${file} → ${Math.round(info.size / 1024)} KB (${info.width}x${info.height})`,
  );
}
