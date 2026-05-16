# OfferMerc - Testes de Navegação

## ✅ Sistema de Navegação com Stack

O app agora usa um **sistema de pilha de navegação** que lembra de onde você veio.

### Como Funciona:
- Quando você navega para uma nova tela → `navigateTo()` adiciona a tela atual no stack
- Quando você clica em "Voltar" → `navigateBack()` retorna para a última tela do stack
- Bottom Nav → Limpa o stack e vai direto para a tela selecionada

---

## 🧪 Casos de Teste

### Teste 1: Navegação Home → Favoritos → Voltar
**Passos:**
1. Esteja na Home
2. Toque no ícone ❤️ no header (Favoritos)
3. Toque em "Voltar"

**Resultado Esperado:** ✅ Volta para Home

---

### Teste 2: Navegação Home → Produto → Histórico → Voltar → Voltar
**Passos:**
1. Esteja na Home
2. Toque em um produto
3. Toque no ícone 📊 (Histórico)
4. Toque em "Voltar"
5. Toque em "Voltar" novamente

**Resultado Esperado:**
- Primeiro "Voltar" ✅ Volta para a tela do Produto
- Segundo "Voltar" ✅ Volta para Home

---

### Teste 3: Navegação Perfil → Editar → Salvar
**Passos:**
1. Vá para o Perfil (Bottom Nav)
2. Toque em "Editar Perfil"
3. Toque em "Salvar Alterações"

**Resultado Esperado:** ✅ Volta para Perfil

---

### Teste 4: Navegação Perfil → Localização → Voltar
**Passos:**
1. Esteja no Perfil
2. Toque em "Localização"
3. Toque em "Voltar"

**Resultado Esperado:** ✅ Volta para Perfil

---

### Teste 5: Navegação Home → Alertas → Voltar
**Passos:**
1. Esteja na Home
2. Toque no ícone 🔔 (Alertas)
3. Toque em "Voltar"

**Resultado Esperado:** ✅ Volta para Home

---

### Teste 6: Navegação Search → Busca por Imagem → Voltar
**Passos:**
1. Vá para Buscar (Bottom Nav)
2. Toque no ícone 📷 (Busca por imagem)
3. Toque em "Voltar"

**Resultado Esperado:** ✅ Volta para Search

---

### Teste 7: Bottom Nav reseta navegação
**Passos:**
1. Navegue: Home → Produto → Histórico
2. Toque em "Perfil" no Bottom Nav
3. Navegue: Perfil → Editar Perfil
4. Toque em "Home" no Bottom Nav

**Resultado Esperado:** 
- ✅ Vai direto para Home (sem stack)
- Se tocar "Voltar" em Home, não volta para Editar Perfil

---

### Teste 8: Favoritos tem botão voltar
**Passos:**
1. Home → Favoritos (ícone ❤️)
2. Verifique se existe botão "Voltar" no header

**Resultado Esperado:** ✅ Botão "← Voltar" visível

---

### Teste 9: Navegação complexa
**Passos:**
1. Home → Produto A
2. Produto A → Favoritar
3. Toque no ❤️ header (vai para Favoritos)
4. Favoritos → Toque em Produto B
5. Produto B → Toque em "Voltar"
6. Toque em "Voltar" novamente

**Resultado Esperado:**
- Primeiro "Voltar" ✅ Volta para Favoritos
- Segundo "Voltar" ✅ Volta para Produto A (tela anterior aos Favoritos)

---

### Teste 10: Perfil → Acessibilidade → Voltar
**Passos:**
1. Perfil → Acessibilidade
2. Voltar

**Resultado Esperado:** ✅ Volta para Perfil

---

## 🐛 Bugs Corrigidos

### ✅ Bug 1: Favoritos sem botão voltar
**Antes:** Tela de Favoritos não tinha como voltar
**Depois:** Botão "← Voltar" adicionado no header

