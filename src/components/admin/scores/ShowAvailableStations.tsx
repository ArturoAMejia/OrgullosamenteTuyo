import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";

type Props = {
  stationsTeam: any[];
  test: any[];
};

export const ShowAvailableStations: FC<Props> = ({ stationsTeam, test }) => {
  console.log(test);
  return (
    <Dialog>
      <DialogTrigger
        className="bg-[#42882B] text-white p-2 rounded-md font-semibold"
        type="button"
      >
        Ver estaciones
      </DialogTrigger>
      <DialogContent className="w-full overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-6">
            Estaciones pendientes de reportar
          </DialogTitle>

          <DialogDescription>
            <div className="grid grid-cols-9 gap-2 overflow-auto">
              {stationsTeam.map((stations) =>
                stations.map((station) => (
                  <div
                    key={station.rest.id}
                    className="flex justify-center  text-white font-bold"
                  >
                    <Badge
                      className={`text-white font-bold text-md ${
                        station.teamId === 1
                          ? "bg-green-600"
                          : station.teamId === 2
                          ? "bg-amber-400"
                          : station.teamId === 3
                          ? "bg-red-500"
                          : station.teamId === 4
                          ? "bg-slate-600"
                          : station.teamId === 5
                          ? "bg-blue-700 "
                          : ""
                      }`}
                    >
                      <p>{station.rest.name.split(" ")[1]}</p>
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              className="bg-red-900 text-white"
              type="button"
              variant="secondary"
            >
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
