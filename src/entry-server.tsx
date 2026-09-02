import { renderToString } from "react-dom/server";
import App from "./App";
import type { Language } from "./i18n/LanguageContext";
import type { SitePage } from "./lib/siteRoute";

export const renderRoute = (language: Language, page: SitePage) =>
  renderToString(<App initialLanguage={language} initialPage={page} />);
