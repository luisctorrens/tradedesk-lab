import { NextResponse } from "next/server";
import { ORDENS_MOCK } from "@/lib/mocks";
import type { Ordem } from "@/types/ordem";

export async function GET() {
  return NextResponse.json(ORDENS_MOCK);
}

export async function POST(req: Request) {
  const body = await req.json();
  const quantidade = Number(body.quantidade);

  if (!Number.isInteger(quantidade) || quantidade <= 0 || quantidade % 100 !== 0) {
    return NextResponse.json(
      { error: "A quantidade deve ser positiva e múltipla de 100" },
      { status: 400 }
    );
  }

  const ordem: Ordem = {
    id: crypto.randomUUID(),
    ticker: body.ticker,
    quantidade,
    preco: body.preco,
    total: body.total,
    tipo: "compra",
    timestamp: new Date().toISOString(),
  };

  ORDENS_MOCK.push(ordem);

  return NextResponse.json(ordem, { status: 201 });
}
