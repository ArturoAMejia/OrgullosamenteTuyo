import { prisma } from "@/database";
import { checkUserEmailPassword } from "../../../../database/dbAuth";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]";
import { send2FACode } from "@/util/confirm-account";

type Data = {
  message: string;
  user?: any;
  twoFA?: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return loginUserAPI(req, res);
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}

const loginUserAPI = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { username, password } = req.body;

  const user = await checkUserEmailPassword(username, password);

  if (!user) {
    return res.status(401).json({ message: "Error al iniciar sesión" });
  }

  if (user.twoFA === true) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    await prisma.oTP.create({
      data: {
        userId: user.id,
        otp,
        expires: new Date(new Date().getTime() + 10 * 60000),
      },
    });
    await send2FACode(user.email, otp, user.name);
    return res
      .status(200)
      .json({ message: "Código de autorización enviado", user, twoFA: true });
  }

  return res
    .status(200)
    .json({ message: "Inicio de sesión exitoso", user, twoFA: false });
};
