import { CirclePlus, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { AddOrEditTransaction } from "./AddOrEditTransaction";
import { useTransactionStore } from "@/store/transactionStore";
import { transactionFields } from "@/lib/constants";
import { toast } from "../ui/use-toast";

const UpdateTransaction = ({ transaction }) => {
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction
  );
  const handleUpdateTransaction = (
    values = {
      category: "",
      description: "",
      amount: "",
      method: "",
      dateAdded: "",
    }
  ) => {
    updateTransaction({
      ...values,
      [transactionFields.id]: transaction.id,
    });
    toast({
      title: "Sucess",
      description: "Updated Transaction",
      className: "border-primary",
    });
  };

  return (
    <AddOrEditTransaction
      title="Update Transaction"
      handleSubmit={handleUpdateTransaction}
      defaultTransaction={transaction}
    >
      <Button variant="ghost" className={"p-2"}>
        <Edit size={20} strokeWidth={1.5} />
      </Button>
    </AddOrEditTransaction>
  );
};

export default UpdateTransaction;
