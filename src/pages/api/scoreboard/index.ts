import { prisma } from "@/database";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

type Data =
  | {
      message: string;
    }
  | any;

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
  const session = (await getServerSession(req, res, authOptions)) as any;
  console.log(session.user.sub);

  await prisma.$connect();

  const teamId = await prisma.teamDetail.findFirst({
    where: {
      userId: session.user.sub,
    },
  });

  console.log(teamId.teamId);

  const t = await prisma.team.findMany();

  const test = await prisma.team.findMany({
    select: {
      User: {
        select: {
          Station: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const fechaActual = new Date();
  const week = getWeek(fechaActual);

  const points = await prisma.pointPerWeek.groupBy({
    by: ["week", "teamId"],
    _sum: {
      points: true,
    },
    where: {
      week,
    },
  });

  const teams = t
    .map((team) => {
      const score = points.find((point) => point.teamId === team.id);
      return {
        ...team,
        pointsPerWeek: score ? score._sum.points : 0,
      };
    })
    .toSorted((a, b) => b.points - a.points);

  const fr = await prisma.formResponse.findMany({
    where: {
      week,
    },
  });

  const stations = await prisma.station.findMany();

  const availableStations = stations.filter((station) => {
    return !fr.some((f) => f.stationId === station.id);
  });

  // const availableStationsPerTeam = Object.groupBy(availableStations, "teamId");
  await prisma.$disconnect();

  return res.status(200).json({ teams });
};
