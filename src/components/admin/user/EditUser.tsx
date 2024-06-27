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
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEditUser } from "@/hooks/admin/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useGetManagement } from "@/hooks/admin/useManagment";
import { Loader } from "@/components/ui/Loader";

const UserSchema = z.object({
  first_name: z.string(),
  lastname: z.string(),
  email: z.string().email({ message: "Correo inválido" }),
  username: z.string(),
  managementId: z.string(),
});

type FormDataType = z.infer<typeof UserSchema>;

type Props = {
  user: User;
};

export const EditUser: FC<Props> = ({ user }) => {
  const user_copy = user;

  const { data, isLoading } = useGetManagement();

  const updateUserMutation = useEditUser();
  const form = useForm<FormDataType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      first_name: user_copy.name.split(" ")[0],
      lastname: user_copy.name.split(" ")[1]
        ? user_copy.name.split(" ")[1]
        : "",
      email: user_copy.email,
      username: user_copy.username,
      managementId: user_copy.managementId.toString(),
    },
  });

  const onUpdateUser = async (data: FormDataType) => {
    try {
      await updateUserMutation.mutateAsync({ ...data, id: user.id });
      toast.success("Colaborador actualizado correctamente");
      form.reset();
    } catch (error) {
      form.reset();
      toast.error(error.response.data.message);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Actualizar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Actualizar Colaborador</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onUpdateUser)}
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
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
                    defaultValue={user.managementId.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la gerencia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {data.map((option) => (
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
                <Button type="submit">Actualizar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
