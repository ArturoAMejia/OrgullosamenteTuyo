import { prisma } from "@/database";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return updateUserInfo(req, res);

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const updateUserInfo = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { username, name, email, password } = req.body;

  const session = (await getServerSession(req, res, authOptions)) as any;

  if (!username) {
    return res
      .status(400)
      .json({ message: "El nombre de usuario es requerido" });
  }

  if (!name) {
    return res.status(400).json({ message: "El nombre es requerido" });
  }

  if (!email) {
    return res.status(400).json({ message: "El correo es requerido" });
  }

  if (!password) {
    return res.status(400).json({ message: "La contraseña es requerida" });
  }

  await prisma.$connect();

  await prisma.user.update({
    where: {
      id: session.user.sub,
    },
    data: {
      username,
      name,
      email,
      password,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json({ message: "Usuario actualizado" });
};
