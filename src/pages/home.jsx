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
import WantToBuy from "@/components/Want-to-buy/WantToBuy";

const Home = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  return (
    <div className="w-full gap-4 flex flex-col lg:flex-row">
      <div className="lg:w-1/3 flex flex-col gap-4">
        <Card className="">
          <CardHeader>
            <CardTitle>Monthly Total</CardTitle>
            <CardDescription>{"This month's total expense"}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-primary font-semibold text-2xl">৳4500</p>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Weekly Total</CardTitle>
            <CardDescription>{"This week's total expense"}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-primary font-semibold text-2xl">৳500</p>
          </CardContent>
        </Card>
        <WantToBuy />
      </div>
      <TransactionList transactions={transactions || []} />
    </div>
  );
};

export default Home;
