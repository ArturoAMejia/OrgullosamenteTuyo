import { EditTeam } from "@/components/admin/team/EditTeam";
import { Team } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// export interface IPainter extends painter {
//   person: person;
// }
export interface ITeam extends Team {}

const columnHelper = createColumnHelper<ITeam>();

export const teamColumns: ColumnDef<ITeam>[] = [
  columnHelper.accessor<"id", string>("id", {
    header: "Código",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"name", string>("name", {
    header: "Nombre",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"points", number>("points", {
    header: "Puntos",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Acciones",
    cell: (info) => (
      <div className="flex justify-center">
        <EditTeam team={info.row.original} />
      </div>
    ),
  }),
];
