import { useState, useMemo } from "react";

export function FiltersPanel({ subcategory, products, onFilter }) {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [weightRange, setWeightRange] = useState({ min: "", max: "" });
  const [filters, setFilters] = useState({});

  const handleCheckbox = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter((v) => v !== value) };
      }
      return { ...prev, [key]: [...current, value] };
    });
  };

  const handleInput = (e, rangeKey) => {
    const { name, value } = e.target;
    if (rangeKey === "price")
      setPriceRange((prev) => ({ ...prev, [name]: value }));
    if (rangeKey === "weight")
      setWeightRange((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (priceRange.min && Number(p.price) < Number(priceRange.min))
        return false;
      if (priceRange.max && Number(p.price) > Number(priceRange.max))
        return false;

      if (subcategory === "daynty") {
        if (weightRange.min && p.weight_grams < Number(weightRange.min))
          return false;
        if (weightRange.max && p.weight_grams > Number(weightRange.max))
          return false;
      }

      for (let key in filters) {
        if (filters[key] && filters[key].length > 0) {
          if (!filters[key].includes(p[key])) return false;
        }
      }
      return true;
    });
  }, [products, priceRange, weightRange, filters, subcategory]);

  onFilter && onFilter(filteredProducts);

  return (
    <div>
      <div>
        <span>Ціна (₴):</span>
        <div>
          <input
            type="text"
            name="min"
            placeholder="від"
            value={priceRange.min}
            onChange={(e) => handleInput(e, "price")}
          />
          <input
            type="text"
            name="max"
            placeholder="до"
            value={priceRange.max}
            onChange={(e) => handleInput(e, "price")}
          />
        </div>
      </div>

      <aside>
        {subcategory === "feed" && (
          <div>
            <p>Тип корму</p>
            {["Сухий", "Вологий"].map((val) => (
              <label key={val}>
                <input
                  type="checkbox"
                  checked={filters.food_type?.includes(val) || false}
                  onChange={() => handleCheckbox("food_type", val)}
                />
                {val}
              </label>
            ))}
            <p>Вікова категорія тварини</p>
            {[
              { label: "Молода (1 - 4 роки)", value: "Молоді" },
              { label: "Доросла (5 - 10)", value: "Дорослі" },
              { label: "Стара (10+)", value: "Старі" },
            ].map((item) => (
              <label key={item.value}>
                <input
                  type="checkbox"
                  checked={filters.age_group?.includes(item.value) || false}
                  onChange={() => handleCheckbox("age_group", item.value)}
                />
                {item.label}
              </label>
            ))}
          </div>
        )}

        {subcategory === "toys" && (
          <div>
            <p>Матеріал</p>
            {["Гума", "Пластик", "Тканина"].map((val) => (
              <label key={val}>
                <input
                  type="checkbox"
                  checked={filters.material?.includes(val) || false}
                  onChange={() => handleCheckbox("material", val)}
                />
                {val}
              </label>
            ))}
            <p>Розмір</p>
            {["Маленький", "Середній", "Великий"].map((val) => (
              <label key={val}>
                <input
                  type="checkbox"
                  checked={filters.size?.includes(val) || false}
                  onChange={() => handleCheckbox("size", val)}
                />
                {val}
              </label>
            ))}
            <p>Видає звук</p>
            {/* {[true, false].map((val) => (
              <label key={val.toString()}>
                <input
                  type="checkbox"
                  checked={filters.has_sound?.includes(val.toString()) || false}
                  onChange={() => handleCheckbox("has_sound", val.toString())}
                />
                {val ? "Так" : "Ні"}
              </label>
            ))} */}
            {[
              { label: "Так", value: 1 },
              { label: "Ні", value: 0 },
            ].map((item) => (
              <label key={item.value.toString()}>
                <input
                  type="checkbox"
                  checked={filters.has_sound?.includes(item.value) || false}
                  onChange={() => handleCheckbox("has_sound", item.value)}
                />
                {item.label}
              </label>
            ))}
          </div>
        )}

        {subcategory === "health" && (
          <div>
            <p>Тип продукту</p>
            {["Вітаміни", "Ліки", "Добавки"].map((val) => (
              <label key={val}>
                <input
                  type="checkbox"
                  checked={filters.product_type?.includes(val) || false}
                  onChange={() => handleCheckbox("product_type", val)}
                />
                {val}
              </label>
            ))}
            <p>Форма випуску</p>
            {["Таблетки", "Рідина", "Порошок"].map((val) => (
              <label key={val}>
                <input
                  type="checkbox"
                  checked={filters.form?.includes(val) || false}
                  onChange={() => handleCheckbox("form", val)}
                />
                {val}
              </label>
            ))}
          </div>
        )}

        {subcategory === "daynty" && (
          <div>
            <p>Призначення</p>
            {["Тренування", "Нагорода", "Для зубів"].map((val) => (
              <label key={val}>
                <input
                  type="checkbox"
                  checked={filters.purpose?.includes(val) || false}
                  onChange={() => handleCheckbox("purpose", val)}
                />
                {val}
              </label>
            ))}
            <p>Вага (г)</p>
            <input
              type="text"
              name="min"
              placeholder="Від"
              value={weightRange.min}
              onChange={(e) => handleInput(e, "weight")}
            />
            <input
              type="text"
              name="max"
              placeholder="До"
              value={weightRange.max}
              onChange={(e) => handleInput(e, "weight")}
            />
          </div>
        )}
      </aside>
    </div>
  );
}
