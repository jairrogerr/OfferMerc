# 🏪 Telas do Mercado - OfferMerc

Documentação das telas específicas para o perfil de estabelecimento comercial (mercados) do aplicativo OfferMerc.

## 📋 Visão Geral

As telas do mercado foram criadas seguindo o mesmo design system moderno, minimalista e mobile-first do restante do aplicativo. Todas as telas são protótipos visuais sem implementação funcional real.

## 🎨 Design System

### Cores
- **Primária**: Verde Emerald (gradientes de primary → primary-dark → emerald-700)
- **Sucesso**: Verde (#10b981)
- **Atenção/Pendente**: Laranja (#f59e0b)
- **Erro**: Vermelho (#ef4444)
- **Info/Secundária**: Azul (#3b82f6)

### Tipografia
- **Títulos**: Montserrat (família customizada)
- **Corpo**: Fonte padrão do sistema
- **Tamanho mobile-first**: 320px até 428px

### Componentes Utilizados
- Cards com bordas arredondadas (16px)
- Botões com feedback visual (hover, active states)
- Ícones do Lucide React
- Animações com Framer Motion
- Gradientes de fundo para headers

## 📱 Telas Implementadas

### 1. **Dashboard do Mercado** (`MerchantDashboard`)
**Arquivo**: `src/app/components/merchant/MerchantDashboard.tsx`

**Seções**:
- Header com gradiente verde
  - Saudação personalizada
  - Botão de configurações

- Quick Stats (Cards informativos)
  - Produtos cadastrados
  - Promoções ativas
  - Visualizações

- Ações Rápidas (4 cards clicáveis)
  - Novo Produto
  - Atualizar Preços
  - Promoções
  - Validações

- Atualizações Recentes
  - Histórico das últimas ações
  - Status visual (sucesso/pendente)
  - Timestamps

**Navegação**: Central para acesso a todas as outras telas

---

### 2. **Cadastro de Produto** (`AddProductScreen`)
**Arquivo**: `src/app/components/merchant/AddProductScreen.tsx`

**Campos**:
- Upload de imagem do produto
  - Preview da imagem
  - Drag & drop ou clique para enviar

- Informações Básicas
  - Nome do produto *
  - Marca
  - Categoria (select com 8 opções)
  - Descrição

- Seção de Preços (com background azul)
  - Preço Normal *
  - Preço Promocional
  - Data de validade da promoção

**Features**:
- Validação de campos obrigatórios
- Feedback visual de sucesso ao salvar
- Animações suaves

---

### 3. **Atualização de Preços** (`UpdatePricesScreen`)
**Arquivo**: `src/app/components/merchant/UpdatePricesScreen.tsx`

**Funcionalidades**:
- Lista de produtos cadastrados
- Edição rápida de preço por produto
- Indicador de alterações pendentes
  - Contagem de produtos com preço editado
  - Destaque visual em produtos alterados

- Última atualização de cada produto
- Diferença de preço calculada automaticamente
- Botão "Salvar Tudo" para confirmar múltiplas alterações
- Feedback de sucesso com contador

**Features**:
- Estados visuais claros (editado/salvo)
- Cálculo automático de diferença
- Info banner com alterações pendentes

---

### 4. **Gerenciamento de Promoções** (`ManagePromotionsScreen`)
**Arquivo**: `src/app/components/merchant/ManagePromotionsScreen.tsx`

**Seções**:
- Stats cards
  - Promoções ativas
  - Economia total dos clientes

- Filtros
  - Todas
  - Ativas
  - Inativas

- Lista de Promoções
  - Nome do produto
  - Badge com percentual de desconto
  - Preço normal → preço promocional
  - Toggle ativar/desativar
  - Data de validade
  - Botão deletar

- Botão para criar nova promoção

**Features**:
- Toggle on/off para cada promoção
- Exclusão de promoções
- Filtragem por status
- Cálculo automático de economia

---

### 5. **Nova Promoção** (`AddPromotionScreen`)
**Arquivo**: `src/app/components/merchant/AddPromotionScreen.tsx`

**Seções**:
- Seleção de Produto
  - Select com lista de 8 produtos

- Preços e Desconto (background azul)
  - Preço Normal *
  - Percentual de Desconto
  - Preço Promocional (calculado automaticamente)
  - Card de economia do cliente

- Validade (background roxo)
  - Data picker

- Descrição da Promoção
  - Textarea para detalhes

**Features**:
- Cálculo automático do preço promocional baseado em percentual
- Validação de campos obrigatórios
- Seções coloridas para melhor organização
- Feedback de sucesso

---

### 6. **Produtos Pendentes de Validação** (`PendingValidationScreen`)
**Arquivo**: `src/app/components/merchant/PendingValidationScreen.tsx`

**Seções**:
- Stats com 3 cards
  - Pendentes (laranja)
  - Aprovados (verde)
  - Rejeitados (vermelho)

- Filtros
  - Todos
  - Pendentes
  - Aprovados
  - Rejeitados

- Lista de Produtos
  - Nome e categoria
  - Status badge com ícone
  - Data de submissão
  - Mensagem de feedback (aprovação/rejeição/motivo)
  - Botão "Reenviar" para rejeitados

**Status com Cores**:
- Pendente: Laranja com Clock icon
- Aprovado: Verde com CheckCircle icon
- Rejeitado: Vermelho com XCircle icon

**Features**:
- Motivos de rejeição exibidos claramente
- Ação de reenvio para produtos rejeitados
- Filtragem por status

---

### 7. **Perfil do Estabelecimento** (`MerchantProfileScreen`)
**Arquivo**: `src/app/components/merchant/MerchantProfileScreen.tsx`

**Informações Exibidas**:
- Card do perfil
  - Avatar/ícone do estabelecimento
  - Nome do mercado
  - Cidade e estado

- Modo Visualização
  - Endereço completo
  - Horário de funcionamento
  - Telefone
  - E-mail
  - Descrição (se disponível)

- Modo Edição
  - Formulários editáveis para todos os campos
  - Seções coloridas para organizar campos
    - Azul: Informações básicas
    - Verde: Localização
    - Roxo: Horários
    - Laranja: Contato
  - Botões Cancelar/Salvar

- Botão Logout

**Features**:
- Toggle entre modo visualização e edição
- Validação básica de campos
- Feedback de sucesso ao salvar
- Design intuitivo com ícones

---

### 8. **Análise de Desempenho** (`MerchantAnalyticsScreen`)
**Arquivo**: `src/app/components/merchant/MerchantAnalyticsScreen.tsx`

**Seções**:
- 4 Metric Cards
  - Visualizações (azul)
  - Vendas (verde)
  - Clientes únicos (roxo)
  - Crescimento (laranja)
  - Cada um com variação percentual

- Gráfico de Barras
  - Visualizações vs Vendas por dia da semana
  - Usando Recharts

- Insights por Período
  - Manhã (6h-12h): Melhor período
  - Tarde (12h-18h): Crescimento
  - Noite (18h-22h): Período intermediário
  - Cards com estatísticas detalhadas

**Features**:
- Dados visuais com gráficos
- Insights acionáveis
- Cards informativos coloridos

---

## 🧭 Navegação

### Estrutura de Navegação
```
Merchant Mode
├── MerchantDashboard (Home)
│   ├── → AddProduct
│   ├── → UpdatePrices
│   ├── → ManagePromotions
│   │   └── → AddPromotion
│   ├── → PendingValidation
│   ├── → MerchantProfile
│   └── → MerchantAnalytics
```

### MerchantBottomNav
Navegação inferior com 5 ícones principais:
- Dashboard (Home)
- Produtos (Plus)
- Análise (BarChart3)
- Promoções (Tag)
- Perfil (Settings)

---

## 💻 Estrutura de Arquivos

```
src/app/components/merchant/
├── MerchantDashboard.tsx          # Dashboard principal
├── AddProductScreen.tsx            # Cadastro de produtos
├── UpdatePricesScreen.tsx          # Atualização de preços
├── ManagePromotionsScreen.tsx      # Gestão de promoções
├── AddPromotionScreen.tsx          # Nova promoção
├── PendingValidationScreen.tsx     # Validação de produtos
├── MerchantProfileScreen.tsx       # Perfil do estabelecimento
├── MerchantAnalyticsScreen.tsx     # Análise de desempenho
└── MerchantBottomNav.tsx          # Navegação inferior
```

---

## 🎯 Recursos Utilizados

### Bibliotecas
- **Framer Motion**: Animações suaves
- **Lucide React**: Ícones consistentes
- **Recharts**: Gráficos de dados
- **React**: State management com useState

### Padrões de Código
- Componentes funcionais
- Props tipados com TypeScript
- Animações com motion.div
- Mobile-first responsive design
- Consistência com o design system existente

---

## 🚀 Recursos Visuais

### Ícones Utilizados
- Package: Produtos
- Percent: Promoções
- TrendingUp: Análise/Preços
- Plus: Novo
- Settings: Configurações
- Building2: Estabelecimento
- MapPin: Localização
- Clock: Horário/Tempo
- Phone: Telefone
- Mail: E-mail
- Check/X/AlertCircle: Status
- E muitos outros...

### Animações
- Entrada suave com opacity e Y
- Transições de hover
- Estados active com scale
- Indicadores animados
- Transições de cores suaves

---

## 📝 Notas de Design

1. **Consistência Visual**: Todos os headers seguem o padrão de gradiente verde
2. **Feedback Imediato**: Animações visuais confirmar ações do usuário
3. **Acessibilidade**: Cores com bom contraste, textos legíveis
4. **Mobile-First**: Otimizado para telas até 428px
5. **Performance**: Componentes leves, animações otimizadas

---

## 🔄 Modo Merchant

Para acessar o modo merchant no aplicativo:
1. Login normal
2. Clique no ModeToggle
3. Selecione "Merchant"
4. Será redirecionado para MerchantDashboard

---

## 📊 Dados Mock

Todos os componentes utilizam dados mock para demonstração:
- Produtos: 6 items
- Promoções: 5 items
- Validações: 5 items (mix de status)
- Analíticas: Dados de uma semana

---

## 🎨 Exportação para Figma

Estas telas estão prontas para exportação e prototipagem no Figma:
- Design completo e funcional
- Componentes reutilizáveis
- Cores e tipografia definidas
- Interações documentadas
- Responsivo e testado

---

Criado para: **OfferMerc - Aplicativo de Comparação de Preços**
Data: Junho de 2026
Versão: 1.0
