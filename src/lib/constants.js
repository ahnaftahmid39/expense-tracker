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
  dateAdded: "dateAdded",
});

const transactionFieldsComparator = {
  id: (a = "", b = "") => {
    return a.localeCompare(b);
  },
  category: (a = "", b = "") => {
    return a.localeCompare(b);
  },
  method: (a = "", b = "") => {
    return a.localeCompare(b);
  },
  description: (a = "", b = "") => {
    return a.localeCompare(b);
  },
  amount: (a = 0, b = 0) => {
    return a - b;
  },
  dateAdded: (a = "", b = "") => {
    return new Date(a) - new Date(b);
  },
};

const transactionFieldsLabelMapper = Object.freeze({
  id: "ID",
  category: "Category",
  method: "Payment Method",
  description: "Description",
  amount: "Amount",
  dateAdded: "Date added",
});

const categories = {
  food: "Food",
  entertainment: "Entertainment",
  transport: "Transport",
  rent: "Rent",
  bill: "Bill",
  health: "Health",
  clothes: "Clothes",
  travel: "Travel",
  education: "Education",
  tax: "Tax",
  debt: "Debt",
  charity: "Charity",
  medicine: "Medicine",
  grocery: "Grocery",
  family: "Family",
  electronics: "Electronics",
  others: "Others",
};

const defaultCategories = Object.keys(categories)
  .sort()
  .reduce((obj, key) => {
    obj[key] = categories[key];
    return obj;
  }, {});

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

const timePeriods = Object.freeze({
  all: "all",
  yearly: "yearly",
  monthly: "monthly",
});

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export {
  THEME_TYPES,
  transactionFields,
  transactionFieldsLabelMapper,
  transactionFieldsComparator,
  defaultCategories,
  defaultCategoriesArray,
  defaultPaymentMethods,
  timePeriods,
  routes,
  months,
};
