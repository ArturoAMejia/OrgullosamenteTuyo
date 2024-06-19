import { EditTeam } from "@/components/admin/team/EditTeam";
import { TeamDetails } from "@/components/admin/team/TeamDetails";
import { Team, TeamDetail, User } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// export interface IPainter extends painter {
//   person: person;

// }
interface ITeamDetail extends TeamDetail {
  user?: User;
}
export interface ITeam extends Team {
  TeamDetail?: ITeamDetail[];
}

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
  columnHelper.display({
    id: "members",
    header: "Detalle",
    cell: (info) => (
      <div className="flex justify-center">
        <TeamDetails team={info.row.original} />
      </div>
    ),
  }),
];
