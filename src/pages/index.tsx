import Image from "next/image";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { InspectionForm } from "@/components/admin/inspection/InspectionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scoreboard } from "@/components/admin/scores/Scoreboard";
import { useGetScoreboard } from "@/hooks/admin/useScoreboard";
import { Loader } from "@/components/ui/Loader";
import { ShowAvailableStations } from "@/components/admin/scores/ShowAvailableStations";
import { QuestionaryForm } from "../components/admin/questionary/QuestionaryForm";
import { useState } from "react";

const Home = ({ teams }) => {
  const { data, isLoading } = useGetScoreboard();

  const [image, setImage] = useState<boolean>(false);

  return (
    <AdminLayout title="Inicio">
      <div className="w-full flex justify-center ">
        {image === true ? (
          <div>
            <Image
              src="/img/form.png"
              alt="art"
              className="w-full h-full"
              width={750}
              height={750}
            />
          </div>
        ) : null}
      </div>
      <div className="flex justify-center">
        <Tabs defaultValue="scoreboard" className="">
          <TabsList className="flex justify-center ">
            <TabsTrigger value="scoreboard" onClick={() => setImage(false)}>
              Tabla de puntajes
            </TabsTrigger>
            <TabsTrigger value="form" onClick={() => setImage(true)}>
              Formulario de inspección
            </TabsTrigger>
            <TabsTrigger value="qa" onClick={() => setImage(true)}>
              Cuestionario
            </TabsTrigger>
          </TabsList>
          <TabsContent className="w-full" value="scoreboard">
            <div className="w-full static">
              <div className="relative">
                <div className="flex justify-center">
                  <Image
                    alt="brochazo"
                    src="/img/brochazo2.png"
                    width={400}
                    height={400}
                  />
                </div>
                <h2 className="text-2xl font-bold text-center my-4 absolute inset-x-0 top-0 text-white">
                  Tabla de posiciones
                </h2>
              </div>
            </div>

            <div className="mt-4">
              {isLoading ? <Loader /> : <Scoreboard teams={data.teams} />}
              {isLoading ? (
                <Loader />
              ) : (
                <div className="flex justify-center my-6">
                  <ShowAvailableStations
                    stationsTeam={data.availableStations}
                    test={data.stationsFinal}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent className="w-full" value="form">
            <InspectionForm />
          </TabsContent>
          <TabsContent className="w-full" value="qa">
            <QuestionaryForm />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Home;
