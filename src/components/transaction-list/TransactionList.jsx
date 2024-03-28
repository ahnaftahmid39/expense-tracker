import { mockTransactions } from "@/lib/mockData";
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

const TransactionList = ({ transactions }) => {
  return (
    <div className="flex flex-col w-full mb-8 md:mb-0 overflow-hidden rounded-lg border ">
      <Table className="hidden md:table">
        <TableHeader className="*:capitalize">
          <TableRow>
            <TableHead>{transactionFieldsLabelMapper.category}</TableHead>
            <TableHead>{transactionFieldsLabelMapper.description}</TableHead>
            <TableHead>{transactionFieldsLabelMapper.method}</TableHead>
            <TableHead>{transactionFieldsLabelMapper.createdAt}</TableHead>
            <TableHead className="text-right">
              {transactionFields.amount}
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
                  {new Date(t.createdAt).toLocaleString(
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
      <div className="flex flex-col">
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
                  {new Date(t.createdAt).toLocaleString(
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
