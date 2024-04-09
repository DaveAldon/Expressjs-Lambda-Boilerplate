import { RequestHandler } from "express";

/**
 * @swagger
 * /v1/example/getExample:
 *   get:
 *     tags: [Example]
 *     summary: Returns an example response
 *     responses:
 *       200:
 *         description: Fetch successful
 */
const getExample: RequestHandler = async (req, res, next) => {
  res.status(200).json({ response: "Example is working!" });
  next();
  return;
};

export default getExample;
