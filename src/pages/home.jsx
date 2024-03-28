import TransactionList from "@/components/transaction-list/TransactionList";
import { useTransactionStore } from "@/store/transactionStore";

import WillSpend from "@/components/will-spend/WillSpend";

const Home = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const filteredTransactions = transactions.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="w-full gap-4 overflow-auto  flex flex-col lg:flex-row">
      <div className="lg:w-1/3 flex flex-col overflow-auto gap-4">
        <div className="flex flex-col p-2 px-4 border rounded-lg bg-card">
          <div className=" flex flex-col p-2">
            <span className="text-xl">Monthly Total</span>
            <span className="text-muted-foreground text-sm">
              Total expense of this month
            </span>
            <span className="text-primary font-semibold text-2xl mt-2">৳4500</span>
          </div>
          <div className="p-2 flex flex-col">
            <span className="text-xl">Weekly Total</span>
            <span className="text-muted-foreground text-sm">
              Total expense of this month
            </span>
            <span className="mt-2 text-primary font-semibold text-2xl">৳400</span>
          </div>
        </div>
        <WillSpend />
      </div>
      <TransactionList transactions={filteredTransactions || []} />
    </div>
  );
};

export default Home;
