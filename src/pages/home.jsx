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
    <div className="w-full max-h-svh gap-4 overflow-auto  flex flex-col lg:flex-row">
      <div className="lg:w-1/3 flex flex-col overflow-auto gap-4">
        {/* <Card className="">
          <CardHeader className="px-4 py-2">
            <CardTitle className="text-xl">Monthly Total</CardTitle>
            <CardDescription>{"This month's total expense"}</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-primary font-semibold px-2 text-2xl">৳4500</p>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="px-4 py-2">
            <CardTitle className="text-xl">Weekly Total</CardTitle>
            <CardDescription>{"This month's total expense"}</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-primary font-semibold px-2 text-2xl">৳800</p>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="px-4 py-2">
            <CardTitle className="text-xl">Weekly Total</CardTitle>
            <CardDescription>{"This month's total expense"}</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-primary font-semibold px-2 text-2xl">৳800</p>
          </CardContent>
        </Card> */}
        <div className="flex flex-col p-2 px-4 border rounded-lg">
          <div className=" flex flex-col">
            <span className="py-4 text-2xl">Monthly Total</span>
            <span className="text-muted-foreground">
              Total expense of this month
            </span>
            <span className="text-primary font-semibold text-2xl">৳4500</span>
          </div>
          <div className="  flex flex-col">
            <span className="py-4 text-2xl">Weekly Total</span>
            <span className="text-muted-foreground">
              Total expense of this month
            </span>
            <span className="text-primary font-semibold text-2xl">৳400</span>
          </div>
        </div>
        <WantToBuy />
      </div>
      <TransactionList transactions={transactions || []} />
    </div>
  );
};

export default Home;
