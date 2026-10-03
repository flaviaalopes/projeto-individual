import { Despesa } from "./tipos";
import { adicionarDespesa, totalGasto, maiorDespesa } from "./despesas";
import { formatarRelatorio } from "./relatorio";

// Array inicial vazio; vamos popular usando adicionarDespesa,
// para já validar os dados de exemplo contra as mesmas regras
// (valor > 0 e mes entre 1 e 12) usadas no resto do projeto.
let despesas: Despesa[] = [];

const despesasExemplo: Despesa[] = [
  { id: "1", descricao: "Supermercado", valor: 320.5, categoria: "alimentação", mes: 1 },
  { id: "2", descricao: "Restaurante", valor: 85.9, categoria: "alimentação", mes: 2 },
  { id: "3", descricao: "Uber", valor: 45, categoria: "transporte", mes: 1 },
  { id: "4", descricao: "Combustível", valor: 200, categoria: "transporte", mes: 3 },
  { id: "5", descricao: "Cinema", valor: 60, categoria: "lazer", mes: 2 },
  { id: "6", descricao: "Show", valor: 150, categoria: "lazer", mes: 3 },
  { id: "7", descricao: "Aluguel", valor: 1200, categoria: "moradia", mes: 1 },
  { id: "8", descricao: "Conta de luz", valor: 180, categoria: "moradia", mes: 2 },
];

// adicionarDespesa retorna um array novo a cada chamada (imutabilidade),
// por isso reatribuímos 'despesas' a cada iteração — daí o 'let'.
for (let i = 0; i < despesasExemplo.length; i++) {
  const despesa = despesasExemplo[i];
  if (despesa !== undefined) {
    despesas = adicionarDespesa(despesas, despesa);
  }
}

console.log(formatarRelatorio(despesas));

console.log("Total gasto:", totalGasto(despesas).toFixed(2));

const maior = maiorDespesa(despesas);
if (maior !== undefined) {
  console.log("Maior despesa:", maior.descricao, "-", maior.valor.toFixed(2));
}