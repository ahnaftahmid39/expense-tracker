import TransactionList from "@/components/transaction-list/TransactionList";
import { useTransactionStore } from "@/store/transactionStore";

import FutureExpense from "@/components/future-expense/FutureExpense";
import QueryControls from "@/components/query-controls/QueryControls";
import {
  transactionFields,
  transactionFieldsComparator,
} from "@/lib/constants";
import {
  getFirstDayFirstMomentOfMonth,
  getLastDayLastMomentOfMonth,
} from "@/lib/utils";

const Home = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const dateQuery = useTransactionStore((state) => state.dateQuery);
  const filters = useTransactionStore((state) => state.filters);
  const sorters = useTransactionStore((state) => state.sorters);
  const searchText = useTransactionStore((state) => state.searchText);

  let filteredTransactions = [...transactions];
  // handle search
  let search = searchText.trim().toLowerCase();
  if (search !== "") {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      const combinedString =
        transaction[transactionFields.category].toLowerCase() +
        transaction[transactionFields.description].toLowerCase() +
        transaction[transactionFields.method].toLowerCase() +
        transaction[transactionFields.amount].toString();
      if (combinedString.includes(search)) {
        return true;
      }

      return false;
    });
  }

  // handle dateQuery
  filteredTransactions = filteredTransactions.filter((t) => {
    const addedDate = new Date(t.dateAdded);
    return addedDate <= dateQuery.before && addedDate >= dateQuery.after;
  });

  // this month only
  const thisMonthTransactions = transactions.filter((t) => {
    const addedDate = new Date(t.dateAdded);
    const today = new Date();
    return (
      addedDate <=
        getLastDayLastMomentOfMonth(today.getMonth(), today.getFullYear()) &&
      addedDate >=
        getFirstDayFirstMomentOfMonth(today.getMonth(), today.getFullYear())
    );
  });

  let thisMonthTotal = 0;
  thisMonthTransactions.forEach((t) => {
    thisMonthTotal += t.amount;
  });

  const pastSevenDaysTransactions = transactions.filter((t) => {
    const addedDate = new Date(t.dateAdded);
    const today = new Date();
    // FIXME: this is a bug. Past 7 days shouldn't reset due month or year change
    return (
      addedDate.getFullYear() === today.getFullYear() &&
      addedDate.getMonth() === today.getMonth() &&
      today.getDate() - addedDate.getDate() <= 6
    );
  });

  let pastSevenDaysTotal = 0;
  pastSevenDaysTransactions.forEach((t) => {
    pastSevenDaysTotal += t.amount;
  });

  // if no sorters active
  if (sorters.length === 0) {
    filteredTransactions.sort((a, b) => {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });
  } else {
    // handle only one for now
    let sorter = sorters[0];
    const orderMap = {
      asc: 1,
      desc: -1,
    };

    filteredTransactions.sort((a, b) => {
      return (
        orderMap[sorter["order"]] *
        transactionFieldsComparator[sorter["fieldName"]](
          a[sorter["fieldName"]],
          b[sorter["fieldName"]]
        )
      );
    });
  }

  // handle multiple filters
  filters.forEach((fltr) => {
    filteredTransactions = filteredTransactions.filter((tx) => {
      return fltr["include"] === (fltr["fieldValue"] === tx[fltr["fieldName"]]);
    });
  });

  return (
    <div className="w-full gap-4 flex flex-col">
      <QueryControls />
      <div className="w-full gap-4 overflow-auto flex flex-1 flex-col lg:flex-row">
        <div className="lg:w-1/3 flex flex-col overflow-auto gap-4">
          <div className="flex flex-col p-2 px-4 border rounded-lg bg-card">
            <div className=" flex flex-col p-2">
              <span className="text-xl">Monthly Total</span>
              <span className="text-muted-foreground text-sm">
                Total expense of current month
              </span>
              <span className="text-primary font-semibold text-2xl mt-2">
                ৳{thisMonthTotal}
              </span>
            </div>
            <div className="p-2 flex flex-col">
              <span className="text-xl">Last 7 Days</span>
              <span className="text-muted-foreground text-sm">
                Total expense last 7 days
              </span>
              <span className="mt-2 text-primary font-semibold text-2xl">
                ৳{pastSevenDaysTotal}
              </span>
            </div>
          </div>
          <FutureExpense />
        </div>
        <TransactionList transactions={filteredTransactions || []} />
      </div>
    </div>
  );
};

export default Home;
