import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { AddOrEditTransaction } from "./AddOrEditTransaction";
import { useTransactionStore } from "@/store/transactionStore";
import { transactionFields } from "@/lib/constants";
import { uid } from "uid";
import { toast } from "../ui/use-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useAuthStore } from "@/store/authStore";

const AddTransaction = () => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const user = useAuthStore((state) => state.user);

  const handleAddTrasaction = async (values) => {
    try {
      if (!user) throw Error("Login required");
      const transaction = {
        ...values,
        userId: user.uid,
        [transactionFields.id]: uid(),
      };

      await addDoc(collection(db, "transactions"), transaction);
      addTransaction(transaction);

      toast({
        title: "Sucess",
        description: "Added a Transaction",
        className: "border-primary",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e.message,
        className: "border-destructive",
        variant: "destructive",
      });
    }
  };

  return (
    <AddOrEditTransaction
      title="Add Transaction"
      handleSubmit={handleAddTrasaction}
    >
      <Button variant={"ghost"} className={"md:gap-2"}>
        <CirclePlus />
        <span className="hidden md:inline">{"Add"}</span>
      </Button>
    </AddOrEditTransaction>
  );
};

export default AddTransaction;
