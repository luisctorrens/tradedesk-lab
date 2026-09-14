import type { Acao } from "@/types/acao";
import type { Ordem } from "@/types/ordem";

// array de acoes exportado direto, mais facil de acessar em qualquer lugar
export const ACOES_MOCK: Acao[] = [
  { symbol: "PETR4", shortName: "Petrobras PN N2", regularMarketPrice: 38.42, regularMarketChangePercent: -1.23, regularMarketVolume: 42831900 },
  { symbol: "VALE3", shortName: "Vale ON NM", regularMarketPrice: 61.80, regularMarketChangePercent: 0.87, regularMarketVolume: 31200000 },
  { symbol: "ITUB4", shortName: "Itaú Unibanco PN", regularMarketPrice: 34.55, regularMarketChangePercent: 0.32, regularMarketVolume: 28900000 },
  { symbol: "MGLU3", shortName: "Magazine Luiza ON NM", regularMarketPrice: 7.21, regularMarketChangePercent: -3.40, regularMarketVolume: 89500000 },
  { symbol: "BBDC4", shortName: "Bradesco PN N1", regularMarketPrice: 12.88, regularMarketChangePercent: 1.15, regularMarketVolume: 19800000 },
];

export const ORDENS_MOCK: Ordem[] = [];
