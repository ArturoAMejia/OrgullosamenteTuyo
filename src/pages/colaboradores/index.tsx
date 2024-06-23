import { AdminLayout } from "@/components/admin/AdminLayout";
import { CreateUser } from "@/components/admin/user/CreateUser";
import { usersColumns } from "@/components/datatable/columns/UsersColumn";
import { DataTable } from "@/components/datatable/Datatable";
import { Loader } from "@/components/ui/Loader";
import { useGetUsers } from "@/hooks/admin/useUser";
import React from "react";

const ColaboradoresPage = () => {
  const { data, isLoading } = useGetUsers();
  
  return (
    <AdminLayout title="Colaboradores">
      <div className="flex justify-end">
        <CreateUser />
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
