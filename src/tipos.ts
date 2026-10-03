// Union type de literais: garante que só esses 4 valores são aceitos
// pelo compilador, sem precisar de enum (mais simples de usar em comparações
// e em arrays, como o CATEGORIAS abaixo).
export type Categoria = "alimentação" | "transporte" | "lazer" | "moradia";

export interface Despesa {
  // readonly: o enunciado diz que o id nunca muda depois de criado.
  // Não é opcional, pois toda despesa precisa ter um id desde a criação.
  readonly id: string;

  // Obrigatória, sempre uma string com o texto da despesa.
  descricao: string;

  // Obrigatório, valor numérico da despesa.
  valor: number;

  // Restrita ao union type Categoria.
  categoria: Categoria;

  // Mês em que ocorreu (1 a 12).
  mes: number;

  // Opcional.
  observacao?: string;
}

// Array com as categorias na ordem usada no relatório (matriz).
// Tipado com Categoria[] para garantir que os valores batem com o union type.
export const CATEGORIAS: Categoria[] = [
  "alimentação",
  "transporte",
  "lazer",
  "moradia",
];