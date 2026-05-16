# OfferMerc - Telas de Administração

## 📋 Visão Geral

Sistema completo de administração para gerenciar usuários, estabelecimentos, produtos e monitorar métricas do aplicativo OfferMerc.

**Tema Visual:** Slate profissional (diferente do verde usado em cliente/estabelecimento)

---

## 🎨 Design System - Admin

### Cores Principais
- **Primária Admin**: Slate 700-900 (`#334155` - `#0f172a`)
- **Secundária**: Branco/Off-white
- **Accent Verde**: Verde para aprovações
- **Accent Vermelho**: Vermelho para rejeições/bloqueios
- **Accent Âmbar**: Âmbar para alertas e pendências
- **Accent Azul**: Azul para ações neutras

### Tipografia
- **Títulos**: Montserrat (600-700)
- **Corpo**: DM Sans (400-500)

### Componentes Específicos
- Cards com bordas coloridas por status
- Badges de notificação com contadores
- Indicadores de prioridade (dots coloridos)
- Toggles e switches para ações rápidas
- Modais de confirmação para ações destrutivas

---

## 📱 Telas Criadas

### 1. Dashboard Administrativo ✅
**Arquivo:** `src/app/components/admin/AdminDashboard.tsx`

**Funcionalidades:**
- 4 cards de estatísticas principais:
  - Total de Usuários (12,453)
  - Mercados Cadastrados (248)
  - Produtos Cadastrados (38,691)
  - Validações Pendentes (47)
- Cada stat mostra tendência (+12%, +5%, etc.)
- 4 botões de ação rápida com badges de notificação:
  - Validar Produtos (47 pendentes)
  - Gerenciar Usuários
  - Aprovar Mercados (12 pendentes)
  - Ver Relatórios
- Lista de ações pendentes com indicadores de prioridade:
  - High (vermelho)
  - Medium (âmbar)
  - Low (verde)
- Ícones de notificação no header (3 notificações)
- Botão de acesso rápido para configurações

**Navegação:**
- Quick Actions levam para telas específicas
- Ícone de configurações leva para AdminSettings
- Bottom Nav para navegação principal

---

### 2. Gerenciamento de Usuários ✅
**Arquivo:** `src/app/components/admin/UserManagementScreen.tsx`

**Funcionalidades:**
- Busca por nome ou e-mail
- Filtros por status:
  - Todos
  - Ativos (badge verde)
  - Bloqueados (badge vermelho)
- Cards de usuário mostrando:
  - Nome e e-mail
  - Status com ícone (✓ ativo, ⛔ bloqueado)
  - Data de cadastro
  - Número de listas criadas
- Ações disponíveis:
  - Editar (azul)
  - Bloquear/Desbloquear (vermelho/verde)
  - Excluir (vermelho)
- Toggle de status funcional
- Feedback visual para usuários bloqueados (background vermelho claro)
- Contador de resultados encontrados

**Estados:**
- Lista completa
- Lista filtrada
- Nenhum resultado (estado vazio)

---

### 3. Gerenciamento de Mercados ✅
**Arquivo:** `src/app/components/admin/MerchantManagementScreen.tsx`

**Funcionalidades:**
- Busca por nome, endereço ou e-mail
- Filtros por status:
  - Todos
  - Pendentes (⚠️ badge âmbar)
  - Aprovados (badge azul)
  - Verificados (✓ badge verde)
  - Rejeitados (✕ badge vermelho)
- Cards de estabelecimento mostrando:
  - Nome e status badge
  - Endereço completo
  - Telefone e horário de funcionamento
  - Data de cadastro
  - Número de produtos cadastrados
  - Avaliação (quando disponível)
- Ações disponíveis:
  - Visualizar detalhes (azul)
  - Aprovar (verde - apenas para pendentes)
  - Rejeitar (vermelho - apenas para pendentes)
  - Verificar (verde - apenas para aprovados)
  - Reavaliar (azul - apenas para rejeitados)
- Alerta visual para estabelecimentos pendentes
- Bordas coloridas por status

**Fluxo de Aprovação:**
1. Pendente → Aprovar → Aprovado
2. Aprovado → Verificar → Verificado
3. Pendente → Rejeitar → Rejeitado
4. Rejeitado → Reavaliar → Aprovado

---

