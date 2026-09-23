// // lib/theme/theme-manager.js

// import { THEME_PRESETS, DEFAULT_THEME } from "@/config/themes";
// import { themeToCssVariables } from "./theme-utils";

// const STORAGE_KEY = "sms-saas-theme";

// export function getStoredTheme() {
//   if (typeof window === "undefined") {
//     return DEFAULT_THEME;
//   }

//   try {
//     const stored = localStorage.getItem(STORAGE_KEY);

//     if (!stored) {
//       return DEFAULT_THEME;
//     }

//     return {
//       ...DEFAULT_THEME,
//       ...JSON.parse(stored),
//     };
//   } catch {
//     return DEFAULT_THEME;
//   }
// }

// export function saveTheme(settings) {
//   if (typeof window === "undefined") {
//     return;
//   }

//   localStorage.setItem(
//     STORAGE_KEY,
//     JSON.stringify(settings)
//   );
// }

// export function getSystemTheme() {
//   if (typeof window === "undefined") {
//     return "light";
//   }

//   return window.matchMedia("(prefers-color-scheme: dark)").matches
//     ? "dark"
//     : "light";
// }

// export function resolveThemeMode(mode) {
//   if (mode === "system") {
//     return getSystemTheme();
//   }

//   return mode;
// }

// export function applyTheme(settings = DEFAULT_THEME) {
//   if (typeof window === "undefined") {
//     return;
//   }

//   const preset =
//     THEME_PRESETS[settings.preset] ||
//     THEME_PRESETS[DEFAULT_THEME.preset];

//   const mode = resolveThemeMode(
//     settings.mode || DEFAULT_THEME.mode
//   );

//   const theme =
//     preset[mode] ||
//     preset.light;

//   const variables = themeToCssVariables(theme);

//   const root = document.documentElement;

//   Object.entries(variables).forEach(([property, value]) => {
//     root.style.setProperty(property, value);
//   });

//   root.classList.toggle("dark", mode === "dark");

//   root.dataset.theme = settings.preset || DEFAULT_THEME.preset;
//   root.dataset.mode = mode;

//   saveTheme({
//     ...settings,
//     mode: settings.mode || DEFAULT_THEME.mode,
//   });
// }

// export function initializeTheme() {
//   const settings = getStoredTheme();

//   applyTheme(settings);

//   return settings;
// }

// export function listenForSystemTheme(settings) {
//   if (
//     typeof window === "undefined" ||
//     settings.mode !== "system"
//   ) {
//     return () => {};
//   }

//   const mediaQuery = window.matchMedia(
//     "(prefers-color-scheme: dark)"
//   );

//   const handleChange = () => {
//     applyTheme(settings);
//   };

//   mediaQuery.addEventListener(
//     "change",
//     handleChange
//   );

//   return () => {
//     mediaQuery.removeEventListener(
//       "change",
//       handleChange
//     );
//   };
// }


import {
  THEME_PRESETS,
  DEFAULT_THEME,
} from "@/config/themes";

import {
  DEFAULT_UI_SETTINGS,
} from "@/config/ui";

import {
  DEFAULT_FONT,
} from "@/config/typography";

import {
  themeToCssVariables,
} from "./theme-utils";

const STORAGE_KEY = "sms-saas-theme";

export const DEFAULT_SETTINGS = {
  ...DEFAULT_THEME,
  ...DEFAULT_UI_SETTINGS,
  font: DEFAULT_FONT,
};

export function getStoredTheme() {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }

  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(stored),
    };
  } catch {
    return DEFAULT_SETTINGS;
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

  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";
}

export function resolveThemeMode(mode) {
  if (mode === "system") {
    return getSystemTheme();
  }

  return mode;
}

export function applyTheme(
  settings = DEFAULT_SETTINGS
) {
  if (typeof window === "undefined") {
    return;
  }

  const preset =
    THEME_PRESETS[settings.preset] ||
    THEME_PRESETS[DEFAULT_THEME.preset];

  const mode = resolveThemeMode(
    settings.mode || "system"
  );

  const theme =
    preset[mode] || preset.light;

  const variables =
    themeToCssVariables(theme);

  const root =
    document.documentElement;

  Object.entries(variables).forEach(
    ([property, value]) => {
      root.style.setProperty(
        property,
        value
      );
    }
  );

  root.classList.toggle(
    "dark",
    mode === "dark"
  );

  /*
   * Font
   */
  const fontMap = {
    inter: '"Inter", Arial, sans-serif',
    geist: '"Geist", Arial, sans-serif',
    jakarta:
      '"Plus Jakarta Sans", Arial, sans-serif',
    manrope:
      '"Manrope", Arial, sans-serif',
    roboto: '"Roboto", Arial, sans-serif',
  };

  root.style.setProperty(
    "--font-family",
    fontMap[settings.font] ||
      fontMap.inter
  );

  /*
   * Radius
   */
  const radiusMap = {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.25rem",
  };

  root.style.setProperty(
    "--radius-md",
    radiusMap[settings.radius] ||
      radiusMap.md
  );

  /*
   * Density
   */
  const densityMap = {
    compact: {
      pagePadding: "1rem",
      cardPadding: "1rem",
      tableCellPadding:
        "0.625rem 0.75rem",
      gap: "0.75rem",
    },

    comfortable: {
      pagePadding: "1.5rem",
      cardPadding: "1.25rem",
      tableCellPadding:
        "0.75rem 1rem",
      gap: "1rem",
    },

    spacious: {
      pagePadding: "2rem",
      cardPadding: "1.5rem",
      tableCellPadding:
        "1rem 1.25rem",
      gap: "1.5rem",
    },
  };

  const density =
    densityMap[
      settings.density
    ] || densityMap.comfortable;

  root.style.setProperty(
    "--page-padding",
    density.pagePadding
  );

  root.style.setProperty(
    "--card-padding",
    density.cardPadding
  );

  root.style.setProperty(
    "--table-cell-padding",
    density.tableCellPadding
  );

  root.style.setProperty(
    "--layout-gap",
    density.gap
  );

  /*
   * Motion
   */
  if (settings.motion === false) {
    root.dataset.motion = "reduced";
  } else {
    delete root.dataset.motion;
  }

  /*
   * Metadata
   */
  root.dataset.theme =
    settings.preset ||
    DEFAULT_THEME.preset;

  root.dataset.mode = mode;

  saveTheme(settings);
}

export function initializeTheme() {
  const settings =
    getStoredTheme();

  applyTheme(settings);

  return settings;
}

export function listenForSystemTheme(
  settings
) {
  if (
    typeof window === "undefined" ||
    settings.mode !== "system"
  ) {
    return () => {};
  }

  const mediaQuery =
    window.matchMedia(
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