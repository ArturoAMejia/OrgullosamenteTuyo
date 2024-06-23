import { Badge } from "@/components/ui/badge";
import React, { FC } from "react";

type Props = {
  teams: any;
};

export const Scoreboard: FC<Props> = ({ teams }) => {
  const sortedTeams = teams.toSorted((a, b) => b.pointsPerWeek - a.pointsPerWeek);
  return (
    <div className="flex justify-center">
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">En total</h2>
        {teams.map((team) => (
          <section key={team.id} className="flex p-1">
            <div className="bg-[#046A38] py-3 px-2 rounded-l-md w-40 flex justify-center">
              {/* <h3 className="text-white font-bold text-md text-center "></h3> */}
              <Badge
                className={`text-white font-bold text-md ${
                  team.id === 1
                    ? "bg-green-600"
                    : team.id === 2
                    ? "bg-amber-400"
                    : team.id === 3
                    ? "bg-red-500"
                    : team.id === 4
                    ? "bg-slate-600"
                    : team.id === 5
                    ? "bg-blue-700 "
                    : ""
                }`}
              >
                {team.name}
              </Badge>
            </div>
            <div className="bg-[#42882B] py-3 px-2 rounded-r-md w-24">
              <h3 className="text-white font-bold text-md text-center">
                {team.points}pts
              </h3>
            </div>
          </section>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">Por semana</h2>
        {sortedTeams.map((team) => (
          <section key={team.id} className="flex p-1">
            <div className="bg-[#046A38] py-3 px-2 rounded-l-md w-40 flex justify-center">
              <Badge
                className={`text-white font-bold text-md ${
                  team.id === 1
                    ? "bg-green-600"
                    : team.id === 2
                    ? "bg-amber-400"
                    : team.id === 3
                    ? "bg-red-500"
                    : team.id === 4
                    ? "bg-slate-600"
                    : team.id === 5
                    ? "bg-blue-700 "
                    : ""
                }`}
              >
                {team.name}
              </Badge>
            </div>
            <div className="bg-[#42882B] py-3 px-2 rounded-r-md w-24">
              <h3 className="text-white font-bold text-md text-center">
                {team.pointsPerWeek}pts
              </h3>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
