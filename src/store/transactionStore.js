import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTransactionStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      willSpend: [],
      filters: [],
      sorters: [],
      searchText: "",
      shouldPersist: true,
      dateQuery: {
        before: new Date(),
        after: new Date(0),
      },

      addWillSpend: (spend) => {
        set((state) => ({ willSpend: [...state.willSpend, spend] }));
      },

      removeWillSpend: (spendId) => {
        set((state) => ({
          willSpend: state.willSpend.filter((s) => s.id != spendId),
        }));
      },

      addTransaction: (transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },

      removeTransaction: (transactionId) => {
        set((state) => ({
          transactions: state.transactions.filter(
            (t) => t.id !== transactionId
          ),
        }));
      },

      updateTransaction: (transaction) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            transaction.id === t.id ? { ...t, ...transaction } : t
          ),
        }));
      },

      setSearchText: (search) => {
        set(() => ({ searchText: search }));
      },

      addFilter: (
        fieldName = "category",
        fieldValue = "Food",
        include = true
      ) => {
        set((state) => ({
          filters: [...state.filters, { fieldName, fieldValue, include }],
        }));
      },

      updateFilter: (fieldName, fieldValue, include = true) => {
        set((state) => ({
          filters: state.filters.map((f) => {
            if (f.fieldName === fieldName) {
              return { fieldName, fieldValue, include };
            }
            return f;
          }),
        }));
      },

      upAddFilter: (fieldName, fieldValue, include = true) => {
        if (get().filters.find((val, idx) => val.fieldName == fieldName)) {
          get().updateFilter(fieldName, fieldValue, include);
        } else {
          get().addFilter(fieldName, fieldValue, include);
        }
      },

      removeFilter: (fieldName) => {
        set((state) => {
          return {
            filters: state.filters.filter((f, i) => f.fieldName !== fieldName),
          };
        });
      },
      setOneFilter: (
        fieldName = "status",
        fieldValue = "pending",
        include = true
      ) => {
        set(() => ({
          filters: [{ fieldName, fieldValue, include }],
        }));
      },

      clearFilters: () => {
        set(() => ({
          filters: [],
        }));
      },
      clearSorters: () => {
        set(() => ({
          sorters: [],
        }));
      },
      addSorter: (fieldName = "priority", order = "asc") => {
        set((state) => ({
          sorters: [...state.sorters, { fieldName, order }],
        }));
      },
      removeSorter: (idx) => {
        set((state) => ({
          sorters: state.sorters.filter((_, i) => idx !== i),
        }));
      },
      setOneSorter: (fieldName = "priority", order = "asc") => {
        if (fieldName === "") return;
        set(() => ({
          sorters: [{ fieldName, order }],
        }));
      },

      setDateQuery: (before, after) => {
        set(() => ({
          dateQuery: {
            before: before || new Date(),
            after: after || new Date(0),
          },
        }));
      },

      setShouldPersist: (val) => set(() => ({ shouldPersist: val })),
    }),

    {
      name: "transaction-store",
      partialize: (state) => {
        let persistStates = {
          shouldPersist: state.shouldPersist,
        };

        if (state.shouldPersist) {
          persistStates = {
            ...persistStates,
            transactions: state.transactions,
            willSpend: state.willSpend,
          };
        }

        return persistStates;
      },
    }
  )
);
