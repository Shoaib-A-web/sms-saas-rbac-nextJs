// config/ui.js

export const UI_CONFIG = {
  radius: {
    none: "0",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.25rem",
    full: "9999px",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "4xl": "2.5rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },

  borderWidth: {
    none: "0",
    thin: "1px",
    medium: "1.5px",
    strong: "2px",
  },

  shadow: {
    none: "none",
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 12px rgb(0 0 0 / 0.08)",
    lg: "0 10px 30px rgb(0 0 0 / 0.10)",
    xl: "0 20px 50px rgb(0 0 0 / 0.15)",
  },

  motion: {
    instant: "0ms",
    fast: "100ms",
    normal: "150ms",
    slow: "250ms",
  },

  density: {
    compact: {
      pagePadding: "1rem",
      cardPadding: "1rem",
      tableCellPadding: "0.625rem 0.75rem",
      gap: "0.75rem",
    },

    comfortable: {
      pagePadding: "1.5rem",
      cardPadding: "1.25rem",
      tableCellPadding: "0.75rem 1rem",
      gap: "1rem",
    },

    spacious: {
      pagePadding: "2rem",
      cardPadding: "1.5rem",
      tableCellPadding: "1rem 1.25rem",
      gap: "1.5rem",
    },
  },

  borderStyle: {
    subtle: {
      width: "1px",
      opacity: "0.6",
    },

    default: {
      width: "1px",
      opacity: "1",
    },

    strong: {
      width: "2px",
      opacity: "1",
    },
  },

  glass: {
    blur: "16px",
    saturation: "140%",
  },

  icons: {
    tiny: 12,
    small: 14,
    default: 16,
    prominent: 18,
    navigation: 20,
    major: 24,
  },
};

export const DEFAULT_UI_SETTINGS = {
  density: "comfortable",
  borderStyle: "default",
  radius: "md",
  font: "inter",
  motion: true,
  sidebar: "expanded",
};