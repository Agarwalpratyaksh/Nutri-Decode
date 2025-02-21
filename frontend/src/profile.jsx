import heart_full from './assets/heart_full.svg'

function Profile(){
    return(
        <div className="bg-green-100">
            <div className="grid grid-rows-4 grid-cols-4 gap-6 p-8">
                <div className="bg-white row-start-1 row-end-5 col-start-1 col-end-2 shadow-lg p-6">
                    <div className="flex mb-5">
                        <div className="bg-gray-300 w-36 h-36"></div>
                        <div className="text-sm p-2 mt-2">
                            <p className="text-2xl mb-2">Vipul Kohli</p>
                            <p>Male</p>
                            <p>19 years</p>
                            <p>5'9ft | 70 kgs</p>
                        </div>
                    </div>
                    <hr className="h-1 border-none bg-gray-400"></hr>
                    <div className="flex flex-col gap-0.5 pt-4 pb-4">
                        <p className="text-2xl">Levels</p>
                        <p className="ml-2">Knowledge : Novice</p>
                        <p className="ml-2">Activity : Moderate</p>
                        <p className="ml-2">Health : Normal</p>
                    </div>
                    <hr className="h-1 border-none bg-gray-400"></hr>
                    <div className="flex flex-col gap-0.5 pt-4 pb-4">
                        <p className="text-2xl">Allergies</p>
                        <div className="flex gap-2 flex-wrap pt-1">
                            <p className="bg-gray-200 max-w-fit p-1">Milk</p>
                            <p className="bg-gray-200 max-w-fit p-1">Egg</p>
                            <p className="bg-gray-200 max-w-fit p-1">Soybeans</p>
                            <p className="bg-gray-200 max-w-fit p-1">Peanuts</p>
                            <p className="bg-gray-200 max-w-fit p-1">Sesame</p>
                            <p className="bg-gray-200 max-w-fit p-1">Almonds</p>
                            <p className="bg-gray-200 max-w-fit p-1">Wheat</p>
                            <p className="bg-gray-200 max-w-fit p-1">Lobster</p>
                            <p className="bg-gray-200 max-w-fit p-1">Crab</p>
                        </div>
                    </div>
                    <hr className="h-1 border-none bg-gray-400"></hr>
                    <div className="flex flex-col gap-0.5 pt-4 pb-4">
                        <p className="text-2xl">Dietary Preferences</p>
                        <div className="flex gap-2 flex-wrap pt-1">
                            <p className="bg-gray-200 max-w-fit p-1">Veg</p>
                            <p className="bg-gray-200 max-w-fit p-1">Non-Veg</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 mt-12 items-center">
                        <button className="border-purple-400 border-2 w-60 rounded-lg p-1 text-xl text-purple-700">Edit Profile</button>
                        <button className="border-purple-400 border-2 w-60 rounded-lg p-1 text-xl text-red-600">Delete Account</button>
                    </div>
                </div>
                <div className="bg-white row-start-1 row-end-2 col-start-2 col-end-4 shadow-lg p-5">
                    <div className="flex ">
                        <p className="text-2xl mb-4 mr-auto">Favourites</p>
                        <p className="mt-1">View All</p>
                    </div>
                    <div className="ml-2 flex flex-wrap gap-5">
                        <div className="border-2 border-purple-400 rounded-lg p-2.5 flex gap-2">
                            <img src={heart_full} alt="heart_full" className='size-5'></img>
                            <p>Wholewheat Bread</p>
                        </div>
                        <div className="border-2 border-purple-400 rounded-lg p-2.5 flex gap-2">
                            <img src={heart_full} alt="heart_full" className='size-5'></img>
                            <p>Bread</p>
                        </div>
                        <div className="border-2 border-purple-400 rounded-lg p-2.5 flex gap-2">
                            <img src={heart_full} alt="heart_full" className='size-5'></img>
                            <p>Oats</p>
                        </div>
                        <div className="border-2 border-purple-400 rounded-lg p-2.5 flex gap-2">
                            <img src={heart_full} alt="heart_full" className='size-5'></img>
                            <p>Chips</p>
                        </div>
                        <div className="border-2 border-purple-400 rounded-lg p-2.5 flex gap-2">
                            <img src={heart_full} alt="heart_full" className='size-5'></img>
                            <p>Tofu</p>
                        </div>
                        <div className="border-2 border-purple-400 rounded-lg p-2.5 flex gap-2">
                            <img src={heart_full} alt="heart_full" className='size-5'></img>
                            <p>Sprite</p>
                        </div>
                        <div className="border-2 border-purple-400 rounded-lg p-2.5 flex gap-2">
                            <img src={heart_full} alt="heart_full" className='size-5'></img>
                            <p>Almond Milk</p>
                        </div>
                        <div className="border-2 border-purple-400 rounded-lg p-2.5 flex gap-2">
                            <img src={heart_full} alt="heart_full" className='size-5'></img>
                            <p>Cheese</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white row-start-1 row-end-2 col-start-4 col-end-5 shadow-lg p-5">
                    <p className="text-2xl">Family Profile</p>
                </div>
                <div className="bg-white row-start-2 row-end-5 col-start-2 col-end-3 shadow-lg p-5">
                    <div className="flex ">
                        <p className="text-2xl mb-4 mr-auto">Knowledge Center</p>
                        <p className="mt-1">View All</p>
                    </div>
                    <div className="ml-2 flex flex-col gap-5">
                        <div className="border-[3px] border-purple-400 rounded-lg p-2 pl-6">Acid Insoluble Ash</div>
                        <div className="border-[3px] border-purple-400 rounded-lg p-2 pl-6">BCAAs</div>
                        <div className="border-[3px] border-purple-400 rounded-lg p-2 pl-6">Fibre</div>
                        <div className="border-[3px] border-purple-400 rounded-lg p-2 pl-6">Water Soluble Vitamins</div>
                        <div className="border-[3px] border-purple-400 rounded-lg p-2 pl-6">Invisible Fat</div>
                        <div className="border-[3px] border-purple-400 rounded-lg p-2 pl-6">Added Sugars</div>
                        <div className="border-[3px] border-purple-400 rounded-lg p-2 pl-6">Fibre</div>
                        <div className="border-[3px] border-purple-400 rounded-lg p-2 pl-6">Water Soluble Vitamins</div>
                    </div>
                </div>
                <div className="bg-white row-start-2 row-end-5 col-start-3 col-end-4 shadow-lg p-5">
                    <p className="text-2xl">Diet Summary</p>
                </div>
                <div className="bg-white row-start-2 row-end-4 col-start-4 col-end-5 shadow-lg p-5">
                    <p className="text-2xl">Health history</p>
                </div>
                <div className="bg-white row-start-4 row-end-5 col-start-4 col-end-5 shadow-lg p-5">
                    <p className="text-2xl">Past Searched Products</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;