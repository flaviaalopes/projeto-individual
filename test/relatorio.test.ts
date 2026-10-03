import { describe, it, expect } from "vitest";
import { descricaoCategoria } from "../src/relatorio";

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