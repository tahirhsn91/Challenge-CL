import { Request, Response, NextFunction } from "express";
import { Ianswer } from "../interfaces/answer.interface";
import evaluateService from "../services";

export const evaluate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const hero = {
    rank: 0,
    description: req.body,
  };

  res
    .status(201)
    .json(await evaluateService.evaluate(req.body.answers as Array<Ianswer>));
};
