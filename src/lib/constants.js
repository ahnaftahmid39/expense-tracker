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
  food: "Food",
  orderFood: "Order Food",
  entertainment: "Entertainment",
  transport: "Transport",
  rent: "Rent",
  bill: "Bill",
  health: "Health",
  clothes: "Clothes",
  travel: "Travel",
  education: "Education",
  children: "Children",
  tax: "Tax",
  debt: "Debt",
  charity: "Charity",
  medicine: "Medicine",
  grocery: "Grocery",
});

const defaultCategoriesArray = Object.keys(defaultCategories);

export {
  THEME_TYPES,
  transactionFields,
  defaultCategories,
  defaultCategoriesArray,
};
