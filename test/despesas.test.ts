import { describe, it, expect } from "vitest";
import { adicionarDespesa } from "../src/despesas";
import { Despesa } from "../src/tipos";

describe("adicionarDespesa", () => {
  const despesaExistente: Despesa = {
    id: "1",
    descricao: "Mercado",
    valor: 150,
    categoria: "alimentação",
    mes: 3,
  };

  it("Adiciona uma despesa válida ao array", () => {
    const novaDespesa: Despesa = {
      id: "2",
      descricao: "Uber",
      valor: 25,
      categoria: "transporte",
      mes: 3,
    };

    const resultado = adicionarDespesa([despesaExistente], novaDespesa);

    expect(resultado).toHaveLength(2);
    expect(resultado).toContainEqual(novaDespesa);
    expect([despesaExistente]).toHaveLength(1);
  });

  it("caso de borda: lança erro se valor for menor ou igual a zero", () => {
    const despesaInvalida: Despesa = {
      id: "3",
      descricao: "Erro proposital",
      valor: 0,
      categoria: "lazer",
      mes: 5,
    };

    expect(() => adicionarDespesa([despesaExistente], despesaInvalida)).toThrow();
  });
});