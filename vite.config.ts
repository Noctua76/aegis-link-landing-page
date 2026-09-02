import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import en from "./src/i18n/en";
import gr from "./src/i18n/gr";

const productionSiteUrl = "https://aegislink.noctuacore.ai";

const createPrivacyHtml = (
  sourceHtml: string,
  currentMeta: typeof en.meta | typeof gr.meta,
  privacyMeta: typeof en.privacyPolicy.meta | typeof gr.privacyPolicy.meta,
) => sourceHtml
  .replaceAll(currentMeta.title, privacyMeta.title)
  .replace(currentMeta.description, privacyMeta.description)
  .replaceAll(currentMeta.ogDescription, privacyMeta.ogDescription)
  .replaceAll(`${productionSiteUrl}/en`, `${productionSiteUrl}/en/privacy/`)
  .replaceAll(`${productionSiteUrl}/gr`, `${productionSiteUrl}/gr/privacy/`)
  .replace(
    /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    "",
  );

const languageRoutes = () => ({
  name: "aegis-language-routes",
  closeBundle() {
    const outputDirectory = path.resolve(__dirname, "dist");
    ["en", "gr"].forEach((language) => {
      const routeDirectory = path.join(outputDirectory, language);
      mkdirSync(routeDirectory, { recursive: true });
      copyFileSync(path.join(outputDirectory, "index.html"), path.join(routeDirectory, "index.html"));
    });

    const greekEntry = path.join(outputDirectory, "gr", "index.html");
    const greekHtml = readFileSync(greekEntry, "utf8")
      .replace('<html lang="en">', '<html lang="el">')
      .replaceAll(en.meta.title, gr.meta.title)
      .replace(en.meta.description, gr.meta.description)
      .replaceAll(en.meta.ogDescription, gr.meta.ogDescription)
      .replaceAll(
        'One connected operational picture—from field to command.',
        'Μία ενιαία επιχειρησιακή εικόνα, από το πεδίο έως το κέντρο ελέγχου.',
      )
      .replace(
        'A real-time Security Operations Platform for guards, supervisors and operations teams.',
        'Μία Security Operations Platform σε πραγματικό χρόνο για φύλακες, επόπτες και ομάδες επιχειρήσεων.',
      )
      .replace(
        `<link rel="canonical" href="${productionSiteUrl}/en" />`,
        `<link rel="canonical" href="${productionSiteUrl}/gr" />`,
      )
      .replace(
        `<meta property="og:url" content="${productionSiteUrl}/en" />`,
        `<meta property="og:url" content="${productionSiteUrl}/gr" />`,
      )
      .replace(
        `"url": "${productionSiteUrl}/en"`,
        `"url": "${productionSiteUrl}/gr"`,
      );
    writeFileSync(greekEntry, greekHtml);

    const privacyRoutes = [
      { language: "en" as const, html: readFileSync(path.join(outputDirectory, "en", "index.html"), "utf8"), currentMeta: en.meta, privacyMeta: en.privacyPolicy.meta },
      { language: "gr" as const, html: greekHtml, currentMeta: gr.meta, privacyMeta: gr.privacyPolicy.meta },
    ];

    privacyRoutes.forEach(({ language, html, currentMeta, privacyMeta }) => {
      const privacyDirectory = path.join(outputDirectory, language, "privacy");
      mkdirSync(privacyDirectory, { recursive: true });
      writeFileSync(
        path.join(privacyDirectory, "index.html"),
        createPrivacyHtml(html, currentMeta, privacyMeta),
      );
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.VERCEL ? "/" : "/aegis-link-landing-page/",
  server: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: ["terminal.local"],
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), languageRoutes()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
