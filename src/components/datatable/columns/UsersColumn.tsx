import { EditTeam } from "@/components/admin/team/EditTeam";
import { Team, User } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// export interface IPainter extends painter {
//   person: person;
// }
export interface IUser extends User {}

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
  columnHelper.display({
    id: "actions",
    header: "Acciones",
    cell: (info) => (
      <div className="flex justify-center">
        {/* <EditTeam team={info.row.original} />
         */}
         acciones
      </div>
    ),
  }),
];
