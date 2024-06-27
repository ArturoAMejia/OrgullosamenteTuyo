import { ITeam } from "@/components/datatable/columns/TeamColumn";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import React, { FC } from "react";

type Props = {
  team: ITeam;
};

export const TeamDetails: FC<Props> = ({ team }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="link">Ver detalles</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Detalles del Equipo</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{team.name}</h3>
              <div className="bg-primary px-3 py-1 text-primary-foreground rounded-full text-sm font-medium">
                {team.points} pts
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <h4 className="text-base font-medium">Miembros del Equipo</h4>
            <div className="grid gap-3">
              {team.TeamDetail.map((member) => (
                <div
                  key={team.id + member.id}
                  className="flex items-center gap-4"
                >
                  <Avatar>
                    {/* <AvatarImage src="/placeholder-user.jpg" /> */}
                    <AvatarFallback>
                      {member.user.name.split(" ")[0][0].toUpperCase()}
                      {member.user.name.split(" ")[1] &&
                        member.user.name.split(" ")[1][0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    {/* <p className="font-medium">{member.name}</p> */}
                    {member.user.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
