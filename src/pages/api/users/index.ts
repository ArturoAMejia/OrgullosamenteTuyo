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
      return updateUser(req, res);
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
      managementId: true,
      TeamDetail: {
        select: {
          team: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
      roleId: true,
    },
    orderBy: {
      userId: "asc",
    },
  });

  await prisma.$disconnect();

  res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await prisma.$connect();

  const { id, name, email, username, roleId } = req.body;

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      username,
      roleId,
    },
  });

  await prisma.$disconnect();

  res.status(200).json(user);
};
