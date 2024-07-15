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
import { useEditUser } from "@/hooks/admin/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useGetManagement } from "@/hooks/admin/useManagment";
import { Loader } from "@/components/ui/Loader";
import { useResetPasswordAdmin } from "@/hooks/useAuth";

const UserSchema = z.object({
  password: z
    .string()
    .min(8, { message: "La contraseña debe de ser de al menos 8 caracteres" })
    .max(20, { message: "La contraseña debe de ser de máximo 20 caracteres" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "La contraseña debe de tener al menos una mayúscula",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "La contraseña debe de tener al menos una minúscula",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "La contraseña debe de tener al menos un número",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "La contraseña debe de tener al menos un caracter especial",
    }),
});

type FormDataType = z.infer<typeof UserSchema>;

type Props = {
  user: User;
};

export const RestorePasswordUser: FC<Props> = ({ user }) => {
  const resetPasswordAdmin = useResetPasswordAdmin();

  const form = useForm<FormDataType>({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const onUpdateUser = async (data: FormDataType) => {
    try {
      await resetPasswordAdmin.mutateAsync({
        id: user.id,
        newPassword: data.password,
      });
      toast.success("Colaborador actualizado correctamente");
      form.reset();
    } catch (error) {
      form.reset();
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Restaurar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Restaurar contraseña</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onUpdateUser)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
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
                <Button type="submit">Restaurar contraseña</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
