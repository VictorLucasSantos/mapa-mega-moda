---
name: Mega Moda Mapa
description: Mapa das lojas do polo da 44 como um catálogo de atacado, em que cada loja é uma REF apontada na planta.
colors:
  navy-deep: "#16163f"
  navy: "#2b2860"
  rose: "#cc3366"
  gold: "#ffc233"
  gold-ink: "#7a5200"
  couche: "#f6f5fa"
  panel: "#ffffff"
  panel-2: "#efeef7"
  ink: "#17163a"
  muted: "#58567c"
  line: "#dcdaea"
  corridor: "#e4e2f2"
  chip: "#eeedf6"
  selected: "#ffe4ee"
  vacant: "#fff1c2"
  featured: "#fff7e0"
  you-blue: "#1a73e8"
  list-orange: "#e65100"
  ok: "#0b7a3b"
  warn-bg: "#fff4d6"
  warn-line: "#e4b73a"
  whatsapp: "#1faa59"
typography:
  display:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "24px"
    fontWeight: 850
    lineHeight: 1.08
    letterSpacing: "0.005em"
    fontVariation: "'wdth' 72"
  ref-large:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "0.01em"
    fontFeature: "'tnum' 1, 'lnum' 1"
    fontVariation: "'wdth' 72"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 72"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 850
    lineHeight: 1.15
    letterSpacing: "0.005em"
    fontVariation: "'wdth' 72"
  ref:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "0.01em"
    fontFeature: "'tnum' 1, 'lnum' 1"
    fontVariation: "'wdth' 72"
  subhead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 850
    lineHeight: 1.2
    fontVariation: "'wdth' 72"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
  item-name:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 750
    lineHeight: 1.25
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 700
    lineHeight: 1.3
  meta:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.35
  nav-label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  map-box: "6px"
  sm: "8px"
  md: "10px"
  lg: "12px"
  sheet: "16px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  gutter: "16px"
  section: "20px"
components:
  button-primary:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.panel}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "50px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "50px"
  button-navy:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.panel}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "46px"
  button-default:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "46px"
  header-icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.panel}"
    rounded: "{rounded.md}"
    size: "40px"
  header-icon-button-on:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy-deep}"
  search-field:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 44px"
    height: "46px"
  chip:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "36px"
    typography: "{typography.label}"
  chip-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.panel}"
  floor-tab:
    textColor: "{colors.muted}"
    padding: "12px 10px 10px"
    typography: "{typography.label}"
  floor-tab-on:
    textColor: "{colors.ink}"
  ref-tag:
    textColor: "{colors.gold-ink}"
    width: "64px"
    typography: "{typography.ref}"
  stop-number:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.panel}"
    rounded: "{rounded.sm}"
    size: "30px"
  add-to-list:
    backgroundColor: "transparent"
    textColor: "{colors.rose}"
    rounded: "{rounded.md}"
    size: "40px"
  add-to-list-in:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.panel}"
  bottom-nav-item:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.muted}"
    padding: "9px 2px 8px"
    typography: "{typography.nav-label}"
  bottom-nav-item-on:
    textColor: "{colors.rose}"
  notice:
    backgroundColor: "{colors.warn-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
---

# Design System: Mega Moda Mapa

## Overview

**Creative North Star: "O Catálogo de Atacado"**

Cada loja é uma referência de catálogo (REF = corredor + número do box) e o mapa é a página onde a peça é apontada. A interface fala a língua de quem compra no atacado: códigos curtos, colunas alinhadas, legendas finas ligando o código à peça. Topo e cabeçalhos em marinho fundo, chão de papel couché claro levemente frio, rosa só para seleção e ação, dourado para o REF e o destaque. O texto e as linhas de 1px fazem o trabalho que em outros apps cabe a cartões e sombras.

A densidade é de índice de catálogo, não de feed: linhas inteiras separadas por fio, REF dourado à esquerda, nome no meio, distância tabular à direita. Uma só família tipográfica com eixo de largura (Archivo) carrega a hierarquia: nomes e REF condensados e pesados, corpo em largura normal. O mapa ocupa o centro e a moldura recua; tudo foi pensado para ser lido em pé, andando, sob luz forte.

