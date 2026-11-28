# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dois públicos com o mesmo peso:

- **Comprador de atacado** (sacoleiras e lojistas de outras cidades) andando pelo polo com o celular na mão, com uma lista de lojas para visitar e pouco tempo.
- **Visitante comum** do shopping procurando uma loja, banheiro, alimentação ou saída, sem roteiro definido.

Os dois usam o app em pé, andando, dentro do prédio, muitas vezes com sinal fraco.

## Product Purpose

Mapa das lojas com endereço físico e rota: a pessoa busca uma loja ou um produto, vê onde fica no piso certo e segue o caminho até a porta (2D, 3D ou câmera). Também monta uma lista de várias lojas e recebe a ordem de visita mais curta. Sucesso é chegar à loja sem perguntar a ninguém.

## Positioning

Produto do autor, vendido a shoppings. O Mega Moda (Região da 44, Goiânia) é o primeiro cliente e a demonstração; a aba "Planta real" mostra o mesmo app sobre a planta oficial de outro shopping, provando que serve para qualquer planta (desenhada no painel a partir da imagem do piso).

## Operating Context

- Complexo com vários prédios e pisos (Mega Moda Shopping, Park, Mini Moda) e o prédio de demonstração "Planta real".
- Posição por QR Code colado nos corredores, GPS por prédio e "marcar onde estou" numa loja.
- PWA instalável que abre sem internet (dados embutidos e cache).
- Painel (`admin.html`) para lojistas e administrador: dados das lojas, planta, marcos e QR Codes.

## Capabilities and Constraints

- Busca tolerante a erro de digitação, filtros por segmento, link direto por loja (`?loja=slug`).
- Rota por grafo de corredores, entre pisos pelas escadas/elevadores marcados; modo câmera com seta e passos.
- "Minha lista": várias lojas, ordem mais curta, rota única.
- Boxes vagos com botão "Tenho interesse" (WhatsApp).
- Tema claro e escuro; alto contraste.
- HTML, CSS e JS puros, sem build; GitHub Pages + Supabase. `core.js` desenha o mapa em SVG e é compartilhado com o painel.
- Cores por segmento de loja (`MM.SEGS`) identificam categorias no mapa e devem continuar distinguíveis.

## Brand Commitments

- Nome "Mega Moda Mapa" e ícone da marca do Mega Moda (carregado de megamoda.com.br; selo "44" como reserva).
- Cores da marca Mega Moda: azul-marinho, rosa e dourado — obrigatórias no novo visual. Tipografia e o resto da linguagem visual podem mudar.

## Evidence on Hand

- 684 lojas reais do Mega Moda (nome, segmentos, localização), em `lojas-data.js` e no Supabase.
- Planta oficial de demonstração em `planta-real.jpg`, com 12 lojas vinculadas.
- Não há depoimentos, números de uso nem clientes além do Mega Moda; não inventar.

## Product Principles

1. Achar e chegar vem antes de tudo: busca e mapa sempre a um toque.
2. Legível andando: alvos grandes, texto curto, contraste alto em luz de galpão e de rua.
3. O mapa é o produto: a interface emoldura a planta, nunca compete com ela.
4. Funciona sem sinal: nada essencial depende de rede.
5. Serve a qualquer shopping: a marca do cliente veste o app sem mudar como ele funciona.

## Accessibility & Inclusion

Uso com uma mão, em movimento e sob luz forte; modo de alto contraste já existe e deve continuar. Público amplo, inclusive pessoas com pouca familiaridade com apps.
