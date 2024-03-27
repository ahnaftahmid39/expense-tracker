import TransactionList from "@/components/transaction-list/TransactionList";
import { useTransactionStore } from "@/store/transactionStore";

const Viewall = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <>
      <TransactionList transactions={transactions} />
    </>
  );
};

export default Viewall;
