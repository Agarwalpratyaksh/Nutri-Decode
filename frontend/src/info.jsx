import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import amul from './assets/amul.jpeg'
import lays from './assets/lays.jpg'
import bread from './assets/bread.webp'
import pepsi from './assets/pepsi.jpg'
import oats from './assets/oats.jpg'
import corn_flakes from './assets/corn_flakes.jpg'
import protein from './assets/protein.webp'
import biscuit from './assets/biscuit.avif'
import ice_cream from './assets/icecream.webp'
import flour from './assets/flour.webp'

function Info() {
    const API_KEY=import.meta.env.VITE_API_KEY;
    const {name} =useParams();
    const [foodData,setFoodData]=useState(null);
    let description;
    let query;
    let image;
    let category;
    let ingre;
    let protein;
    let fat;
    let carbs;
    let energy;
    console.log(name);
    switch(name){
        case("Amul-Milk"):
            query="MILK";
            image=amul;
            description='Amul Milk is a high-quality, pasteurized, and homogenized dairy product known for its purity and rich nutritional value, sourced from the Amul cooperative in India.';
            break;
        case("Lay's-Chile-Limon-Potato-Chips"):
            query="Lay's Chile Limon Potato Chips 9.5 Ounce Bag";
            image=lays;
            description='Chilli Lemon Lays are crispy potato chips seasoned with a tangy lemon flavor and a spicy kick of chili, offering a zesty and bold snacking experience.';
            break;
        case("English-Oven-Premium-White-Bread"):
            query="WHITE BREAD";
            description='English Oven White Bread is soft, freshly baked, and made from refined flour, offering a light and fluffy texture perfect for sandwiches and everyday toasts.';
            image=bread;
            break;
        case("Diet-Pepsi"):
            query="DIET PEPSI DRINK MIX";
            description='Diet Pepsi is a low-calorie, sugar-free cola beverage that delivers the classic Pepsi taste with zero sugar, ideal for calorie-conscious consumers.';
            image=pepsi;
            break;
        case("Quaker-Oats"):
            query="OATS";
            description='Quaker Oats are 100% whole grain oats, offering a nutritious, fiber-rich breakfast option that supports heart health and provides long-lasting energy.';
            image=oats;
            break;
        case("Kellog's-Corn-Flakes"):
            query="CORN FLAKES";
            description="Kellogg's Corn Flakes are crispy, golden flakes made from lightly toasted corn, providing a delicious and nutritious breakfast rich in essential vitamins and minerals."
            image=corn_flakes;
            break;
        case("Muscleblaze-Biozyme-Whey-Protein"):
            query="PROTEIN POWDER";
            image=protein;
            description='MuscleBlaze Whey Protein is a high-quality protein supplement designed to support muscle growth and recovery, packed with essential amino acids and fast-digesting whey.';
            break;
        case("Nutri-Choice-Biscuit"):
            query="BISCUIT";
            image=biscuit;
            description='Nutri Choice Biscuits are wholesome, fiber-rich snacks made with nutritious ingredients, offering a healthy and tasty option for guilt-free snacking.';
            break;
        case("Baskin-Robbins-Very-Berry-Strawberry"):
            query="ICE CREAM";
            image=ice_cream;
            description='BR (Baskin-Robbins) Ice Cream offers a wide variety of rich, creamy, and deliciously crafted flavors, making it a beloved treat for ice cream lovers worldwide.';
            break;
        case("Aashirvaad-Wheat-Flour"):
            query="WHEAT FLOUR";
            image=flour;
            description='Ashirvaad Wheat Flour is a premium quality, finely milled flour made from 100% whole wheat grains, ensuring superior taste and nutrition for your culinary creations.';
            break;
    }

    useEffect(()=>{
        const fetchFoodData = async (query) => {
            try {
              const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
                params: {
                  api_key: API_KEY,
                  query: query,
                  pageSize: 1
                }
              });
          
              const processedFoods = response.data.foods.map(food => ({
                description: food.description,
                foodCategory: food.foodCategory || 'Unknown',
                ingredients: food.ingredients || 'Not listed',
                servingSize: food.servingSize ? `${food.servingSize} ${food.servingSizeUnit || ''}` : 'Not specified',
                keyNutrients: food.foodNutrients
                  .filter(nutrient => ['Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Energy'].includes(nutrient.nutrientName))
                  .map(nutrient => ({
                    name: nutrient.nutrientName,
                    amount: nutrient.value,
                    unit: nutrient.unitName
                  }))
              }));
              console.log(processedFoods);

              setFoodData(processedFoods);
            } catch (error) {
              console.error('Error fetching food data:', error);
              throw error;
            }
          };

          fetchFoodData(query);
          
          
    },[API_KEY,query]);

    if(foodData!=null){
        category=foodData[0]["foodCategory"];
        ingre=foodData[0]["ingredients"];
        protein=foodData[0]["keyNutrients"][0]["amount"];
        fat=foodData[0]["keyNutrients"][1]["amount"];
        carbs=foodData[0]["keyNutrients"][2]["amount"];
        energy=foodData[0]["keyNutrients"][3]["amount"];
    }

    return (
        <div className="p-10 pl-40 pr-40 bg-green-100">
            <div className='flex flex-col gap-8'>
                <div className='flex gap-8 items-center mb-6'>
                    <img src={image} alt="image" className='size-1/6'></img>
                    <div>
                        <p className='font-medium text-3xl'>{name}</p>
                        <p className='text-lg'>{category}</p>
                        <p className='font-light'>{description}</p>
                    </div>
                    <div>
                        <p className='text-white bg-purple-600 p-1 rounded-t-lg text-sm'>Health Score</p>
                        <p className='text-center bg-white text-3xl p-2 border-purple-600 border-2'>B</p>
                    </div>
                    <div></div>
                </div>
                <div className='flex gap-32 h-64'>
                    <div className='bg-purple-300 p-5 w-1/2 rounded-xl shadow-sm'>
                        <div className='flex gap-2 flex-col mb-4'>
                            <p className='text-3xl'>Health Rating</p>
                            <div className='flex gap-40 items-center'>
                                <div className='flex'>
                                    <div className='bg-red-600 h-6 w-16 rounded-lg'></div>
                                    <div className='bg-orange-400 h-6 w-16 rounded-lg -ml-2'></div>
                                    <div className='bg-yellow-400 h-6 w-16 rounded-lg -ml-2'></div>
                                    <div className='bg-green-400 h-6 w-16 rounded-lg -ml-2'></div>
                                </div>
                                <p className='bg-yellow-200 w-16 h-16 text-center p-3 text-3xl rounded-full'>70</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-3xl'>Ingredients</p>
                            <p className='overflow-hidden h-13'>{ingre}</p>
                        </div>
                    </div>
                    <div className='bg-white p-5 w-1/2 rounded-xl shadow-sm'>
                        <p className='text-3xl mb-5'>Calorie Breakdown</p>
                        <div className='flex'>
                            <div className='bg-black h-24 w-24 rounded-full text-white flex flex-col justify-center items-center mr-28 ml-10'>
                                <p>{energy}</p>
                                <p>calories</p>
                            </div>
                            <ul className='list-disc'>
                                <li className='font-medium'>{fat} gram fat</li>
                                <li className='font-medium'>{carbs} gram carbs</li>
                                <li className='font-medium'>{protein} gram protein</li>
                            </ul>
                        </div>
                        <p className='ml-2 mt-6'>There are {energy} calories in {name}</p>
                    </div>
                </div>
                <div>
                    <p className="text-2xl font-medium mb-2">Similar Products</p>
                    <div className="flex gap-14">
                        <div className="bg-white w-40 h-40 rounded-xl shadow-sm">

                        </div>
                        <div className="bg-white w-40 h-40 rounded-xl shadow-sm">

                        </div>
                        <div className="bg-white w-40 h-40 rounded-xl shadow-sm">

                        </div>
                        <div className="bg-white w-40 h-40 rounded-xl shadow-sm">

                        </div>
                        <div className="bg-white w-40 h-40 rounded-xl shadow-sm">

                        </div>
                        <div className="bg-white w-40 h-40 rounded-xl shadow-sm">

                        </div>
                        <div className="bg-white w-40 h-40 rounded-xl shadow-sm">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;