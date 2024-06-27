import { prisma } from "@/database";
import { FormResponse } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getWeek } from "date-fns";

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

  if (formResponse.stationId === "")
    return res
      .status(400)
      .json({ message: "El número de estación es requerido" });

  if (formResponse.labeledItems === "")
    return res.status(400).json({ message: "Seleccione una de las opciones" });

  if (formResponse.separateItems === "")
    return res.status(400).json({ message: "Seleccione una de las opciones" });

  if (
    formResponse.nonLabeledItems.length === 0 &&
    formResponse.labeledItems === "false"
  )
    return res.status(400).json({ message: "Seleccione al menos un elemento" });

  if (
    formResponse.nonSeparateItems.length === 0 &&
    formResponse.separateItems === "false"
  )
    return res.status(400).json({ message: "Seleccione al menos un elemento" });

  if (
    formResponse.solutionNonLabeledItems === "" &&
    formResponse.labeledItems === "false"
  )
    return res.status(400).json({ message: "Ingrese una solución" });

  if (
    formResponse.solutionNonSeparateItems === "" &&
    formResponse.separateItems === "false"
  )
    return res.status(400).json({ message: "Ingrese una solución" });

  await prisma.$connect();

  const fr = await prisma.formResponse.findFirst({
    where: {
      userId: formResponse.userId.sub,
      stationId: Number(formResponse.stationId),
    },
  });

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

  await prisma.formResponseDetail.create({
    data: {
      formResponseId: formRes.id,
      question2: formResponse.labeledItems,
      question3: formResponse.nonLabeledItems.toString(),
      question4: formResponse.separateItems,
      question5: formResponse.nonSeparateItems.toString(),
      question6: formResponse.solutionNonLabeledItems,
      question7: formResponse.solutionNonSeparateItems,
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
    const teamPoints = await prisma.team.findFirst({
      where: { id: team.teamId },
    });

    await prisma.team.update({
      where: {
        id: team.teamId,
      },
      data: {
        points: teamPoints.points + 5,
      },
    });

    await prisma.$disconnect();

    return res.status(200).json(formRes);
  }

  await prisma.pointPerWeek.create({
    data: {
      teamId: team.teamId,
      week,
      points: 5,
    },
  });

  const teamPoints = await prisma.team.findFirst({
    where: { id: team.teamId },
  });

  await prisma.team.update({
    where: {
      id: team.teamId,
    },
    data: {
      points: teamPoints.points + 5,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(formRes);
};
