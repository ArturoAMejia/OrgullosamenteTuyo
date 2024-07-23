import { AdminLayout } from "@/components/admin/AdminLayout";
import { CreateTeam } from "@/components/admin/team/CreateTeam";
import { teamColumns } from "@/components/datatable/columns/TeamColumn";
import { DataTable } from "@/components/datatable/Datatable";
import { Loader } from "@/components/ui/Loader";
import { useGetTeams } from "@/hooks";

type Props = {
  roleId?: number;
  emailVerified?: Date | null;
};

const TeamsPage: FC<Props> = ({ roleId, emailVerified }) => {
  const { data, isLoading } = useGetTeams();

  return (
    <AdminLayout title="Equipos" roleId={roleId} emailVerified={emailVerified}>
      <h1 className="text-center text-2xl font-bold mt-4">Equipos</h1>
      <div className="flex justify-end">
        <CreateTeam />
      </div>

      {isLoading ? <Loader /> : <DataTable columns={teamColumns} data={data} />}
    </AdminLayout>
  );
};

export default TeamsPage;

import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { FC } from "react";

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
