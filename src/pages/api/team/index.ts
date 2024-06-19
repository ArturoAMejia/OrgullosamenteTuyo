import { prisma } from "@/database";
import { Team } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | Team
  | Team[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getTeams(req, res);
    case "POST":
      return createTeam(req, res);
    case "PUT":
      return editTeam(req, res);
    case "PATCH":
      return deleteTeam(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const getTeams = async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.$connect();

  const teams = await prisma.team.findMany({
    select: {
      id: true,
      name: true,
      points: true,
      TeamDetail: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  await prisma.$disconnect();

  res.status(200).json(teams);
};

const createTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.body;

  await prisma.$connect();

  const t = await prisma.team.findFirst({
    where: {
      name,
    },
  });

  if (t)
    return res.status(400).json({ message: "Este equipo ya está registrado" });

  const team = await prisma.team.create({
    data: {
      name,
    },
  });

  await prisma.$disconnect();

  res.status(200).json(team);
};

const editTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  const { team } = req.body;

  await prisma.$connect();

  const t = await prisma.team.update({
    where: {
      id: team.id,
    },
    data: {
      name: team.name,
    },
  });

  await prisma.$disconnect();

  res.status(200).json(t);
};

const deleteTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  const { team } = req.body;

  await prisma.$connect();

  const t = await prisma.team.delete({
    where: {
      id: team.id,
    },
  });

  await prisma.$disconnect();

  res.status(200).json(t);
};
