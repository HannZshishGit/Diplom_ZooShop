import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./contexts/ModalContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <ModalProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ModalProvider>,
);
