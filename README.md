
# OfferMerc

OfferMerc é um protótipo de aplicativo voltado para comparação de preços em supermercados, com foco em ajudar consumidores a encontrar melhores oportunidades de compra de forma mais simples e rápida.

O projeto nasceu fruto do trabalho de um grupo de 4 integrantes para a disciplina de Projeto Integrador I, no 1º semestre do curso de Análise e Desenvolvimento de Sistemas na Fatec de Ourinhos, e obteu nota máxima na apresentação do Pitch para a turma.

> Status atual: protótipo em desenvolvimento com interface e navegação estruturadas para validar o conceito e a experiência do usuário.

## Visão do produto

O OfferMerc nasceu com a proposta de tornar a comparação de preços entre mercados mais transparente, especialmente para consumidores que buscam economizar no dia a dia. A ideia central é unir busca de produtos, visualização de ofertas e organização de listas de compras em uma experiência simples e acessível.

## Problema que o projeto aborda

Muitos consumidores enfrentam dificuldade para:

- comparar preços entre diferentes mercados;
- acompanhar promoções e ofertas em tempo real;
- encontrar produtos com facilidade;
- organizar compras de forma prática.

O projeto busca resolver isso por meio de uma interface mobile-first, com foco em usabilidade e rapidez.

## Público-alvo

- consumidores que desejam economizar em compras recorrentes;
- usuários que gostam de comparar ofertas antes de comprar;
- mercados que querem divulgar produtos e promoções;
- administradores que precisam validar cadastros e conteúdos.

## Funcionalidades principais

O projeto já contempla fluxos de interface para:

- cadastro e login de usuários;
- onboarding inicial;
- busca de produtos;
- comparação de preços entre estabelecimentos;
- histórico de preços;
- listas de compras;
- favoritos;
- perfil do usuário;
- telas específicas para mercado e administração.

## Stack tecnológica

O protótipo foi desenvolvido com:

- React + Vite
- TypeScript
- Tailwind CSS
- Radix UI
- Material UI Icons
- Recharts
- React Router
- pnpm/npm para gerenciamento de dependências

## Estrutura do projeto

- src/ — código-fonte principal
  - app/ — telas, componentes e fluxos da aplicação
  - components/ — componentes reutilizáveis e modais
  - styles/ — estilos globais, temas e personalização visual
- package.json — dependências e scripts do projeto
- vite.config.ts — configuração do Vite

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

Após iniciar, abra o endereço:

```text
http://localhost:5173
```

## Status do projeto

O projeto está em fase de prototipação e validação de interface. Atualmente, o foco principal é:

- estruturar a experiência do usuário;
- validar os fluxos principais;
- consolidar a identidade visual do aplicativo;
- preparar a base para futuras evoluções com backend e dados reais.

## Próximos passos

Entre as evoluções planejadas para o projeto, destacam-se:

- integração real com backend e banco de dados;
- autenticação funcional;
- persistência de dados de usuário e produtos;
- atualização dinâmica de preços e promoções;
- expansão dos módulos de mercado e administração.

## Observações importantes

Este repositório representa uma base de protótipo visual e de navegação. Muitos fluxos ainda estão em fase conceitual ou com dados simulados, e a proposta é evoluir o projeto em etapas até se tornar uma solução mais completa.

## Referências

- Documento mestre do projeto: OfferMerc_Documento_Mestre.md
- Design original no Figma: https://www.figma.com/design/gJAEbSbrIBHZb9pTrNDR8n/OfferMerc-app-prototype

## Contribuições

Contribuições são bem-vindas. Para sugestões, melhorias ou discussões sobre o projeto, basta abrir uma issue ou enviar uma pull request.
  