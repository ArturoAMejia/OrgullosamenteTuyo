import Image from "next/image";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { InspectionForm } from "@/components/admin/inspection/InspectionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scoreboard } from "@/components/admin/scores/Scoreboard";
import { useGetScoreboard } from "@/hooks/admin/useScoreboard";
import { Loader } from "@/components/ui/Loader";
import { ShowAvailableStations } from "@/components/admin/scores/ShowAvailableStations";

const Home = ({ teams }) => {
  const { data, isLoading } = useGetScoreboard();

  console.log(data);
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
            <h2 className="text-3xl font-bold text-center my-4">
              Tabla de posiciones
            </h2>

            {isLoading ? <Loader /> : <Scoreboard teams={data.teams} />}
            {isLoading ? (
              <Loader />
            ) : (
              <div className="flex justify-center my-6">
                <ShowAvailableStations stationsTeam={data.availableStations} />
              </div>
            )}
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
