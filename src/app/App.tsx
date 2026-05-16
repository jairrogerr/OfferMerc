import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { LoginScreen } from "./components/LoginScreen";
import { SignupScreen } from "./components/SignupScreen";
import { ForgotPasswordScreen } from "./components/ForgotPasswordScreen";
import { HomeScreen } from "./components/HomeScreen";
import { SearchScreen } from "./components/SearchScreen";
import { ImageSearchScreen } from "./components/ImageSearchScreen";
import { ProductComparisonEnhanced } from "./components/ProductComparisonEnhanced";
import { ShoppingListScreen } from "./components/ShoppingListScreen";
import { MarketDetailsScreen } from "./components/MarketDetailsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { EditProfileScreen } from "./components/EditProfileScreen";
import { FavoritesScreen } from "./components/FavoritesScreen";
import { PriceAlertsScreen } from "./components/PriceAlertsScreen";
import { PriceHistoryScreen } from "./components/PriceHistoryScreen";
import { LocationSettingsScreen } from "./components/LocationSettingsScreen";
import { AccessibilitySettingsScreen } from "./components/AccessibilitySettingsScreen";
import { BottomNav } from "./components/BottomNav";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { UserManagementScreen } from "./components/admin/UserManagementScreen";
import { MerchantManagementScreen } from "./components/admin/MerchantManagementScreen";
import { ProductValidationScreen } from "./components/admin/ProductValidationScreen";
import { ReportsScreen } from "./components/admin/ReportsScreen";
import { AdminSettingsScreen } from "./components/admin/AdminSettingsScreen";
import { AdminBottomNav } from "./components/admin/AdminBottomNav";
import { ModeToggle } from "./components/ModeToggle";
import { MerchantDashboard } from "./components/merchant/MerchantDashboard";
import { AddProductScreen } from "./components/merchant/AddProductScreen";
import { UpdatePricesScreen } from "./components/merchant/UpdatePricesScreen";
import { ManagePromotionsScreen } from "./components/merchant/ManagePromotionsScreen";
import { AddPromotionScreen } from "./components/merchant/AddPromotionScreen";
import { PendingValidationScreen } from "./components/merchant/PendingValidationScreen";
import { MerchantProfileScreen } from "./components/merchant/MerchantProfileScreen";
import { MerchantAnalyticsScreen } from "./components/merchant/MerchantAnalyticsScreen";
import { MerchantBottomNav } from "./components/merchant/MerchantBottomNav";

type Screen = "splash" | "onboarding" | "login" | "signup" | "forgot" | "home" | "search" | "imageSearch" | "list" | "profile" | "editProfile" | "product" | "market" | "favorites" | "alerts" | "history" | "location" | "accessibility" | "adminDashboard" | "userManagement" | "merchantManagement" | "productValidation" | "reports" | "adminSettings" | "merchantDashboard" | "addProduct" | "updatePrices" | "managePromotions" | "addPromotion" | "pendingValidation" | "merchantProfile" | "merchantAnalytics";

