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
      roleId: true,
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

    return u;
  }
};

export const registerSession = async (user: any, token: any) => {
  await prisma.$connect();

  const u = await prisma.user.findFirst({
    where: {
      username: user.username,
    },
  });

  if (!u) return null;

  await prisma.session.create({
    data: {
      sessionToken: token.accessToken,
      userId: u.id,
      expires: new Date(token.expires),
    },
  });
  await prisma.$disconnect();

  return u;
};

export const checkUserEmailPassword = async (
  username: string,
  password: string
) => {
  await prisma.$connect();

  const u = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  await prisma.$disconnect();

  if (!u) {
    return null;
  }

  if (!bcrypt.compareSync(password, u.password || "")) {
    return null;
  }

  const { image, name, id, roleId } = u;

  return u;
};
