// lib/theme/theme-manager.js

import { THEME_PRESETS, DEFAULT_THEME } from "@/config/themes";
import { themeToCssVariables } from "./theme-utils";

const STORAGE_KEY = "sms-saas-theme";

export function getStoredTheme() {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return DEFAULT_THEME;
    }

    return {
      ...DEFAULT_THEME,
      ...JSON.parse(stored),
    };
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveTheme(settings) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );
}

export function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveThemeMode(mode) {
  if (mode === "system") {
    return getSystemTheme();
  }

  return mode;
}

export function applyTheme(settings = DEFAULT_THEME) {
  if (typeof window === "undefined") {
    return;
  }

  const preset =
    THEME_PRESETS[settings.preset] ||
    THEME_PRESETS[DEFAULT_THEME.preset];

  const mode = resolveThemeMode(
    settings.mode || DEFAULT_THEME.mode
  );

  const theme =
    preset[mode] ||
    preset.light;

  const variables = themeToCssVariables(theme);

  const root = document.documentElement;

  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  root.classList.toggle("dark", mode === "dark");

  root.dataset.theme = settings.preset || DEFAULT_THEME.preset;
  root.dataset.mode = mode;

  saveTheme({
    ...settings,
    mode: settings.mode || DEFAULT_THEME.mode,
  });
}

export function initializeTheme() {
  const settings = getStoredTheme();

  applyTheme(settings);

  return settings;
}

export function listenForSystemTheme(settings) {
  if (
    typeof window === "undefined" ||
    settings.mode !== "system"
  ) {
    return () => {};
  }

  const mediaQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  const handleChange = () => {
    applyTheme(settings);
  };

  mediaQuery.addEventListener(
    "change",
    handleChange
  );

  return () => {
    mediaQuery.removeEventListener(
      "change",
      handleChange
    );
  };
}