"use client";

import Link from "next/link";
import { GraduationCap, ShieldCheck } from "lucide-react";

export function AuthShell({ children }) {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left branding panel */}
        <section
          className=" relative hidden overflow-hidden bg-[var(--color-primary)] lg:flex lg:items-center lg:justify-center p-12 "
        >
          {/* Decorative elements */}
          <div
            className=" absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl "
          />

          <div
            className=" absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl "
          />

          <div className="relative z-10 max-w-md text-white">
            <Link
              href="/login"
              className="inline-flex items-center gap-3"
            >
              <div
                className=" flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm "
              >
                <GraduationCap size={24} />
              </div>

              <span className="text-xl font-bold">
                SMS SaaS
              </span>
            </Link>

            <div className="mt-16">
              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Manage your school.
                <br />
                From one place.
              </h1>

              <p className="mt-6 text-base leading-7 text-white/75">
                Manage students, teachers, classes, attendance,
                schools and more from a single modern platform.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div
                className=" flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 "
              >
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Secure access
                </p>

                <p className="text-xs text-white/60">
                  Role-based school management
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form panel */}
        <section
          className=" flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20 "
        >
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Link
                href="/login"
                className=" inline-flex items-center gap-2.5 text-[var(--color-text)] "
              >
                <div
                  className=" flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] "
                >
                  <GraduationCap size={22} />
                </div>

                <span className="text-lg font-bold">
                  SMS SaaS
                </span>
              </Link>
            </div>

            {/* Auth content */}
            <div
              className=" ui-glass rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-lg)] sm:p-8 "
            >
              {children}
            </div>

            <p
              className=" mt-6 text-center text-xs text-[var(--color-text-muted)] "
            >
              © {new Date().getFullYear()} SMS SaaS. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}