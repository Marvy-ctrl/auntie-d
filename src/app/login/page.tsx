"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${baseUrl}/api/auth/sign-in/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(
          result.error || result.message || "Invalid email or password.",
        );
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white font-sans text-[#0D3B2E]">
      <header className="flex min-h-20 items-center justify-between border-b border-[#D5DED8] px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#355C50] hover:text-[#0D3B2E]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to store
        </Link>
        <div className="flex items-center gap-2">
          <Image
            src="/logo.jpeg"
            alt="Auntie-D Herbs"
            width={34}
            height={30}
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="font-serif text-base font-semibold">
            Auntie-D Herbs
          </span>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
        <div className="w-full max-w-[460px]">
          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7C8651]">
              Admin access
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              Welcome back
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#687A72] sm:text-base">
              Sign in with your administrator credentials to continue.
            </p>
          </div>

          {errorMessage && (
            <div
              className="mb-5 flex items-start gap-3 px-4 py-3 text-sm leading-5 text-[#9F2727]"
              role="alert"
            >
             
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-semibold"
              >
                Email address
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email address"
                className="h-12 w-full border border-[#AFC1B7] bg-white px-4 text-sm outline-none placeholder:text-[#93A199] focus:border-[#0D3B2E]"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full border border-[#AFC1B7] bg-white px-4 pr-12 text-sm outline-none placeholder:text-[#93A199] focus:border-[#0D3B2E]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#687A72] hover:text-[#0D3B2E]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-12 w-full items-center justify-center gap-2 border border-[#0D3B2E] bg-[#0D3B2E] px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#174D3D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              )}
              {isLoading ? "Signing in…" : "Sign in"}
            </button>
          </form>

         
        </div>
      </div>
    </main>
  );
}
