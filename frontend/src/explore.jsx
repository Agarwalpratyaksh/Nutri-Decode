

import search from "./assets/search.svg";
import { useEffect, useState } from "react";
import arrow from "./assets/arrow.svg";
import { Link } from "react-router-dom";
import foodData from "./data/foodData.json";
import optionsData from "./data/options.json";

function Explore() {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );

  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedOption, setSelectedOption] = useState("All categories");
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const options = [
    "All categories",
    "Beverages",
    "Dairy",
    "Biscuits & Cookies",
    "Snacks",
    "Cereals",
    "Bakery",
    "Frozen Foods",
    "Instant Foods",
  ];

  useEffect(() => {
    if (searchQuery === "") {
      setProducts(foodData.products);
    } else {
      const filteredProducts = foodData.products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [searchQuery]);

  useEffect(() => {
    let filteredProducts = foodData.products;

    if (selectedOption !== "All categories") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedOption
      );
    }

    if (selectedAllergies.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => !selectedAllergies.includes(product.category)
      );
    }

    if (selectedDietaryPreferences.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        if (
          selectedDietaryPreferences.includes("Vegetarian") &&
          (product.diet_category !== "Vegetarian" && product.diet_category !== "Vegan")
        ) {
          return false;
        }

        if (
          selectedDietaryPreferences.includes("Non-Vegetarian") &&
          product.diet_category !== "Non-Vegetarian"
        ) {
          return false;
        }

        if (
          selectedDietaryPreferences.includes("Vegan") &&
          product.diet_category !== "Vegan"
        ) {
          return false;
        }

        return true;
      });
    }

    setProducts(filteredProducts);
  }, [selectedOption, selectedAllergies, selectedDietaryPreferences]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleCheckboxChange = (e, category) => {
    if (e.target.checked) {
      setSelectedAllergies((prev) => [...prev, category]);
    } else {
      setSelectedAllergies((prev) => prev.filter((item) => item !== category));
    }
  };

  const handleDietaryChange = (e, preference) => {
    if (e.target.checked) {
      setSelectedDietaryPreferences((prev) => [...prev, preference]);
    } else {
      setSelectedDietaryPreferences((prev) =>
        prev.filter((item) => item !== preference)
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-green-100 min-h-screen p-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-white rounded-xl p-2 items-center w-full max-w-4xl">
          <input
            type="search"
            placeholder="Search your desired product"
            className="flex-grow p-2 rounded-l-xl focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img
            src={search}
            alt="search"
            className="cursor-pointer w-6 h-6 mr-2"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Panel */}
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg w-full md:w-1/4">
          <div className="relative">
            <button 
              className="w-full text-left p-2 bg-gray-100 rounded-lg"
              onClick={toggleDropdown}
            >
              {selectedOption}
            </button>
            {isOpen && (
              <ul className="absolute z-10 bg-white w-full p-2 mt-1 rounded-lg shadow-lg max-h-40 overflow-auto">
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-lg font-medium">Filters</p>

          {/* Allergies */}
          <div>
            <p className="text-lg text-gray-500 mb-1">Allergies</p>
            <div className="flex flex-wrap gap-2">
              {optionsData.allergies.map((category, index) => (
                <label key={index} className="flex gap-1 items-center">
                  <input
                    type="checkbox"
                    checked={selectedAllergies.includes(category)}
                    onChange={(e) => handleCheckboxChange(e, category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Dietary Preferences */}
          <div>
            <p className="text-lg text-gray-500 mb-1">Dietary Preferences</p>
            <div className="flex flex-wrap gap-2">
              {optionsData.dietaryPreferences.map((preference, index) => (
                <label key={index} className="flex gap-1 items-center">
                  <input
                    type="checkbox"
                    checked={selectedDietaryPreferences.includes(preference)}
                    onChange={(e) => handleDietaryChange(e, preference)}
                  />
                  {preference}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
              <img
                src={product.image_url}
                alt="product"
                className="h-40 object-contain mb-4"
              />
              <p className="text-lg font-semibold">{product.name}</p>
              <Link
                to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-purple-500 underline mt-auto"
              >
                Detailed Info
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;

