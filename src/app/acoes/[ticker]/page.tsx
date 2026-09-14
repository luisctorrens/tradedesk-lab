import Link from "next/link";
import GraficoAcao from "@/components/GraficoAcao";
import type { Acao } from "@/types/acao";

interface Props {
  params: Promise<{ ticker: string }>;
}

export default async function AcaoPage({ params }: Props) {
  const { ticker } = await params;

  const res = await fetch(`http://localhost:3000/api/acoes/${ticker}`, { cache: "no-store" });
  const acao: Acao = await res.json();

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <Link href="/acoes" style={{ color: "#888", textDecoration: "none", fontSize: "0.85rem" }}>← Voltar</Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", margin: "1.5rem 0" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f59e0b" }}>{acao.symbol}</h1>
          <p style={{ color: "#888" }}>{acao.shortName}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>
            R$ {acao.regularMarketPrice.toFixed(2)}
          </div>
          <div className={acao.regularMarketChangePercent >= 0 ? "positivo" : "negativo"}>
            {acao.regularMarketChangePercent >= 0 ? "▲" : "▼"} {Math.abs(acao.regularMarketChangePercent).toFixed(2)}%
          </div>
        </div>
      </div>

      <GraficoAcao acao={acao} />

      <div style={{ marginTop: "2rem", textAlign: "right" }}>
        <Link
          href={`/acoes/${ticker}/boleta`}
          style={{ background: "#22c55e", color: "#000", padding: "0.75rem 2rem", borderRadius: 4, textDecoration: "none", fontWeight: 700 }}
        >
          COMPRAR
        </Link>
      </div>
    </div>
  );
}
