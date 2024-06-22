import { prisma } from "@/database";
import { FormResponse } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  eachWeekOfInterval,
  isWithinInterval,
  parseISO,
  addDays,
  startOfWeek,
  endOfWeek,
  getWeek,
} from "date-fns";

type Data =
  | {
      message: string;
    }
  | FormResponse
  | FormResponse[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getFormResponses(req, res);
    case "POST":
      return createFormResponse(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}
const getFormResponses = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const formResponses = await prisma.formResponse.findMany();

  await prisma.$disconnect();

  return res.status(200).json(formResponses);
};

const createFormResponse = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { formResponse } = req.body;

  console.log(req.body);
  console.log(formResponse.stationId);
  console.log(formResponse.userId.sub);
  console.log(formResponse.stationId === "");

  if (formResponse.stationId === "")
    return res
      .status(400)
      .json({ message: "El número de estación es requerido" });

  await prisma.$connect();

  const fr = await prisma.formResponse.findFirst({
    where: {
      userId: formResponse.userId.sub,
      stationId: Number(formResponse.stationId),
    },
  });

  console.log(fr);
  const fechaActual = new Date();

  const week = getWeek(fechaActual);

  if (fr !== null && fr.week === week) {
    return res
      .status(400)
      .json({ message: "Ya has respondido esta semana en esta estación" });
  }

  const formRes = await prisma.formResponse.create({
    data: {
      userId: formResponse.userId.sub,
      stationId: Number(formResponse.stationId),
      week: week,
    },
  });

  const team = await prisma.teamDetail.findFirst({
    where: {
      userId: formResponse.userId.sub,
    },
  });

  if (
    formResponse.labeledItems === "false" ||
    formResponse.separateItems === "false"
  ) {
    return res.status(200).json(formRes);
  }
  const p = await prisma.pointPerWeek.findFirst({
    where: {
      teamId: team.teamId,
      week,
    },
  });

  if (p) {
    await prisma.pointPerWeek.update({
      where: {
        id: p.id,
      },
      data: {
        points: p.points + 5,
      },
    });
  }

  const points = await prisma.pointPerWeek.create({
    data: {
      teamId: team.teamId,
      week,
      points: 5,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(formRes);
};
