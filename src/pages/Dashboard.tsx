import React, { useEffect } from "react";
import PriceBarChart from "../components/Charts/PriceBarChart";
import { useProductStore } from "../store/productStore";
import { Package, DollarSign, TrendingUp, Star } from "lucide-react";

const Dashboard: React.FC = () => {
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts(10, 0);
  }, [fetchProducts]);

  const stats = React.useMemo(() => {
    if (products.length === 0) {
      return {
        totalProducts: 0,
        avgPrice: 0,
        avgRating: 0,
        totalStock: 0,
      };
    }

    const totalPrice = products.reduce(
      (sum, product) => sum + product.price,
      0,
    );
    const totalRating = products.reduce(
      (sum, product) => sum + product.rating,
      0,
    );
    const totalStock = products.reduce(
      (sum, product) => sum + product.stock,
      0,
    );

    return {
      totalProducts: products.length,
      avgPrice: totalPrice / products.length,
      avgRating: totalRating / products.length,
      totalStock,
    };
  }, [products]);

  if (isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your products.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold mt-2">{stats.totalProducts}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>From API</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Price</p>
              <p className="text-2xl font-bold mt-2">
                ${stats.avgPrice.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">Per product average</div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold mt-2">
                {stats.avgRating.toFixed(1)}/5
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Customer satisfaction
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Stock</p>
              <p className="text-2xl font-bold mt-2">{stats.totalStock}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">Units available</div>
        </div>
      </div>

      {/* Chart */}
      <PriceBarChart products={products} />

      {/* Recent Products */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Recent Products</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-sm text-gray-600">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 font-semibold">${product.price}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1">{product.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
