import { getServerSession } from "next-auth/next";
import { prisma } from "../../../database";
import type { NextApiRequest, NextApiResponse } from "next";
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
      return getQuestionaryResponse(req, res);
    case "POST":
      return createQuestionaryResponse(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const createQuestionaryResponse = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { questionaryResponse } = req.body;

  const session = (await getServerSession(req, res, authOptions)) as any;

  if (!session.user.sub || !questionaryResponse) {
    return res.status(400).json({ message: "Error al mandar el formulario" });
  }

  await prisma.$connect();

  const date = new Date();

  const week = getWeek(date);

  await prisma.questionary.create({
    data: {
      userId: session.user.sub,
      question1: questionaryResponse.question1,
      question2: questionaryResponse.question2,
      question3: questionaryResponse.question3,
      week,
    },
  });
  await prisma.$disconnect();

  return res.status(201).json({ message: "Formulario enviado con éxito" });
};

const getQuestionaryResponse = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const date = new Date();

  const week = getWeek(date);

  const questionary = await prisma.questionary.findMany({
    select: {
      user: true,
      id: true,
      question1: true,
      question2: true,
      question3: true,
    },
    where: {
      week: week,
      status: false,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(questionary);
};
