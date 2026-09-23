"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";

export default function DashboardShell({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <Sidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="min-w-0 flex-1 pb-16 lg:pb-0">
          <div className="ui-page ui-page-enter">
            {children}
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}