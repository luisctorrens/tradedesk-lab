"use client";

import { useState } from "react";
import type { Acao } from "@/types/acao";

interface Props { acao: Acao; }

export default function BoletaForm({ acao }: Props) {
  const [quantidade, setQuantidade] = useState(""); // Bug B14: string, não number
  const [enviado, setEnviado] = useState(false);

  const total = Number(quantidade) * acao.regularMarketPrice || 0;

  async function handleCompra() {
    await fetch("/api/ordens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticker: acao.symbol,
        quantidade: Number(quantidade),
        preco: acao.regularMarketPrice,
        total,
        tipo: "compra",
      }),
    });
    setEnviado(true);
  }

  if (enviado) return (
    <div className="card-terminal" style={{ textAlign: "center", color: "#22c55e" }}>
      ✅ Ordem enviada!
    </div>
  );

  return (
    <div className="card-terminal">
      <h3 style={{ marginBottom: "1rem", color: "#f59e0b" }}>Boleta de Compra</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.75rem", color: "#888" }}>Ativo</label>
          <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>{acao.symbol}</div>
        </div>
        <div>
          <label style={{ fontSize: "0.75rem", color: "#888" }}>Preço atual</label>
          <div style={{ fontSize: "1.1rem" }}>R$ {acao.regularMarketPrice.toFixed(2)}</div>
        </div>
        <div>
          <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "0.25rem" }}>Quantidade</label>
          <input
            type="number"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)} // Bug B14: e.target.value é string
            placeholder="Ex: 100"
            min="1"
            style={{ width: "100%", background: "#0d0d0d", border: "1px solid #333", color: "#e5e5e5", padding: "0.5rem", borderRadius: 4, fontFamily: "monospace" }}
          />
        </div>
        <div>
          <label style={{ fontSize: "0.75rem", color: "#888" }}>Total estimado</label>
          {/* Bug B14: sempre mostra R$ 0 por causa do || 0 */}
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f59e0b" }}>R$ {total.toFixed(2)}</div>
        </div>
        <button
          onClick={handleCompra}
          style={{ background: "#22c55e", color: "#000", border: "none", padding: "0.75rem", borderRadius: 4, fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}
        >
          CONFIRMAR COMPRA
        </button>
      </div>
    </div>
  );
}
