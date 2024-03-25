import { Skeleton } from "@/components/ui/skeleton";

const Charts = () => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 items-center self-center flex flex-col gap-2">
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
    </div>
  );
};

export default Charts;
