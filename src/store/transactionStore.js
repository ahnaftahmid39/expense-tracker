import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTransactionStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      filters: [],
      sorters: [],
      shouldPersist: true,
      dateQuery: {
        before: new Date().toISOString(),
        after: new Date(0).toISOString(),
      },

      addTransaction: (transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },

      removeTransaction: (transactionId) => {
        set((state) => ({
          transactions: state.transactions.filter(
            (t) => t.id === transactionId
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
        fieldName = "status",
        fieldValue = "pending",
        include = true
      ) => {
        set((state) => ({
          filters: [...state.filters, { fieldName, fieldValue, include }],
        }));
      },
      removeFilter: (idx) => {
        set((state) => {
          return { filters: state.filters.filter((_, i) => idx !== i) };
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
        set(() => ({
          sorters: [{ fieldName, order }],
        }));
      },

      setDateQuery: (before, after) => {
        set(() => ({
          dateQuery: {
            before: before || new Date().toISOString(),
            after: after || new Date(0).toISOString(),
          },
        }));
      },
    }),

    {
      partialize: (state) => {
        let persistStates = {
          shouldPersist: state.shouldPersist,
        };

        if (state.shouldPersist) {
          persistStates = {
            ...persistStates,
            transactions: state.transactions,
          };
        }

        return persistStates;
      },
    }
  )
);
