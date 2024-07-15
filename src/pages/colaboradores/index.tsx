import { AdminLayout } from "@/components/admin/AdminLayout";
import { CreateUser } from "@/components/admin/user/CreateUser";
import { usersColumns } from "@/components/datatable/columns/UsersColumn";
import { DataTable } from "@/components/datatable/Datatable";
import { Loader } from "@/components/ui/Loader";
import { useGetUsers } from "@/hooks/admin/useUser";
import React, { FC } from "react";

type Props = {
  roleId?: number;
  emailVerified?: Date | null;
};

const ColaboradoresPage: FC<Props> = ({ roleId, emailVerified }) => {
  const { data, isLoading } = useGetUsers();
  const { data: management, isLoading: isLoadingManagment } =
    useGetManagement();

  return (
    <AdminLayout
      title="Colaboradores"
      roleId={roleId}
      emailVerified={emailVerified}
    >
      <h1 className="text-center text-2xl font-bold mt-4">Embajadores</h1>
      <div className="flex justify-end">
        {isLoadingManagment ? (
          <Loader />
        ) : (
          <CreateUser management={management} />
        )}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={usersColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default ColaboradoresPage;

import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useGetManagement } from "@/hooks/admin/useManagment";

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
