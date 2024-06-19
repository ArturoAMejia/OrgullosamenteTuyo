import { AdminLayout } from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <AdminLayout title="Prueba">
      <div className="flex justify-center">
        <Tabs defaultValue="scoreboard" className="w-full">
          <TabsList>
            <TabsTrigger value="scoreboard">Tabla de puntajes</TabsTrigger>
            <TabsTrigger value="form">Formulario de inspección</TabsTrigger>
            <TabsTrigger value="qa">Cuestionario</TabsTrigger>
          </TabsList>
          <TabsContent value="scoreboard">TODO: Tabla de puntakes</TabsContent>
          <TabsContent value="form">TODO: Formulario de inspección</TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
