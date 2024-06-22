import { prisma } from "@/database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getScoreboard(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getScoreboard = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { week } = req.query

  await prisma.$connect()


  // const score = await prisma.pointPerWeek.groupBy({

  // })

  await prisma.$disconnect()
};
