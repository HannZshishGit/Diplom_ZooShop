import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { category, subcategory, article } = useParams();
  const [product, setProduct] = useState({});

  console.log("PARAMS:", category, subcategory, article);

  const fetchProductData = async () => {
    const response = await axios.get(
      `http://localhost:3000/product/get/${category}/${subcategory}/${article}`,
    );

    setProduct(response.data);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return <div>{product.product_name}</div>;
}
