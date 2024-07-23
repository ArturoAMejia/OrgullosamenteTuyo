import { prisma } from "@/database";
import { sendNotificationConfirmAccount } from "@/util/confirm-account";
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
      return sendConfirmAccount(req, res);
    case "PUT":
      return confirmAccount(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const sendConfirmAccount = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email es obligatorio" });

  await prisma.$connect();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    await prisma.$disconnect();
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const token = await prisma.confirmAccountToken.create({
    data: {
      userId: user.id,
    },
  });

  await prisma.$disconnect();

  await sendNotificationConfirmAccount(email, user.name, token.token);

  return res
    .status(200)
    .json({ message: "Correo enviado, revisa tu bandeja de entrada" });
};

const confirmAccount = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email es obligatorio" });

  await prisma.$connect();

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: new Date(Date.now()),
      twoFA: true,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json({ message: "Cuenta confirmada" });
};
