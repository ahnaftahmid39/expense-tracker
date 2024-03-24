const THEME_TYPES = {
  LIGHT: "light",
  DARK: "dark",
};

const transactionFields = Object.freeze({
  id: "id",
  category: "category",
  method: "method",
  description: "description",
  amount: "amount",
  createdAt: "createdAt",
});

const defaultCategories = Object.freeze({
  food: "food",
  transport: "transport",
  rent: "rent",
  bill: "bill",
  health: "health",
  clothing: "clothing",
  travel: "travel",
  education: "education",
  children: "children",
  tax: "tax",
  debt: "debt",
  charity: "charity",
});

const defaultCategoriesArray = Object.keys(defaultCategories);

export {
  THEME_TYPES,
  transactionFields,
  defaultCategories,
  defaultCategoriesArray,
};
