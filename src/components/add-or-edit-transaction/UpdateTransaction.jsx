import { CirclePlus, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { AddOrEditTransaction } from "./AddOrEditTransaction";
import { useTransactionStore } from "@/store/transactionStore";
import { transactionFields } from "@/lib/constants";
import { toast } from "../ui/use-toast";
import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { useAuthStore } from "@/store/authStore";
import { db } from "../../../firebase-config";

const UpdateTransaction = ({ transaction }) => {
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction
  );
  const user = useAuthStore((state) => state.user);

  const handleUpdateTransaction = async (
    values = {
      category: "",
      description: "",
      amount: "",
      method: "",
      dateAdded: "",
    }
  ) => {
    if (!user) return;
    const updated = {
      ...values,
      [transactionFields.id]: transaction.id,
    };
    try {
      await updateDoc(
        doc(collection(db, "transactions"), transaction.docId),
        updated
      );

      updateTransaction({ updated, docId: transaction.docId });

      toast({
        title: "Sucess",
        description: "Updated Transaction",
        className: "border-primary",
      });
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Error",
        description: e.message,
      });
    }
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
