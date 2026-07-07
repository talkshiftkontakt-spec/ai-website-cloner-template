import { NextResponse } from "next/server";

import { applicationSchema } from "@/lib/validations/application";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowy format danych" },
      { status: 400 },
    );
  }

  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // TODO: persist to database and send notification email
  console.info("[LekkiStart] New application:", {
    tier: parsed.data.tier,
    email: parsed.data.email,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
