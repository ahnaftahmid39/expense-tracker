import { Skeleton } from "@/components/ui/skeleton";
import {
  get5YearsBeforeArray,
  months,
  timePeriods,
  transactionFields,
} from "@/lib/constants";
import {
  capitalizeFirstLetter,
  getFirstDayFirstMomentOfMonth,
  getLastDayLastMomentOfMonth,
} from "@/lib/utils";
import { useTransactionStore } from "@/store/transactionStore";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Charts = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  let filteredTransactions = [...transactions];

  const currentDate = new Date();
  const currentMonthId = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const years = get5YearsBeforeArray();

  const [selectedMonth, setSelectedMonth] = useState(currentMonthId);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [period, setPeriod] = useState(timePeriods.yearly);

  const handleChangePeriod = (p) => {
    setPeriod(p);
  };

  const [dateQuery, setDateQuery] = useState({
    before: new Date(),
    after: new Date(0),
  });

  useEffect(() => {
    switch (period) {
      case timePeriods.all:
        setDateQuery({
          before: new Date(),
          after: new Date(0),
        });
        break;

      case timePeriods.yearly:
        setDateQuery({
          before: getLastDayLastMomentOfMonth(11, selectedYear),
          after: getFirstDayFirstMomentOfMonth(0, selectedYear),
        });
        break;

      case timePeriods.monthly:
        setDateQuery({
          before: getLastDayLastMomentOfMonth(selectedMonth, selectedYear),
          after: getFirstDayFirstMomentOfMonth(selectedMonth, selectedYear),
        });
        break;

      default:
        break;
    }
  }, [period, selectedMonth, selectedYear]);

  const handleChangeMonth = (val) => {
    setSelectedMonth(val);
  };
  const handleChangeYear = (val) => {
    setSelectedYear(val);
  };

  // handle dateQuery
  filteredTransactions = filteredTransactions.filter((t) => {
    const addedDate = new Date(t.dateAdded);
    return addedDate <= dateQuery.before && addedDate >= dateQuery.after;
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // category wise expense data
  const categoryWiseExpense = {};
  const categoryWiseExpenseData = [];
  filteredTransactions.forEach((t) => {
    if (!categoryWiseExpense[t[transactionFields.category]]) {
      categoryWiseExpense[t[transactionFields.category]] = 0;
    }
    categoryWiseExpense[t[transactionFields.category]] += t.amount;
  });
  Object.entries(categoryWiseExpense).forEach(([cat, exp]) => {
    categoryWiseExpenseData.push({ category: cat, expense: exp });
  });

  // monthwise expense data
  const monthWiseExpense = {};
  const monthWiseExpenseData = Object.entries(months).map(([monthId, _]) => ({
    monthId: monthId,
    expense: 0,
  }));
  filteredTransactions.forEach((t) => {
    const tDate = new Date(t[transactionFields.dateAdded]);
    if (!monthWiseExpense[tDate.getMonth()]) {
      monthWiseExpense[tDate.getMonth()] = 0;
    }
    monthWiseExpense[tDate.getMonth()] += t[transactionFields.amount];
  });

  monthWiseExpenseData.forEach((m) => {
    m.expense = monthWiseExpense[m.monthId] || 0;
  });

  return (
    <div className=" flex flex-col gap-4 w-full grow">
      <div className="flex gap-4">
        <Select
          value={period}
          onValueChange={handleChangePeriod}
          defaultValue={period}
          autoComplete="true"
        >
          <SelectTrigger className="md:max-w-[110px] capitalize">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.values(timePeriods).map((period, idx) => (
                <SelectItem key={idx} value={period} className="capitalize">
                  {`${period}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {period === timePeriods.monthly && (
          <Select
            value={selectedMonth}
            onValueChange={handleChangeMonth}
            defaultValue={selectedMonth}
            autoComplete="true"
          >
            <SelectTrigger className="md:max-w-[210px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(months).map((monthName, idx) => (
                  <SelectItem key={idx} value={idx} className="capitalize">
                    {`${monthName} ${
                      idx === currentMonthId ? "(Current)" : ""
                    }`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {(period === timePeriods.yearly || period === timePeriods.monthly) && (
          <Select
            value={selectedYear}
            onValueChange={handleChangeYear}
            defaultValue={selectedYear}
            autoComplete="true"
          >
            <SelectTrigger className="md:max-w-[180px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {years.map((year, idx) => (
                  <SelectItem key={idx} value={year} className="capitalize">
                    {`${year} ${year === currentYear ? "(Current)" : ""}`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
      {period === timePeriods.yearly && (
        <div className="flex grow flex-col">
          <span className="p-4 text-2xl">Expense in each month:</span>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthWiseExpenseData}>
              <CartesianGrid
                vertical={false}
                allowReorder="yes"
                className="text-muted-foreground/20"
                stroke="currentColor"
              />
              <XAxis
                dataKey="monthId"
                tickFormatter={(m) => months[m].substring(0, 3)}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                // tickLine={false}
                // axisLine={false}
                tickFormatter={(value) => `৳${value}`}
              />
              <Bar
                dataKey="expense"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
              <Tooltip
                wrapperClassName="bg-foreground text-background"
                className="bg-slate-400"
                contentStyle={{
                  background: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                  borderRadius: "var(--radius)",
                }}
                cursor={false}
                labelFormatter={(label) => months[parseInt(label)]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex grow flex-col">
        <div className="p-4 flex flex-col">
          <span className="text-2xl">Categorywise Expense Pie Chart:</span>
          <span className="text-muted-foreground">
            (Click/Hover on individual segments to view their stats):
          </span>
        </div>
        <ResponsiveContainer width={"100%"} height={400}>
          <PieChart
            width={"100%"}
            height={650}
            className="text-primary [&_*]:outline-none"
          >
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={categoryWiseExpenseData}
              cx="50%"
              cy="50%"
              innerRadius={120}
              outerRadius={140}
              fill="currentColor"
              stroke="none"
              dataKey="expense"
              onMouseEnter={onPieEnter}
              paddingAngle={4}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex grow flex-col">
        <span className="p-4 text-2xl">Categorywise Expense:</span>
        <ResponsiveContainer width={"100%"} height={350}>
          <BarChart data={categoryWiseExpenseData}>
            <CartesianGrid
              vertical={false}
              allowReorder="yes"
              className="text-muted-foreground/20"
              stroke="currentColor"
            />
            <XAxis
              dataKey="category"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(tick) => capitalizeFirstLetter(tick)}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              // tickLine={false}
              // axisLine={false}
              tickFormatter={(value) => `৳${value}`}
            />
            <Bar
              dataKey="expense"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        className="text-foreground"
        x={cx}
        y={cy}
        dy={-16}
        textAnchor="middle"
        fill="currentColor"
      >
        {capitalizeFirstLetter(payload.category)}
      </text>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor={"middle"}
        fill="currentColor"
      >{`৳${value}`}</text>
      <text
        x={cx}
        y={cy}
        dy={32}
        textAnchor={"middle"}
        className="text-muted-foreground"
        fill="currentColor"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {/* <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="currentColor"
      >{`Spent ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey + 8}
        dy={18}
        textAnchor={textAnchor}
        className="text-muted-foreground"
        fill="currentColor"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
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
