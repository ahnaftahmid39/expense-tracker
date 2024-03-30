import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTransactionStore } from "@/store/transactionStore";
import {
  getFirstDayFirstMomentOfMonth,
  getLastDayLastMomentOfMonth,
} from "@/lib/utils";

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const get5YearsBeforeArray = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 5; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

const QueryControls = () => {
  const currentDate = new Date();
  const currentMonthId = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const years = get5YearsBeforeArray();

  const [selectedMonth, setSelectedMonth] = useState(currentMonthId);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const setDateQuery = useTransactionStore((state) => state.setDateQuery);

  useEffect(() => {
    setDateQuery(
      getLastDayLastMomentOfMonth(selectedMonth, selectedYear),
      getFirstDayFirstMomentOfMonth(selectedMonth, selectedYear)
    );
  }, [selectedMonth, selectedYear, setDateQuery]);

  const handleValueChange = (val) => {
    setSelectedMonth(val);
  };
  const handleValueChangeYear = (val) => {
    setSelectedYear(val);
  };
  return (
    <div className="flex gap-2 md:gap-4">
      {/* <Search />
      <Filter /> */}
      <Select
        value={selectedMonth}
        onValueChange={handleValueChange}
        defaultValue={selectedMonth}
        autoComplete="true"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.values(months).map((monthName, idx) => (
              <SelectItem key={idx} value={idx} className="capitalize">
                {`${monthName} ${idx === currentMonthId ? "(Current)" : ""}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={selectedYear}
        onValueChange={handleValueChangeYear}
        defaultValue={selectedYear}
        autoComplete="true"
      >
        <SelectTrigger className="w-full">
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
    </div>
  );
};

export default QueryControls;
