import { prisma } from "@/database";
import { FormResponse } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | FormResponse
  | FormResponse[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getFormResponses(req, res);
    case "POST":
      return createFormResponse(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}
const getFormResponses = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const formResponses = await prisma.formResponse.findMany();

  await prisma.$disconnect();

  return res.status(200).json(formResponses);
};

const createFormResponse = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { userId, stationId } = req.body;

  await prisma.$connect();

  const formResponse = await prisma.formResponse.create({
    data: {
      userId,
      stationId,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(formResponse);
};
