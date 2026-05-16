# OfferMerc - Guia do Protótipo UI/UX

## 📱 Visão Geral

Protótipo completo de interface do aplicativo **OfferMerc**, um comparador de preços de supermercados para Android e iOS.

Este é um **protótipo visual (UI/UX)** criado para demonstração e validação de design, sem lógica de backend real.

---

## 🎨 Design System

### Cores
- **Primária**: Verde (#10b981) - Economia e sustentabilidade
- **Primária Dark**: Verde escuro (#059669)
- **Secundária**: Verde claro (#f0fdf4)
- **Accent**: Verde pastel (#dcfce7)
- **Background**: Off-white (#FAFBF9)
- **Destructive**: Vermelho (#ef4444)

### Tipografia
- **Display/Títulos**: Montserrat (600-700)
- **Corpo/Interface**: DM Sans (400-600)
- **Tamanho base**: 16px

### Estilo Visual
- **Layout**: Mobile-first, responsivo
- **Bordas**: Arredondadas (16-32px)
- **Sombras**: Suaves com blur
- **Animações**: Transições fluidas com Motion
- **Ícones**: Lucide React

---

## 🗺️ Fluxo de Navegação

### 1. **Autenticação**
- ✅ Splash Screen
- ✅ Login (com validação visual de erros)
- ✅ Cadastro (2 etapas com indicador de força de senha)
- ✅ Recuperação de senha (com confirmação de envio)

### 2. **Onboarding**
- ✅ 3 slides explicativos
- ✅ Indicadores de progresso
- ✅ Animações de entrada

### 3. **Navegação Principal** (Bottom Nav)
- **Home**: Tela inicial com ofertas
- **Buscar**: Pesquisa de produtos
- **Lista**: Listas de compras
- **Perfil**: Configurações e dados do usuário

---

## 📋 Telas e Funcionalidades

### 🏠 Home
**Funcionalidades:**
- Busca rápida de produtos
- Categorias visuais (Hortifruti, Bebidas, Limpeza, Açougue)
- Ofertas em destaque
- Mercados próximos
- Acesso rápido a Favoritos e Alertas (badges de notificação)

**Estados:**
- Carregamento (skeleton)
- Populated (com dados)

---

### 🔍 Busca

#### Busca por Texto
**Funcionalidades:**
- Campo de pesquisa com autocomplete simulado
- Filtros (menor preço, mais próximo, maior desconto)
- Resultados com preço e mercado
- Botão de limpar busca

**Estados:**
- Inicial (sem resultados)
- Resultados encontrados
- Nenhum resultado

#### 📸 Busca por Imagem
**Funcionalidades:**
- Tirar foto
- Enviar da galeria
- Análise de imagem (loading animado)
- Resultado identificado
- Produto não encontrado

**Estados:**
- Inicial (sem imagem)
- Analisando (3 steps animados)
- Produto identificado
- Não encontrado

---

### 🛒 Produto - Comparação de Preços

**Funcionalidades:**
- Visualização de preços em múltiplos mercados
- Destaque para menor preço
- Diferença de preço calculada
- Distância e avaliação de cada mercado
- Última atualização de preços

**Ações disponíveis:**
- ❤️ Favoritar produto
- 🔔 Criar alerta de preço (modal)
- 📊 Ver histórico de preços
- 💰 Informar preço (contribuir)

**Modals:**
- **Alerta de Preço**: Define preço-alvo com sugestões
- **Informar Preço**: Formulário de contribuição

---

### 📊 Histórico de Preços

**Funcionalidades:**
- Gráfico de barras simulado (últimos 30 dias)
- Estatísticas (menor, média, maior)
- Timeline detalhada com indicadores visuais
- Tendência de preço (subida/descida)

**Visualizações:**
- Gráfico visual
- Cards com data, mercado e preço
- Ícones de tendência (↑ ↓ →)

---

### 📝 Lista de Compras

**Funcionalidades:**
- Adicionar produtos
- Marcar como comprado (checkbox)
- Remover itens
- Total estimado
- Sugestão de melhor mercado
- Input flutuante para novos itens

**Estados:**
- Lista vazia
- Lista com itens
- Feedback de adição/remoção

---

### ❤️ Favoritos

**Funcionalidades:**
- Lista de produtos favoritos
- Acesso rápido à comparação
- Remover dos favoritos
- Preço atual e mercado

**Estados:**
- Vazio (estado inicial)
- Populated (com produtos)

---

### 🔔 Alertas de Preço

**Funcionalidades:**
- Lista de alertas ativos/pausados
- Toggle ativo/inativo
- Remover alerta
- Exemplo de notificação
- Informação sobre funcionamento

**Estados:**
- Sem alertas
- Alertas ativos
- Alerta disparado (notificação exemplo)

---

### 🏪 Detalhes do Mercado

**Funcionalidades:**
- Informações completas (endereço, telefone, horário)
- Avaliação e distância
- Produtos mais baratos
- Cards informativos

---

### 👤 Perfil e Configurações

#### Perfil Principal
**Funcionalidades:**
- Dados do usuário
- Estatísticas (produtos comparados, economia, listas)
- Menu de configurações

**Opções:**
- Editar perfil
- Favoritos
- Alertas de preço
- Localização
- Acessibilidade
- Configurações gerais

#### Editar Perfil
**Funcionalidades:**
- Upload de foto (simulado)
- Nome, e-mail, telefone
- Localização
- Feedback de salvamento

#### 📍 Localização
**Funcionalidades:**
- Toggle GPS automático
- Slider de raio de busca (1-20km)
- Input de CEP manual
- Visualização atual

**Estados:**
- GPS ativo
- CEP manual

#### ♿ Acessibilidade
**Funcionalidades:**
- Tamanho de fonte (4 opções)
- Preview de texto
- Alto contraste (toggle)
- Reduzir movimento

---

## 🎭 Estados de Interface (UX)

### Loading States
- **Skeleton Screen**: Cards pulsantes
- **Loading Spinner**: Com mensagem
- **Processing**: Multi-step animado

### Error States
- **Sem conexão**: Ícone WiFi, retry
- **Não encontrado**: Mensagem específica
- **Erro genérico**: Mensagem padrão

### Empty States
- **Lista vazia**: Ícone + mensagem + ação
- **Favoritos vazios**: Orientação para adicionar
- **Alertas vazios**: Explicação de uso

### Feedback Actions
- **Toast notifications**: Sucesso, erro, info
- **Action feedback**: Overlay temporário
- **Modals**: Confirmação, input

---

## 🔐 Modais e Overlays

### Modais Criados

1. **Alerta de Preço**
   - Input de preço-alvo
   - Sugestões automáticas
   - Validação (menor que atual)

2. **Contribuir Preço**
   - Input de valor
   - Seleção de mercado
   - Data automática
   - Confirmação de envio

3. **Excluir Conta**
   - Aviso de consequências
   - Lista de dados que serão perdidos
   - Confirmação dupla

4. **Permissão de Localização**
   - Explicação de benefícios
   - Opção de permitir/negar
   - Alternativa (CEP manual)

---

## 🎬 Animações e Transições

### Micro-interações
- Botões: Scale on tap (0.98)
- Toggles: Slide animation
- Cards: Fade + slide in
- Modais: Scale + fade

### Transições de Tela
- Left/Right: Horizontal slide
- Up/Down: Vertical slide
- Fade: Opacity transition
- Duration: 300ms (padrão)

### Animações Especiais
- Splash: Logo rotation + scale
- Loading: Continuous rotation
- Processing: Staggered reveals
- Success: Spring bounce

---

## 📱 Responsividade

### Breakpoints
- **Mobile**: 375px - 428px (padrão)
- **Max width**: 448px (md container)
- **Safe areas**: Suporte iOS/Android

### Adaptações
- Bottom nav com safe area
- Scrollable content
- Touch targets ≥ 44x44px
- Swipe gestures simulados

---

## 🔄 Fluxos Completos Simulados

### Fluxo 1: Primeiro Uso
1. Splash → Login → Cadastro (2 steps)
2. Onboarding (3 slides)
3. Home (permissão de localização)
4. Tutorial de funcionalidades

### Fluxo 2: Comparar Produto
1. Home → Busca → Produto
2. Ver comparação de preços
3. Favoritar
4. Criar alerta
5. Ver histórico

### Fluxo 3: Criar Lista de Compras
1. Bottom Nav → Lista
2. Adicionar produtos
3. Ver total estimado
4. Sugestão de mercado

### Fluxo 4: Contribuir com a Comunidade
1. Produto → Informar preço
2. Preencher formulário
3. Confirmação visual

---

## 🎯 Componentes Reutilizáveis

### Criados
- `BottomNav`: Navegação inferior
- `Toast`: Notificações temporárias
- `ActionFeedback`: Feedback visual
- `SkeletonCard`: Loading state
- `EmptyState`: Estados vazios
- `ErrorState`: Estados de erro
- `Modal`: Base para overlays

### Padrões
- Cards arredondados
- Inputs com ícones
- Botões primários/secundários
- Badges de notificação
- Avatares circulares

---

## 🚀 Como Navegar no Protótipo

### Início
O app inicia no **Splash Screen** e segue automaticamente para **Login**.

### Atalhos Principais
- **Home** → Toque em produto para ver comparação
- **Busca** → Ícone câmera para busca por imagem
- **Produto** → Ícones superiores para ações (favoritar, alerta, histórico, informar)
- **Perfil** → Menu para acessar todas configurações

### Navegação Circular
- Todas as telas "detail" têm botão voltar
- Bottom nav mantém contexto
- Modais fecham com X ou overlay

---

## 📊 Métricas de UX Simuladas

### Performance Visual
- Tempo de splash: 1.5s
- Transições: 300-500ms
- Animações: 60fps (smooth)

### Feedback Imediato
- Tap: < 100ms
- Toast: 2s auto-dismiss
- Loading: Skeleton instantâneo

---

## 🎨 Detalhes de Polimento

### Consistência
- Mesma paleta em todo o app
- Hierarquia visual clara
- Espaçamento uniforme (4px grid)

### Acessibilidade
- Contraste WCAG AA
- Touch targets adequados
- Estados de foco visíveis
- Opções de customização

### Delight
- Micro-animações surpreendentes
- Feedback tátil simulado
- Easter eggs visuais
- Personalidade na copy

---

## 🎓 Uso do Protótipo

### Para Designers
- Exportar componentes para Figma
- Reutilizar design system
- Testar fluxos de usuário

### Para Desenvolvedores
- Referência de estados
- Especificação de animações
- Guia de componentes

### Para Stakeholders
- Validação de funcionalidades
- Demonstração de UX
- Feedback de usabilidade

---

## ✨ Diferenciais do Protótipo

1. **Completude**: Todos os estados representados
2. **Interatividade**: Transições e animações reais
3. **Realismo**: Dados mockados convincentes
4. **Consistência**: Design system coeso
5. **Acessibilidade**: Opções inclusivas
6. **Polimento**: Atenção aos detalhes

---

## 🔮 Funcionalidades Simuladas (Não Implementadas)

- Login real (apenas validação visual)
- API de produtos (dados mockados)
- Geolocalização real (coordenadas fixas)
- Notificações push (exemplo visual)
- Pagamentos (não implementado)
- Compartilhamento social (botões apenas)

---

**Desenvolvido como protótipo UI/UX para OfferMerc**
*Todas as funcionalidades são simulações visuais para fins de demonstração de design.*
