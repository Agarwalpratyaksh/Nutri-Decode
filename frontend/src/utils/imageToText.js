import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path"; // Import the path module
import { fileURLToPath } from "url";

const genAI = new GoogleGenerativeAI("AIzaSyDScJ6BPocuM4L6t-nsA7J8nbSytHWjdNg");

// Converts local file information to base64
function fileToGenerativePart(filePath, mimeType) {
  try {
    const fileBuffer = fs.readFileSync(filePath); // Read file synchronously
    const base64Data = fileBuffer.toString("base64");
    return {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null; // Or throw the error if you want to stop execution
  }
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Use "gemini-pro" for image understanding

  const prompt =
    "Write the ingredients of this product from this image and list all the potentially dangerous ingredients."; // More specific prompt

  // Construct the absolute path to your image.  This is CRUCIAL.
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const imagePath = path.join(__dirname, "pepsi.jpeg");
  const mimeType = "image/jpeg"; // Or "image/png" if it's a PNG

  const imagePart = fileToGenerativePart(imagePath, mimeType);

  if (!imagePart) {
    console.error("Failed to process image. Exiting.");
    return;
  }

  try {
    const generatedContent = await model.generateContent([prompt, imagePart]);
    console.log(generatedContent.response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

run();
