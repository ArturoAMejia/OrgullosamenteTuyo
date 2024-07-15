import { prisma } from "@/database";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { sendNotificationResetPassword } from "@/util/resetPassword";


type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return resetPasswordAdmin(req, res);

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

const resetPasswordAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;
  const { newPassword } = req.body;

  await prisma.$connect();

  const user = await prisma.user.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const password = await prisma.passwordHistory.findFirst({
    where: {
      userId: id as string,
      password: bcrypt.hashSync(newPassword),
    },
  });

  if (password) {
    return res
      .status(400)
      .json({ message: "La contraseña no puede ser igual a las anteriores" });
  }

  await prisma.user.update({
    where: {
      id: id as string,
    },
    data: {
      password: bcrypt.hashSync(newPassword),
    },
  });

  await prisma.passwordHistory.create({
    data: {
      userId: user.id,
      password: user.password,
    },
  });

  await prisma.$disconnect();

  await sendNotificationResetPassword(user.email, user.name);

  res.status(200).json({ message: "Contraseña actualizada correctamente" });
};
