"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_THEME,
  THEME_PRESETS,
} from "@/config/themes";

import {
  DEFAULT_UI_SETTINGS,
} from "@/config/ui";

import {
  DEFAULT_FONT,
} from "@/config/typography";

import {
  applyTheme,
  getStoredTheme,
  listenForSystemTheme,
} from "@/lib/theme/theme-manager";

const ThemeContext = createContext(null);

const DEFAULT_SETTINGS = {
  ...DEFAULT_THEME,
  ...DEFAULT_UI_SETTINGS,
  font: DEFAULT_FONT,
};

export function ThemeProvider({ children }) {
  const [settings, setSettings] =
    useState(DEFAULT_SETTINGS);

  const [mounted, setMounted] =
    useState(false);

  /*
   * Load saved settings.
   */
  useEffect(() => {
    const stored = getStoredTheme();

    const merged = {
      ...DEFAULT_SETTINGS,
      ...stored,
    };

    setSettings(merged);
    applyTheme(merged);
    setMounted(true);
  }, []);

  /*
   * Apply system theme changes.
   */
  useEffect(() => {
    if (!mounted) return;

    return listenForSystemTheme(settings);
  }, [mounted, settings]);

  /*
   * Update one setting.
   */
  const updateSetting = useCallback(
    (key, value) => {
      setSettings((previous) => {
        const next = {
          ...previous,
          [key]: value,
        };

        applyTheme(next);

        return next;
      });
    },
    []
  );

  /*
   * Update multiple settings.
   */
  const updateSettings = useCallback(
    (updates) => {
      setSettings((previous) => {
        const next = {
          ...previous,
          ...updates,
        };

        applyTheme(next);

        return next;
      });
    },
    []
  );

  /*
   * Reset appearance.
   */
  const resetSettings = useCallback(() => {
    const next = {
      ...DEFAULT_SETTINGS,
    };

    setSettings(next);
    applyTheme(next);
  }, []);

  const value = useMemo(
    () => ({
      settings,
      mounted,

      updateSetting,
      updateSettings,
      resetSettings,

      presets: THEME_PRESETS,
    }),
    [
      settings,
      mounted,
      updateSetting,
      updateSettings,
      resetSettings,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}