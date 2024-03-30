import TransactionList from "@/components/transaction-list/TransactionList";
import { useTransactionStore } from "@/store/transactionStore";

import WillSpend from "@/components/will-spend/WillSpend";
import QueryControls from "@/components/query-controls/QueryControls";
import {
  transactionFields,
  transactionFieldsComparator,
} from "@/lib/constants";

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
        transactionFieldsComparator[sorter["fieldName"]](a, b)
      );
    });
  }

  // handle multiple filters
  filters.forEach((fltr) => {
    filteredTransactions = filteredTransactions.filter((tx) => {
      return (
        fltr["include"] === (fltr["fieldValue"] === tx[fltr["fieldName"]])
      );
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
                Total expense of this month
              </span>
              <span className="text-primary font-semibold text-2xl mt-2">
                ৳4500
              </span>
            </div>
            <div className="p-2 flex flex-col">
              <span className="text-xl">Weekly Total</span>
              <span className="text-muted-foreground text-sm">
                Total expense of this month
              </span>
              <span className="mt-2 text-primary font-semibold text-2xl">
                ৳400
              </span>
            </div>
          </div>
          <WillSpend />
        </div>
        <TransactionList transactions={filteredTransactions || []} />
      </div>
    </div>
  );
};

export default Home;
