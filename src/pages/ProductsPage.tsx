import React, { useEffect } from "react";
import ProductCard from "../components/Products/ProductCard";
import SearchBar from "../components/Products/SearchBar";
import { useProductStore } from "../store/productStore";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const ProductsPage: React.FC = () => {
  const {
    products,
    fetchProducts,
    isLoading,
    total,
    skip,
    limit,
    setSkip,
    searchQuery,
  } = useProductStore();

  useEffect(() => {
    fetchProducts(limit, skip);
  }, [fetchProducts, limit, skip]);

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const handlePrevious = () => {
    if (skip > 0) {
      setSkip(Math.max(0, skip - limit));
    }
  };

  const handleNext = () => {
    if (skip + limit < total) {
      setSkip(skip + limit);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "Browse our product catalog"}
          </p>
        </div>
        <SearchBar />
      </div>

      {isLoading && products.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
            <p className="text-2xl">📦</p>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            No products found
          </h3>
          <p className="text-gray-600 mt-2">
            {searchQuery
              ? `No products match "${searchQuery}"`
              : "No products available"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{skip + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(skip + limit, total)}
              </span>{" "}
              of <span className="font-medium">{total}</span> results
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevious}
                disabled={skip === 0 || isLoading}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setSkip((pageNum - 1) * limit)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="px-2">...</span>}
              </div>

              <button
                onClick={handleNext}
                disabled={skip + limit >= total || isLoading}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
