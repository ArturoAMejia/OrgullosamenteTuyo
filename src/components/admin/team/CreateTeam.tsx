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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateTeam } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const teamSchema = z.object({
  name: z.string(),
});

type FormDataType = z.infer<typeof teamSchema>;

export const CreateTeam = () => {
  const createTeamMutation = useCreateTeam();
  const form = useForm<FormDataType>({
    resolver: zodResolver(teamSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const onCreateTeam = async (data: FormDataType) => {
    try {
      await createTeamMutation.mutateAsync(data.name);
      toast.success("Equipo creado correctamente");
      form.reset();
    } catch (error) {
      form.reset();
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear Equipo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Equipo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onCreateTeam)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose>
                <Button className="bg-red-800">Cancelar</Button>
              </DialogClose>
              <DialogClose>
                <Button type="submit">Crear</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
