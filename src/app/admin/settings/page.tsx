"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";

type PasswordField = "current" | "new" | "confirm";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState<Record<PasswordField, boolean>>({
    current: false,
    new: false,
    confirm: false,
  });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleVisibility = (field: PasswordField) => {
    setVisible((previous) => ({ ...previous, [field]: !previous[field] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (newPassword.length < 8) {
      setStatus({ type: "error", message: "The new password must be at least 8 characters." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "The new passwords do not match." });
      return;
    }

    if (newPassword === currentPassword) {
      setStatus({ type: "error", message: "Choose a password different from your current password." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "The password could not be updated.");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setStatus({ type: "success", message: result.message || "Password updated successfully." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "The password could not be updated.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      id: "current-password",
      key: "current" as const,
      label: "Current password",
      value: currentPassword,
      onChange: setCurrentPassword,
      autoComplete: "current-password",
    },
    {
      id: "new-password",
      key: "new" as const,
      label: "New password",
      value: newPassword,
      onChange: setNewPassword,
      autoComplete: "new-password",
    },
    {
      id: "confirm-password",
      key: "confirm" as const,
      label: "Confirm new password",
      value: confirmPassword,
      onChange: setConfirmPassword,
      autoComplete: "new-password",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl">
      <header className="border-b border-[#CED9D2] pb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7C8651]">Account</p>
        <h1 className="font-serif text-3xl font-semibold leading-tight text-[#0D3B2E] sm:text-4xl">Settings</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#687A72] sm:text-base">
          Manage the password used to access the administration area.
        </p>
      </header>
      <div className="flex items-start gap-4 p-5 sm:p-6">
         
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#0D3B2E]">Change password</h2>
            <p className="mt-1 text-sm leading-6 text-[#687A72]">
              Use at least 8 characters.
            </p>
          </div>
        </div>

      <section className="mt-8 border bg-white">
        

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {fields.map((field) => {
            const isVisible = visible[field.key];

            return (
              <div key={field.id}>
                <label htmlFor={field.id} className="mb-2 block text-sm font-semibold text-[#0D3B2E]">
                  {field.label}
                </label>
                <div className="relative max-w-xl">
                  <input
                    id={field.id}
                    type={isVisible ? "text" : "password"}
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value)}
                    autoComplete={field.autoComplete}
                    required
                    className="h-12 w-full border border-[#AFC1B7] bg-white px-4 pr-12 font-sans text-sm text-[#0D3B2E] outline-none focus:border-[#0D3B2E]"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility(field.key)}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#687A72] hover:text-[#0D3B2E]"
                    aria-label={`${isVisible ? "Hide" : "Show"} ${field.label.toLowerCase()}`}
                  >
                    {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            );
          })}

          {status && (
            <p
              className={`max-w-xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "text-[#0D3B2E]"
                  : "text-[#9F2727]"
              }`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 border border-[#0D3B2E] bg-[#0D3B2E] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Updating…" : "Update password"}
          </button>
        </form>
      </section>
    </div>
  );
}
