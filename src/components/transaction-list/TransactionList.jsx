import { mockTransactions } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { transactionFields } from "@/lib/constants";

const TransactionList = ({ transactions }) => {
  return (
    <div className="flex flex-col w-full h-[80svh] overflow-hidden rounded-lg border ">
      <Table className="hidden md:table">
        <TableHeader className="*:capitalize">
          <TableHead>{transactionFields.category}</TableHead>
          <TableHead>{transactionFields.description}</TableHead>
          <TableHead>{transactionFields.method}</TableHead>
          <TableHead>{transactionFields.createdAt}</TableHead>
          <TableHead className="text-right">
            {transactionFields.amount}
          </TableHead>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => {
            return (
              <TableRow key={t.id} className="odd:bg-secondary">
                <TableCell className="capitalize">{t.category}</TableCell>
                <TableCell>{t.description}</TableCell>
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
                  {new Date(t.createdAt).toLocaleString(
                    {},
                    { dateStyle: "full" }
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;
