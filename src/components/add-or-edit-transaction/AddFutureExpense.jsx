import { Button } from "../ui/button";
import { AddOrEditTransaction } from "./AddOrEditTransaction";
import { useTransactionStore } from "@/store/transactionStore";
import { transactionFields } from "@/lib/constants";
import { uid } from "uid";
import { toast } from "../ui/use-toast";

const AddFutureExpense = () => {
  const addFutureExpense = useTransactionStore(
    (state) => state.addFutureExpense
  );

  const handleAddTrasaction = (
    values = {
      category: "",
      description: "",
      amount: "",
      method: "",
      dateAdded: "",
    }
  ) => {
    addFutureExpense({
      ...values,
      [transactionFields.id]: uid(),
      [transactionFields.dateAdded]: new Date(),
    });

    toast({
      title: "Sucess",
      description: "Added new 'will spend later'",
      className: "border-primary",
    });
  };

  return (
    <AddOrEditTransaction
      title="Add a future expense"
      handleSubmit={handleAddTrasaction}
      hasDate={false}
    >
      <Button variant={"outline"} className={"md:gap-2"}>
        New
      </Button>
    </AddOrEditTransaction>
  );
};

export default AddFutureExpense;
