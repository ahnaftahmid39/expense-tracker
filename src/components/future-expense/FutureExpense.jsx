import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store/transactionStore";
import AddFutureExpense from "../add-or-edit-transaction/AddFutureExpense";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export const BuyItem = ({ fexpense, className, ...props }) => {
  const [checked, setChecked] = useState(false);
  const removeFutureExpense = useTransactionStore(
    (state) => state.removeFutureExpense
  );
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  useEffect(() => {
    let timeoutId;
    if (checked === true) {
      timeoutId = setTimeout(async () => {
        const transaction = {
          ...fexpense,
          dateAdded: new Date(),
        };
        console.log("transferring transaction", { transaction });
        // update database
        try {
          await addDoc(collection(db, "transactions"), transaction);
          await deleteDoc(
            doc(collection(db, "futureExpenses"), fexpense.docId)
          );
        } catch (e) {
          console.log(e);
        }

        // update store
        removeFutureExpense(fexpense.id);
        addTransaction(transaction);
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleRemove = async () => {
    try {
      await deleteDoc(doc(collection(db, "futureExpenses"), fexpense.docId));
      removeFutureExpense(fexpense.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn("border-b last-of-type:border-none", className)}
      {...props}
    >
      <div className="flex p-2 gap-4 lg:max-w-[30ch] text-ellipsis items-center">
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          {fexpense.description}
        </p>
      </div>
      <div className="flex gap-4  px-2 items-center">
        <div
          className="gap-2 p-0 flex hover:bg-transparent cursor-pointer"
          onClick={() => {
            setChecked(true);
          }}
        >
          <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
            className="rounded-[4px] self-center box-border"
          />
          <span className="text-muted-foreground text-sm">Spent</span>
        </div>
        <span className="text-primary ml-auto">৳{fexpense.amount}</span>
        <Button
          onClick={handleRemove}
          variant="ghost"
          className="p-0 gap-2 bg-transparent text-muted-foreground  hover:bg-transparent hover:scale-110 transition-transform"
        >
          <Trash size={20} />
        </Button>
      </div>
    </div>
  );
};

const FutureExpense = () => {
  const futureExpenses = useTransactionStore((state) => state.futureExpenses);

  return (
    <div className="flex flex-col flex-1 gap-2 bg-card border p-2 rounded-lg">
      <div className="p-4 flex py-2 text-xl justify-between font-medium">
        <span>Future expenses</span>
        {/* <Maximize className="self-center" strokeWidth={1} /> */}
      </div>
      <div className="relative flex flex-col gap-2 bg-background border rounded-lg p-2  flex-1 overflow-auto">
        {futureExpenses.length === 0 && (
          <div className="p-2 min-h-[220px] my-auto text-center text-muted-foreground">
            {"Add new future expense with the button below"}
          </div>
        )}
        {futureExpenses.map((ws) => {
          return <BuyItem fexpense={ws} key={ws.id} />;
        })}
      </div>
      <AddFutureExpense />
    </div>
  );
};

export default FutureExpense;
