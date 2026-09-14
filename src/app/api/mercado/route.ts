import { NextResponse } from "next/server";

export async function GET() {
  const partes = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const hora = Number(partes.find(parte => parte.type === "hour")?.value);
  const minuto = Number(partes.find(parte => parte.type === "minute")?.value);
  const minutosAgora = hora * 60 + minuto;

  // Horário de funcionamento da B3: 10h–17h30 (horário de Brasília)
  const abertura = 10 * 60;
  const fechamento = 17 * 60 + 30;
  const horarioFormatado = `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`;

  const isAberto = minutosAgora >= abertura && minutosAgora < fechamento;

  return NextResponse.json({
    status: isAberto ? "aberto" : "fechado",
    hora: horarioFormatado,
    mensagem: isAberto
      ? `Mercado aberto — ${horarioFormatado}`
      : "Mercado fechado — abre às 10:00",
    abertura: "10:00",
    fechamento: "17:30",
  });
}
