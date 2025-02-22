import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "Provide the following details about the given food product in a clean, structured JSON format:\n\n\n\nA list of ingredients present in the product, including only the ingredient names.\n\nA health score out of 100, indicating how healthy the product is, along with a brief explanation of why it received that score.\n\nA list of harmful ingredients and their effects, highlighting those with significant negative health impacts.\n\nMacronutrient composition (e.g., carbohydrates, fats, proteins,calories) with their respective values.\n\nList of preservatives and additives present in the product.\n\nAllergen warnings (if applicable).\n\nGlycemic index (if available).\n\nA final assessment of whether the product is healthy or not, based on the ingredients and their effects.\n\nIf the food product is deemed healthy, return null in the appropriate places except healthy field and also give the proper number for the macronutrients \n\n",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function geminiRun(ourPrompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Give me the list of ingredients present in 'Coca cola' in the form of JSON with a health score out of 100, including:\n\nFill all the details and leave out the description of every ingredient. Only provide the ingredient names. Do not provide any additional information outside of the specified sections.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "ingredients": [\n    "Carbonated Water",\n    "Sugar",\n    "Caramel Color",\n    "Phosphoric Acid",\n    "Caffeine",\n    "Natural Flavors"\n  ],\n  "health_score": 20,\n  "health_score_explanation": "Coca-Cola receives a low health score due primarily to its high sugar content from both HFCS and sucrose.  These contribute empty calories, increasing the risk of weight gain, type 2 diabetes, heart disease, and dental problems.  While it contains water, the high sugar content can have a dehydrating effect. The presence of phosphoric acid also raises concerns about potential bone health issues.",\n  "harmful_ingredients": [\n    {\n      "ingredient": "Sugar",\n      "effects": "Contributes to weight gain, type 2 diabetes, and tooth decay."\n    },\n    {\n      "ingredient": "Phosphoric Acid",\n      "effects": "Can erode tooth enamel and potentially contribute to bone loss."\n    },\n    {\n      "ingredient": "Caffeine",\n      "effects": "Can cause anxiety, insomnia, and digestive issues in sensitive individuals."\n    }\n  ],\n  "macronutrients": {\n    "calories": "140",\n    "protein": "0g",\n    "fat": "0g",\n    "carbohydrates": "39g"\n  "sodium": "2mg",\n     },\n  "preservatives_additives": [\n    "Caramel Color"\n  ],\n  "allergen_warnings": [],\n  "glycemic_index": 63,\n  "healthy": false\n}\n```\n',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(ourPrompt);
  console.log(result.response.text());
  return result.response.text();
}


