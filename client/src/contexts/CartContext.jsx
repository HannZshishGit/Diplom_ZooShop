import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });

  const [totalPrice, setTotalPrice] = useState(() => {
    return JSON.parse(localStorage.getItem("totalPrice")) || 0;
  });

  const calculateTotalPrice = (products) => {
    let sum = 0;
    products.forEach((product) => {
      sum += Number(product.price) * product.quantity;
    });
    setTotalPrice(sum);
    localStorage.setItem("totalPrice", sum);
  };

  const increaceQuantity = (id) => {
    setProducts(
      products.map((product) => {
        if (product.product_id === id) {
          product.quantity++;
        }
        calculateTotalPrice(products);
        return product;
      }),
    );
  };

  const decreaceQuantity = (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts
        .map((product) =>
          product.product_id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        )
        .filter((order) => order.quantity > 0);

      calculateTotalPrice(updatedProducts);
      updateLocalStorage(updatedProducts);
      return updatedProducts;
    });
  };

  const updateLocalStorage = (updatedProducts) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const addToCart = (product) => {
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (item) => item.product_id === product.product_id,
      );

      let updatedProducts;
      if (existingProductIndex !== -1) {
        updatedProducts = prevProducts.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedProducts = [...prevProducts, { ...product, quantity: 1 }];
      }
      updateLocalStorage(updatedProducts);
      calculateTotalPrice(updatedProducts);
      return updatedProducts;
    });
  };

  const removeItem = (id) => {
    const updatedProducts = products.filter(
      (product) => product.product_id !== id,
    );
    setProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  const clearCart = () => {
    localStorage.removeItem("products");
    localStorage.removeItem("totalPrice");
    setTotalPrice(0);
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        totalPrice,
        addToCart,
        clearCart,
        removeItem,
        decreaceQuantity,
        increaceQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
