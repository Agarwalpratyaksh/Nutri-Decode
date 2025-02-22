import React, { useState, useEffect } from "react";
import foodData from "./data/foodData.json";
import { runCompare } from "./utils/comparisionData";

function Compare() {
  const [categories] = useState([
    "Beverages",
    "Dairy",
    "Biscuits & Cookies",
    "Snacks",
    
    "Cereals",
    "Bakery",
    "Frozen Foods",
    "Instant Foods",
  ]);

  const [newProducts, setNewProducts] = useState([]);
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setProduct1(null); // Reset selected products when category changes
    setProduct2(null);
    setResponseData(null); // Reset response data
  };

  const handleProduct1Change = (event) => {
    const selected = newProducts.find((p) => p.name === event.target.value);
    setProduct1(selected);
  };

  const handleProduct2Change = (event) => {
    const selected = newProducts.find((p) => p.name === event.target.value);
    setProduct2(selected);
  };

  useEffect(() => {
    if (selectedCategory) {
      const filteredProducts = foodData.products.filter(
        (product) => product.category === selectedCategory
      );
      setNewProducts(filteredProducts);
    } else {
      setNewProducts([]);
    }
  }, [selectedCategory]);

  // 🔥 Automatically call Gemini API when both products are selected
  useEffect(() => {
    if (product1 && product2) {
      handleGeminiCall();
    }
  }, [product1, product2]);


  const getHealthGradeColor = (grade) => {
    if (grade === "A") return "text-green-500";
    if (grade === "B") return "text-yellow-500";
    if (grade === "C") return "text-orange-500";
    if (grade === "D") return "text-red-500";
    return "text-gray-500"; // Default color for unknown grades
  };
  

  // 🚀 Function to call the Gemini API
  async function handleGeminiCall() {
    const prompt = await runCompare(
      `give me the response in json format for comparison b/w "${product1.name}" and "${product2.name}" on the basis of nutritional value also give them a health grade where A is the best and D is the worst and this should be on the basis of how good they are for health`
    );
    setResponseData(JSON.parse(prompt));
    console.log(prompt)
  }

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-4">
        <label htmlFor="category-select" className="mr-2 font-semibold">
          Select Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded-lg p-2"
        >
          <option value="">--Select a Category--</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="font-semibold mb-2">Select First Product</h2>
          <select
            id="product1-select"
            value={product1?.name || ""}
            onChange={handleProduct1Change}
            className="border rounded-lg p-2 w-full mb-4"
          >
            <option value="">--Select a Product--</option>
            {newProducts.map((product, index) => (
              <option key={index} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          {product1 && (
            <div className="text-center">
              <img
                src={product1.image_url}
                alt={product1.name}
                className="w-40 h-40 object-contain mx-auto mb-2"
              />
              <h3 className="text-lg font-bold">{product1.name}</h3>
            </div>
          )}
        </div>

        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="font-semibold mb-2">Select Second Product</h2>
          <select
            id="product2-select"
            value={product2?.name || ""}
            onChange={handleProduct2Change}
            className="border rounded-lg p-2 w-full mb-4"
          >
            <option value="">--Select a Product--</option>
            {newProducts.map((product, index) => (
              <option key={index} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          {product2 && (
            <div className="text-center">
              <img
                src={product2.image_url}
                alt={product2.name}
                className="w-40 h-40 object-contain mx-auto mb-2"
              />
              <h3 className="text-lg font-bold">{product2.name}</h3>
            </div>
          )}
        </div>
      </div>

   

      {/* our table comparision */}
      {responseData && (
  <div className="mt-8 p-4 bg-green-100 rounded-lg">
    <h2 className="text-xl font-semibold mb-4 text-center">Product Comparison</h2>

    <div className="overflow-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-purple-300">
          <tr>
            <th className="p-4 border">Attribute</th>
            <th className="p-4 border">
              {responseData?.comparison?.product1?.name || "Product 1"}
            </th>
            <th className="p-4 border">
              {responseData?.comparison?.product2?.name || "Product 2"}
            </th>
          </tr>
        </thead>
        <tbody>

      
          {/* Health Grade with Conditional Coloring */}
          <tr className="text-center">
            <td className="p-4 border font-semibold">Health Grade</td>
            <td className={`p-4 border font-bold ${getHealthGradeColor(responseData?.comparison?.product1?.health_grade)}`}>
              {responseData?.comparison?.product1?.health_grade || "N/A"}
            </td>
            <td className={`p-4 border font-bold ${getHealthGradeColor(responseData?.comparison?.product2?.health_grade)}`}>
              {responseData?.comparison?.product2?.health_grade || "N/A"}
            </td>
          </tr>

          {/* Dynamic Nutritional Values */}
          {Object.keys(responseData?.comparison?.product1?.nutritional_value_per_100g || responseData?.comparison?.product1?.nutritional_value_per_100ml||{}).map((key) => (
            <tr key={key} className="text-center">
              <td className="p-4 border font-semibold capitalize">
                {key.replace(/_/g, " ")}
              </td>
              <td className="p-4 border">
                {responseData?.comparison?.product1?.nutritional_value_per_100g?.[key]|| responseData?.comparison?.product1?.nutritional_value_per_100ml?.[key] || "N/A"}
              </td>
              <td className="p-4 border">
                {responseData?.comparison?.product2?.nutritional_value_per_100g?.[key] ||responseData?.comparison?.product2?.nutritional_value_per_100ml?.[key] || "N/A"}
              </td>
            </tr>
          ))}

          {/* Health Grade Reason */}
          <tr className="text-center">
            <td className="p-4 border font-semibold">Health Grade Reason</td>
            <td className="p-4 border text-sm">
              {responseData?.comparison?.product1?.health_grade_reason || "No data available"}
            </td>
            <td className="p-4 border text-sm">
              {responseData?.comparison?.product2?.health_grade_reason || "No data available"}
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>

    {/* Summary */}
    <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Summary</h3>
      <p className="text-gray-700">
        {responseData?.comparison?.summary || "No summary available"}
      </p>
    </div>
  </div>
)}



    </div>
  );
}

export default Compare;
