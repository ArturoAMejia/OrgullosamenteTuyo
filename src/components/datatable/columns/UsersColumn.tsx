import { AsignTeam } from "@/components/admin/team/AsignTeam";
import { EditTeam } from "@/components/admin/team/EditTeam";
import { EditUser } from "@/components/admin/user/EditUser";
import { Badge } from "@/components/ui/badge";
import { TeamDetail, User } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// export interface IPainter extends painter {
//   person: person;
// }
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
    header: "Usario",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"TeamDetail", TeamDetail>("TeamDetail", {
    header: "Equipo Asignado",
    cell: (info) =>
      info.getValue()[0]?.team !== undefined ? (
        <Badge variant="outline">{info.getValue()[0]?.team?.name}</Badge>
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
