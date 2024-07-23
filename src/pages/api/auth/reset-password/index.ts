import { prisma } from "@/database";
import { sendResetPasswordEmail } from "@/util/resetPassword";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return sentResetPassword(req, res);
    case "PUT":
      return resetPassword(req, res)
    default:
      res.setHeader("Allow", ["POST", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const sentResetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  await prisma.$connect();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado" });
    return;
  }

  const token = await prisma.resetPasswordToken.create({
    data: {
      userId: user.id,
    },
  });

  await sendResetPasswordEmail(email, user.name, token.token);

  await prisma.$disconnect();

  res
    .status(200)
    .json({ message: "Token creado, revisa tu bandeja de entrada" });
};

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, password } = req.body;

  await prisma.$connect();

  const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
    where: {
      token,
    },
  });

  if (!resetPasswordToken) {
    res.status(404).json({ message: "Token no encontrado" });
    return;
  }

  if (resetPasswordToken.expired) {
    res.status(404).json({ message: "Token expirado" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: resetPasswordToken.userId,
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: bcrypt.hashSync(password),
    },
  });

  await prisma.resetPasswordToken.update({
    where: {
      token,
    },
    data: {
      expired: true,
    },
  });

  await prisma.$disconnect();

  res.status(200).json({ message: "Contraseña actualizada" });
}