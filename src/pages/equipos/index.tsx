import { AdminLayout } from "@/components/admin/AdminLayout";
import { CreateTeam } from "@/components/admin/team/CreateTeam";
import { teamColumns } from "@/components/datatable/columns/TeamColumn";
import { DataTable } from "@/components/datatable/Datatable";
import { Loader } from "@/components/ui/Loader";
import { useGetTeams } from "@/hooks";

export default function TeamsPage() {
  const { data, isLoading } = useGetTeams();

  return (
    <AdminLayout title="Prueba">
      <div className="flex justify-end">
        <CreateTeam />
      </div>

      {isLoading ? (
        <Loader/>
      ) : (
        <DataTable columns={teamColumns} data={data} />
      )}
    </AdminLayout>
  );
}
