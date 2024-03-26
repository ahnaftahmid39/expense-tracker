import { Skeleton } from "@/components/ui/skeleton";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { transactionFields } from "@/lib/constants";
import { getRandomHSLAColors } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);

const Charts = ({ transactions }) => {
  // get all the categories
  const results = {};
  transactions.forEach((t) => {
    if (!results[t[transactionFields.category]]) {
      results[t[transactionFields.category]] = 0;
    }
    results[t[transactionFields.category]] += t.amount;
  });

  const data = {
    labels: Object.keys(results),
    datasets: [
      {
        data: Object.values(results),
        backgroundColor: getRandomHSLAColors(
          Object.keys(results).length,
          360,
          70,
          80,
          0.3
        ),
        borderColor: getRandomHSLAColors(
          Object.keys(results).length,
          360,
          70,
          80,
          0.8
        ),
      },
    ],
  };

  const options = {
    responsive: true,
  };
  
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 flex flex-col gap-2">
      <div className="w-10/12 flex items-center ">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export const ChartSkeleton = () => {
  return (
    <>
      <Skeleton className="w-10/12 h-10/12 aspect-square rounded-full" />
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
    </>
  );
};

export default Charts;
