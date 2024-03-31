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
  get5YearsBeforeArray,
  months,
  timePeriods,
  transactionFields,
} from "@/lib/constants";
import { Button } from "../ui/button";
import { CircleX, Delete } from "lucide-react";





const QueryControls = ({
  hasPeriodOption = false,
  customDateQuery = false,
  defaultPeriod = timePeriods.monthly,
}) => {
  const currentDate = new Date();
  const currentMonthId = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const years = get5YearsBeforeArray();

  const [selectedMonth, setSelectedMonth] = useState(currentMonthId);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [period, setPeriod] = useState(defaultPeriod);

  const setDateQuery = useTransactionStore((state) => state.setDateQuery);

  useEffect(() => {
    switch (period) {
      case timePeriods.all:
        setDateQuery();
        break;

      case timePeriods.yearly:
        setDateQuery(
          getLastDayLastMomentOfMonth(11, selectedYear),
          getFirstDayFirstMomentOfMonth(0, selectedYear)
        );
        break;

      case timePeriods.monthly:
        setDateQuery(
          getLastDayLastMomentOfMonth(selectedMonth, selectedYear),
          getFirstDayFirstMomentOfMonth(selectedMonth, selectedYear)
        );
        break;

      default:
        break;
    }
  }, [period, selectedMonth, selectedYear, setDateQuery]);

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
  const clearSorters = useTransactionStore((state) => state.clearSorters);
  const clearFilters = useTransactionStore((state) => state.clearFilters);

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

  const handleReset = () => {
    // local states
    setSelectedMonth(currentMonthId);
    setSelectedYear(currentYear);
    setCategory("");
    setMethod("");
    setPeriod(timePeriods.monthly);

    // global store
    clearFilters();
    clearSorters();
    setDateQuery(
      getLastDayLastMomentOfMonth(currentMonthId, currentYear),
      getFirstDayFirstMomentOfMonth(currentMonthId, currentYear)
    );
    setSearchText("");
  };

  const handleChangePeriod = (p) => {
    setPeriod(p);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
      {hasPeriodOption && (
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
      )}

      {((hasPeriodOption && period === timePeriods.monthly) ||
        !hasPeriodOption) && (
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
      )}

      {((hasPeriodOption &&
        (period === timePeriods.yearly || period === timePeriods.monthly)) ||
        !hasPeriodOption) && (
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
              className="flex items-center gap-2 my-2 justify-start w-full"
            >
              <CircleX />
              Remove cat
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
              <CircleX />
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

      <Input
        className="grow"
        placeholder="Search..."
        value={searchText}
        type="text"
        onChange={handleChangeSearch}
      />

      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

export default QueryControls;
