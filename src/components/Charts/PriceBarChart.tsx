import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Product } from "../../types";

interface PriceBarChartProps {
  products: Product[];
}

const PriceBarChart: React.FC<PriceBarChartProps> = ({ products }) => {
  // Limit to 10 products for better readability
  const chartData = products.slice(0, 10).map((product) => ({
    name:
      product.title.length > 20
        ? `${product.title.substring(0, 20)}...`
        : product.title,
    price: product.price,
    discount: product.discountPercentage,
    stock: product.stock,
  }));

  return (
    <div className="bg-white rounded-xl shadow p-6 h-[400px]">
      <h2 className="text-xl font-bold mb-6">Product Price Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip
            formatter={(value) => [`$${value}`, "Value"]}
            labelFormatter={(label) => `Product: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="price"
            fill="#3b82f6"
            name="Price ($)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="discount"
            fill="#10b981"
            name="Discount (%)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceBarChart;
