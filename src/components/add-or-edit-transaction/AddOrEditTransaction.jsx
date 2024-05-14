import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarIcon, CirclePlus, Edit, PlusCircle } from "lucide-react";

import {
  defaultCategories,
  defaultPaymentMethods,
  transactionFields,
  transactionFieldsLabelMapper,
} from "@/lib/constants";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";

const transactionSchema = z.object({
  [transactionFields.category]: z.string().min(2).max(20),
  [transactionFields.description]: z.string().max(100).optional(),
  [transactionFields.method]: z.string().min(1, "Method field cannot be empty"),
  [transactionFields.amount]: z.coerce.number().positive(),
  [transactionFields.dateAdded]: z.coerce
    .date()
    .optional()
    .refine((d) => d < new Date(), "Can't select future dates"),
});

export function AddOrEditTransaction({
  title = "Add Transaction",
  defaultTransaction,
  handleSubmit,
  hasDate = true,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };
  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) form.reset();
  };

  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      [transactionFields.category]: defaultTransaction?.category || "",
      [transactionFields.description]: defaultTransaction?.description || "",
      [transactionFields.method]: defaultTransaction?.method || "",
      [transactionFields.amount]: defaultTransaction?.amount || 0,
      [transactionFields.dateAdded]:
        defaultTransaction?.dateAdded || new Date(),
    },
  });

  const onSubmit = (values) => {
    handleSubmit(values);
    closeModal();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} defaultOpen>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-secondary max-h-[85svh] overflow-auto sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <FormWrapper {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 [&_label]:capitalize [&_span]:capitalize"
          >
            <FormField
              control={form.control}
              name={transactionFields.category}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    autoComplete="true"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {/* <SelectLabel>Category</SelectLabel> */}
                        {Object.keys(defaultCategories).map((val, idx) => (
                          <SelectItem
                            key={idx}
                            value={val}
                            className="capitalize"
                          >
                            {val}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                    Select category of your expense
                  </FormDescription> */}
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
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    autoComplete="true"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={`Select a ${transactionFieldsLabelMapper.method}`}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {/* <SelectLabel>
                          {transactionFieldsLabelMapper.method}
                        </SelectLabel> */}
                        {Object.keys(defaultPaymentMethods).map((val, idx) => (
                          <SelectItem
                            key={idx}
                            value={val}
                            className="capitalize"
                          >
                            {val}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>Select a payment method</FormDescription> */}
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

            {hasDate && (
              <FormField
                control={form.control}
                name={transactionFields.dateAdded}
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Date of transaction</FormLabel>
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              new Date(field.value).toLocaleString(
                                {},
                                { dateStyle: "medium" }
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(e) => {
                            if (e !== undefined) {
                              field.onChange(e);
                              setIsCalendarOpen(false);
                            }
                          }}
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1970-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button onClick={form.reset} type="button" variant="ghost">
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
