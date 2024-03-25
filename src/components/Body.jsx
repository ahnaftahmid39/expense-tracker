import { cn } from "@/lib/utils";
import TransactionList from "@/components/transaction-list/TransactionList";
import Charts from "@/components/Charts";
import { mockTransactions } from "@/lib/mockData";
import { useEffect } from "react";
import { useTransactionStore } from "@/store/transactionStore";

const Body = () => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const transactions = useTransactionStore((state) => state.transactions);

  useEffect(() => {
    mockTransactions.forEach((t) => {
      addTransaction(t);
    });
  }, []);

  return (
    <div className={"flex flex-col lg:flex-row w-full g-4 p-4"}>
      {/* <Charts /> */}
      <TransactionList transactions={mockTransactions} />
    </div>
  );
};

export default Body;
