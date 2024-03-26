import TransactionList from "@/components/transaction-list/TransactionList";
import { useTransactionStore } from "@/store/transactionStore";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  return (
    <div className="w-full gap-4 flex flex-col lg:flex-row">
      <div className="w-1/3">
        <Card className="">
          <CardHeader>
            <CardTitle>Total Expense</CardTitle>
            <CardDescription>{"This month's total expense"}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-primary font-semibold text-2xl">4500</p>
          </CardContent>
          <CardFooter>
            <p></p>
          </CardFooter>
        </Card>
      </div>
      <TransactionList transactions={transactions || []} />
    </div>
  );
};

export default Home;