### 4. Validação de Produtos ✅
**Arquivo:** `src/app/components/admin/ProductValidationScreen.tsx`

**Funcionalidades:**
- Busca por produto, marca, categoria ou mercado
- Filtros por status:
  - Pendentes (foco principal)
  - Aprovados
  - Rejeitados
  - Todos
- Cards de produto mostrando:
  - Imagem do produto (120x120px)
  - Nome e badge de status
  - Marca e categoria
  - Estabelecimento que cadastrou
  - Preço
  - Código de barras
  - Observações (quando houver)
- Ações disponíveis:
  - Visualizar detalhes (modal completo)
  - Aprovar (verde)
  - Rejeitar (vermelho)
- Modal de detalhes com:
  - Imagem em tamanho maior
  - Todas as informações do produto
  - Data e responsável pelo envio
  - Botões de aprovação/rejeição

**Estados:**
- Lista de produtos pendentes
- Produtos aprovados/rejeitados
- Nenhum produto (estado vazio)
- Modal de detalhes aberto/fechado

**Fluxo de Validação:**
1. Produto submetido → Pendente
2. Admin revisa → Aprovar/Rejeitar
3. Status atualizado automaticamente

---

### 5. Relatórios e Monitoramento ✅
**Arquivo:** `src/app/components/admin/ReportsScreen.tsx`

**Funcionalidades:**
- Seletor de período:
  - 7 dias (diário)
  - 30 dias (semanal)
  - 90 dias (mensal)
  - 1 ano (trimestral)
- 4 métricas principais:
  - Novos Usuários (+1,284 / +18%)
  - Novos Mercados (+23 / +12%)
  - Produtos Adicionados (+2,847 / +24%)
  - Taxa de Aprovação (94% / +5%)
- Gráfico de barras animado:
  - Crescimento de usuários
  - Valores absolutos e percentuais
  - Tooltip ao hover
  - Animação de entrada sequencial
