export const subcategoryConfig = {
  feed: {
    table: "food_products",
    fields: "fp.food_type, fp.weight_grams, fp.age_group",
    alias: "fp",
  },
  toys: {
    table: "toy_products",
    fields: "tp.material, tp.size, tp.has_sound",
    alias: "tp",
  },
  daynty: {
    table: "treat_products",
    fields: "tr.purpose, tr.weight_grams",
    alias: "tr",
  },
  health: {
    table: "health_products",
    fields: "hp.product_type, hp.form",
    alias: "hp",
  },
};
