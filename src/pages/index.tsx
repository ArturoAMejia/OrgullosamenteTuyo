import { AdminLayout } from "@/components/admin/AdminLayout";
import { InspectionForm } from "@/components/admin/inspection/InspectionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
  return (
    <AdminLayout title="Prueba">
      <div className="bg-[url('/img/pattern-paper.jpg')] grid grid-cols-1 gap-4 border-[#046A38] border-[12px] rounded-md p-4 w-auto">
        <div className="flex justify-center">
          <Image
            className="hidden md:block"
            src={"/img/logo.png"}
            alt="Logo"
            width={350}
            height={350}
          />
          <Image
            className="md:hidden"
            src={"/img/logo.png"}
            alt="Logo"
            width={250}
            height={250}
          />
        </div>
        <div className="flex justify-center items-center text-3xl font-bold gap-6 font-sans">
          <h1 className="text-center">
            Seguimiento a Estaciones <br />
            de Separación de Residuos
          </h1>
          <div>
            <Image
              className="hidden md:block"
              src={"/img/carbon-trust.png"}
              alt="Logo"
              width={150}
              height={150}
            />
            <Image
              className="md:hidden"
              src={"/img/carbon-trust.png"}
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
        </div>
        <h3 className="text-center mt-6 font-bold text-lg">
          Agradecemos tu apoyo llenando este formulario para <br />
          el seguimiento a la acción Cero Residuos. ¡Equipo de Embajadores
          Ambientales!
        </h3>
      </div>
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
