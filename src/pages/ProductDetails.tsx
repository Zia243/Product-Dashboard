import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import {
  ArrowLeft,
  Package,
  DollarSign,
  Star,
  Tag,
  Truck,
  Shield,
  BarChart3,
} from "lucide-react";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentProduct, fetchProduct, isLoading } = useProductStore();

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id));
    }
  }, [id, fetchProduct]);

  if (isLoading || !currentProduct) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow p-4">
              <img
                src={currentProduct.thumbnail}
                alt={currentProduct.title}
                className="w-full h-96 object-contain rounded-lg"
              />
              <div className="grid grid-cols-4 gap-2 mt-4">
                {currentProduct.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${currentProduct.title} ${index + 1}`}
                    className="h-20 w-full object-cover rounded-lg cursor-pointer hover:opacity-90"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {currentProduct.category}
                  </span>
                  <h1 className="text-3xl font-bold mt-3">
                    {currentProduct.title}
                  </h1>
                  <p className="text-gray-600 mt-2">{currentProduct.brand}</p>
                </div>

                {currentProduct.discountPercentage > 0 && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                    -{currentProduct.discountPercentage}%
                  </div>
                )}
              </div>

              <div className="mt-6">
                <p className="text-gray-700">{currentProduct.description}</p>
              </div>

              {/* Price Section */}
              <div className="mt-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    ${currentProduct.price}
                  </span>
                  {currentProduct.discountPercentage > 0 && (
                    <>
                      <span className="ml-3 text-xl text-gray-500 line-through">
                        $
                        {(
                          currentProduct.price /
                          (1 - currentProduct.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                      <span className="ml-3 text-green-600 font-medium">
                        Save $
                        {(
                          currentProduct.price /
                            (1 - currentProduct.discountPercentage / 100) -
                          currentProduct.price
                        ).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="ml-2 font-semibold">Rating</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {currentProduct.rating}/5
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500" />
                    <span className="ml-2 font-semibold">Stock</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {currentProduct.stock}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                    <span className="ml-2 font-semibold">Weight</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {currentProduct.weight}kg
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-purple-500" />
                    <span className="ml-2 font-semibold">SKU</span>
                  </div>
                  <p className="text-lg font-bold mt-2">{currentProduct.sku}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">Shipping</p>
                    <p className="text-sm text-gray-600">
                      {currentProduct.shippingInformation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">Warranty</p>
                    <p className="text-sm text-gray-600">
                      {currentProduct.warrantyInformation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {currentProduct.tags && currentProduct.tags.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {currentProduct.reviews && currentProduct.reviews.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {currentProduct.reviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-6 last:border-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-sm text-gray-600">
                      {review.reviewerEmail}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
