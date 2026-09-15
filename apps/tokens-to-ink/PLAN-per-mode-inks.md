# Plano — tintas por modo (multimarca) no Tokens to Ink

> Estado: **especificação, não implementado.** Substitui a abordagem interina "todos os
> modos → a mesma tag" que ficou no `buildColorLookup`. Escrito 2026-09-11.

## 1. Problema

Uma variável de cor pode ter vários modos usados como **multimarca**: a variável chama-se
`primary` e cada modo é uma marca com a sua cor (Marca A = vermelho, Marca B = azul). Cada
cor precisa da sua **tinta própria** (CMYK / Pantone / RAL / Vinyl): o vermelho da Marca A
imprime como Pantone 485; o azul da Marca B como Pantone 300.

Hoje as tintas são **uma tag única** na `description` da variável (`[cmyk:0,100,100,0]`),
partilhada por todos os modos. Para multimarca isto é insuficiente e a correção interina
(mapear os hexes de todos os modos para a mesma tag) fica **errada**: as duas marcas
receberiam o mesmo CMYK.

Objetivo: **uma tinta por (variável, modo)**, com o modelo atual (1 tinta por variável) a
manter-se como fallback retrocompatível.

## 2. Modelo de dados — tags por modo

Formato atual (mantém-se como *default / fallback*, aplica-se a qualquer modo sem override
específico):

```
[cmyk:0,100,100,0] [pantone:485 C] [ral:3020] [vinyl:Oracal 751]
```

Novo: tag com **chave de modo**:

```
[cmyk@<modeId>:0,100,100,0]
```

- Resolução de uma tinta para um nó: **tag do modo do nó** → senão **tag sem modo** (fallback)
  → senão CMYK automático (RGB→CMYK).
- Retrocompatível: ficheiros antigos (tags sem modo) continuam a funcionar sem migração.

**Decisão em aberto — a chave do modo:**
- `modeId` (ex.: `1:0`): estável a renames, mas contém `:` (colide com o parser de tags
  atual `[tag:valor]`) → precisa de sanitização (`:`→`-`) e o mapa sanitizado↔modeId.
- `modeName` (ex.: `Brand A`): legível na description, mas **parte se renomearem o modo**.
- `índice` (0,1,2…): curto e sem `:`, mas **parte se reordenarem os modos**.
- **Recomendação:** `modeId` sanitizado. A description raramente é lida à mão (o plugin
  edita-a), e a estabilidade a renames é o que mais interessa numa coleção multimarca. O
  nome amigável aparece só na UI.

O `@rms/core/tags.js` ganha helpers: `parseDescTag(desc, tag, modeKey?)` e
`setDescTag/removeDescTag` com `modeKey` opcional; a versão sem `modeKey` mantém o
comportamento atual.

## 3. Resolução por modo (backend)

O plugin precisa de saber, por nó, o **modo resolvido** da coleção da variável:

- Por nó: `node.resolvedVariableModes[collectionId]` (ou `variable.resolveForConsumer(node)`).
- Sem seleção (listar todas as variáveis): não há nó → usar o **modo default da coleção**
  (`collection.defaultModeId`) e oferecer um **seletor de marca/modo** na UI.

Isto resolve **duas** coisas de uma vez:
1. A tinta certa por modo (esta feature).
2. O **swatch/hex certo no painel** (a "metade do #1" que ficou por fazer — hoje o painel
   mostra sempre o primeiro modo do mapa, não o do nó).

Novo helper (core): `resolveColorValueAtMode(variable, modeId, …)` **já existe** (foi criado
na correção do export). Falta o par para as tintas: `inkForMode(variable, tagName, modeId)`
que lê `tag@modeId` → `tag` → null.

## 4. Impacto no export (`buildColorLookup`)

Hoje (interino): para cada variável resolve todos os modos e mapeia **todos** os hexes para
a **mesma** tag manual. **Substituir por:** para cada (variável, modo), computar o hex desse
modo e ler a tinta **desse modo** (`inkForMode`), registando `hex → tinta`.

- O PDF exportado é sempre de **um** modo (o canvas está num modo). O hex renderizado já
  codifica o modo, por isso `colorLookup[hexRenderizado]` devolve a tinta correta desse modo.
- Mudança pequena e localizada; a estrutura do loop mantém-se.

**Edge case a registar:** se dois modos (ou duas variáveis) produzirem o **mesmo hex** mas
com tintas manuais diferentes, o lookup por hex colide (última a escrever ganha). É raro
(duas marcas com exatamente a mesma cor mas tintas diferentes) — documentar e, se preciso,
resolver por prioridade do modo exportado.

## 5. UI

Princípio-chave: **o plugin está sempre num só modo no canvas**, por isso **não** são precisos
N campos por variável. A UI atual não muda de forma — muda de *significado*:

- A linha mostra a cor **e a tinta do modo atual**.
- Editar CMYK/Pantone/RAL/Vinyl escreve na tag **do modo atual**.
- Trocar de marca (modo) no canvas → re-scan → editar as tintas dessa marca.
- **Novo, pequeno:** um indicador do modo/marca ativo no cabeçalho, e — no modo "sem
  seleção" (listar todas) — um **seletor de modo** (senão não há nó de onde inferir o modo).
- Ficheiro de **um só modo** (caso comum): comportamento idêntico ao de hoje.

## 6. Migração / retrocompatibilidade

- Tags sem modo continuam válidas como **fallback** — nada a migrar à força.
- Ao editar uma tinta num ficheiro multi-modo, ela passa a ser **por modo** a partir daí.
- (Opcional, provavelmente desnecessário) um aviso único "estas tintas são partilhadas entre
  modos — separar por marca?".

## 7. Testes (vitest, mock `figma`)

- Variável multi-modo com tinta por modo → export no modo A dá tinta A, no modo B dá tinta B.
- Fallback: tag sem modo aplica-se a um modo sem override específico.
- Scan mostra o **swatch e a tinta do modo do nó** (não o primeiro modo).
- `resolvedVariableModes` respeitado; listar-todas usa o default da coleção.
- Round-trip das tags por modo em `@rms/core/tags` (set/parse/remove com `modeKey`).

## 8. Faseamento e risco

1. **Core (baixo risco):** formato da tag + helpers `tags.js` com `modeKey` + `inkForMode`. Testes.
2. **Resolução (médio):** modo por nó (`resolvedVariableModes`); `buildVariableEntry` e
   `buildColorLookup` passam a ler por modo. Substitui a lógica interina do export.
3. **UI (médio):** linhas leem/escrevem a tinta do modo atual; indicador de modo + seletor no
   modo "todas as variáveis".
4. **Retrocompat:** fallback sem modo; ficheiro de um modo inalterado.

Risco global: **médio** — mexe no modelo de dados (description tags) partilhado, na resolução
e na UI. Precisa de **verificação no Figma** com um ficheiro multimarca real antes de fixar.

## 9. Decisões em aberto (para quando executares)

- Chave do modo: `modeId` (recomendado) vs `modeName` vs índice.
- Colisão de hex entre modos/variáveis no lookup do export.
- Onde mostrar o modo ativo e como o seletor se comporta no modo "todas as variáveis".
- Bloat da description (N tintas por variável) — aceitável? limite?
- Variáveis de **biblioteca/remotas** multimarca: `resolveForConsumer` e a description podem
  não ser editáveis (a description vive no ficheiro de origem) — confirmar comportamento.
