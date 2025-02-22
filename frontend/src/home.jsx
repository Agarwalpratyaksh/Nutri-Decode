

import search from "./assets/search.svg";
import homeLogo from './assets/main-logo.png';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-green-100 w-full p-8 min-h-screen flex flex-col md:flex-row justify-between items-center">
      <div className="m-auto md:ml-20 md:mt-36 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold my-5">See Beyond the Label</h1>
        <h6 className="text-2xl md:text-4xl font-medium">Know What You’re Really Eating</h6>

        <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start mt-10">
          <Link to={'/ocr'}>
            <button className="bg-purple-400 px-6 md:px-10 py-3 rounded-full flex items-center gap-2">
              <span><img src={search} alt="Scan" /></span>Scan Item
            </button>
          </Link>
          <Link to={'/explore'}>
            <button className="bg-purple-400 px-6 md:px-10 py-3 rounded-full flex items-center gap-2">
              Explore
            </button>
          </Link>
        </div>
      </div>
      
      <div className="mt-8 md:mt-0">
        <img src={homeLogo} className="h-64 md:h-112 mx-auto" alt="Home Logo" />
      </div>
    </div>
  );
}

export default Home;