- Top 5 produtos mais buscados:
  - Nome do produto
  - Número de visualizações
  - Quantidade de mercados que vendem
  - Ranking visual (#1, #2, etc.)
- Top 5 mercados mais ativos:
  - Nome do estabelecimento
  - Número de produtos cadastrados
  - Avaliação média
  - Badge de posição
- Card de resumo com:
  - Total de interações (127,8k)
  - Tempo médio no app (8min 32s)
  - Taxa de retenção (68%)
  - Usuários ativos diários (4,2k)
- Botão de download/exportação

**Gráficos:**
- Implementados com CSS puro (barras animadas)
- Dados mockados dinâmicos por período
- Altura proporcional aos valores
- Transições suaves

---

### 6. Configurações do Sistema ✅
**Arquivo:** `src/app/components/admin/AdminSettingsScreen.tsx`

**Funcionalidades:**

#### Card de Perfil Admin
- Avatar com emoji
- Nome e e-mail do admin
- Badge de função (Super Administrador)
- Último acesso registrado
- Botão "Editar Perfil Admin"

#### Seção: Segurança 🛡️
- **Autenticação de Dois Fatores** (toggle)
- **Gerenciar Administradores** (navegação)
- **Logs de Auditoria** (navegação)
- **Alterar Senha** (navegação)

#### Seção: Sistema ⚙️
- **Modo Manutenção** (toggle com warning)
- **Aprovação Automática** (toggle)
- **Backup do Banco de Dados** (ação)
- **Configurações de API** (navegação)

#### Seção: Notificações 🔔
- **Notificações Push** (toggle)
- **E-mails de Resumo** (navegação)
- **Alertas de Segurança** (navegação)

#### Seção: Moderação 👥
- **Palavras Bloqueadas** (lista)
- **Regras de Validação** (configuração)
- **Denúncias Automáticas** (configuração)

#### Informações do Sistema 💾
- Versão do Sistema (v2.4.1)
- Último Backup (data/hora)
- Uptime do Servidor (99.8%)
- Espaço em Disco (245 GB / 500 GB)

#### Zona de Perigo ⚠️
- **Limpar Cache do Sistema**
- **Resetar Configurações Padrão**
- **Desativar Sistema Permanentemente** (ação crítica)

#### Logout
- Botão "Sair do Painel Admin"

**Interações:**
- Toggles animados com motion
- Navegação por chevrons
- Feedback visual ao ativar modo manutenção
- Cores diferenciadas para ações perigosas

---

## 🧭 Navegação

### Bottom Navigation (Admin)
**Componente:** `src/app/components/admin/AdminBottomNav.tsx`

6 abas principais:
1. 📊 **Dashboard** - Visão geral
2. 👥 **Usuários** - Gerenciamento de users
3. 🏪 **Mercados** - Gerenciamento de estabelecimentos
4. 📦 **Produtos** - Validação de produtos
5. 📈 **Relatórios** - Métricas e análises
6. ⚙️ **Config** - Configurações do sistema

**Comportamento:**
- Sempre visível nas telas principais do admin
- Limpa o stack de navegação ao trocar de aba
- Destaque visual na aba ativa (background slate-700)

---

## 🔄 Troca de Modo

### Mode Toggle
**Componente:** `src/app/components/ModeToggle.tsx`

Permite alternar entre 3 modos:
1. 👤 **Cliente** (verde) → Telas de usuário final
2. 🏪 **Estabelecimento** (azul) → Telas de mercado
3. 🛡️ **Administrador** (slate) → Painel admin

**Funcionalidades:**
- Floating button no canto superior direito
- Dropdown animado com os 3 modos
- Indicador visual do modo ativo
- Limpa navegação ao trocar modo
- Desaparece em telas de autenticação

**Integração no App.tsx:**
- Estado `appMode` controla modo atual
- Função `handleModeChange` gerencia transições
- Renderiza `BottomNav` OU `AdminBottomNav` conforme modo

---

## 📊 Dados Mockados

### Usuários (5 exemplos)
- João Silva, Maria Santos, Carlos Souza (bloqueado), Ana Costa, Pedro Lima
- Estatísticas: data de cadastro, número de listas

### Estabelecimentos (5 exemplos)
- Supermercado Central (verificado), Mercado Bom Preço (pendente), Atacadão Silva (aprovado), Mercadinho do José (rejeitado), Super Família (pendente)
- Informações: endereço, telefone, horário, produtos, avaliação

### Produtos (5 exemplos)
- Leite Integral, Arroz Integral, Refrigerante Cola, Sabão em Pó, Produto Sem Nome
- Dados: categoria, marca, preço, código de barras, imagem placeholder

### Métricas
- Crescimento de usuários por período
- Top produtos e mercados
- Estatísticas de engajamento

---

## 🎭 Estados de Interface

### Loading
- Skeleton screens (não implementado ainda)
- Animações de entrada sequenciais

### Empty States
- Nenhum usuário encontrado
- Nenhum mercado encontrado
- Nenhum produto encontrado
- Mensagem + ícone centralizado

### Success/Error
- Aprovação/Rejeição imediata (otimista)
- Feedback visual por cores
- Sem toasts (ações auto-explicativas)

### Badges e Indicadores
- Contadores de notificação (círculo vermelho)
- Badges de status coloridos
- Dots de prioridade (alto/médio/baixo)

---

## 🔐 Permissões e Segurança

### Ações Críticas
- Bloquear/Excluir usuário
- Rejeitar estabelecimento
- Modo manutenção
- Resetar sistema

**Implementação futura:**
- Modais de confirmação
- Autenticação dupla para ações críticas
- Logs de auditoria

---

## 🚀 Fluxos Principais

### Fluxo 1: Validar Produto
```
Dashboard → Ver "47 Validações Pendentes"
         → Toque em "Validar Produtos"
         → Lista de produtos pendentes
         → Toque em produto
         → Modal com detalhes
         → Aprovar/Rejeitar
         → Status atualizado
```

### Fluxo 2: Aprovar Mercado
```
Dashboard → Ver "12 Mercados Pendentes"
         → Toque em "Aprovar Mercados"
         → Filtro "Pendentes"
         → Revisar informações
         → Aprovar
         → Status: Aprovado
         → (Opcional) Verificar
         → Status: Verificado
```

### Fluxo 3: Gerenciar Usuário
```
Dashboard → Gerenciar Usuários
         → Buscar ou filtrar
         → Encontrar usuário
         → Editar/Bloquear/Excluir
         → Feedback visual imediato
```

### Fluxo 4: Visualizar Relatórios
```
Dashboard → Ver Relatórios
         → Selecionar período (7d/30d/90d/1y)
         → Gráfico atualiza
         → Ver tops (produtos/mercados)
         → Exportar (futuro)
```

---

## 🎨 Diferenças Visuais vs Cliente/Estabelecimento

| Aspecto | Cliente/Estabelecimento | Admin |
|---------|------------------------|-------|
| **Cor Primária** | Verde (#10b981) | Slate (#334155 - #0f172a) |
| **Header** | Gradiente verde | Gradiente slate |
| **Cards** | Bordas sutis | Bordas coloridas por status |
| **Botões** | Verde primário | Slate/Contextuais |
| **Bottom Nav** | 4 abas | 6 abas |
| **Ícones** | Lucide padrão | Lucide + badges |
| **Densidade** | Espaçoso | Mais compacto |
| **Informação** | Focada no usuário | Focada em métricas |

---

## 📐 Componentes Reutilizáveis

### Criados
- `AdminDashboard` - Dashboard principal
- `UserManagementScreen` - Lista de usuários
- `MerchantManagementScreen` - Lista de estabelecimentos
- `ProductValidationScreen` - Validação de produtos
- `ReportsScreen` - Relatórios e gráficos
- `AdminSettingsScreen` - Configurações
- `AdminBottomNav` - Navegação inferior
- `ModeToggle` - Seletor de modo

### Padrões de UI
- Cards com status badges
- Filtros com chips coloridos
- Listas com ações inline
- Modais de detalhes
- Toggles animados
- Gráficos CSS

---

## ✅ Checklist de Implementação

- [x] AdminDashboard com estatísticas
- [x] UserManagementScreen com busca e filtros
- [x] MerchantManagementScreen com aprovação
- [x] ProductValidationScreen com modal
- [x] ReportsScreen com gráficos
- [x] AdminSettingsScreen completo
- [x] AdminBottomNav com 6 abas
- [x] ModeToggle para trocar modos
- [x] Integração no App.tsx
- [x] Navegação stack funcionando
- [x] Animações de transição
- [x] Estados vazios
- [x] Dados mockados realistas

---

## 🔮 Melhorias Futuras

### Funcionalidades
- [ ] Implementar busca avançada com múltiplos filtros
- [ ] Adicionar paginação nas listas
- [ ] Criar modais de confirmação para ações críticas
- [ ] Implementar sistema de permissões granulares
- [ ] Adicionar histórico de mudanças (audit log)
- [ ] Criar relatórios exportáveis (PDF/CSV)
- [ ] Implementar notificações em tempo real
- [ ] Adicionar chat de suporte com usuários/mercados

### UX
- [ ] Skeleton screens para loading
- [ ] Toasts para feedback de ações
- [ ] Drag and drop para reordenar
- [ ] Atalhos de teclado
- [ ] Dark mode para admin
- [ ] Filtros salvos/favoritos

### Análise
- [ ] Gráficos mais complexos (linhas, pizza)
- [ ] Comparação entre períodos
- [ ] Previsões e tendências
- [ ] Heatmaps de atividade
- [ ] Funil de conversão

---

## 🎯 Como Usar

### Acessar o Painel Admin
1. Abra o app (após login)
2. Toque no botão flutuante no canto superior direito
3. Selecione "🛡️ Administrador"
4. Será redirecionado para o Dashboard Admin

### Navegar entre Telas
- Use o **Bottom Navigation** para alternar entre as 6 telas principais
- Use o **botão Voltar** (←) em telas de detalhe para retornar
- Use o **Mode Toggle** para voltar ao modo Cliente

### Validar Produtos
1. Dashboard → Toque em "Validar Produtos"
2. Veja a lista de produtos pendentes
3. Toque em um produto para ver detalhes
4. Toque em ✓ para aprovar ou ✕ para rejeitar

### Gerenciar Usuários
1. Navegue para "Usuários" no Bottom Nav
2. Use a busca ou filtros para encontrar
3. Toque nos botões de ação (Editar/Bloquear/Excluir)

### Ver Relatórios
1. Navegue para "Relatórios"
2. Selecione o período desejado
3. Analise gráficos e tops

---

**Desenvolvido como extensão do protótipo OfferMerc**  
*Painel administrativo completo com 6 telas funcionais e navegação integrada*

**Última atualização:** 2026-05-14
