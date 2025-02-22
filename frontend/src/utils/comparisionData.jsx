

  import { GoogleGenerativeAI } from "@google/generative-ai";
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "give the response in json format for the comparision b/w two food products",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 export async function runCompare(data) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "give me the response in json fromat for comparison b/w \"coca-cola\" and \"Frooti Mango Drink\" on the basis of nutritional value also give them a health grade where A is the best and D is the worst and this should be on the basis of how good they are for health"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"comparison\": {\n    \"product1\": {\n      \"name\": \"Coca-Cola\",\n      \"nutritional_value_per_100ml\": {\n        \"calories\": \"42 kcal\",\n        \"total_fat\": \"0g\",\n        \"saturated_fat\": \"0g\",\n        \"trans_fat\": \"0g\",\n        \"cholesterol\": \"0mg\",\n        \"sodium\": \"1mg\",\n        \"total_carbohydrate\": \"10.6g\",\n        \"dietary_fiber\": \"0g\",\n        \"total_sugars\": \"10.6g\",\n        \"protein\": \"0g\",\n        \"vitamin_d\": \"0mcg\",\n        \"calcium\": \"0mg\",\n        \"iron\": \"0mg\",\n        \"potassium\": \"0mg\"\n      },\n      \"health_grade\": \"D\",\n      \"health_grade_reason\": \"High sugar content, provides minimal nutritional value, and contributes to empty calories.\"\n    },\n    \"product2\": {\n      \"name\": \"Frooti Mango Drink\",\n      \"nutritional_value_per_100ml\": {\n        \"calories\": \"63 kcal\",\n        \"total_fat\": \"0g\",\n        \"saturated_fat\": \"0g\",\n        \"trans_fat\": \"0g\",\n        \"cholesterol\": \"0mg\",\n        \"sodium\": \"8mg\",\n        \"total_carbohydrate\": \"15.5g\",\n        \"dietary_fiber\": \"0.2g\",\n        \"total_sugars\": \"14.9g\",\n        \"protein\": \"0.1g\",\n         \"vitamin_d\": \"0mcg\",\n        \"calcium\": \"2mg\",\n        \"iron\": \"0.1mg\",\n        \"potassium\": \"17mg\"\n      },\n      \"health_grade\": \"D\",\n      \"health_grade_reason\": \"High sugar content, although it contains some small amount of fiber and vitamins, the sugar outweighs the benefits.\"\n    },\n    \"summary\": \"Both Coca-Cola and Frooti Mango Drink are high in sugar and offer limited nutritional benefits. Therefore, both are given a 'D' grade. These beverages should be consumed in moderation, if at all, as part of a balanced diet. Frooti has trace amounts of vitamins and fiber over Coca-Cola but overall nutritional value is very less for both of them.\"\n  }\n}\n```"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(data);
    console.log(result.response.text());
    return result.response.text();
  }
  
