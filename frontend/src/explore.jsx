import search from "./assets/search.svg";
import { useEffect, useState } from "react";
import arrow from "./assets/arrow.svg";
import amul from "./assets/amul.jpeg";

import { Link } from "react-router-dom";
import foodData from "./data/foodData.json";


import optionsData from "./data/options.json";

function Explore() {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );

  const [searchQuery, setSearchQuery] = useState("");  // State for search input
  const [selectedOption, setSelectedOption] = useState("All categories");

  const [isOpen, setIsOpen] = useState(false);

  const options = [
    "All categories",
    "Dairy",
    "Snacks",
    "Meat",
    "Chocolates & Desserts",
    "Beverages",
    "Munchies",
    "Supplements",
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchQuery === "") {
      // If search query is empty, show all products
      setProducts(foodData.products);
    } else {
      // Filter products by product name, ignoring case
      const filteredProducts = foodData.products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [searchQuery]);


  useEffect(() => {
    console.log("Selected Option:", selectedOption);
    console.log("Selected Allergies:", selectedAllergies);

    // Filter products based on selected category and selected allergies
    let filteredProducts = foodData.products;

    // Step 1: Filter by category (if "All categories" is not selected)
    if (selectedOption !== "All categories") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedOption
      );
    }

    // Step 2: Filter by selected allergies (exclude products belonging to selected allergies)
    if (selectedAllergies.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => !selectedAllergies.includes(product.category)
      );
    }

    //todo 
    //step 3: filter by dietry prefrence
    if (selectedDietaryPreferences.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        // If the selected preferences include specific dietary categories like Vegan, Vegetarian, or Non-Vegetarian,
        // check if the product's diet_category matches any of the selected preferences.
        
        if (
          selectedDietaryPreferences.includes("Vegetarian") &&
          (product.diet_category !== "Vegetarian" && product.diet_category !== "Vegan") // Exclude Non-Vegetarian products if Vegetarian is selected
        ) {
          return false;
        }
        
        if (
          selectedDietaryPreferences.includes("Non-Vegetarian") &&
          (product.diet_category !== "Non-Vegetarian") // Exclude Vegetarian and Vegan products if Non-Vegetarian is selected
        ) {
          return false;
        }
    
        if (
          selectedDietaryPreferences.includes("Vegan") &&
          product.diet_category !== "Vegan" // Exclude products that are not Vegan if Vegan is selected
        ) {
          return false;
        }
        
        return true; // Allow products that match any of the selected dietary preferences
      });
    }
    

    // Step 4
    setProducts(filteredProducts);
  }, [selectedOption, selectedAllergies, selectedDietaryPreferences]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // allergies
  const handleCheckboxChange = (e, category) => {
    if (e.target.checked) {
      // Add category to selected allergies if checked
      console.log(selectedAllergies);
      setSelectedAllergies((prev) => [...prev, category]);
    } else {
      // Remove category if unchecked
      setSelectedAllergies((prev) => prev.filter((item) => item !== category));
    }
  };

  //dietry_prefrence
  const handleDietaryChange = (e, preference) => {
    console.log(selectedDietaryPreferences);
    if (e.target.checked) {
      // Add preference to selected dietary preferences if checked
      setSelectedDietaryPreferences((prev) => [...prev, preference]);
    } else {
      // Remove preference if unchecked
      setSelectedDietaryPreferences((prev) =>
        prev.filter((item) => item !== preference)
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
  
    <div className="bg-green-100">
  {/*main*/}
  <div className="flex flex-col justify-center items-center p-10 gap-8">
    <div className="flex bg-white rounded-xl p-1 items-center justify-center mr-112 ml-112">
      <input
        type="search"
        placeholder="Search your desired product"
        className="w-160 p-2 rounded-xl border-none focus:outline-none"
        value={searchQuery}  // Bind the search input to the state
        onChange={handleSearchChange}  // Update state when search input changes
      />
      <img
        src={search}
        alt="search"
        className="cursor-pointer size-6 mr-2"
      ></img>
    </div>
    
    <div className="flex w-full gap-16">
      {/* Filter Panel (Left side) */}
      <div className="flex flex-col gap-4 ml-6 w-1/4 min-w-[250px]">
        <div
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
          className="flex bg-white p-4 w-full h-fit rounded-lg"
        >
          <div className="flex">
            <div className="mr-36 relative">
              <button className="text-gray-400">{selectedOption}</button>
              {isOpen && (
                <ul className="absolute z-1 bg-white w-64 p-4 rounded-lg">
                  {options.map((option, index) => (
                    <li
                      key={index}
                      className="cursor-pointer"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <img
              src={arrow}
              alt="dropdown"
              className="cursor-pointer mb-auto"
            ></img>
          </div>
        </div>
        <p className="text-lg font-medium">Filters</p>
        <hr className="border-none bg-black h-0.5"></hr>

        {/* Allergies */}
        <div>
          <p className="text-lg text-gray-500 mb-1">Allergies</p>
          <div className="flex flex-wrap gap-3">
            {optionsData.allergies.map((category, index) => (
              <div key={index} className="flex gap-1">
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedAllergies.includes(category)} // Check if the category is selected
                  onChange={(e) => handleCheckboxChange(e, category)} // Handle checkbox change
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        </div>
        <hr className="border-none bg-black h-0.5"></hr>

        {/* Dietary Preferences */}
        <div>
          <p className="text-lg text-gray-500 mb-1">Dietary Preferences</p>
          <div className="flex flex-wrap gap-3">
            {optionsData.dietaryPreferences.map((preference, index) => (
              <div key={index} className="flex gap-1">
                <input
                  type="checkbox"
                  id={preference}
                  checked={selectedDietaryPreferences.includes(preference)} // If preference is selected, check the box
                  onChange={(e) => handleDietaryChange(e, preference)} // Handle checkbox change
                />
                <label htmlFor={preference}>{preference}</label>
              </div>
            ))}
          </div>
        </div>
        <hr className="border-none bg-black h-0.5"></hr>

        {/* Price Filters */}
        <p className="text-lg text-gray-500 -mb-1">Prices</p>
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1">
            <input type="checkbox"></input>
            <p>0-500</p>
          </div>
          <div className="flex gap-1">
            <input type="checkbox"></input>
            <p>500-1500</p>
          </div>
          <div className="flex gap-1">
            <input type="checkbox"></input>
            <p>1500 and above</p>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div
        id="cards"
        className="flex flex-wrap gap-8 justify-center items-center w-3/4 min-w-[650px]"
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white w-60 h-96 shadow-sm rounded-lg p-5 flex flex-col"
          >
            <div className="flex ">
              <div className="h-64 w-full mt-1  flex justify-center">
                <img
                  src={product.image_url}
                  alt="product"
                  className="h-full "
                ></img>
              </div>
            </div>
            <p className="mt-2 text-lg mb-2">{product.name}</p>

            <Link
              to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-purple-500 underline cursor-pointer mt-auto w-24"
            >
              Detailed Info
            </Link>
          </div>
        ))}
        <button className="bg-purple-600 w-40 mt-8 h-14 p-4 text-white text-xl rounded-lg">
          Load More
        </button>
      </div>
    </div>
  </div>
</div>

  );
}

export default Explore;
