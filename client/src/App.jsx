import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import Cart from "./components/Cart/Cart";
import { useModal } from "./contexts/ModalContext";
import SubCategoryPage from "./pages/SubCategoryPage/SubCategoryPage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  const { isCartOpen } = useModal();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/catalog/:category/:subcategory"
          element={<CatalogPage />}
        />
        <Route
          path="/catalog/:category/:subcategory/:article"
          element={<ProductPage />}
        />
        <Route path="/subcategories" element={<SubCategoryPage />} />
      </Routes>
      {isCartOpen && <Cart />}
    </Router>
  );
}

export default App;
