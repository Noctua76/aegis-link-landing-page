import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import en from "./src/i18n/en";
import gr from "./src/i18n/gr";

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
        '<link rel="canonical" href="https://noctua76.github.io/aegis-link-landing-page/en" />',
        '<link rel="canonical" href="https://noctua76.github.io/aegis-link-landing-page/gr" />',
      )
      .replace(
        '<meta property="og:url" content="https://noctua76.github.io/aegis-link-landing-page/en" />',
        '<meta property="og:url" content="https://noctua76.github.io/aegis-link-landing-page/gr" />',
      )
      .replace(
        '"url": "https://noctua76.github.io/aegis-link-landing-page/en"',
        '"url": "https://noctua76.github.io/aegis-link-landing-page/gr"',
      );
    writeFileSync(greekEntry, greekHtml);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/aegis-link-landing-page/",
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