O sistema recusa o app de mapa genérico de cartões brancos com sombra e pinos iguais.

**Key Characteristics:**
- Moldura marinho (#16163f) com fio dourado de 2px embaixo; chão couché frio.
- REF dourado, condensado e tabular, igual na busca, no índice, na ficha e na legenda do mapa.
- Fios de 1px no lugar de cartões; nenhuma lista ou painel com sombra.
- Rosa reservado para o que está selecionado e para a ação principal.
- A legenda de catálogo (linha fina + REF + nome) aponta a loja escolhida no mapa.
- Passos da rota medidos: cada passo tem uma barra proporcional aos metros.

## Colors

Marinho, rosa e dourado da marca Mega Moda sobre papel couché frio; a cor de segmento só aparece como tira chapada e tinta leve sobre o box.

### Primary
- **Marinho Noturno** (navy-deep): faixa do cabeçalho, aviso flutuante (`.hint`) e `theme-color` do PWA. É a capa do catálogo.
- **Marinho Catálogo** (navy): botão de navegação no mapa, botão secundário escuro, nomes de corredor no mapa, plaqueta "Entrada/Escadas", marcos e barras dos passos medidos.

### Secondary
- **Rosa Mega Moda** (rose): seleção e ação. Botões primários como "Traçar rota", aba e item de navegação ativos (fio de 3px), contorno da loja selecionada, ponto da legenda, número das paradas da lista, anel de foco, seleção de texto. No tema escuro vira #ff5c93 com tinta #1a0d11.

### Tertiary
- **Dourado 44** (gold): fio de 2px sob o cabeçalho e o aviso, borda do campo de busca em foco, botão do cabeçalho ligado. Nunca como cor de texto sobre fundo claro.
- **Ouro Velho** (gold-ink): a cor do REF e da estrela de destaque sobre papel claro (no escuro, o próprio dourado #ffc233). É o dourado que passa em contraste para texto.

### Neutral
- **Couché Frio** (couche): fundo da página e do mapa, com retícula de pontos `--line` a cada 24px no mapa.
- **Papel** (panel): gaveta, abas, barra inferior, campo de busca, boxes de loja no mapa.
- **Papel Sombreado** (panel-2): caixa de introdução.
- **Tinta Marinho** (ink): texto principal e chip ligado (fundo).
- **Tinta Apagada** (muted): metadados, abas inativas, itens de navegação inativos.
- **Fio** (line): todos os fios de 1px, divisórias do índice, bordas de chip e botão.
- **Corredor** (corridor) e **Chip** (chip): corredores no mapa; fundo de hover e trilho das barras de passo.
- **Estados de box**: selecionado (selected), vago com contorno tracejado (vacant), destaque (featured).
- **Funcionais**: azul "você está aqui" e rota tracejada (you-blue), laranja dos pinos da Minha lista (list-orange), aberto (ok), aviso (warn-bg + warn-line), verde WhatsApp (whatsapp) só nos botões que abrem o WhatsApp ("WhatsApp" da loja e "Tenho interesse" do box vago).

### Cores de segmento
As 18 cores de `MM.SEGS` (Feminino #e0618e, Masculino #3b6fd1, Jeans #2f3d8f, Infantil #f2b632 etc.) identificam categorias e devem continuar distinguíveis entre si. Aparecem como tira de 4px no topo do box, contorno fino do box, tinta translúcida (`.tint`, opacidade 0.07 a 0.42 conforme o zoom) e marcador circular.

### Named Rules
**The Rosa É Ação Rule.** Rosa marca só o que está selecionado ou a ação principal da tela. Se algo rosa não é clicável nem escolhido, está errado.

**The Ouro Velho Rule.** REF em texto usa gold-ink sobre claro e gold sobre escuro. O dourado vivo (#ffc233) é fio, foco e estado ligado, nunca texto sobre papel.

**The Tema Triplo Rule.** Toda cor nova entra nos três conjuntos de variáveis: claro (`:root`), escuro (`[data-theme=dark]`) e alto contraste (`[data-hc]`, que endurece tinta, fio e rosa para #b3003f). Nenhuma cor fica fixa no componente se tiver papel de tema.

## Typography

**Display Font:** Archivo (variável, `wdth` 62–125, `wght` 400–900), com system-ui, -apple-system, Segoe UI, Roboto
**Body Font:** Archivo, mesma família
**Label/Mono Font:** não há mono; algarismos tabulares (`tnum`, `lnum`) cumprem esse papel

**Character:** Uma família de catálogo usada em duas larguras: condensada a 72% (`--cond`) e pesada (850) para nome, REF e títulos, como a referência impressa sob a peça; largura normal para o corpo, que precisa ser lido andando.

### Hierarchy
- **REF grande** (850, 28px, condensada 72%, tabular): REF na ficha da loja, separado do nome por fio vertical de 1px.
- **Display** (850, 24px, 1.08, condensada 72%): nome da loja na ficha.
- **Headline** (850, 20px, 1, condensada, caixa alta): marca "MEGA MODA MAPA" no cabeçalho, com "MAPA" em dourado.
- **Title** (850, 19px, 1.15, condensada): título da gaveta.
- **REF** (850, 18px, condensada, tabular, gold-ink): coluna de 64px à esquerda de cada linha do índice.
- **Subhead** (850, 16px, condensada): `h3`, título "Passo a passo", título da introdução.
- **Nome no índice** (750, 15.5px, 1.25): nome da loja nas linhas do índice e da lista.
- **Body** (400, 15px, 1.4; texto corrido 14.5px a 1.55, até 65ch): descrições e passos.
- **Label** (700, 13.5px): chips, abas (a 85% de largura), botões pequenos.
- **Meta** (400–600, 12.5–13px, muted): localização, contagens, legenda do cabeçalho.
- **Nav label** (700, 12px): itens da barra inferior.
- No mapa, a legenda usa REF a 13px e nome a 17px, ambos 850 e condensados, com halo de 4px na cor do fundo.

### Named Rules
**The Duas Larguras Rule.** Condensado e pesado só para o que identifica (nome, REF, títulos, números de parada); o que se lê para entender fica em largura normal. Nunca condensar parágrafo ou passo.

**The Coluna Tabular Rule.** Todo número que se compara com outro (REF, distância, contagem, número da parada, passo) usa `font-variant-numeric: tabular-nums lining-nums`, para alinhar como tabela de preço.

## Layout

Celular primeiro, em uma coluna de altura fixa (`100dvh`): cabeçalho marinho (12px de respiro), abas de prédio·piso roláveis na horizontal, mapa ocupando o resto, gaveta inferior e barra de navegação com `safe-area-inset-bottom`. A gaveta tem três alturas: espiada (só o título), média (44vh) e cheia (86vh); a ficha da loja ocupa só a altura do conteúdo.

O respiro lateral da gaveta é 16px; linhas do índice têm 11px em cima e embaixo, com 12px entre colunas (REF 64px, nome flexível, distância e botão à direita). Ritmo de espaçamento em 4/8/12/16/20px. Alvos de toque têm pelo menos 40px (36px só em chips e botões de ordenar da lista); botões principais 46–50px.

A partir de 900px, a página vira grade: painel lateral de 420px à esquerda (gaveta sem cantos nem sombra, com fio à direita), mapa à direita, busca subindo para dentro do cabeçalho (320–560px), barra inferior presa à coluna do painel.

O mapa é SVG com zoom semântico em três níveis (`zf` longe, `zm` médio, `zn2` perto): longe mostra agrupamentos por corredor, médio mostra marcadores circulares, perto mostra rótulos. Um algoritmo anti-colisão dá prioridade à loja escolhida, à lista, aos destaques e depois ao resto; a legenda de catálogo reserva seu espaço antes de tudo.

## Elevation & Depth

Plano por padrão. Profundidade vem de tom (couché sob papel branco), de fios de 1px e da moldura marinho, não de sombra. Listas, fichas, chips, abas e a caixa de introdução não têm sombra. A sombra fica com o que flutua sobre o mapa: controles de zoom, "Marcar onde estou", faixa de localização e aviso. No celular a gaveta tem uma sombra para cima, discreta, que some no layout de computador.

### Shadow Vocabulary
- **Flutuante sobre o mapa** (`--shadow`: `0 4px 12px -4px rgba(0,0,0,.22)`; escuro `0 8px 22px -8px rgba(0,0,0,.7)`): só controles e avisos sobrepostos ao mapa.
- **Borda da gaveta** (`0 -6px 16px -10px rgba(0,0,0,.3)`): gaveta inferior no celular.
- **Realce do marcador** (`drop-shadow(0 2px 4px rgba(22,22,63,.45))`): marcador no hover ou selecionado.

### Named Rules
**The Sombra Só Flutua Rule.** Sombra é para o que paira sobre o mapa. Se o elemento está dentro da gaveta, do painel ou da lista, ele se separa por fio, não por sombra.

## Shapes

Cantos suaves e consistentes por tamanho: 12px (`--r`) para botões, campo de busca e caixas de conteúdo; 10px para botões de ícone, logo, aviso e caixas de alerta; 8px para os quadrados de número de parada e botões mínimos; 16px só nos cantos de cima da gaveta; 6px nos boxes de loja do mapa; 999px para chips, contadores e selos. O fio é a forma principal: 1px (`--line`) para divisórias e bordas, 1.5px para o botão secundário e o botão de adicionar, 2px dourado sob o cabeçalho, 3px rosa sob a aba e acima do item de navegação ativos.

A tira de cor chapada é a forma do segmento: 4px no topo de cada box do mapa e 4px de altura nas barras dos passos medidos. Box vago usa contorno tracejado (4 2).

## Components

### Buttons
Um vocabulário só, firme e direto, pensado para o polegar.
- **Shape:** cantos suaves (12px); 46px de altura, 50px na ficha da loja.
- **Primary:** rosa chapado com texto branco ("Traçar rota", "Escolher lojas", "Marcar no mapa"). Hover clareia 6% (`brightness(1.06)`); ativo encolhe para 0.98.
- **Secondary:** contorno de 1.5px em tinta marinho, fundo transparente ("Na minha lista"); quando a loja já está na lista, vira chip cinza preenchido.
- **Navy:** marinho chapado com texto branco para entrar na navegação ("Navegar", "Navegar pela lista"); no escuro, lavanda (#a9a4ff) com texto marinho.
- **Default:** papel com fio de 1px; hover escurece o fio para `muted`.
- **Hover / Focus:** transições de 0.15s em fundo, fio e cor; foco visível com anel rosa de 2px afastado 2px.

### Chips
- **Style:** pílula de 36px, papel com fio de 1px, texto 13.5px/700, ícone de 17px em marinho.
- **State:** ligado inverte para fundo tinta e texto papel. Contadores dentro de abas são pílulas rosa (lista: laranja) de 11px/800.

### Cards / Containers
- **Corner Style:** não há cartões de lista; a ficha da loja é conteúdo direto da gaveta. Caixas de introdução e alerta usam 12px e 10px.
- **Background:** papel; introdução em panel-2; alerta em warn-bg com fio warn-line.
- **Shadow Strategy:** nenhuma (ver Elevation & Depth).
- **Border:** fio de 1px.
- **Internal Padding:** 10–14px.

### Inputs / Fields
- **Style:** campo de busca de 46px, papel, 12px de canto, texto 16px/550, lupa à esquerda e botão de limpar à direita, sobre a faixa marinho.
- **Focus:** borda de 2px passa de transparente para dourado e a lupa fica rosa; cursor de texto rosa.

### Navigation
- **Abas de prédio·piso:** sumário de catálogo em papel com fio embaixo; texto 13.5px/700 a 85% de largura, muted; ativa em tinta com fio rosa de 3px; separadores verticais de 1px entre prédios.
- **Barra inferior:** quatro itens (Buscar, Mapa, Minha lista, Onde estou), ícone de 22px sobre rótulo de 12px/700; ativo em rosa com fio de 3px no topo; contador rosa sobre "Minha lista".
- **Cabeçalho:** botões de ícone de 40px com fio branco a 20%; ligado em dourado com ícone marinho.

### Linha do índice REF (assinatura)
Linha inteira, sem cartão: REF dourado condensado em coluna de 64px, nome em 15.5px/750, linha de meta com segmento e local em muted, distância tabular a 85% de largura e botão de adicionar de 40px à direita. Divisória de 1px; hover com fundo chip a 60%.

### Ficha da loja
REF grande (28px) à esquerda, separado do nome (24px, condensado) por fio vertical de 1px; abaixo, local, segmentos, distância com ícone e horário com ponto de status; depois "Traçar rota" (primário, mais largo) e "Na minha lista" (secundário).

### Legenda de catálogo (assinatura do mapa)
`MM.legenda`: da loja escolhida sai uma linha de 1.2px em tinta (sem escalar com o zoom), com um ponto rosa de 4.5px e contorno na cor do fundo, que sobe ou desce 40px e corre na horizontal até o rótulo: REF em gold-ink a 13px sobre o nome em tinta a 17px, ambos 850 condensados, com halo de 4px. A direção (esquerda/direita, cima/baixo) segue a posição da loja na planta. Desenhada em pixels de tela (escala `--lgs`), entra com revelação da esquerda para a direita em 0.26s e fica estática com movimento reduzido. Some no zoom mais distante.

### Passos medidos
Lista numerada com número condensado e tabular em muted, texto 14.5px e, sob cada passo com distância, uma barra de 4px cujo comprimento é proporcional aos metros do trecho (preenchimento marinho sobre trilho chip). Fios de 1px entre passos.

### Divergências conhecidas (não são padrão)
O build ainda carrega elementos que este sistema não adota: os rótulos de loja no zoom próximo são todos a mesma pílula com sombra; as amostras de segmento no índice, na ficha e na cartela são quadradinhos em vez de tiras; a tabela de ícones de segmento e de marcos ainda guarda emoji para o painel e campos antigos. Superfícies novas seguem as regras acima, não esses elementos.

## Do's and Don'ts

### Do:
- **Do** mostrar o REF (`MM.refOf`: corredor abreviado + primeiro número do box) igual em busca, índice, ficha, legenda e QR, sempre condensado, 850, tabular e em gold-ink sobre claro.
- **Do** separar linhas e blocos com fios de 1px em `--line` e alinhar números em colunas tabulares.
- **Do** reservar o rosa (#cc3366) para seleção e para a ação principal de cada tela, com uma ação primária por ficha.
- **Do** mostrar o segmento como cor chapada: tira de 4px, contorno fino ou tinta translúcida, nunca como fundo sólido de bloco de texto.
- **Do** declarar toda cor de tema nos três conjuntos: claro, escuro e alto contraste.
- **Do** desenhar ícones como SVG de traço 1.9 (marcos 2.2), cantos e pontas arredondados, em 22px por padrão.
- **Do** manter alvos de toque de pelo menos 40px e botões de ação de 46–50px.
- **Do** respeitar `prefers-reduced-motion`: a rota tracejada, o pulso e a entrada da legenda param.
- **Do** manter a fonte disponível sem rede, porque o app precisa abrir sem sinal.

### Don't:
- **Don't** usar cartões brancos com sombra para lojas, resultados ou passos; sombra só no que flutua sobre o mapa.
- **Don't** usar o dourado vivo (#ffc233) como cor de texto sobre papel claro.
- **Don't** usar rosa como decoração, fundo de seção ou cor de ícone que não é ação.
- **Don't** condensar texto corrido, passos ou descrições.
- **Don't** usar emoji ou caracteres de símbolo como ícone na interface do cliente.
- **Don't** pôr sombra nos rótulos do mapa nem repetir pílulas iguais para toda loja; a loja escolhida se identifica pela legenda de catálogo.
- **Don't** criar sobrancelhas, rótulos-chamada em caixa alta acima de títulos ou selos decorativos; a única caixa alta é a marca no cabeçalho.
