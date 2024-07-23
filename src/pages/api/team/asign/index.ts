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
    case "POST":
      return asignUserTeam(req, res);

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const asignUserTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, teamId } = req.body;

  await prisma.$connect();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado" });
    return;
  }

  const team = await prisma.team.findUnique({
    where: {
      id: Number(teamId),
    },
  });

  if (!team) {
    res.status(404).json({ message: "Equipo no encontrado" });
    return;
  }

  const userTeam = await prisma.teamDetail.create({
    data: {
      userId,
      teamId: team.id,
    },
  });

  await prisma.$disconnect();

  res.status(200).json(userTeam);
};
