import Link from "next/link";
import MercadoStatus from "@/components/MercadoStatus";
import type { Acao } from "@/types/acao";

export default async function HomePage() {
  // Busca destaques do dia
  let acoes: Acao[] = [];
  try {
    const res = await fetch("http://localhost:3000/api/acoes", { cache: "no-store" });
    const data = await res.json();
    acoes = Array.isArray(data) ? data : (data.acoes ?? []);
  } catch { acoes = []; }

  return (
    <>
      <MercadoStatus />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>Destaques do dia</h1>
        <p style={{ color: "#666", fontSize: "0.8rem", marginBottom: "2rem" }}>Acompanhe as principais movimentações do mercado</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
          {acoes.slice(0, 5).map(acao => (
            <Link key={acao.symbol} href={`/acoes/${acao.symbol}`} style={{ textDecoration: "none" }}>
              <div className="card-terminal" style={{ cursor: "pointer" }}>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: "#f59e0b" }}>{acao.symbol}</div>
                <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.5rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{acao.shortName}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                  R$ {acao.regularMarketPrice.toFixed(2)}
                </div>
                <div style={{ fontSize: "0.8rem" }} className={acao.regularMarketChangePercent >= 0 ? "positivo" : "negativo"}>
                  {acao.regularMarketChangePercent >= 0 ? "▲" : "▼"} {Math.abs(acao.regularMarketChangePercent).toFixed(2)}%
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
