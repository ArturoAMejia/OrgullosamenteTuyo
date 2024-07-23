import Link from "next/link";
import React from "react";

const ConfirmAccountPageToken = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-9xl font-bold">Cuenta confirmada!</h1>
        <p className="text-2xl text-muted-foreground">
          Muchas gracias por confirmar tu cuenta.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default ConfirmAccountPageToken;

import { GetServerSideProps } from "next";
import { prisma } from "@/database";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.params;

  await prisma.$connect();

  const confirmAccountToken = await prisma.confirmAccountToken.findUnique({
    where: {
      token: token as string,
    },
  });

  if (confirmAccountToken.expires === true) {
    await prisma.$disconnect();
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await prisma.confirmAccountToken.update({
    where: { token: token as string },
    data: { expires: true },
  });

  await prisma.user.update({
    where: { id: confirmAccountToken.userId },
    data: { emailVerified: new Date(Date.now()) },
  });

  await prisma.$disconnect();
  return {
    props: {
      token: token as string,
    },
  };
};
