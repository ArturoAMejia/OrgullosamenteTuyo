import { prisma } from "@/database";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getWeek } from "date-fns";

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

  await prisma.$connect();

  const teamId = await prisma.teamDetail.findFirst({
    where: {
      userId: session.user.sub,
    },
  });

  const t = await prisma.team.findMany();

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
    .slice()
    .sort((a, b) => b.points - a.points);

  const fr = await prisma.formResponse.findMany({
    where: {
      week,
    },
  });

  const stations = await prisma.station.findMany();

  const usersTeam = await prisma.teamDetail.findMany();

  const users = await prisma.user.findMany();

  const usersFinal = usersTeam.map((ut) => {
    const user = users.find((u) => u.id === ut.userId);
    return {
      teamId: ut.teamId,
      userId: user.userId,
    };
  });

  console.log(usersFinal);

  const availableStations = stations.filter((station) => {
    return !fr.some((f) => f.stationId === station.id);
  });

  const stationsFinal = availableStations.map((station) => {
    const users = usersFinal.find((u) => u.userId === station.userId);
    return {
      ...station,
      teamId: users.teamId,
    };
  });

  const groupedByTeamId = stationsFinal.reduce((acc, estacion) => {
    const { teamId, ...rest } = estacion;
    if (!acc[teamId]) {
      acc[teamId] = [];
    }
    acc[teamId].push({ rest, teamId });
    return acc;
  }, []);

  console.log(groupedByTeamId);

  await prisma.$disconnect();

  return res
    .status(200)
    .json({ teams, availableStations: groupedByTeamId.slice(1, 6) });
};
