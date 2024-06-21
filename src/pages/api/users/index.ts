import { IUser } from "@/components/datatable/columns/UsersColumn";
import { prisma } from "@/database";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | User
  | IUser[]
  | any;

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

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      TeamDetail: {
        select: {
          team: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  await prisma.$disconnect();

  res.status(200).json(users);
};
