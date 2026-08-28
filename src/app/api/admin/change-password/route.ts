import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/src/lib/auth";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password."),
    newPassword: z
      .string()
      .min(8, "The new password must be at least 8 characters.")
      .max(128, "The new password must be 128 characters or fewer."),
  })
  .refine((values) => values.currentPassword !== values.newPassword, {
    message: "Choose a password different from your current password.",
    path: ["newPassword"],
  });

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json({ message: "You must be signed in." }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = changePasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Check the password details and try again." },
      { status: 400 },
    );
  }

  try {
    await auth.api.changePassword({
      body: {
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
        revokeOtherSessions: true,
      },
      headers: request.headers,
    });

    return NextResponse.json({ message: "Password updated successfully." });
  } catch {
    return NextResponse.json(
      { message: "The current password is incorrect or the password could not be updated." },
      { status: 400 },
    );
  }
}
