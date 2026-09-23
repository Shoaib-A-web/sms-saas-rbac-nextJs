// lib/theme/theme-utils.js

export function themeToCssVariables(theme) {
  return {
    "--color-primary": theme.primary,
    "--color-primary-hover": theme.primaryHover,
    "--color-primary-foreground": theme.primaryForeground,

    "--color-background": theme.background,
    "--color-surface": theme.surface,
    "--color-surface-muted": theme.surfaceMuted,

    "--color-foreground": theme.foreground,
    "--color-foreground-muted": theme.foregroundMuted,

    "--color-border": theme.border,
    "--color-border-strong": theme.borderStrong,

    "--color-success": theme.success,
    "--color-warning": theme.warning,
    "--color-danger": theme.danger,
    "--color-info": theme.info,

    "--color-glass-background": theme.glassBackground,
    "--color-glass-border": theme.glassBorder,
  };
}

export function applyCssVariables(variables, element = document.documentElement) {
  Object.entries(variables).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
}

export function removeCssVariables(
  variables,
  element = document.documentElement
) {
  Object.keys(variables).forEach((property) => {
    element.style.removeProperty(property);
  });
}