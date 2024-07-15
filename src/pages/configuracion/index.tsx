import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { useUpdateUserInfo } from "@/hooks";
import { useRouter } from "next/router";

const resetSchema = z.object({
  email: z.string().email(),
  name: z.string({
    message: "El nombre es requerido",
    required_error: "El nombre es requerido",
  }),
  password: z
    .string({
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .min(8),
  username: z.string({
    message: "El nombre de usuario es requerido",
  }),
});

type FormData = z.infer<typeof resetSchema>;

type Props = {
  user: User;
};

const ConfigurationPage: FC<Props> = ({ user }) => {
  const updateUserInfo = useUpdateUserInfo();

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(resetSchema),
    mode: "onChange",
    defaultValues: {
      email: user.email,
      name: user.name,
      password: "",
      username: user.username,
    },
  });

  const onUpdateUserInfo = async (data: FormData) => {
    try {
      await updateUserInfo.mutateAsync(data);
      toast.success("Información actualizada correctamente");
      router.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <AdminLayout title="Configuración" roleId={user.roleId} emailVerified={user.emailVerified}>
      <div className="flex justify-end">
        <div className="container px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold mb-6">
            Configuración de la cuenta
          </h1>
          <div className="grid gap-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onUpdateUserInfo)}>
                <Card>
                  <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                    <CardDescription>
                      Actualiza tu información personal.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="font-bold text-lg">
                            Nombre Completo
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full text-black border-2 border-[#42882B]"
                              placeholder="Tu nombre completo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="font-bold text-lg">
                            Nombre de usuario
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full text-black border-2 border-[#42882B]"
                              placeholder="Tu nombre de usuario"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="font-bold text-lg">
                            Correo
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full text-black border-2 border-[#42882B]"
                              placeholder="tu@ejemplo.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormLabel className="font-bold text-lg">
                            Contraseña
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full text-black border-2 border-[#42882B]"
                              placeholder="*********"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto" type="submit">
                      Guardar cambios
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ConfigurationPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = (await getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  )) as any;

  await prisma.$connect();

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.sub,
    },
  });

  await prisma.$disconnect();

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
