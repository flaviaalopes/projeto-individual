import { describe, it, expect } from "vitest";
import { adicionarDespesa, removerDespesa } from "../src/despesas";
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

  it("Lança erro se valor for menor ou igual a zero", () => {
    const despesaInvalida: Despesa = {
      id: "3",
      descricao: "Erro proposital",
      valor: 0,
      categoria: "lazer",
      mes: 5,
    };

    expect(() => adicionarDespesa([despesaExistente], despesaInvalida)).toThrow();
  });

  it("Lança erro se mes não estiver entre 1 e 12", () => {
  const despesaMesInvalido: Despesa = {
    id: "4",
    descricao: "Mês inválido",
    valor: 50,
    categoria: "lazer",
    mes: 13,
  };

  expect(() =>
    adicionarDespesa([despesaExistente], despesaMesInvalido)
  ).toThrow();
});
});

describe("removerDespesa", () => {
  const despesaExistente: Despesa = {
    id: "1",
    descricao: "Mercado",
    valor: 150,
    categoria: "alimentação",
    mes: 3,
  };

  it("Remove a despesa com o id informado", () => {
    const resultado = removerDespesa([despesaExistente], "1");
    expect(resultado).toHaveLength(0);
  });

  it("Id não existe, retorna cópia igual", () => {
    const resultado = removerDespesa([despesaExistente], "id-inexistente");
    expect(resultado).toEqual([despesaExistente]);
    expect(resultado).not.toBe([despesaExistente]); // array novo, não a mesma referência
  });
});