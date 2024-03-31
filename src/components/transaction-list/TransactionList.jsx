import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  transactionFields,
  transactionFieldsLabelMapper,
} from "@/lib/constants";
import DeleteAlert from "../add-or-edit-transaction/DeleteAlert";
import UpdateTransaction from "../add-or-edit-transaction/UpdateTransaction";
import {
  ArrowDown,
  ArrowUp,
  ArrowUp01,
  ArrowUpDown,
  SortAsc,
} from "lucide-react";
import { useTransactionStore } from "@/store/transactionStore";
import { useState } from "react";
import { useEffect } from "react";

const sortOrders = {
  asc: "asc",
  desc: "desc",
};

const TransactionList = ({ transactions }) => {
  const setOneSorter = useTransactionStore((state) => state.setOneSorter);
  const sorters = useTransactionStore((state) => state.sorters);
  const sorter = sorters[0] || { fieldName: "", order: sortOrders.asc };
  const handleSetSorter = (s) => {
    setOneSorter(s.fieldName, s.order);
  };

  return (
    <div className="flex flex-col grow w-full mb-8 md:mb-0 overflow-hidden rounded-lg border ">
      <Table className="hidden md:table">
        <TableHeader className="*:capitalize">
          <TableRow>
            <TableHead>
              <TableHeadWithSortIcon
                current={sorter}
                setCurrent={handleSetSorter}
                fieldName={transactionFields.category}
              />
            </TableHead>
            <TableHead>
              <TableHeadWithSortIcon
                current={sorter}
                setCurrent={handleSetSorter}
                fieldName={transactionFields.description}
              />
            </TableHead>
            <TableHead>
              <TableHeadWithSortIcon
                current={sorter}
                setCurrent={handleSetSorter}
                fieldName={transactionFields.method}
              />
            </TableHead>
            <TableHead>
              <TableHeadWithSortIcon
                current={sorter}
                setCurrent={handleSetSorter}
                fieldName={transactionFields.dateAdded}
              />
            </TableHead>
            <TableHead className="text-right">
              <TableHeadWithSortIcon
                current={sorter}
                setCurrent={handleSetSorter}
                fieldName={transactionFields.amount}
              />
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => {
            return (
              <TableRow key={t.id} className="odd:bg-card">
                <TableCell className="capitalize">{t.category}</TableCell>
                <TableCell>
                  {t.description === "" ? "--" : t.description}
                </TableCell>
                <TableCell>
                  <Badge>{t.method}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(t.dateAdded).toLocaleString(
                    {},
                    { dateStyle: "full" }
                  )}
                </TableCell>
                <TableCell className="text-right">{t.amount}</TableCell>
                <TableCell className="text-right flex justify-end">
                  <UpdateTransaction transaction={t} />
                  <DeleteAlert tid={t.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex flex-col overflow-auto">
        {transactions.map((t) => {
          return (
            <Card
              key={t.id}
              className="rounded-none md:hidden border-0 border-b"
            >
              <CardHeader>
                <CardTitle className="capitalize">{t.category}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex gap-2 justify-between">
                  <Badge className={"capitalize"} variant={""}>
                    {t.method}
                  </Badge>
                  <div className="text-lg">৳ {t.amount}</div>
                </div>
                <div className="text-muted-foreground">
                  {new Date(t.dateAdded).toLocaleString(
                    {},
                    { dateStyle: "full" }
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <UpdateTransaction transaction={t} />
                <DeleteAlert tid={t.id} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;

function TableHeadWithSortIcon({ setCurrent, current, fieldName }) {
  return (
    <Button
      onClick={() => {
        setCurrent({
          fieldName: fieldName,
          order:
            current.fieldName === fieldName
              ? current.order === sortOrders.asc
                ? sortOrders.desc
                : sortOrders.asc
              : sortOrders.asc,
        });
      }}
      variant="ghost"
      className="gap-2 p-0 hover:bg-transparent"
    >
      {transactionFieldsLabelMapper[fieldName]}
      {current.fieldName === fieldName && current.order === sortOrders.asc ? (
        <ArrowUp
          className={current.fieldName === fieldName ? "text-primary" : ""}
          size={20}
        />
      ) : (
        <ArrowDown
          className={current.fieldName === fieldName ? "text-primary" : ""}
          size={20}
        />
      )}
    </Button>
  );
}
