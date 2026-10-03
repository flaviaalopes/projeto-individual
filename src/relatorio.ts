import { Categoria, CATEGORIAS, Despesa } from "./tipos";
import { totalGasto, maiorDespesa } from "./despesas";

export function descricaoCategoria(categoria: Categoria): string {
  switch (categoria) {
    case "alimentação":
      return "Alimentação";
    case "transporte":
      return "Transporte";
    case "lazer":
      return "Lazer";
    case "moradia":
      return "Moradia";
  }
}

export function matrizCategoriaMes(despesas: Despesa[]): number[][] {
  const matriz: number[][] = [];

  // Monta a estrutura: uma linha por categoria, cada linha com 12 colunas (meses) zeradas.
  for (let i = 0; i < CATEGORIAS.length; i++) {
    const linha: number[] = [];
    for (let mes = 0; mes < 12; mes++) {
      linha.push(0);
    }
    matriz.push(linha);
  }

  // Percorre cada despesa e soma o valor na célula [categoria][mês] correta.
  for (let i = 0; i < despesas.length; i++) {
    const despesa = despesas[i];
    if (despesa === undefined) {
      continue;
    }

    const indiceCategoria = CATEGORIAS.indexOf(despesa.categoria);
    const indiceMes = despesa.mes - 1; // mes vai de 1 a 12, array é 0 a 11

    const linha = matriz[indiceCategoria];
    if (linha !== undefined && linha[indiceMes] !== undefined) {
      linha[indiceMes] += despesa.valor;
    }
  }

  return matriz;
}

export function formatarRelatorio(despesas: Despesa[]): string {
  const titulo = "relatório de despesas".toUpperCase();
  const matriz = matrizCategoriaMes(despesas);

  let linhas = titulo + "\n\n";

  for (let i = 0; i < CATEGORIAS.length; i++) {
    const categoria = CATEGORIAS[i];
    if (categoria === undefined) {
      continue;
    }

    const linhaMatriz = matriz[i];
    let totalCategoria = 0;
    if (linhaMatriz !== undefined) {
      for (let mes = 0; mes < linhaMatriz.length; mes++) {
        totalCategoria += linhaMatriz[mes] ?? 0;
      }
    }

    const nome = descricaoCategoria(categoria).padEnd(15, " ");
    const valor = totalCategoria.toFixed(2).padStart(10, " ");
    linhas += `${nome}${valor}\n`;
  }

  const total = totalGasto(despesas);
  const maior = maiorDespesa(despesas);

  linhas += "\n";
  linhas += `Total geral: ${total.toFixed(2).padStart(10, " ")}\n`;

  if (maior !== undefined) {
    linhas += `Maior despesa: ${maior.descricao} (${maior.valor.toFixed(2)})\n`;
  } else {
    linhas += "Maior despesa: nenhuma\n";
  }

  return linhas;
}

