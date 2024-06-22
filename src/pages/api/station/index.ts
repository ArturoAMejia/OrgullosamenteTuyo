import { prisma } from "@/database";
import { Station } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | Station
  | Station[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getStation(req, res);
    case "POST":
      return createStation(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const getStation = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await prisma.$connect();

  const station = await prisma.station.findMany();

  await prisma.$disconnect();

  res.status(200).json(station);
};

const createStation = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { name, userId } = req.body;

  await prisma.$connect();

  const s = await prisma.station.findFirst({
    where: {
      name,
    },
  });

  if (s)
    return res
      .status(400)
      .json({ message: "Esta estación ya está registrada" });

  const station = await prisma.station.create({
    data: {
      name,
      userId
    },
  });

  await prisma.$disconnect();

  res.status(200).json(station);
};
