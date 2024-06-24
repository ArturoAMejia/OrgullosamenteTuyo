import React, { FC } from "react";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
  title: string;
};

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/img/logo.ico" type="image/x-icon" />
        <title>{title}</title>
      </Head>

      <div className="flex flex-col gap-4">
        <div className="bg-[#046A38] w-full h-20"></div>
        <main className="h-screen flex flex-col gap-8 justify-center items-center">
          {children}
        </main>
        <footer className="bg-[#42882B] w-full h-20"></footer>
      </div>
    </>
  );
};
