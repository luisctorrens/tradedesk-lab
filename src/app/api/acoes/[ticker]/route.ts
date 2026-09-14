import { NextResponse } from "next/server";
import { ACOES_MOCK } from "@/lib/mocks";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;

  try {
    const res = await fetch(`https://brapi.dev/api/quote/${ticker}?fundamental=false`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error("brapi offline");
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: `Ativo ${ticker.toUpperCase()} não encontrado` },
        { status: 404 }
      );
    }
    return NextResponse.json(data.results[0]); // retorna raw brapi
  } catch {
    const acaoEncontrada = ACOES_MOCK.find(a => a.symbol === ticker.toUpperCase());
    if (!acaoEncontrada) {
      return NextResponse.json(
        { error: `Ativo ${ticker.toUpperCase()} não encontrado` },
        { status: 404 }
      );
    }

    const acao = {
      ...acaoEncontrada,
      lastChecked: new Date().toISOString(),
    };

    return NextResponse.json(acao);
  }
}
