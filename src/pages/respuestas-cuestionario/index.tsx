import React, { FC } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Loader } from "../../components/ui/Loader";
import { useGetQuestionaryResponse } from "../../hooks/admin/useFormResponse";

type Props = {
  emailVerified?: Date | null;
  roleId?: number;
};

const QuestionaryResponsePage: FC<Props> = ({ roleId, emailVerified }) => {
  const { data, isLoading } = useGetQuestionaryResponse();
  return (
    <AdminLayout
      title="Respuestas de Cuestionario"
      roleId={roleId}
      emailVerified={emailVerified}
    >
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold">Respuestas de Cuestionario</h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center">
          <QuestionaryTable data={data} />
        </div>
      )}
    </AdminLayout>
  );
};

export default QuestionaryResponsePage;

import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { QuestionaryTable } from "@/components/admin/questionary/QuestionaryTable";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = (await getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  )) as any;

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.sub,
    },
  });

  return {
    props: {
      roleId: user.roleId,
      emailVerified: JSON.parse(JSON.stringify(user.emailVerified)),
    },
  };
};
