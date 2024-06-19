import { prisma } from "./db";
import bcrypt from "bcryptjs";

export const oAuthUser = async (user: any, account: any, token: any) => {
  await prisma.$connect();

  const u = await prisma.user.findUnique({
    where: { username: user.username },
    select: {
      id: true,
      name: true,
      image: true,
      username: true,
    },
  });

  const a = await prisma.account.findFirst({
    where: {
      userId: user.id,
    },
  });

  await prisma.$disconnect();

  if (!a) {
    await prisma.$connect();
    await prisma.account.create({
      data: {
        access_token: token.accessToken,
        providerAccountId: account.providerAccountId,
        type: account.type,
        provider: account.provider,
        userId: user.id,
      },
    });

    await prisma.$disconnect();

    return user;
  }
};

export const checkUserEmailPassword = async (
  username: string,
  password: string
) => {
  console.log(username, password)
  await prisma.$connect();

  const u = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  console.log(`User from dbAuth ${u}`);

  await prisma.$disconnect();

  if (!u) {
    return null;
  }

  if (!bcrypt.compareSync(password, u.password || "")) {
    return null;
  }
  console.log(bcrypt.compareSync(password, u.password || ""))

  const { image, name, id } = u;

  return {
    image,
    name,
    id,
    username,
  };
};