type AppMode = "customer" | "merchant" | "admin";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [navigationStack, setNavigationStack] = useState<Screen[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedMarket, setSelectedMarket] = useState<any>(null);
  const [appMode, setAppMode] = useState<AppMode>("customer");

  const navigateTo = (screen: Screen) => {
    setNavigationStack([...navigationStack, currentScreen]);
    setCurrentScreen(screen);
  };

  const navigateBack = (defaultScreen: Screen = "home") => {
    if (navigationStack.length > 0) {
      const previousScreen = navigationStack[navigationStack.length - 1];
      setNavigationStack(navigationStack.slice(0, -1));
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen(defaultScreen);
    }
  };

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    navigateTo("product");
  };

  const handleMarketSelect = (market: any) => {
    setSelectedMarket(market);
    navigateTo("market");
  };

  const showBottomNav = ["home", "search", "list", "profile"].includes(currentScreen);
  const showAdminBottomNav = ["adminDashboard", "userManagement", "merchantManagement", "productValidation", "reports", "adminSettings"].includes(currentScreen);
  const showMerchantBottomNav = ["merchantDashboard", "updatePrices", "merchantAnalytics", "managePromotions", "merchantProfile"].includes(currentScreen);

  const handleModeChange = (mode: AppMode) => {
    setAppMode(mode);
    if (mode === "admin") {
      setNavigationStack([]);
      setCurrentScreen("adminDashboard");
    } else if (mode === "merchant") {
      setNavigationStack([]);
      setCurrentScreen("merchantDashboard");
    } else if (mode === "customer") {
      setNavigationStack([]);
      setCurrentScreen("home");
    }
  };

  return (
    <div className="size-full max-w-md mx-auto bg-background relative">
      <AnimatePresence mode="wait">
        {currentScreen === "splash" && (
          <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SplashScreen onComplete={() => setCurrentScreen("login")} />
          </motion.div>
        )}

        {currentScreen === "login" && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoginScreen
              onLogin={() => setCurrentScreen("home")}
              onSignup={() => setCurrentScreen("signup")}
              onForgotPassword={() => setCurrentScreen("forgot")}
            />
          </motion.div>
        )}

        {currentScreen === "signup" && (
          <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <SignupScreen
              onBack={() => setCurrentScreen("login")}
              onSignup={() => setCurrentScreen("onboarding")}
            />
          </motion.div>
        )}

        {currentScreen === "forgot" && (
          <motion.div key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <ForgotPasswordScreen onBack={() => setCurrentScreen("login")} />
          </motion.div>
        )}

        {currentScreen === "onboarding" && (
          <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <OnboardingScreen onComplete={() => setCurrentScreen("home")} />
          </motion.div>
        )}

        {currentScreen === "home" && (
          <motion.div key="home" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <HomeScreen
              onNavigate={(screen) => navigateTo(screen as Screen)}
              onProductSelect={handleProductSelect}
              onMarketSelect={handleMarketSelect}
            />
          </motion.div>
        )}

        {currentScreen === "search" && (
          <motion.div key="search" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <SearchScreen
              onProductSelect={handleProductSelect}
              onNavigate={(screen) => navigateTo(screen as Screen)}
            />
          </motion.div>
        )}

        {currentScreen === "imageSearch" && (
          <motion.div key="imageSearch" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <ImageSearchScreen
              onBack={() => navigateBack("search")}
              onProductSelect={handleProductSelect}
            />
          </motion.div>
        )}

        {currentScreen === "list" && (
          <motion.div key="list" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <ShoppingListScreen />
          </motion.div>
        )}

        {currentScreen === "profile" && (
          <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <ProfileScreen onNavigate={(screen) => navigateTo(screen as Screen)} />
          </motion.div>
        )}

        {currentScreen === "editProfile" && (
          <motion.div key="editProfile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <EditProfileScreen
              onBack={() => navigateBack("profile")}
              onSave={() => navigateBack("profile")}
            />
          </motion.div>
        )}

        {currentScreen === "favorites" && (
          <motion.div key="favorites" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <FavoritesScreen
              onProductSelect={handleProductSelect}
              onBack={() => navigateBack("home")}
            />
          </motion.div>
        )}

        {currentScreen === "alerts" && (
          <motion.div key="alerts" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <PriceAlertsScreen onBack={() => navigateBack("profile")} />
          </motion.div>
        )}

        {currentScreen === "history" && (
          <motion.div key="history" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <PriceHistoryScreen
              product={selectedProduct}
              onBack={() => navigateBack("product")}
            />
          </motion.div>
        )}

        {currentScreen === "location" && (
          <motion.div key="location" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <LocationSettingsScreen onBack={() => navigateBack("profile")} />
          </motion.div>
        )}

        {currentScreen === "accessibility" && (
          <motion.div key="accessibility" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <AccessibilitySettingsScreen onBack={() => navigateBack("profile")} />
          </motion.div>
        )}

        {currentScreen === "product" && (
          <motion.div key="product" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            <ProductComparisonEnhanced
              product={selectedProduct}
              onBack={() => navigateBack("home")}
              onViewHistory={() => navigateTo("history")}
            />
          </motion.div>
        )}

        {currentScreen === "market" && (
          <motion.div key="market" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            <MarketDetailsScreen
              market={selectedMarket}
              onBack={() => navigateBack("home")}
            />
          </motion.div>
        )}

        {currentScreen === "adminDashboard" && (
          <motion.div key="adminDashboard" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <AdminDashboard onNavigate={(screen) => navigateTo(screen as Screen)} />
          </motion.div>
        )}

        {currentScreen === "userManagement" && (
          <motion.div key="userManagement" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <UserManagementScreen onBack={() => navigateBack("adminDashboard")} />
          </motion.div>
        )}

        {currentScreen === "merchantManagement" && (
          <motion.div key="merchantManagement" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <MerchantManagementScreen onBack={() => navigateBack("adminDashboard")} />
          </motion.div>
        )}

        {currentScreen === "productValidation" && (
          <motion.div key="productValidation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <ProductValidationScreen onBack={() => navigateBack("adminDashboard")} />
          </motion.div>
        )}

        {currentScreen === "reports" && (
          <motion.div key="reports" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <ReportsScreen onBack={() => navigateBack("adminDashboard")} />
          </motion.div>
        )}

        {currentScreen === "adminSettings" && (
          <motion.div key="adminSettings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <AdminSettingsScreen onBack={() => navigateBack("adminDashboard")} />
          </motion.div>
        )}

        {currentScreen === "merchantDashboard" && (
          <motion.div key="merchantDashboard" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <MerchantDashboard onNavigate={(screen) => navigateTo(screen as Screen)} />
          </motion.div>
        )}

        {currentScreen === "addProduct" && (
          <motion.div key="addProduct" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <AddProductScreen
              onBack={() => navigateBack("merchantDashboard")}
              onSave={() => navigateBack("merchantDashboard")}
            />
          </motion.div>
        )}

        {currentScreen === "updatePrices" && (
          <motion.div key="updatePrices" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <UpdatePricesScreen onBack={() => navigateBack("merchantDashboard")} />
          </motion.div>
        )}

        {currentScreen === "managePromotions" && (
          <motion.div key="managePromotions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <ManagePromotionsScreen
              onBack={() => navigateBack("merchantDashboard")}
              onNavigate={(screen) => navigateTo(screen as Screen)}
            />
          </motion.div>
        )}

        {currentScreen === "addPromotion" && (
          <motion.div key="addPromotion" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <AddPromotionScreen
              onBack={() => navigateBack("managePromotions")}
              onSave={() => navigateBack("managePromotions")}
            />
          </motion.div>
        )}

        {currentScreen === "pendingValidation" && (
          <motion.div key="pendingValidation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <PendingValidationScreen onBack={() => navigateBack("merchantDashboard")} />
          </motion.div>
        )}

        {currentScreen === "merchantProfile" && (
          <motion.div key="merchantProfile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <MerchantProfileScreen
              onBack={() => navigateBack("merchantDashboard")}
              onNavigate={(screen) => navigateTo(screen as Screen)}
            />
          </motion.div>
        )}

        {currentScreen === "merchantAnalytics" && (
          <motion.div key="merchantAnalytics" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <MerchantAnalyticsScreen onBack={() => navigateBack("merchantDashboard")} />
          </motion.div>
        )}
      </AnimatePresence>

      {showBottomNav && (
        <BottomNav
          activeScreen={currentScreen}
          onNavigate={(screen) => {
            // BottomNav sempre limpa o stack e vai direto para a tela
            setNavigationStack([]);
            setCurrentScreen(screen as Screen);
          }}
        />
      )}

      {showAdminBottomNav && (
        <AdminBottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => {
            // Admin BottomNav também limpa o stack
            setNavigationStack([]);
            setCurrentScreen(screen as Screen);
          }}
        />
      )}

      {showMerchantBottomNav && (
        <MerchantBottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => {
            // Merchant BottomNav também limpa o stack
            setNavigationStack([]);
            setCurrentScreen(screen as Screen);
          }}
        />
      )}

      {/* Mode Toggle - Only show after login */}
      {!["splash", "login", "signup", "forgot", "onboarding"].includes(currentScreen) && (
        <ModeToggle currentMode={appMode} onModeChange={handleModeChange} />
      )}
    </div>
  );
}