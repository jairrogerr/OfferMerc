
# OfferMerc

OfferMerc é um protótipo de aplicativo desenvolvido para a disciplina de Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas da Fatec Ourinhos.

> Este projeto está em fase de protótipo e, até o momento, tem como objetivo validar a interface e a experiência do usuário. Há a possibilidade de evoluir para um aplicativo funcional no futuro.

## Sobre o projeto

- Nome do curso: Análise e Desenvolvimento de Sistemas
- Período: 1º semestre
- Instituição: Fatec Ourinhos
- Objetivo: demonstrar um protótipo de aplicativo com foco em ofertas e gestão de mercados, criado a partir de um design no Figma.

## Funcionalidades principais

- Telas de usuário para login, cadastro e perfil
- Navegação entre telas de busca, comparação de produtos, histórico e listas
- Sessões de administrador e comerciante para validação, gestão de produtos e relatórios
- Componentes de UI reutilizáveis com foco em prototipagem rápida

## Tecnologias usadas

- React + Vite
- Tailwind CSS
- Radix UI
- Material UI Icons
- Recharts
- React Router
- Vite + pnpm/npm

## Como executar localmente

### Usando pnpm (recomendado)

```bash
pnpm install
pnpm run dev
```

### Usando npm

```bash
npm install
npm run dev
```

Acesse em `http://localhost:5173` após iniciar o servidor.

## Estrutura do projeto

- `src/` - código-fonte principal
  - `app/` - componentes e telas da aplicação
  - `components/` - componentes de interface para telas e modais
  - `styles/` - arquivos de estilo global e temas
- `package.json` - dependências e scripts de build
- `vite.config.ts` - configuração do Vite

## Observações

- Este projeto é um protótipo visual e de navegação; muitos fluxos e dados ainda não estão conectados a um backend.
- A versão atual serve como base para apresentação e validação do conceito.
- Futuramente, pode ser expandido com autenticação real, persistência de dados e integração com APIs.

## Referências

- Design original no Figma: https://www.figma.com/design/gJAEbSbrIBHZb9pTrNDR8n/OfferMerc-app-prototype
  