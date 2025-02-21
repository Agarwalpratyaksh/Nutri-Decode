import search from './assets/search.svg'
import { useEffect, useState } from 'react';
import arrow from './assets/arrow.svg'
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
import heart_empty from './assets/heart_empty.svg'
import heart_full from './assets/heart_full.svg'
import {Link} from 'react-router-dom'
import foodData from './data/products.json'
function Explore(){

    
    const [selectedAlergy, setSelectedAlergy] = useState(null);
    const [selectedPreference, setSelectedPreference] = useState(null);
    const [selectedOption,setSelectedOption]=useState("All categories");



    

    const [isOpen,setIsOpen]=useState(false);
    const [heart,setHeart]=useState([heart_empty,heart_empty,heart_empty,heart_empty,heart_empty,heart_empty,heart_empty,heart_empty,heart_empty,heart_empty])
    const options=['All categories','Meat','Chocolates & Desserts','Beverages','Munchies','Supplements']
    // const products=[[amul, 'Amul Milk'], [lays, "Lay's Chile Limon Potato Chips"], [bread, "English Oven Premium White Bread"], [pepsi, "Diet Pepsi"], [oats, "Quaker Oats"], [corn_flakes, "Kellog's Corn Flakes"], [protein, "Muscleblaze Biozyme Whey Protein"], [biscuit, "Nutri Choice Biscuit"], [ice_cream, "Baskin Robbins Very Berry Strawberry"], [flour,'Aashirvaad Wheat Flour']]




    const [products, setProducts] = useState([]);

    useEffect(() => {
      setProducts(foodData.food_products); 
    }, []);

    
    function toggleDropdown(){
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    function toggleHeart(index){
        const updated=[...heart];
        if(heart[index]==heart_empty){
            updated[index]=heart_full;
            setHeart(updated);
        }
        else{
            updated[index]=heart_empty;
            setHeart(updated);
        }
    }


    return(
        <div className="bg-green-100">
        {/*main*/}
            <div className="flex flex-col justify-center items-center p-10 gap-8">
                <div className="flex bg-white rounded-xl p-1 items-center justify-center mr-112 ml-112">
                    <input type="search" placeholder="Search your desired product" className="w-160 p-2 rounded-xl border-none focus:outline-none"></input>
                    <img src={search} alt="search" className="cursor-pointer size-6 mr-2"></img>
                </div>
                <div className='flex gap-16'>
                    <div className='flex flex-col gap-4 ml-6'>
                        <div onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}  className='flex bg-white p-4 w-76 h-fit rounded-lg'>
                            <div className='flex'>
                                <div className='mr-36 relative'>
                                    <button className='text-gray-400'>{selectedOption}</button>
                                        {isOpen&&
                                        <ul className='absolute z-1 bg-white w-64 p-4 rounded-lg'>
                                            {options.map((option,index)=>(
                                                <li key={index} className='cursor-pointer' onClick={()=>handleOptionClick(option)}>{option}</li>
                                            ))}
                                        </ul>}
                                </div>
                                <img src={arrow} alt="dropdown" className='cursor-pointer mb-auto'></img>
                            </div>
                        </div>
                        <p className='text-lg font-medium'>Filters</p>
                        <hr className='border-none bg-black h-0.5'></hr>
                        <p className='text-lg text-gray-500 -mb-1'>Allergies</p>
                        <div className='flex flex-wrap gap-3'>
                            <div className='flex gap-1'>
                                <input type="checkbox"></input>
                                <p>Milk</p>
                            </div>
                            <div className='flex gap-1'>
                                <input type="checkbox"></input>
                                <p>Fish</p>
                            </div>
                            <div className='flex gap-1'>
                                <input type="checkbox"></input>
                                <p>Peanuts</p>
                            </div>
                            <div className='flex gap-1'>
                                <input type="checkbox"></input>
                                <p>Soybeans</p>
                            </div>
                        </div>
                        <hr className='border-none bg-black h-0.5'></hr>
                        <p className='text-lg text-gray-500 -mb-1'>Dietary Preferences</p>
                        <div className='flex flex-wrap gap-3'>
                            <div className='flex gap-1'>
                                <input type="checkbox"></input>
                                <p>Vegetarian</p>
                            </div>
                            <div className='flex gap-1'>
                                <input type="checkbox"></input>
                                <p>Non-Vegetarian</p>
                            </div>
                            <div className='flex gap-1'>
                                <input type="checkbox"></input>
                                <p>Vegan</p>
                            </div>
                        </div>
                        <hr className='border-none bg-black h-0.5'></hr>
                        <p className='text-lg text-gray-500 -mb-1'>Prices</p>
                        <div className='flex flex-wrap gap-3'>
                            <div className='flex gap-1'>
                                <input type="checkbox"></input>
                                <p>0-500</p>
                            </div>
                            <div className='flex gap-1'>
                                <input type="checkbox"></input>
                                <p>500-1500</p>
                            </div>
                            <div className='flex gap-1'>
                                <input type="checkbox"></input>
                                <p>1500 and above</p>
                            </div>
                        </div>
                    </div>
                    {/* <div id="cards" className='flex flex-wrap gap-8 justify-center items-center'>
                        {products.map((product,index)=>(
                            <div key={index} className='bg-white w-60 h-94 shadow-sm rounded-lg p-5 flex flex-col'>
                                <div className='flex'>
                                    <img src={product[0]} alt="product" className='size-11/12 mt-9'></img>
                                    <img src={heart[index]} alt="heart" className='mb-auto ml-auto size-6' onClick={()=>toggleHeart(index)}></img>
                                </div>
                                <p className="mt-10 text-lg mb-2">{product[1]}</p>
                                <Link to={`/product/${product[1].replace(/\s+/g, '-')}`} className='text-sm text-purple-500 underline cursor-pointer mt-auto w-24'>Detailed Info</Link>
                            </div>
                        ))}
                        <button className='bg-purple-600 w-40 mt-8 h-14 p-4 text-white text-xl rounded-lg'>Load More</button>
                    </div> */}


                      <div id="cards" className='flex flex-wrap gap-8 justify-center items-center'>
                        {products.map((product,index)=>(
                            <div key={index} className='bg-white w-60 h-94 shadow-sm rounded-lg p-5 flex flex-col'>
                                <div className='flex'>
                                    <img src={product.image} alt="product" className='size-11/12 mt-9'></img>
                                    <img src={heart[index]} alt="heart" className='mb-auto ml-auto size-6' onClick={()=>toggleHeart(index)}></img>
                                </div>
                                <p className="mt-10 text-lg mb-2">{product.title}</p>
                                {/* <Link to={`/product/${product[1].replace(/\s+/g, '-')}`} className='text-sm text-purple-500 underline cursor-pointer mt-auto w-24'>Detailed Info</Link> */}
                            </div>
                        ))}
                        <button className='bg-purple-600 w-40 mt-8 h-14 p-4 text-white text-xl rounded-lg'>Load More</button>
                    </div>
                   
                </div>
                
            </div>
        </div>
    )
}

export default Explore;