import { Skeleton } from "@/components/ui/skeleton";
import { transactionFields } from "@/lib/constants";
import { useTransactionStore } from "@/store/transactionStore";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

const Charts = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  // get all the categories
  const results = {};
  transactions.forEach((t) => {
    if (!results[t[transactionFields.category]]) {
      results[t[transactionFields.category]] = 0;
    }
    results[t[transactionFields.category]] += t.amount;
  });

  // const data = {
  //   labels: Object.keys(results),
  //   datasets: [
  //     {
  //       data: Object.values(results),
  //       backgroundColor: getRandomHSLAColors(
  //         Object.keys(results).length,
  //         360,
  //         70,
  //         80,
  //         0.3
  //       ),
  //       borderColor: getRandomHSLAColors(
  //         Object.keys(results).length,
  //         360,
  //         70,
  //         80,
  //         0.8
  //       ),
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  // };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-foreground"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="w-[40rem] flex flex-col items-center gap-4">
      <Skeleton className="w-10/12 h-10/12 aspect-square rounded-full " />
      <div className="flex w-10/12 gap-4 my-2">
        <Skeleton className="w-1/2 h-8" />
        <Skeleton className="w-1/2 h-8" />
        <Skeleton className="w-1/2 h-8" />
      </div>
      <Skeleton className="w-10/12 h-10/12 aspect-video rounded-sm my-2" />
      <div className="flex w-10/12 gap-4">
        <Skeleton className="w-1/2 h-8" />
        <Skeleton className="w-1/2 h-8" />
        <Skeleton className="w-1/2 h-8" />
      </div>
    </div>
  );
};

export default Charts;
