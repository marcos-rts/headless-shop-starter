# headless-shop-starter

Starter genérico para lojas virtuais com React, TypeScript, Vite e Strapi. Inclui catálogo, página de produto, carrinho local e checkout via WhatsApp. É uma base técnica reutilizável, não uma loja comercial específica.

## Instalação

Requisitos: Node.js 20–24, npm e SQLite, MySQL ou PostgreSQL.

```bash
git clone <url-do-repositorio>
cd headless-shop-starter
npm install --prefix backend
npm install --prefix frontend
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Desenvolvimento

```bash
npm run develop --prefix backend
npm run dev --prefix frontend
```

O Strapi roda em `http://localhost:1337`. Configure `VITE_API_URL` no frontend quando o backend estiver em outra URL.

## Estrutura

- `frontend/`: React/Vite, rotas, layout, catálogo, produto, carrinho e configuração visual.
- `backend/`: Strapi 5, configuração do banco e content-type genérico `Produto`.

## Strapi e produtos

No painel administrativo, cadastre e publique produtos com nome, slug, descrição, preço, estoque, imagem, categoria e status ativo. Em **Settings > Users & Permissions > Roles > Public**, permita `find` e `findOne` para `Produto`.

O modelo não contém campos específicos de nenhum segmento comercial.

## Configuração da loja

Edite `frontend/.env`:

```env
VITE_STORE_NAME=Minha Loja
VITE_STORE_DESCRIPTION=Descrição da sua loja
VITE_STORE_CURRENCY=BRL
VITE_STORE_LOCALE=pt-BR
VITE_WHATSAPP_NUMBER=5511999999999
```

O telefone deve conter DDI, DDD e número, sem símbolos. Nunca publique credenciais reais. O banco usa SQLite por padrão; para MySQL/PostgreSQL, configure as variáveis documentadas em `backend/.env.example`.

## Build

```bash
npm run build --prefix frontend
npm run build --prefix backend
```

## Personalização

Altere cores e tipografia em `frontend/src/index.css`, identidade e textos centrais em `frontend/src/config.ts`, e conteúdo das páginas conforme a necessidade da loja. Substitua o logo demonstrativo por um asset próprio quando desejar.
