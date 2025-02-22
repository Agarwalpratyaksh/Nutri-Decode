import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const OcrPage = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    try {
      const base64Image = await convertImageToBase64(image);
      const analysisResult = await run(base64Image, image.type);
      const cleanedResult = analysisResult.replace(/```json|```/g, "");
      const parsedResult = JSON.parse(cleanedResult);
      setResult(parsedResult);
      console.log(parsedResult);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResult("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const convertImageToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  async function run(base64Image, mimeType) {
    const genAI = new GoogleGenerativeAI(
      import.meta.env.VITE_GEMINI_API_NEW_KEY
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt =
      "Give the whole output in JSON format, provide the ingredients of this product from this image, and list all potentially dangerous ingredients.";

    try {
      const parts = [
        { text: prompt },
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
      ];
      const result = await model.generateContent({ contents: [{ parts }] });
      return result.response.text();
    } catch (error) {
      console.error("Error generating content:", error);
      return "An error occurred during analysis.";
    }
  }

  return (
    // <div className="p-6 space-y-4">
    //   <input type="file" accept="image/*" onChange={handleImageChange} />
    //   <button
    //     onClick={handleAnalyze}
    //     disabled={!image || loading}
    //     className="bg-purple-500 text-white p-3 rounded-xl"
    //   >
    //     {loading ? "Analyzing..." : "Analyze Image"}
    //   </button>

    //   {result && result.ingredients && (
    //     <div className="space-y-4">
    //       <h2 className="text-xl font-semibold">Ingredients:</h2>
    //       <ul className="list-disc ml-6">
    //         {result.ingredients.map((ingredient, index) => (
    //           <li key={index}>{ingredient}</li>
    //         ))}
    //       </ul>

    //       <h2 className="text-xl font-semibold">Potentially Dangerous Ingredients:</h2>
    //       {result.potentially_dangerous_ingredients?.length > 0 ? (
    //         <ul className="list-disc ml-6">
    //           {result.potentially_dangerous_ingredients.map((item, index) => (
    //             <li key={index} className="text-red-500">
    //               <strong>{item.ingredient || item.name}:</strong> {item.reason}
    //             </li>
    //           ))}
    //         </ul>
    //       ) : (
    //         <p>No potentially dangerous ingredients found.</p>
    //       )}
    //     </div>
    //   )}

    //   {typeof result === "string" && <div>{result}</div>}
    // </div>

    <div className="p-8 space-y-6 max-w-3xl mx-auto">
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-purple-500 file:text-white hover:file:bg-purple-600"
        />
        <button
          onClick={handleAnalyze}
          disabled={!image || loading}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-xl transition disabled:bg-gray-300"
        >
          {loading ? 'Analyzing...' : 'Analyze Image'}
        </button>
      </div>
    </div>

    {result && result.ingredients && (
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Ingredients</h2>
        <ul className="list-disc ml-6 space-y-1">
          {result.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold">Potentially Dangerous Ingredients</h2>
        {result.potentially_dangerous_ingredients?.length > 0 ? (
          <ul className="list-disc ml-6 space-y-1">
            {result.potentially_dangerous_ingredients.map((item, index) => (
              <li key={index} className="text-red-500">
                <strong>{item.ingredient || item.name}:</strong> {item.reason || item.concerns}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">No potentially dangerous ingredients found.</p>
        )}
      </div>
    )}

    {typeof result === 'string' && (
      <div className="bg-white shadow-md rounded-xl p-6">
        <div>{result}</div>
      </div>
    )}
  </div>
  );
};

export default OcrPage;
