export const languages = [
  { code: "pt-BR", label: "Português (Brasil)" },
  { code: "en-US", label: "English (US)" },
  { code: "es-ES", label: "Español (España)" },
  { code: "es-MX", label: "Español (Latinoamérica)" },
  { code: "fr-FR", label: "Français" },
  { code: "de-DE", label: "Deutsch" },
  { code: "it-IT", label: "Italiano" },
  { code: "ja-JP", label: "日本語" },
  { code: "ko-KR", label: "한국어" },
  { code: "zh-CN", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" },
  { code: "ru-RU", label: "Русский" },
  { code: "ar-SA", label: "العربية" }
] as const;

export type LangCode = typeof languages[number]["code"];
export type LangLabel = typeof languages[number]["label"];

