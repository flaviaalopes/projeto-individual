import { describe, it, expect } from "vitest";
import { adicionarDespesa, removerDespesa, despesasDaCategoria, totalGasto, maiorDespesa } from "../src/despesas";
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

describe("despesasDaCategoria", () => {
  const alimentacao: Despesa = {
    id: "1",
    descricao: "Mercado",
    valor: 150,
    categoria: "alimentação",
    mes: 3,
  };

  const transporte: Despesa = {
    id: "2",
    descricao: "Uber",
    valor: 25,
    categoria: "transporte",
    mes: 3,
  };

  it("Retorna só as despesas da categoria pedida", () => {
    const resultado = despesasDaCategoria([alimentacao, transporte], "transporte");
    expect(resultado).toEqual([transporte]);
  });

  it("Nenhuma despesa da categoria, retorna array vazio", () => {
    const resultado = despesasDaCategoria([alimentacao], "moradia");
    expect(resultado).toEqual([]);
  });
});

describe("totalGasto", () => {
  const despesa1: Despesa = {
    id: "1",
    descricao: "Mercado",
    valor: 150,
    categoria: "alimentação",
    mes: 3,
  };

  const despesa2: Despesa = {
    id: "2",
    descricao: "Uber",
    valor: 50,
    categoria: "transporte",
    mes: 3,
  };

  it("Soma os valores das despesas", () => {
    const resultado = totalGasto([despesa1, despesa2]);
    expect(resultado).toBe(200);
  });

  it("Lista vazia retorna 0", () => {
    const resultado = totalGasto([]);
    expect(resultado).toBe(0);
  });
});

describe("maiorDespesa", () => {
  const despesa1: Despesa = {
    id: "1",
    descricao: "Mercado",
    valor: 150,
    categoria: "alimentação",
    mes: 3,
  };

  const despesa2: Despesa = {
    id: "2",
    descricao: "Aluguel",
    valor: 1200,
    categoria: "moradia",
    mes: 3,
  };

  it("caso normal: retorna a despesa de maior valor", () => {
    const resultado = maiorDespesa([despesa1, despesa2]);
    expect(resultado).toEqual(despesa2);
  });

  it("caso de borda: lista vazia retorna undefined", () => {
    const resultado = maiorDespesa([]);
    expect(resultado).toBeUndefined();
  });
});