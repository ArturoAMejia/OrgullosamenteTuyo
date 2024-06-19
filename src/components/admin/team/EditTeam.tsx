import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { useEditTeam } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Team } from "@prisma/client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const teamSchema = z.object({
  name: z.string(),
});

type FormDataType = z.infer<typeof teamSchema>;

type Props = {
  team: Team;
};

export const EditTeam: FC<Props> = ({ team }) => {
  const editTeamMutation = useEditTeam();

  const form = useForm<FormDataType>({
    resolver: zodResolver(teamSchema),
    mode: "onChange",
    defaultValues: {
      name: team.name,
    },
  });

  const oneditTeam = async (data: FormDataType) => {
    try {
      await editTeamMutation.mutateAsync({ ...team, name: data.name });
      toast.success("Equipo actualizado correctamente");
      form.reset();
    } catch (error) {
      form.reset();
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar Equipo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Equipo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(oneditTeam)}
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
                <Button type="submit">Editar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
