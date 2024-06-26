import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ShowAnswers } from "./ShowAnswers";
import { AsignExtraPoints } from "../scores/AsignExtraPoints";
import { Badge } from "@/components/ui/badge";

type Props = {
  data: any[];
};

export const QuestionaryTable: FC<Props> = ({ data }) => {
  return (
    <div>
      <Table className="w-full">
        <TableCaption>Todas las respuestas del cuestionario de la charlar realizada.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre Embajador</TableHead>
            <TableHead>Equipo</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((res) => (
            <TableRow key={res.id}>
              <TableCell className="font-medium">{res.user.name}</TableCell>
              <TableCell>
                <Badge
                  className={`text-white font-bold text-md ${
                    res.user.TeamDetail[0].team.id === 1
                      ? "bg-green-600"
                      : res.user.TeamDetail[0].team.id === 2
                      ? "bg-amber-400"
                      : res.user.TeamDetail[0].team.id === 3
                      ? "bg-red-500"
                      : res.user.TeamDetail[0].team.id === 4
                      ? "bg-slate-600"
                      : res.user.TeamDetail[0].team.id === 5
                      ? "bg-blue-700 "
                      : ""
                  }`}
                >
                  {res.user.TeamDetail[0].team.name}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(res.createdAt), "dd/MM/yyyy")}{" "}
              </TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <ShowAnswers answers={res} />
                <AsignExtraPoints questionaryId={res.id} userId={res.user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
