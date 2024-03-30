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
import { Input } from "../ui/input";
import {
  defaultCategories,
  defaultPaymentMethods,
  transactionFields,
  transactionFieldsLabelMapper,
} from "@/lib/constants";
import { Button } from "../ui/button";
import { Delete } from "lucide-react";

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

  const handleChangeMonth = (val) => {
    setSelectedMonth(val);
  };
  const handleChangeYear = (val) => {
    setSelectedYear(val);
  };
  const searchText = useTransactionStore((state) => state.searchText);
  const setSearchText = useTransactionStore((state) => state.setSearchText);
  const upAddFilter = useTransactionStore((state) => state.upAddFilter);
  const removeFilter = useTransactionStore((state) => state.removeFilter);

  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  const [category, setCategory] = useState("");
  const handleChangeCategory = (val) => {
    setCategory(val);
    upAddFilter(transactionFields.category, val);
  };

  const handleRemoveCategoryFilter = () => {
    setCategory("");
    removeFilter(transactionFields.category);
  };

  const [method, setMethod] = useState("");
  const handleChangeMethod = (val) => {
    setMethod(val);
    upAddFilter(transactionFields.method, val);
  };

  const handleRemoveMethodFilter = () => {
    setMethod("");
    removeFilter(transactionFields.method);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
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
                {`${monthName} ${idx === currentMonthId ? "(Current)" : ""}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

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

      <Input
        className="grow"
        placeholder="Search..."
        value={searchText}
        type="text"
        onChange={handleChangeSearch}
      />

      <Select
        value={category}
        onValueChange={handleChangeCategory}
        defaultValue={category}
        autoComplete="true"
      >
        <SelectTrigger className="capitalize md:max-w-[200px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {category !== "" && (
            <Button
              onClick={handleRemoveCategoryFilter}
              variant="ghost"
              className="flex gap-2 my-2 w-full "
            >
              <Delete />
              Remove
            </Button>
          )}
          <SelectGroup>
            {Object.keys(defaultCategories).map((cat, idx) => (
              <SelectItem key={idx} value={cat} className="capitalize">
                {cat}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={method}
        onValueChange={handleChangeMethod}
        defaultValue={method}
        autoComplete="true"
      >
        <SelectTrigger className="capitalize md:max-w-[200px]">
          <SelectValue placeholder="Payment Method" />
        </SelectTrigger>
        <SelectContent>
          {method !== "" && (
            <Button
              onClick={handleRemoveMethodFilter}
              variant="ghost"
              className="flex gap-2 my-2 w-full "
            >
              <Delete />
              Remove
            </Button>
          )}
          <SelectGroup>
            {Object.keys(defaultPaymentMethods).map((cat, idx) => (
              <SelectItem key={idx} value={cat} className="capitalize">
                {cat}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default QueryControls;
