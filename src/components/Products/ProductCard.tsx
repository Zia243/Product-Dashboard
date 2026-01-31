import React from "react";
import { Link } from "react-router-dom";
import { Package, Star, Tag } from "lucide-react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
              -{product.discountPercentage}%
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded">
              {product.category}
            </span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-1">
            {product.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Package className="h-4 w-4 mr-1" />
              {product.stock} left
            </div>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
