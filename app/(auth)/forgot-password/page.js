"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send } from "lucide-react";

import  Input  from "@/components/ui/Input";
import  Button  from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Password reset API will be connected here.
      await new Promise((resolve) => setTimeout(resolve, 700));

      setSubmitted(true);
    } catch {
      setError(
        "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div
          className=" mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] "
        >
          <Mail size={25} />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-[var(--color-text)]">
          Check your email
        </h2>

        <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
          If an account exists for{" "}
          <span className="font-medium text-[var(--color-text)]">
            {email}
          </span>
          , you will receive instructions to reset your password.
        </p>

        <Link href="/login" className="mt-6 block">
          <Button variant="secondary" className="w-full">
            <ArrowLeft size={17} />
            Back to sign in
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/login"
        className=" inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors duration-150 hover:text-[var(--color-text)] "
      >
        <ArrowLeft size={16} />
        Back to sign in
      </Link>

      <div className="mb-8 mt-7">
        <div
          className=" mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] "
        >
          <Mail size={22} />
        </div>

        <h2 className="text-2xl font-bold text-[var(--color-text)]">
          Forgot your password?
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
          Enter your email address and we'll send you a link
          to reset your password.
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Button
          type="submit"
          className="w-full"
          loading={loading}
        >
          <Send size={17} />
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
        Remember your password?{" "}
        <Link
          href="/login"
          className=" font-medium text-[var(--color-primary)] hover:underline "
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}