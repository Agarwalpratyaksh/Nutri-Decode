import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import foodData from "./data/foodData.json";
import { geminiRun } from "./utils/productInfo";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Info() {
  const { name } = useParams();

  const [geminiData, setGeminiData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (geminiData) {
      console.log("geminiData updated:", geminiData);
    }
    handleGeminiCall();
  }, []);

  const getHealthGrade = (score) => {
    if (score >= 70 && score <= 100) {
      return "A";
    } else if (score >= 45 && score < 70) {
      return "B";
    } else if (score >= 20 && score < 45) {
      return "C";
    } else if (score >= 0 && score < 20) {
      return "D";
    }
    return "Invalid score";
  };
  const getHealthColor = (score) => {
    console.log("Health Score:", score); // Debug to check the score value
    if (score >= 70 && score <= 100) {
      return "bg-green-400";
    } else if (score >= 45 && score < 70) {
      return "bg-yellow-400";
    } else if (score >= 20 && score < 45) {
      return "bg-orange-400";
    } else if (score >= 0 && score < 20) {
      return "bg-red-600";
    }
    return ""; // Return an empty string if the score is invalid
  };

  const healthScore = geminiData?.health_score;
  const macronutrients = geminiData?.macronutrients;

  const data = {
    labels: [
      `Protein: ${macronutrients?.protein || 0}`, // Add quantity to the label
      `Fat: ${macronutrients?.fat || 0}`,
      `Carbohydrates: ${macronutrients?.carbohydrates || 0}`,
    ],
    datasets: [
      {
        data: [
          parseInt(macronutrients?.protein) || 0,
          parseInt(macronutrients?.fat) || 0,
          parseInt(macronutrients?.carbohydrates) || 0,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize according to the container
    plugins: {
      legend: {
        position: 'right', // Move the legend to the right
        labels: {
          font: {
            size: 14, // Adjust font size
          },
          padding: 7, // Adjust padding
          generateLabels: (chart) => {
            // Customize the legend labels to include the quantity
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, i) => ({
              text: label, // Use the label with the quantity
              fillStyle: datasets[0].backgroundColor[i],
              strokeStyle: datasets[0].backgroundColor[i],
              hidden: false,
              index: i,
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`; // Show tooltip with quantity
          },
        },
      },
    },
  };
  

  const handleGeminiCall = async () => {
    setLoading(true);
    const prompt = await geminiRun(
      `Give me the list of ingredients present in '${name}' in the form of JSON with a health score out of 100, including:Fill all the details and leave out the description of every ingredient. Only provide the ingredient names. Do not provide any additional information outside of the specified sections.`
    );
    console.log(typeof prompt);
    setGeminiData(JSON.parse(prompt));
    setLoading(false);
  };
  const product = foodData.products.find(
    (product) =>
      product.name.toLowerCase().replace(/\s+/g, "-") === name.toLowerCase()
  );

  if (!product) {
    return <div>Product not found</div>;
  }


  if(loading){
    return(
        <div>
            Loading ...
        </div>
    )
  }
  return (
    <div className="p-10 pl-40 pr-40 bg-green-100">
      <div className="flex flex-col gap-8">
        <div className="flex gap-24 items-center mb-6">
          <img
            src={product.image_url}
            alt="image"
            className="size-1/6 border-2 p-4 border-black rounded-md bg-white"
          ></img>
          <div>
            <p className="font-medium text-3xl">{product.name}</p>
            <p className="text-lg">{product.category}</p>
          </div>
          <div>
            <p className="text-white bg-purple-600 p-1 rounded-t-lg text-sm">
              Health Score
            </p>
            <p className="text-center bg-white text-3xl p-2 border-purple-600 border-2">
              {healthScore !== undefined
                ? getHealthGrade(healthScore)
                : "No score available"}
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border-purple-600 border-2">
           { geminiData?.healthy == false ? <p className="text-red-600 text-2xl font-bold">Not Healthy</p> : <p className="text-green-600 text-2xl font-bold">Healthy</p>}
          </div>
        </div>
        <div className="flex gap-16 h-64">
          {/* <div className="bg-purple-300 p-5 w-1/2 rounded-xl shadow-sm">
            <div className="flex gap-2 flex-col mb-4">
              <p className="text-3xl font-bold mb-3">Health Rating</p>
              <div className="flex gap-40 items-center">
                <div className="flex">
                  <div className="bg-red-600 h-6 w-16 rounded-lg"></div>
                  <div className="bg-orange-400 h-6 w-16 rounded-lg -ml-2"></div>
                  <div className="bg-yellow-400 h-6 w-16 rounded-lg -ml-2"></div>
                  <div className="bg-green-400 h-6 w-16 rounded-lg -ml-2"></div>
                </div>
                <p
                  className={`${getHealthColor(
                    healthScore
                  )} w-16 h-16 text-center p-3 text-3xl rounded-full`}
                >
                  {geminiData?.health_score}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mt-4">{geminiData?.health_score_explanation}</p>
            </div>
          </div> */}
      
      <div className="bg-purple-300 p-6 w-full lg:w-1/2 rounded-xl shadow-lg h-full overflow-auto no-scrollbar">
  <div className="flex gap-2 flex-col mb-6">
    <p className="text-3xl font-semibold text-center mb-3">Health Rating</p>
    <div className="flex justify-between items-center gap-4">
      {/* Health Bar and Markings */}
      <div className="flex-1">
        <div className="relative flex justify-center items-center gap-1">
          {/* Health Bar */}
          <div className="flex w-full max-w-xs justify-between items-center gap-2">
            <div className="bg-red-600 h-6 w-16 rounded-lg"></div>
            <div className="bg-orange-400 h-6 w-16 rounded-lg"></div>
            <div className="bg-yellow-400 h-6 w-16 rounded-lg"></div>
            <div className="bg-green-400 h-6 w-16 rounded-lg"></div>
          </div>
        </div>
        {/* Health Rating Markings */}
        <div className="flex justify-between w-full max-w-xs mt-2">
          <span className="text-sm text-center w-16">20</span>
          <span className="text-sm text-center w-16">45</span>
          <span className="text-sm text-center w-16">70</span>
          <span className="text-sm text-center w-16">100</span>
        </div>
      </div>

      {/* Circle showing health score */}
      <div className="flex-shrink-0">
        <p
          className={`${getHealthColor(healthScore)} w-16 h-16 flex items-center justify-center text-3xl font-bold rounded-full shadow-lg`}
        >
          {geminiData?.health_score}
        </p>
      </div>
    </div>
  </div>

  {/* Health Score Explanation */}
  <div className="flex flex-col gap-2">
    <p className="text-center mt-4 break-words max-w-full px-4">
      {geminiData?.health_score_explanation}
    </p>
  </div>
</div>


          
          <div className="bg-white p-6 rounded-xl shadow-lg overflow-hidden w-1/2">
  <h2 className="text-2xl font-semibold text-center mb-6">Macronutrients</h2>
  <div className="flex justify-start">

  <h4 className="">Calories: {geminiData?.macronutrients.calories} kCal</h4>
  </div>
  <div className="flex items-center justify-center">
    <div className="w-full md:w-3/4 lg:w-2/3 relative" > {/* Fixed height for the container */}
      <Doughnut data={data} options={options} />
    </div>
  </div>
</div>


        </div>
       
{/* last */}

<div className="flex gap-16">

<div className="bg-white p-6 rounded-xl shadow-lg overflow-hidden w-1/2">
<h1 className="text-2xl font-bold mb-3 text-center">All ingredients</h1>
<div className="grid grid-cols-2 gap-2">

{geminiData?.ingredients.map((ingredient, index) => (
    <div key={index} className="w-full  mb-2 border-2 border-purple-600 rounded-md px-4 py-1.5">
    <p>{ingredient}</p>
   
  </div>
))}
</div>



</div>
<div className="bg-white p-6 rounded-xl shadow-lg overflow-hidden w-1/2">
<h1 className="text-2xl font-bold mb-3 text-center">Additional information</h1>
    

<div className="flex-col gap-2">

{geminiData?.glycemic_index && <div>
    <h1>Glycemic Index : {geminiData?.glycemic_index}</h1>
</div>}


{geminiData?.preservatives_additives.length>0 && <div>
<h1>Preservative added: {geminiData.preservatives_additives.join(', ')}</h1>

</div> }

{(geminiData?.allergen_warnings && geminiData.allergen_warnings.length > 0) ? (
  <div>
    <h1>Allergen warnings: {geminiData.allergen_warnings.join(', ')}</h1>
  </div>
) : (
  <div>
    <h1>No allergen warnings</h1> {/* Display something if there are no warnings */}
  </div>
)}

{geminiData?.harmful_ingredients.length>0 && 
    <div>
    <h1 className="font-bold mb-2">Harmful ingredients:</h1>
<div className="grid grid-cols-2 gap-2">

{geminiData?.harmful_ingredients.map((ingredient, index) => (
    <div key={index} className="w-full  mb-1 border-2 border-purple-600 rounded-md px-4 py-1.5">
    <p>{ingredient.ingredient}</p>
   

  </div>
))}
</div>

</div>

}

</div>





</div>
</div>





      </div>
    </div>
  );
}

export default Info;
