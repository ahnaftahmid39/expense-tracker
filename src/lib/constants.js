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

const transactionFieldsLabelMapper = Object.freeze({
  id: "ID",
  category: "Category",
  method: "Payment Method",
  description: "Description",
  amount: "Amount",
  createdAt: "Date added",
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

const defaultPaymentMethods = Object.freeze({
  cash: "Cash",
  bkash: "Bkash",
  card: "Card",
});

const defaultCategoriesArray = Object.keys(defaultCategories);

const routes = {
  home: "/",
  auth: "/auth",
  analytics: "/analytics",
  all: "/all",
};

export {
  THEME_TYPES,
  transactionFields,
  transactionFieldsLabelMapper,
  defaultCategories,
  defaultCategoriesArray,
  defaultPaymentMethods,
  routes,
};
