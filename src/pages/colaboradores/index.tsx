import { AdminLayout } from "@/components/admin/AdminLayout";
import { CreateUser } from "@/components/admin/user/CreateUser";
import { usersColumns } from "@/components/datatable/columns/UsersColumn";
import { DataTable } from "@/components/datatable/Datatable";
import { useGetUsers } from "@/hooks/admin/useUser";
import React from "react";

const ColaboradoresPage = () => {
  const { data, isLoading } = useGetUsers();
  console.log(data);
  return (
    <AdminLayout title="Colaboradores">
      <div className="flex justify-end">
        <CreateUser />
      </div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <DataTable columns={usersColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default ColaboradoresPage;

