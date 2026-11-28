---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

## Escopo

`index.html`, o app do cliente (PWA). Modo: Operate. Público: comprador de atacado e visitante comum, no celular, andando dentro do polo. Tarefa: achar a loja e chegar; montar a lista e seguir a ordem. Restrições: marinho, rosa e dourado do Mega Moda e o ícone da marca; cores por segmento (`MM.SEGS`) seguem distinguíveis; tema claro/escuro e alto contraste; tudo funciona sem rede.

## Direction contract

THESIS: Cada loja é uma referência de catálogo de atacado (REF = corredor + número), e o mapa é a página onde a peça é apontada. Recusa o app de mapa genérico de cartões brancos com sombra e pinos iguais.

OWN-WORLD: Barra e cabeçalhos em marinho fundo (#16163f / #2b2860), chão couché claro levemente frio, rosa (#cc3366) só para seleção e ação, dourado (#ffc233) para destaque e REF. Uma família de catálogo com eixo de largura (Archivo): nomes e REF condensados e pesados, corpo normal; algarismos tabulares. Linhas finas de 1px fazem o papel das legendas de catálogo; sem cartões com sombra, segmentos como tiras de cor chapada.

STORY: A pessoa vê de cara onde está e o piso; busca pelo nome, produto ou REF; o índice responde em linhas REF alinhadas; ao tocar, a loja é apontada no mapa por uma legenda de catálogo e a rota aparece com passos medidos em metros.

FIRST VIEWPORT: Topo marinho com marca, título do piso e busca larga; logo abaixo, abas de prédio·piso como sumário de catálogo. O mapa ocupa o meio. Gaveta inferior couché com o índice REF (REF dourado à esquerda em tabular condensado, nome, segmento como tira de cor, piso e distância à direita). Ação principal "Traçar rota" em rosa na ficha da loja. Navegação inferior padrão.

FORM: Catálogo de atacado com legenda REF; posição 6 da lista ordenada; seed key 33a77972. Assinatura: a legenda de catálogo — linha fina saindo da loja escolhida no mapa até um rótulo REF + nome, como a legenda de uma peça no lookbook. Raises: cromo apagado (Blocos Metro), comprimento é medida nos passos da rota (Partitura de Dança), um só código REF em busca, mapa, lista e QR (Catálogo de Gravadora), números tabulares (Campo de Dados).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
