import { prisma } from "@/database";
import { Management } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | Management[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getManagement(req, res);

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const getManagement = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const management = await prisma.management.findMany();

  await prisma.$disconnect();

  return res.status(200).json(management);
};
