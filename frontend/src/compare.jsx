import React, { useState, useEffect } from "react";
import foodData from "./data/products.json"; // Import the JSON file

function Compare() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(foodData.food_products); 
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Food Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              className="w-full h-56 object-cover"
              src={product.image}
              alt={product.title}
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Calories:</strong> {product.calories} kcal
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Total Fat:</strong>{" "}
                {product.nutritional_contents.total_fat}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Sugars:</strong> {product.nutritional_contents.sugars}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Protein:</strong> {product.nutritional_contents.protein}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Compare;
