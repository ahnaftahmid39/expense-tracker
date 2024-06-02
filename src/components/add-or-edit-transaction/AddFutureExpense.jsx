import { Button } from "../ui/button";
import { AddOrEditTransaction } from "./AddOrEditTransaction";
import { useTransactionStore } from "@/store/transactionStore";
import { transactionFields } from "@/lib/constants";
import { uid } from "uid";
import { useToast } from "../ui/use-toast";
import { useAuthStore } from "@/store/authStore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase-config";

const AddFutureExpense = () => {
  const addFutureExpense = useTransactionStore(
    (state) => state.addFutureExpense
  );

  const user = useAuthStore((state) => state.user);
  const { toast } = useToast();

  const handleAddTrasaction = async (
    values = {
      category: "",
      description: "",
      amount: "",
      method: "",
      dateAdded: "",
    }
  ) => {
    try {
      if (!user) throw Error("Login required");

      const transaction = {
        ...values,
        userId: user.uid,
        [transactionFields.id]: uid(),
        [transactionFields.dateAdded]: new Date(),
      };

      console.log('adding future expense',{ transaction });


      const docRef = await addDoc(
        collection(db, "futureExpenses"),
        transaction
      );
      addFutureExpense({ ...transaction, docId: docRef.id });

      toast({
        title: "Sucess",
        description: "Added new 'will spend later'",
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
