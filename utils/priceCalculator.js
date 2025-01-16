const priceMap = {
  Poomse: {
    "A+": 50,
    A: 30,
    B: 24,
    C: 18,
  },
  NonPoomse: {
    "A+": 30,
    A: 20,
    B: 16,
    C: 10,
  },
};

const calculatePrice = (product) => {
  if (!product || !product.category || !product.size) return 0; // Validation

  const isPoomse = product.poomseOrNot === "Poomse";
  const categoryPrices = isPoomse ? priceMap.Poomse : priceMap.NonPoomse;

  return categoryPrices[product.category]
    ? product.size * categoryPrices[product.category]
    : 0; // Default case if category is invalid
};

export { calculatePrice };
