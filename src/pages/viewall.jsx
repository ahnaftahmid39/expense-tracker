import QueryControls from "@/components/query-controls/QueryControls";
import TransactionList from "@/components/transaction-list/TransactionList";
import {
  timePeriods,
  transactionFields,
  transactionFieldsComparator,
} from "@/lib/constants";
import { useTransactionStore } from "@/store/transactionStore";

const Viewall = () => {
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
    <div className="flex flex-col gap-4 grow w-full">
      <QueryControls
        hasPeriodOption
        customDateQuery
        defaultPeriod={timePeriods.all}
      />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default Viewall;
