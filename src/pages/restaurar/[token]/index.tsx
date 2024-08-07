import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const resetSchema = z.object({
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

type FormData = z.infer<typeof resetSchema>;

type Props = {
  token: string;
};

const ResetPasswordPageToken: FC<Props> = ({ token }) => {
  const resetPassword = useResetPasswordToken();
  const form = useForm<FormData>({
    resolver: zodResolver(resetSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });
  const router = useRouter();

  const onResetPassword = async (data: FormData) => {
    try {
      await resetPassword.mutateAsync({ token, password: data.password });
      toast.success("Contraseña restablecida correctamente");

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center">
      <div className="mx-auto max-w-md space-y-6 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Restablecer contraseña</h1>
          <p className="text-muted-foreground">
            Ingresa tu nueva contraseña por favor
          </p>
        </div>
        <Toaster position="top-right" reverseOrder={false} />

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onResetPassword)}
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Restaurar contraseña
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPageToken;

import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { FC } from "react";
import { useResetPasswordToken } from "@/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.params;

  await prisma.$connect();

  const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
    where: {
      token: token as string,
    },
  });

  if (resetPasswordToken.expired === true) {
    await prisma.$disconnect();
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await prisma.$disconnect();
  return {
    props: {
      token: token as string,
    },
  };
};
