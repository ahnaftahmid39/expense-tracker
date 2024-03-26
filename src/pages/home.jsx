import TransactionList from "@/components/transaction-list/TransactionList";
import { useTransactionStore } from "@/store/transactionStore";

const Home = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  return (
    <>
      <TransactionList transactions={transactions || []} />
    </>
  );
};

export default Home;
