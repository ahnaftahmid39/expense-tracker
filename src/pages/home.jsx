import TransactionList from "@/components/transaction-list/TransactionList";
import { useTransactionStore } from "@/store/transactionStore";

import WillSpend from "@/components/will-spend/WillSpend";
import QueryControls from "@/components/query-controls/QueryControls";

const Home = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const dateQuery = useTransactionStore((state) => state.dateQuery);

  let filteredTransactions = transactions.sort((a, b) => {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  // handle dateQuery
  filteredTransactions = filteredTransactions.filter((t) => {
    const addedDate = new Date(t.dateAdded);

    return addedDate <= dateQuery.before && addedDate >= dateQuery.after;
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
