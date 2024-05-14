import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useTransactionStore } from "@/store/transactionStore";
import { db } from "../../../firebase-config";
import { collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { Trash } from "lucide-react";
import { useToast } from "../ui/use-toast";

const DeleteAlert = ({ tid, docId }) => {
  const removeTransaction = useTransactionStore(
    (state) => state.removeTransaction
  );

  const user = useAuthStore((state) => state.user);
  const toast = useToast();

  const handleDelete = async () => {
    if (!user) return;
    try {
      await deleteDoc(doc(collection(db, "transactions"), docId));
      removeTransaction(tid);
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Error",
        description: e.message || "Something is wrong I can feel it",
      });
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="p-2">
            <Trash size={20} strokeWidth={1.5} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              transaction and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className={buttonVariants({ variant: "destructive" })}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteAlert;
