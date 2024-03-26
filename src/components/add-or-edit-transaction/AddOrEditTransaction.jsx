import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";

import { transactionFields } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form as FormWrapper,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTransactionStore } from "@/store/transactionStore";
import { uid } from "uid";
import { useToast } from "@/components/ui/use-toast";

const transactionSchema = z.object({
  [transactionFields.category]: z.string().min(2).max(20),
  [transactionFields.description]: z.string().max(100).optional(),
  [transactionFields.method]: z.string().min(1, "Method field cannot be empty"),
  [transactionFields.amount]: z.coerce.number().positive(),
});
export function AddOrEditTransaction({ label = "Add" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) form.reset();
  };

  const shouldPersist = useTransactionStore((state) => state.shouldPersist);
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction
  );

  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      [transactionFields.category]: "",
      [transactionFields.description]: "",
      [transactionFields.method]: "",
      [transactionFields.amount]: 0,
    },
  });
  const onSubmit = (values) => {
    let transaction = {
      ...values,
      [transactionFields.createdAt]: new Date().toISOString(),
    };
    if (shouldPersist) {
      transaction = { ...transaction, [transactionFields.id]: uid() };
    }
    addTransaction(transaction);
    closeModal();
    toast({
      title: "Sucess",
      description: "Added a transaction",
      duration: "3000",
      variant: "success",
      titleClass: "text-green-500",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} defaultOpen>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className={"md:gap-2"}>
          <CirclePlus />
          <span className="hidden  md:inline">{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-secondary max-h-[85svh] overflow-auto sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>{label} Transaction</DialogTitle>
        </DialogHeader>
        <FormWrapper {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 [&_label]:capitalize"
          >
            <FormField
              control={form.control}
              name={transactionFields.category}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Select category of your expense
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={transactionFields.description}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{transactionFields.description}</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give a brief description of your expense (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={transactionFields.method}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{transactionFields.method}</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Select a payment method</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={transactionFields.amount}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{transactionFields.amount}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Amount of money spent</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
