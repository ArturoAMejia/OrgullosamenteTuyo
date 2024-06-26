import { AsignTeam } from "@/components/admin/team/AsignTeam";
import { EditUser } from "@/components/admin/user/EditUser";
import { Badge } from "@/components/ui/badge";
import { useGetManagement } from "@/hooks/admin/useManagment";
import { TeamDetail, User } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export interface IUser extends User {
  TeamDetail?: TeamDetail;
}

const columnHelper = createColumnHelper<IUser>();

export const usersColumns: ColumnDef<IUser>[] = [
  columnHelper.accessor<"id", string>("id", {
    header: "Código",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"name", string>("name", {
    header: "Nombre completo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"email", string>("email", {
    header: "Correo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"username", string>("username", {
    header: "Usuario",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"TeamDetail", TeamDetail>("TeamDetail", {
    header: "Equipo Asignado",
    cell: (info) =>
      info.getValue()[0]?.team !== undefined ? (
        <Badge
          className={`text-white font-bold text-md ${
            info.getValue()[0]?.team.id === 1
              ? "bg-green-600"
              : info.getValue()[0]?.team.id === 2
              ? "bg-amber-400"
              : info.getValue()[0]?.team.id === 3
              ? "bg-red-500"
              : info.getValue()[0]?.team.id === 4
              ? "bg-slate-600"
              : info.getValue()[0]?.team.id === 5
              ? "bg-blue-700 "
              : ""
          }`}
        >
          {info.getValue()[0]?.team?.name}
        </Badge>
      ) : (
        <AsignTeam user={info.row.original} />
      ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Acciones",
    cell: (info) => (
      <div className="flex justify-center">
        <EditUser user={info.row.original} />
      </div>
    ),
  }),
];
