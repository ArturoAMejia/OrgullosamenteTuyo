import { AdminLayout } from "@/components/admin/AdminLayout";
import { InspectionForm } from "@/components/admin/inspection/InspectionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
  return (
    <AdminLayout title="Prueba">
      {/* <Image alt="Logo" src="/img/logo.svg" width={350} height={350} /> */}
      <div className="flex justify-center">
        <Tabs defaultValue="scoreboard" className="">
          <TabsList className="flex justify-center ">
            <TabsTrigger value="scoreboard">Tabla de puntajes</TabsTrigger>
            <TabsTrigger value="form">Formulario de inspección</TabsTrigger>
            <TabsTrigger value="qa">Cuestionario</TabsTrigger>
          </TabsList>
          <TabsContent className="w-full" value="scoreboard">
            TODO: Tabla de puntakes
          </TabsContent>
          <TabsContent className="w-full" value="form">
            <InspectionForm />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
