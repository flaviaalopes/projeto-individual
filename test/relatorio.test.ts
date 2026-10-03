import { describe, it, expect } from "vitest";
import { descricaoCategoria, matrizCategoriaMes } from "../src/relatorio";
import { Despesa } from "../src/tipos";

describe("descricaoCategoria", () => {
  it("Retorna o nome de exibição para 'alimentação'", () => {
    const resultado = descricaoCategoria("alimentação");
    expect(resultado).toBe("Alimentação");
  });

  it("Retorna o nome de exibição para a última categoria da lista (moradia)", () => {
    const resultado = descricaoCategoria("moradia");
    expect(resultado).toBe("Moradia");
  });
});

describe("matrizCategoriaMes", () => {
  it("Soma os valores na célula certa (categoria x mês)", () => {
    const despesas: Despesa[] = [
      { id: "1", descricao: "Mercado", valor: 100, categoria: "alimentação", mes: 1 },
      { id: "2", descricao: "Feira", valor: 50, categoria: "alimentação", mes: 1 },
      { id: "3", descricao: "Uber", valor: 30, categoria: "transporte", mes: 2 },
    ];

    const resultado = matrizCategoriaMes(despesas);

    // alimentação é a 1ª linha (índice 0), mês 1 é a 1ª coluna (índice 0)
    expect(resultado[0]?.[0]).toBe(150);
    // transporte é a 2ª linha (índice 1), mês 2 é a 2ª coluna (índice 1)
    expect(resultado[1]?.[1]).toBe(30);
  });

  it("Lista vazia retorna matriz 4x12 cheia de zeros", () => {
    const resultado = matrizCategoriaMes([]);

    expect(resultado).toHaveLength(4);
    resultado.forEach((linha) => {
      expect(linha).toHaveLength(12);
      expect(linha.every((valor) => valor === 0)).toBe(true);
    });
  });
});