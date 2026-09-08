import * as ai from "../services/ai.service.js";

export const getResult = async (req, res) => {
  try {
    const prompt = req.body?.prompt || req.query?.prompt;
    const result = await ai.generateResult(prompt);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
