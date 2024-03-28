import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { AddOrEditTransaction } from "./AddOrEditTransaction";
import { useTransactionStore } from "@/store/transactionStore";
import { transactionFields } from "@/lib/constants";
import { uid } from "uid";
import { toast } from "../ui/use-toast";

const AddTransaction = () => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleAddTrasaction = (
    values = { category: "", description: "", amount: "", method: "" }
  ) => {
    addTransaction({
      ...values,
      [transactionFields.createdAt]: new Date().toISOString(),
      [transactionFields.id]: uid(),
    });

    toast({
      title: "Sucess",
      description: "Added a Transaction",
    });
  };

  return (
    <AddOrEditTransaction
      title="Add Transaction"
      handleSubmit={handleAddTrasaction}
    >
      <Button variant={"ghost"} className={"md:gap-2"}>
        <CirclePlus />
        <span className="hidden  md:inline">{"Add"}</span>
      </Button>
    </AddOrEditTransaction>
  );
};

export default AddTransaction;
