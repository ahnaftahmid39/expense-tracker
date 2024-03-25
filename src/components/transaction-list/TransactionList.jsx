import { mockTransactions } from "@/lib/mockData";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

const TransactionList = () => {
  return (
    <div className="flex flex-col h-full gap-4 w-full overflow-y-auto">
      {mockTransactions.map((t) => {
        return (
          <Card key={t.id}>
            <CardHeader>
              <CardTitle className="capitalize">{t.category}</CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Badge className={"capitalize"} variant={""}>
                  {t.method}
                </Badge>
                <></>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TransactionList;
