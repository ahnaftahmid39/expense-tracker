import { cn } from "@/lib/utils";
import TransactionList from "@/components/transaction-list/TransactionList";
import Charts from "@/components/Charts";
import { mockTransactions } from "@/lib/mockData";
import { useEffect } from "react";
import { useTransactionStore } from "@/store/transactionStore";

const Body = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  return (
    <div className={"flex flex-col lg:flex-row w-full gap-8 p-4"}>
      <Charts transactions={transactions} />
      <TransactionList transactions={transactions} />
    </div>
  );
};
2;
export default Body;
