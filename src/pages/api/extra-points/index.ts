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
      return giveExtraPoints(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const giveExtraPoints = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { formdata } = req.body;

  const { userId, questionaryId } = formdata;

  console.log(req.body);

  await prisma.$connect();

  const teamD = await prisma.teamDetail.findFirst({
    where: {
      userId,
    },
  });

  const team = await prisma.team.findFirst({ where: { id: teamD.teamId } });

  await prisma.team.update({
    where: {
      id: teamD.teamId,
    },
    data: {
      points: team.points + 5,
    },
  });

  await prisma.questionary.update({
    where: {
      id: questionaryId,
    },
    data: {
      status: true,
    },
  });
  await prisma.$disconnect();

  return res.status(200).json({ message: "Puntos extras asignados" });
};
