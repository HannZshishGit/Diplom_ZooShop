import { useCart } from "../../contexts/CartContext";
import { useModal } from "../../contexts/ModalContext";
import "./Cart.styles.css";

export default function Cart() {
  const {
    products,
    totalPrice,
    clearCart,
    removeItem,
    decreaceQuantity,
    increaceQuantity,
  } = useCart();

  const { setCartOpen } = useModal();

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <div className="cart">
      <button onClick={closeCart}>X</button>
      <h1>{totalPrice} UAH</h1>
      {products.map((product) => (
        <div className="cart-item" key={product.product_id}>
          <h2>{product.product_name}</h2>
          <h3>{product.quantity}</h3>
          <button onClick={() => decreaceQuantity(product.product_id)}>
            -
          </button>
          <button onClick={() => increaceQuantity(product.product_id)}>
            +
          </button>
          <button onClick={() => removeItem(product.product_id)}>x</button>
        </div>
      ))}
    </div>
  );
}
