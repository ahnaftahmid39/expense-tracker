import { cn } from "@/lib/utils";
import TransactionList from "@/components/transaction-list/TransactionList";
import Charts from "@/components/Charts";

const Body = () => {
  return (
    <div className={"flex flex-col lg:flex-row w-full g-4 p-4"}>
      {/* <Charts /> */}
      <TransactionList />
    </div>
  );
};

export default Body;
