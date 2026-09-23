"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";

import  Input  from "@/components/ui/Input";
import  Button  from "@/components/ui/Button";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">
          Welcome back
        </h2>

        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Sign in to continue to your dashboard.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className=" mb-5 rounded-[var(--radius-md)] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400 "
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          value={form.email}
          onChange={(event) =>
            updateField("email", event.target.value)
          }
        />

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--color-text)]"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className=" text-xs font-medium text-[var(--color-primary)] hover:underline "
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={(event) =>
                updateField("password", event.target.value)
              }
              className="pr-11"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              className=" absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] transition-colors duration-150 hover:text-[var(--color-text)] "
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={loading}
        >
          <LogIn size={17} />
          Sign in
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--color-border)]" />

        <span className="text-xs text-[var(--color-text-muted)]">
          OR
        </span>

        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        Don't have an account?{" "}
        <Link
          href="/register"
          className=" font-medium text-[var(--color-primary)] hover:underline "
        >
          Create account
        </Link>
      </p>
    </div>
  );
}