### ✅ Bug 2: Voltar levava para tela errada
**Antes:** Alguns "Voltar" iam sempre para Home ou Perfil
**Depois:** Sistema de stack guarda a tela anterior correta

### ✅ Bug 3: Navegação perdida
**Antes:** Ao usar Bottom Nav e depois voltar, perdia o contexto
**Depois:** Bottom Nav limpa o stack intencionalmente (comportamento correto para tabs)

---

## 📝 Telas que têm botão "Voltar"

✅ Todas as telas "detail" (não são tabs principais):

1. **ImageSearchScreen** → Volta para Search
2. **ProductComparisonEnhanced** → Volta para tela anterior (Home, Search, ou Favoritos)
3. **MarketDetailsScreen** → Volta para Home
4. **EditProfileScreen** → Volta para Perfil
5. **FavoritesScreen** → ✅ ADICIONADO - Volta para tela anterior
6. **PriceAlertsScreen** → Volta para tela anterior
7. **PriceHistoryScreen** → Volta para Produto
8. **LocationSettingsScreen** → Volta para Perfil
9. **AccessibilitySettingsScreen** → Volta para Perfil
10. **SignupScreen** → Volta para Login
11. **ForgotPasswordScreen** → Volta para Login

---

## 📱 Telas SEM botão voltar (correto)

❌ Estas telas NÃO devem ter voltar (são principais ou fluxos únicos):

1. **SplashScreen** - Tela inicial automática
2. **OnboardingScreen** - Primeiro uso (tem "Próximo/Começar")
3. **LoginScreen** - Entrada principal
4. **HomeScreen** - Tab principal
5. **SearchScreen** - Tab principal
6. **ShoppingListScreen** - Tab principal
7. **ProfileScreen** - Tab principal

---

## 🎯 Validações Automáticas

Para garantir que a navegação funcione:

### Regra 1: `navigateTo()` SEMPRE adiciona ao stack
```typescript
navigateTo("product") // Adiciona tela atual ao stack antes de ir
```

### Regra 2: `navigateBack()` usa o stack
```typescript
navigateBack("home") // Volta para stack, ou "home" se stack vazio
```

### Regra 3: Bottom Nav limpa o stack
```typescript
// Bottom Nav sempre faz:
setNavigationStack([]);
setCurrentScreen(screen);
```

---

## 🔄 Fluxos de Navegação Validados

### Fluxo 1: Comparação de Produto
```
Home → Produto → Histórico
      ↑         ↑
      └─Voltar──┘
      ↑
      └─Voltar──┘
```

### Fluxo 2: Favoritos
```
Home → Favoritos → Produto → Histórico
      ↑           ↑         ↑
      └─Voltar────┘         │
                  ↑         │
                  └─Voltar──┘
```

### Fluxo 3: Configurações
```
Perfil → Editar → Salvar/Voltar → Perfil
Perfil → Localização → Voltar → Perfil
Perfil → Acessibilidade → Voltar → Perfil
Perfil → Alertas → Voltar → Perfil
```

### Fluxo 4: Busca
```
Search → Busca por Imagem → Voltar → Search
Search → Produto → Voltar → Search
```

---

## 🎨 Experiência do Usuário

### ✅ Comportamento Natural:
- Usuário sempre volta de onde veio
- Bottom Nav funciona como "tabs" (reseta contexto)
- Stack invisível mas intuitivo

### ✅ Sem Loops:
- Impossível ficar preso em loop de navegação
- Sempre há uma rota de saída

### ✅ Performance:
- Stack leve (apenas strings)
- Não usa localStorage (temporário por sessão)

---

## 📊 Métricas de Sucesso

- ✅ **100% das telas detail têm botão voltar**
- ✅ **Voltar sempre retorna à tela correta**
- ✅ **Bottom Nav reseta navegação (comportamento esperado)**
- ✅ **Nenhum loop infinito possível**
- ✅ **Navegação profunda suportada (stack ilimitado)**

---

**Status:** ✅ Todos os bugs de navegação corrigidos
**Última atualização:** 2026-05-06
