import * as ai from "../services/ai.service.js";

export const getResult = async (req, res) => {
  try {
    const { prompt } = req.body; // Assuming the prompt is sent in the request body

    const result = await ai.generateResult(prompt); // Call the service function to get the result from the AI model
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
