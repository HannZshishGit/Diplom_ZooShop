import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FiltersPanel } from "../../components/Filters/Filters.jsx";

export default function CatalogPage() {
  const { category, subcategory } = useParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await axios.get(
      `http://localhost:3000/product/get/${category}/${subcategory}`,
    );

    setProducts(response.data);
  };

  const handleNavigateToProductPage = (article) => {
    navigate(`/catalog/${category}/${subcategory}/${article}`);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, subcategory]);

  // return (
  //   <div>
  //     <FiltersPanel subcategory={subcategory} />
  //     {products.map((product) => (
  //       <div
  //         key={product.product_id}
  //         onClick={() => handleNavigateToProductPage(product.article)}
  //       >
  //         <h1>{product.product_name}</h1>
  // <button
  //   onClick={() => {
  //     addToCart(product);
  //   }}
  // >
  //   +
  // </button>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div>
      <FiltersPanel
        subcategory={subcategory}
        products={products}
        onFilter={setFilteredProducts}
      />
      <div>
        {filteredProducts.map((product) => (
          <div key={product.product_id}>
            <h1>{product.product_name}</h1>
            <p>Ціна: {product.price}₴</p>
            <button
              onClick={() => {
                addToCart(product);
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
