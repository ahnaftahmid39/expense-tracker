import { uid } from "uid";

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
  id: "id",
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
  profile: "/profile",
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
const get5YearsBeforeArray = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 5; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

// mock transaction of different categories, different months and different years
const mockTransactions = [
  {
    id: uid(),
    category: "food",
    method: "cash",
    description: "Burger",
    amount: 100,
    dateAdded: new Date("2021-01-01").toISOString(),
  },
  {
    id: uid(),
    category: "entertainment",
    method: "card",
    description: "Movie",
    amount: 200,
    dateAdded: new Date("2021-02-01").toISOString(),
  },
  {
    id: uid(),
    category: "transport",
    method: "bkash",
    description: "Bus",
    amount: 50,
    dateAdded: new Date("2021-03-01").toISOString(),
  },
  {
    id: uid(),
    category: "rent",
    method: "cash",
    description: "House",
    amount: 500,
    dateAdded: new Date("2021-04-01").toISOString(),
  },
  {
    id: uid(),
    category: "bill",
    method: "card",
    description: "Electricity",
    amount: 150,
    dateAdded: new Date("2021-05-01").toISOString(),
  },
  {
    id: uid(),
    category: "health",
    method: "bkash",
    description: "Medicine",
    amount: 300,
    dateAdded: new Date("2021-06-01").toISOString(),
  },
  {
    id: uid(),
    category: "clothes",
    method: "cash",
    description: "Shirt",
    amount: 50,
    dateAdded: new Date("2021-07-01").toISOString(),
  },
  {
    id: uid(),
    category: "travel",
    method: "card",
    description: "Train",
    amount: 200,
    dateAdded: new Date("2021-08-01").toISOString(),
  },
  {
    id: uid(),
    category: "education",
    method: "bkash",
    description: "Book",
    amount: 100,
    dateAdded: new Date("2021-09-01").toISOString(),
  },
  {
    id: uid(),
    category: "tax",
    method: "cash",
    description: "Income tax",
    amount: 1000,
    dateAdded: new Date("2021-10-01").toISOString(),
  },
  {
    id: uid(),
    category: "debt",
    method: "card",
    description: "Loan",
    amount: 500,
    dateAdded: new Date("2021-11-01").toISOString(),
  },
  {
    id: uid(),
    category: "charity",
    method: "bkash",
    description: "Donation",
    amount: 200,
    dateAdded: new Date("2021-12-01").toISOString(),
  },
  {
    id: uid(),
    category: "medicine",
    method: "cash",
    description: "Painkiller",
    amount: 20,
    dateAdded: new Date("2022-01-01").toISOString(),
  },
  {
    id: uid(),
    category: "grocery",
    method: "card",
    description: "Rice",
    amount: 30,
    dateAdded: new Date("2022-02-01").toISOString(),
  },
  {
    id: uid(),
    category: "family",
    method: "bkash",
    description: "Gift",
    amount: 50,
    dateAdded: new Date("2022-03-01").toISOString(),
  },
  {
    id: uid(),
    category: "electronics",
    method: "cash",
    description: "Phone",
    amount: 200,
    dateAdded: new Date("2022-04-01").toISOString(),
  },
  {
    id: uid(),
    category: "others",
    method: "card",
    description: "Others",
    amount: 100,
    dateAdded: new Date("2022-05-01").toISOString(),
  },
  {
    id: uid(),
    category: "grocery",
    method: "card",
    description: "Rice",
    amount: 30,
    dateAdded: new Date().toISOString(),
  },
  {
    id: uid(),
    category: "family",
    method: "bkash",
    description: "Gift",
    amount: 50,
    dateAdded: new Date().toISOString(),
  },
  {
    id: uid(),
    category: "electronics",
    method: "cash",
    description: "Phone",
    amount: 200,
    dateAdded: new Date().toISOString(),
  },
  {
    id: uid(),
    category: "others",
    method: "card",
    description: "Others",
    amount: 100,
    dateAdded: new Date().toISOString(),
  },
];

export {
  THEME_TYPES,
  transactionFields,
  transactionFieldsLabelMapper,
  transactionFieldsComparator,
  defaultCategories,
  defaultCategoriesArray,
  defaultPaymentMethods,
  timePeriods,
  get5YearsBeforeArray,
  routes,
  months,
  mockTransactions,
};
