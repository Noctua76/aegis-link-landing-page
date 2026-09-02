import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const serverEntry = path.join(projectRoot, "dist-ssr", "entry-server.js");
const { renderRoute } = await import(pathToFileURL(serverEntry).href);

const routes = [
  { file: "en/index.html", language: "en", page: "landing" },
  { file: "gr/index.html", language: "gr", page: "landing" },
  { file: "en/privacy/index.html", language: "en", page: "privacy" },
  { file: "gr/privacy/index.html", language: "gr", page: "privacy" },
];

try {
  for (const route of routes) {
    const outputPath = path.join(projectRoot, "dist", route.file);
    const template = await readFile(outputPath, "utf8");
    const markup = renderRoute(route.language, route.page);

    if (!markup.includes("<main") || !markup.includes("<h1")) {
      throw new Error(`Prerendered markup is incomplete for ${route.file}`);
    }

    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root" data-prerendered="true">${markup}</div>`,
    );

    if (html === template) {
      throw new Error(`Root element was not found in ${route.file}`);
    }

    await writeFile(outputPath, html);
  }
} finally {
  await rm(path.join(projectRoot, "dist-ssr"), { recursive: true, force: true });
}
