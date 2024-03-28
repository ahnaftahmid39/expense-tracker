import { Link, LucideTrash, Maximize, Trash, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store/transactionStore";
import AddFutureExpense from "../add-or-edit-transaction/AddFutureExpense";

export const BuyItem = ({
  id,
  category,
  description,
  method,
  amount,
  className,
  ...props
}) => {
  const [checked, setChecked] = useState(false);
  const removeWillSpend = useTransactionStore((state) => state.removeWillSpend);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  useEffect(() => {
    if (checked === true) {
      removeWillSpend(id);
      addTransaction({
        id,
        category,
        description,
        method,
        amount,
        createdAt: new Date().toISOString(),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleRemove = () => {
    removeWillSpend(id);
  };

  return (
    <div
      className={cn("border-b last-of-type:border-none", className)}
      {...props}
    >
      <div className="flex p-2 gap-4 lg:max-w-[30ch] text-ellipsis items-center">
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          {description}
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
        <span className="text-primary ml-auto">৳{amount}</span>
        <Button
          onClick={handleRemove}
          variant="ghost"
          className="p-0 gap-2 bg-transparent text-muted-foreground  hover:bg-transparent hover:scale-110 transition-transform"
        >
          <Trash size={20} />
          Remove
        </Button>
      </div>
    </div>
  );
};

const WillSpend = () => {
  const willSpend = useTransactionStore((state) => state.willSpend);

  return (
    <div className="flex flex-col flex-1 gap-2 border p-2 rounded-lg">
      <div className="p-4 flex py-2 text-xl justify-between font-medium">
        <span>Will spend later</span>
        <Maximize className="self-center" strokeWidth={1} />
      </div>
      <div className="flex flex-col gap-2 border rounded-lg p-2  flex-1 overflow-auto">
        {willSpend.map((ws) => {
          return (
            <BuyItem
              amount={ws.amount}
              method={ws.method}
              category={ws.category}
              description={ws.description}
              id={ws.id}
              key={ws.id}
            />
          );
        })}
      </div>
      <AddFutureExpense />
    </div>
  );
};

export default WillSpend;
