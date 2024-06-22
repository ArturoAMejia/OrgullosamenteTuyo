import { AdminLayout } from "@/components/admin/AdminLayout";
import { InspectionForm } from "@/components/admin/inspection/InspectionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { getWeek } from "date-fns";

type Props = {
  teams: any;
};

const Home: FC<Props> = ({ teams }) => {
  return (
    <AdminLayout title="Inicio">
      <div className="w-full flex justify-center ">
        <div>
          <Image
            src="/img/form.png"
            alt="art"
            className="w-full h-full"
            width={750}
            height={750}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Tabs defaultValue="scoreboard" className="">
          <TabsList className="flex justify-center ">
            <TabsTrigger value="scoreboard">Tabla de puntajes</TabsTrigger>
            <TabsTrigger value="form">Formulario de inspección</TabsTrigger>
            <TabsTrigger value="qa">Cuestionario</TabsTrigger>
          </TabsList>
          <TabsContent className="w-full" value="scoreboard">
            <Scoreboard teams={teams} />
          </TabsContent>
          <TabsContent className="w-full" value="form">
            <InspectionForm />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Home;

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { prisma } from "@/database";
import { Scoreboard } from "@/components/admin/scores/Scoreboard";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = (await getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  )) as any;

  console.log(session.user.sub);

  const teamId = await prisma.teamDetail.findFirst({
    where: {
      userId: session.user.sub,
    },
  });

  console.log(teamId.teamId);

  const teams = await prisma.team.findMany();

  const fechaActual = new Date();
  const week = getWeek(fechaActual);

  const points = await prisma.pointPerWeek.groupBy({
    by: ["week", "teamId"],
    _sum: {
      points: true,
    },
    where: {
      week,
    },
  });

  const scoreBoard = points.map((point) => {
    return {
      week: point.week,
      teamId: point.teamId,
      teamName: teams.find((team) => team.id === point.teamId).name,
      points: point._sum.points,
    };
  });

  const fr = await prisma.formResponse.findMany({
    where: {
      week,
    },
  });

  const stations = await prisma.station.findMany();

  const availableStations = stations.filter((station) => {
    return !fr.some((f) => f.stationId === station.id);
  });

  console.log(availableStations.length);
  console.log(stations.length);

  console.log(points);
  console.log(scoreBoard);

  return {
    props: {
      points,
      teams: JSON.parse(JSON.stringify(teams)),
    },
  };
};
