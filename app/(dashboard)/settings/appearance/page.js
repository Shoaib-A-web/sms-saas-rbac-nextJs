"use client";

import {
  Monitor,
  Moon,
  Sun,
  RotateCcw,
} from "lucide-react";

import {
  useTheme,
} from "@/components/theme/ThemeProvider";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";

import {
  FONT_OPTIONS,
} from "@/config/typography";

export default function AppearancePage() {
  const {
    settings,
    updateSetting,
    resetSettings,
  } = useTheme();

  const presets = [
    {
      key: "default",
      label: "Default",
      color: "#2563eb",
    },
    {
      key: "ocean",
      label: "Ocean",
      color: "#0891b2",
    },
    {
      key: "indigo",
      label: "Indigo",
      color: "#4f46e5",
    },
    {
      key: "emerald",
      label: "Emerald",
      color: "#059669",
    },
    {
      key: "rose",
      label: "Rose",
      color: "#e11d48",
    },
    {
      key: "slate",
      label: "Slate",
      color: "#475569",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="ui-page-title">
            Appearance
          </h1>

          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
            Customize how SMS SaaS looks and
            behaves.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={resetSettings}
        >
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>

      <div className="space-y-5">
        {/* Theme mode */}
        <Card
          title="Theme mode"
          description="Choose how light and dark mode should behave."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <ModeButton
              active={settings.mode === "light"}
              icon={<Sun size={20} />}
              title="Light"
              description="Always use light mode"
              onClick={() =>
                updateSetting(
                  "mode",
                  "light"
                )
              }
            />

            <ModeButton
              active={settings.mode === "dark"}
              icon={<Moon size={20} />}
              title="Dark"
              description="Always use dark mode"
              onClick={() =>
                updateSetting(
                  "mode",
                  "dark"
                )
              }
            />

            <ModeButton
              active={
                settings.mode === "system"
              }
              icon={<Monitor size={20} />}
              title="System"
              description="Follow system preference"
              onClick={() =>
                updateSetting(
                  "mode",
                  "system"
                )
              }
            />
          </div>
        </Card>

        {/* Presets */}
        <Card
          title="Theme preset"
          description="Choose the visual personality of the application."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {presets.map((preset) => {
              const active =
                settings.preset ===
                preset.key;

              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() =>
                    updateSetting(
                      "preset",
                      preset.key
                    )
                  }
                  className={`
                    rounded-[var(--radius-lg)]
                    border
                    p-3
                    text-left
                    ui-transition
                    ${
                      active
                        ? `
                          border-[var(--color-primary)]
                          ring-2
                          ring-[var(--color-primary)]/20
                        `
                        : `
                          border-[var(--color-border)]
                          hover:border-[var(--color-primary)]
                        `
                    }
                  `}
                >
                  <div
                    className="mb-3 h-12 rounded-[var(--radius-md)]"
                    style={{
                      background:
                        preset.color,
                    }}
                  />

                  <p className="text-xs font-semibold">
                    {preset.label}
                  </p>

                  {active && (
                    <p className="mt-1 text-[10px] text-[var(--color-primary)]">
                      Active
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Typography */}
        <Card
          title="Typography"
          description="Choose the application font."
        >
          <Select
            label="Font family"
            value={settings.font}
            onChange={(event) =>
              updateSetting(
                "font",
                event.target.value
              )
            }
          >
            {Object.entries(
              FONT_OPTIONS
            ).map(([key, font]) => (
              <option
                key={key}
                value={key}
              >
                {font.name}
              </option>
            ))}
          </Select>

          <div
            className=" mt-5 rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)] p-5 "
          >
            <p className="text-2xl font-bold">
              SMS SaaS
            </p>

            <p className="mt-2 text-sm text-[var(--color-foreground-muted)]">
              The quick brown fox jumps over
              the lazy dog.
            </p>
          </div>
        </Card>

        {/* Density */}
        <Card
          title="Density"
          description="Control how much information is displayed."
        >
          <Select
            label="Interface density"
            value={settings.density}
            onChange={(event) =>
              updateSetting(
                "density",
                event.target.value
              )
            }
          >
            <option value="compact">
              Compact
            </option>

            <option value="comfortable">
              Comfortable
            </option>

            <option value="spacious">
              Spacious
            </option>
          </Select>
        </Card>

        {/* Radius */}
        <Card
          title="Corner radius"
          description="Control how rounded interface elements appear."
        >
          <Select
            label="Radius"
            value={settings.radius}
            onChange={(event) =>
              updateSetting(
                "radius",
                event.target.value
              )
            }
          >
            <option value="sm">
              Small
            </option>

            <option value="md">
              Medium
            </option>

            <option value="lg">
              Large
            </option>

            <option value="xl">
              Extra Large
            </option>

            <option value="2xl">
              Very Large
            </option>
          </Select>
        </Card>

        {/* Motion */}
        <Card
          title="Motion"
          description="Control interface animations."
        >
          <Switch
            checked={settings.motion}
            onChange={(value) =>
              updateSetting(
                "motion",
                value
              )
            }
            label="Enable animations"
            description="Use subtle transitions and interface animations."
          />
        </Card>
      </div>
    </div>
  );
}

function ModeButton({
  active,
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        items-center
        gap-3
        rounded-[var(--radius-lg)]
        border
        p-4
        text-left
        ui-transition
        ${
          active
            ? `
              border-[var(--color-primary)]
              bg-[var(--color-primary)]/5
              ring-2
              ring-[var(--color-primary)]/10
            `
            : `
              border-[var(--color-border)]
              hover:border-[var(--color-primary)]
            `
        }
      `}
    >
      <div
        className={`
          flex
          size-10
          items-center
          justify-center
          rounded-[var(--radius-md)]
          ${
            active
              ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
              : "bg-[var(--color-surface-muted)]"
          }
        `}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-[var(--color-foreground-muted)]">
          {description}
        </p>
      </div>
    </button>
  );
}