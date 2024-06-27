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
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useCreateUser } from "@/hooks/admin/useUser";

import { zodResolver } from "@hookform/resolvers/zod";
import { Management } from "@prisma/client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const UserSchema = z.object({
  first_name: z.string(),
  lastname: z.string(),
  email: z.string().email({ message: "Correo inválido" }),
  managementId: z.string(),
});

type FormDataType = z.infer<typeof UserSchema>;

type Props = {
  management: Management[];
};

export const CreateUser: FC<Props> = ({ management }) => {
  const createUserMutation = useCreateUser();
  const form = useForm<FormDataType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      first_name: "",
      lastname: "",
      email: "",
      managementId: "1",
    },
  });

  const onCreateUser = async (data: FormDataType) => {
    try {
      await createUserMutation.mutateAsync(data);
      toast.success("Colaborador añadido correctamente");
      form.reset();
    } catch (error) {
      form.reset();
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar Colaborador</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Colaborador</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onCreateUser)}
          >
            <FormField
              control={form.control}
              name="first_name"
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
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="managementId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gerencia</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la gerencia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {management.map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.id.toString()}
                          >
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

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
