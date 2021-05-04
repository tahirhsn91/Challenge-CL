import { data } from "./data";
import { Ianswer } from "../interfaces/answer.interface";
import { Ievaluate } from "../interfaces/evaluate.interface";

export const evaluate = async (answers: Array<Ianswer>): Promise<Ievaluate> => {
  const response: Record<string, Record<"motivated" | "latent", number>> = {
    d: { motivated: 0, latent: 0 },
    i: { motivated: 0, latent: 0 },
    s: { motivated: 0, latent: 0 },
    c: { motivated: 0, latent: 0 },
  };

  answers.forEach((answer) => {
    const obj = data.find((x) => x.word === answer.description);
    if (obj) {
      if (answer.rank === 1) {
        response[obj.letter].motivated += obj.m;
      } else if (answer.rank === 4) {
        response[obj.letter].latent += obj.l;
      }
    }
  });

  return {
    d: response.d.motivated - response.d.latent,
    i: response.i.motivated - response.i.latent,
    s: response.s.motivated - response.s.latent,
    c: response.c.motivated - response.c.latent,
  };
};
