import { NextResponse } from "next/server";

type LeadSubmissionPayload = {
  nomeCompleto?: unknown;
  email?: unknown;
  telefone?: unknown;
  dataNascimento?: unknown;
  genero?: unknown;
  areaAtuacao?: unknown;
  rendaMensal?: unknown;
  arquetipoPrincipal?: unknown;
  arquetipoSecundario?: unknown;
  arquetipoTerciario?: unknown;
  origem?: unknown;
  createdAt?: unknown;
};

const requiredFields: Array<keyof LeadSubmissionPayload> = [
  "nomeCompleto",
  "email",
  "telefone",
  "dataNascimento",
  "genero",
  "areaAtuacao",
  "rendaMensal",
  "arquetipoPrincipal",
  "arquetipoSecundario",
  "arquetipoTerciario",
  "origem",
  "createdAt"
];

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Missing GOOGLE_SHEETS_WEBHOOK_URL environment variable." },
      { status: 500 }
    );
  }

  let payload: LeadSubmissionPayload;

  try {
    payload = (await request.json()) as LeadSubmissionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const missingFields = requiredFields.filter((field) => !isFilled(payload[field]));

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        error: "Missing required lead submission fields.",
        fields: missingFields
      },
      { status: 400 }
    );
  }

  if (!isValidIsoDate(payload.createdAt)) {
    return NextResponse.json(
      { error: "createdAt must be a valid ISO date string." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Google Sheets webhook request failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach Google Sheets webhook." },
      { status: 502 }
    );
  }
}

function isFilled(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidIsoDate(value: unknown) {
  return (
    typeof value === "string" &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString() === value
  );
}
