import React, { FC } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Loader } from "../../components/ui/Loader";
import { useGetQuestionaryResponse } from "../../hooks/admin/useFormResponse";
import { AsignExtraPoints } from "../../components/admin/scores/AsignExtraPoints";
import { ShowAnswers } from "../../components/admin/questionary/ShowAnswers";

type Props = {
  roleId?: number;
};

const QuestionaryResponsePage: FC<Props> = ({ roleId }) => {
  const { data, isLoading } = useGetQuestionaryResponse();
  return (
    <AdminLayout title="Respuestas de Cuestionario" roleId={roleId}>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold">Respuestas de Cuestionario</h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div>
            {data.map((res) => (
              <div className="flex flex-col" key={res.user.id}>
                <p>Nombre</p>
                <p>{res.user.name}</p>
                <ShowAnswers answers={res} />
                <AsignExtraPoints userId={res.user.id} questionaryId={res.id} />
              </div>
            ))}
          </div>
        </div>
        // JSON.stringify(data)
      )}
    </AdminLayout>
  );
};

export default QuestionaryResponsePage;

import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = (await getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  )) as any;
  console.log(session);
  const user = await prisma.user.findFirst({
    where: {
      id: session.user.sub,
    },
  });

  return {
    props: {
      roleId: user.roleId,
    },
  };
};
