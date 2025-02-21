import search from "./assets/search.svg"
import chatbot from "./assets/chatbot.svg"

function Home(){
    return(
        //body
        <div className="bg-green-100">
        {/*main*/}
            <div className="flex flex-col justify-center items-center p-10 gap-8">
                <div className="flex">
                    <div className="flex bg-white rounded-xl p-1 items-center justify-center mr-112 ml-112">
                        <input type="search" placeholder="Find the Nutritional Facts of your Favourite Foods" className="w-160 p-2 rounded-xl border-none focus:outline-none"></input>
                        <img src={search} alt="search" className="cursor-pointer size-6 mr-2"></img>
                    </div>
                    <div className="flex border-purple-500 border-2 rounded-full size-14 items-center justify-center bg-purple-100">
                        <img src={chatbot} alt="chatbot" className="size-8"></img>
                    </div>
                </div>
                <div className="flex flex-col items-center bg-white p-3 shadow-sm rounded-lg">
                    <p className="mb-3 text-2xl font-medium">Healthy Tip Of The Day</p>
                    <div className="flex text-xl">
                        <p className="mr-1 text-purple-500">Eat Balanced Meals:</p>
                        <p>Include a mix of fruits, vegetables, lean proteins, and whole grains in your diet. Aim for variety to get a range of nutrients.</p>
                    </div>
                </div>
                <div>
                    <p className="text-2xl font-medium mb-2">Nutritional Snacks for Work</p>
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
                    </div>
                </div>
                <div>
                    <p className="text-2xl font-medium mb-2">Top Products Of The Month</p>
                    <div className="flex gap-14">
                        <div className="bg-white w-94 h-40 rounded-xl shadow-sm">

                        </div>
                        <div className="bg-white w-94 h-40 rounded-xl shadow-sm">

                        </div>
                        <div className="bg-white w-94 h-40 rounded-xl shadow-sm">

                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-2xl font-medium mb-2">Recommended Products</p>
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
                    </div>
                </div>
                <div className="w-112 ml-1200 mr-72 mt-8">
                    <p className="text-2xl font-medium mb-4 w-96">Get informed and make healthy choices with NutriDecode</p>
                    <div>
                        <input placeholder="Enter your email here" className="p-3 border-purple-600 border-2"></input>
                        <button className="text-white bg-purple-600 p-3 border-2 border-purple-600">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;