# Projeto Individual — Controle de Despesas (TypeScript)

Projeto que modela despesas, oferece funções de manipulação (adicionar, remover,
filtrar, somar, encontrar maior) e gera um relatório de gastos por categoria e mês.

## Como instalar

```bash
npm install
```

## Como rodar os testes

```bash
npm test
```

## Como rodar o programa principal

```bash
npx tsx src/index.ts
```

## Como verificar os tipos (sem gerar arquivos)

```bash
npx tsc --noEmit
```

## Arquivos de configuração

| Arquivo | O que faz |
|---|---|
| `package.json` | Define o nome, dependências (`typescript`, `vitest`, `tsx`, `@types/node`) e o script `npm test`, que roda a suíte de testes com Vitest. |
| `tsconfig.json` | Configura o compilador TypeScript: `strict: true` (checagem rígida de tipos), `noUncheckedIndexedAccess` (acesso a índices de array pode ser `undefined`), `module`/`target` em ESNext/ES2022, e inclui as pastas `src` e `test` na checagem. |
| `.gitignore` | Evita que `node_modules/` (dependências instaladas), `dist/` (saída de build) e `.vitest/` (cache do Vitest) sejam versionados no Git. |

## Estrutura do projeto

```
src/
  tipos.ts      — tipos (Despesa, Categoria) e array CATEGORIAS
  despesas.ts   — funções de manipulação de despesas
  relatorio.ts  — funções de geração do relatório
  index.ts      — programa principal, integra os módulos acima
test/
  despesas.test.ts
  relatorio.test.ts
```

## Registro de uso de IA

Todas as funções abaixo foram desenvolvidas em par com uma IA (Claude), seguindo
o fluxo: escrever teste → confirmar que falha → pedir implementação → revisar
antes de aceitar → commit.

| Função | Implementação aceita como veio? | Teste extra adicionado por desconfiança |
|---|---|---|
| `adicionarDespesa` | Sim, mas com ajuste de cobertura | Teste de validação de `mes` fora de 1–12, e teste explícito de imutabilidade (array original não alterado) |
| `removerDespesa` | Sim | — |
| `despesasDaCategoria` | Sim | — |
| `totalGasto` | Sim | — |
| `maiorDespesa` | Sim | — |
| `descricaoCategoria` | Sim | — |
| `matrizCategoriaMes` | Sim | — |
| `formatarRelatorio` | Sim | — |

### Reflexões

**`adicionarDespesa`**
A IA entregou a implementação já correta na primeira tentativa (validações de
`valor` e `mes`, retorno de array novo via spread). Porém, meu teste inicial só
cobria a validação de `valor <= 0`, deixando a validação de `mes` sem nenhum
teste provando que ela funcionava. Percebi essa lacuna e pedi um teste adicional
para `mes` fora do intervalo 1–12. Também adicionei, depois, um teste específico
comparando o array antes e depois da chamada, porque o teste original só
verificava o resultado, não garantia que o array recebido como parâmetro
permanecia intocado.

**`removerDespesa`**
A implementação usa `.filter()`, que por natureza já retorna um array novo e
não altera o original. Não encontrei comportamento inesperado nem precisei de
teste extra — o caso de "id inexistente retorna cópia igual" já estava coberto
desde o início e passou de primeira.

**`despesasDaCategoria`**
Mesma lógica de `removerDespesa`, usando `.filter()` com comparação `===`.
Implementação simples e direta, sem necessidade de ajustes.

**`totalGasto`**
Usa `.reduce()` com valor inicial 0, o que cobre naturalmente o caso de lista
vazia sem precisar de um `if` separado. Verifiquei que o comportamento não
dependia dos números exatos do meu teste (testei com valores diferentes dos
usados nos exemplos e o resultado continuou correto).

**`maiorDespesa`**
A implementação trata separadamente a lista vazia (retorna `undefined` antes de
qualquer comparação) e usa `.reduce()` sem valor inicial para encontrar o maior
valor. Conferi que o `reduce` sem valor inicial realmente usa o primeiro item
como ponto de partida, o que evita teria sido um problema se a lista tivesse só
um item.

**`descricaoCategoria`**
Usa `switch` com um `return` por `case`, cobrindo as 4 categorias. Como o tipo
`Categoria` é um union fechado, o TypeScript garante que nenhum caso ficou de
fora (exhaustiveness checking). Não precisei de ajustes.

**`matrizCategoriaMes`**
Essa foi a mais arriscada, por causa da restrição de usar só `for`/`while`.
Conferi linha por linha que os índices de categoria (via `indexOf`) e mês
(`mes - 1`) estavam sendo calculados corretamente, e não fixos nos valores do
meu teste. Também validei com `npx tsc --noEmit` por causa do
`noUncheckedIndexedAccess`, que exige checagens extras de `undefined` ao
acessar posições de array.

**`formatarRelatorio`**
Reaproveita `totalGasto`, `maiorDespesa` (de `despesas.ts`) e
`matrizCategoriaMes` (do próprio `relatorio.ts`) em vez de duplicar lógica de
soma. Usa `toUpperCase`, `padEnd`, `padStart` e `toFixed` para montar o texto
alinhado. Testei com lista vazia para confirmar que os totais aparecem como
"0.00" em vez de `undefined` ou `NaN`.