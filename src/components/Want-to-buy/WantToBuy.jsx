import { Link, LucideTrash, Maximize, Trash, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const BuyItem = ({ description, amount, className, ...props }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={cn("border-b last-of-type:border-none", className)}
      {...props}
    >
      <div className="flex p-2 gap-4 lg:max-w-[30ch] text-ellipsis items-center">
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          {description}
        </p>
      </div>
      <div className="flex gap-4  px-2 items-center">
        <div className="gap-2 p-0 flex hover:bg-transparent">
          <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
            className="rounded-[4px] self-center box-border"
          />
          <span className="text-muted-foreground">Have spent</span>
        </div>
        <Button
          variant="ghost"
          className="p-0 gap-2 bg-transparent text-muted-foreground  hover:bg-transparent hover:scale-110 transition-transform"
        >
          <Trash size={20} />
          Remove
        </Button>
        <span className="text-primary ml-auto">৳{amount}</span>
      </div>
    </div>
  );
};

const WantToBuy = () => {
  return (
    <div className="flex flex-col flex-1 gap-2 border p-2 rounded-lg h-[40vh]">
      <div className="p-4 flex py-2 text-2xl justify-between font-bold">
        <span>Will spend</span>
        <span>
          <Maximize strokeWidth={1} />
        </span>
      </div>
      <div className="flex flex-col gap-2 border rounded-lg p-2  h-[40svh] overflow-auto">
        <BuyItem description={"Gotta buy a lamborgini"} amount={120000} />
        <BuyItem description={"Alu potol piaz"} amount={200} />
        <BuyItem description={"chocolate"} amount={10} />
        <BuyItem description={"gpu kinbo"} amount={120000} />
        <BuyItem description={"boi"} amount={120} />
      </div>
      <Button className="w-full mt-auto" variant="outline">
        Add one
      </Button>
    </div>
  );
};

export default WantToBuy;
