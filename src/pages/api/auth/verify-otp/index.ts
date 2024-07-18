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
      return verifyOTP(req, res);

    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}

const verifyOTP = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { username, otp } = req.body;

  if (!username || !otp) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  await prisma.$connect();

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const otpVerify = await prisma.oTP.findFirst({
    where: {
      userId: user.id,
      otp,
    },
  });

  if (!otpVerify) {
    await prisma.$disconnect();
    return res
      .status(401)
      .json({ message: "Código de autorización incorrecto" });
  }

  if (new Date() > otpVerify.expires) {
    await prisma.$disconnect();
    return res.status(401).json({ message: "Código de autorización expirado" });
  }

  await prisma.oTP.delete({
    where: {
      id: otpVerify.id,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json({ message: "Código de autorización correcto" });
};
