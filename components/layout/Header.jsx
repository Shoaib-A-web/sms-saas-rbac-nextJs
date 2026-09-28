"use client";

import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
  Monitor,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Dropdown, {
  DropdownItem,
} from "@/components/ui/Dropdown";

import {
  useTheme,
} from "@/components/theme/ThemeProvider";
import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";


export default function Header({
  onMenuClick,
}) {
  const {
    settings,
    updateSetting,
  } = useTheme();
  const router = useRouter();

  async function logOut(){
  
    try {
      const result= await authApi.logout();
      // window.location.href = "/login"; 
      router.push("/login")

    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header
      className=" sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[var(--color-border)] px-4 ui-glass sm:px-6 "
    >
      <Button
        type="button"
        onClick={onMenuClick}
        className=" rounded-[var(--radius-md)] p-2 hover:bg-[var(--color-surface-muted)] lg:hidden "
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </Button>

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search
          size={17}
          className=" absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-foreground-muted)] "
        />

        <input
          type="search"
          placeholder="Search..."
          className=" h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] pl-9 pr-3 text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 "
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          className=" rounded-[var(--radius-md)] p-2 hover:bg-[var(--color-surface-muted)] md:hidden "
          aria-label="Search"
        >
          <Search size={19} />
        </button>

        <Dropdown
          trigger={
            <button
              type="button"
              className=" rounded-[var(--radius-md)] p-2 hover:bg-[var(--color-surface-muted)] "
              aria-label="Change theme"
            >
              {settings.mode ===
              "dark" ? (
                <Moon size={19} />
              ) : settings.mode ===
                "light" ? (
                <Sun size={19} />
              ) : (
                <Monitor size={19} />
              )}
            </button>
          }
        >
          <DropdownItem
            icon={<Sun size={16} />}
            onClick={() =>
              updateSetting(
                "mode",
                "light"
              )
            }
          >
            Light
          </DropdownItem>

          <DropdownItem
            icon={<Moon size={16} />}
            onClick={() =>
              updateSetting(
                "mode",
                "dark"
              )
            }
          >
            Dark
          </DropdownItem>

          <DropdownItem
            icon={<Monitor size={16} />}
            onClick={() =>
              updateSetting(
                "mode",
                "system"
              )
            }
          >
            System
          </DropdownItem>
        </Dropdown>

        <button
          type="button"
          className=" relative rounded-[var(--radius-md)] p-2 hover:bg-[var(--color-surface-muted)] "
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className=" absolute right-1.5 top-1.5 size-2 rounded-full bg-[var(--color-danger)] " />
        </button>

        <Dropdown
          trigger={
            <button
              type="button"
              className=" ml-1 flex items-center gap-2 rounded-[var(--radius-md)] p-1.5 hover:bg-[var(--color-surface-muted)] "
            >
              <div className=" flex size-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-[var(--color-primary-foreground)] ">
                SA
              </div>

              <span className="hidden text-sm font-medium lg:block">
                Admin
              </span>
            </button>
          }
        >
          <DropdownItem>
            Profile
          </DropdownItem>

          <DropdownItem>
            Account Settings
          </DropdownItem>

          <DropdownItem onClick={logOut} danger>
            Sign out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}