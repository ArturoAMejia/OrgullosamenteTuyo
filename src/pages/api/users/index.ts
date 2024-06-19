import { prisma } from "@/database";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | User
  | User[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);
    case "POST":
      res.status(200).json({ message: "POST" });
      break;
    case "PUT":
      res.status(200).json({ message: "PUT" });
      break;
    case "DELETE":
      res.status(200).json({ message: "DELETE" });
      break;
    default:
      res.status(405).end();
      break;
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await prisma.$connect();

  const users = await prisma.user.findMany();

  await prisma.$disconnect();

  res.status(200).json(users);
};
