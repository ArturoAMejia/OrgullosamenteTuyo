import { Badge } from "@/components/ui/badge";
import React, { FC } from "react";

type Props = {
  teams: any;
};

export const Scoreboard: FC<Props> = ({ teams }) => {
  return (
    <div className="flex justify-center">
      <div>
        <h2 className="text-3xl font-bold text-center mb-4">Tabla de posiciones</h2>
        {teams.map((team) => (
          <section key={team.id} className="flex p-1">
            <div className="bg-[#046A38] py-3 px-2 rounded-l-md w-40">
              <h3 className="text-white font-bold text-md text-center ">
                {team.name}
              </h3>
              {/* <Badge
              className="text-white font-bold text-md"
              variant="outline"
              ></Badge> */}
            </div>
            <div className="bg-[#42882B] py-3 px-2 rounded-r-md w-24">
              <h3 className="text-white font-bold text-md text-center">
                {team.points}pts
              </h3>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
