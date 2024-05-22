
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../database";


type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return register(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.$connect();

  const { first_name, lastname, email, password } = req.body;

  const e = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (e) return res.status(400).json({ message: "Este correo ya está en uso" });

  const user = await prisma.user.create({
    data: {
      name: first_name + " " + lastname,
      email,
      password: bcrypt.hashSync(password),
    },
  });

  return res.status(200).json(user);
};
