import { create } from "zustand";
import { Product, ProductsResponse } from "../types";

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  total: number;
  skip: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;

  fetchProducts: (limit?: number, skip?: number) => Promise<void>;
  fetchProduct: (id: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  setSkip: (skip: number) => void;
  setSearchQuery: (query: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  currentProduct: null,
  total: 0,
  skip: 0,
  limit: 10,
  isLoading: false,
  error: null,
  searchQuery: "",

  fetchProducts: async (limit = 10, skip = 0) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      );

      if (!response.ok) throw new Error("Failed to fetch products");

      const data: ProductsResponse = await response.json();

      set({
        products: data.products,
        total: data.total,
        limit: data.limit,
        skip: data.skip,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
        isLoading: false,
      });
    }
  },

  fetchProduct: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);

      if (!response.ok) throw new Error("Failed to fetch product");

      const data: Product = await response.json();

      set({
        currentProduct: data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch product",
        isLoading: false,
      });
    }
  },

  searchProducts: async (query: string) => {
    if (!query.trim()) {
      await useProductStore.getState().fetchProducts();
      return;
    }

    set({ isLoading: true, error: null, searchQuery: query });
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) throw new Error("Search failed");

      const data: ProductsResponse = await response.json();

      set({
        products: data.products,
        total: data.total,
        skip: data.skip,
        limit: data.limit,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Search failed",
        isLoading: false,
      });
    }
  },

  setSkip: (skip) => set({ skip }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
