import { AdminLayout } from "@/components/admin/AdminLayout";
import { CreateTeam } from "@/components/admin/team/CreateTeam";
import { teamColumns } from "@/components/datatable/columns/TeamColumn";
import { DataTable } from "@/components/datatable/Datatable";

import { AuthProviders } from "@/components/ui/AuthProviders";
import { Button } from "@/components/ui/button";
import { useGetTeams } from "@/hooks";
import { getSession, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log({ session });

  const { data, isLoading } = useGetTeams();

  return (
    <AdminLayout title="Prueba">
      <div className="flex justify-end">
        <CreateTeam />
      </div>

      {isLoading ? (
        <p>cargando...</p>
      ) : (
        <DataTable columns={teamColumns} data={data} />
      )}
    </AdminLayout>
  );
}
