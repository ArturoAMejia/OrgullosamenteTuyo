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
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useConfirmAccount } from "@/hooks/useAuth";

const resetSchema = z.object({
  email: z.string(),
});

type FormData = z.infer<typeof resetSchema>;

const ConfirmAccountPage = () => {
  const form = useForm<FormData>();
  const router = useRouter();

  const confirmAccountPage = useConfirmAccount();
  const onConfirmAccountPage = async (data: FormData) => {
    try {
      await confirmAccountPage.mutateAsync(data.email);
      toast.success("Correo enviado, revisa tu bandeja de entrada");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Confirma tu cuenta</h1>
        <p className="text-muted-foreground">
          Ingresa tu correo electrónico enlazado a tu cuenta para confirmar tu
          cuenta
        </p>
      </div>
      <Toaster position="top-right" reverseOrder={false} />

      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onConfirmAccountPage)}
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ejemplo@correo.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={confirmAccountPage.isLoading ? true : false}
          >
            Mandar correo de confirmación
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ConfirmAccountPage;

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "@/database";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = (await getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  )) as any;

  await prisma.$connect();

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.sub,
    },
  });

  if (user.emailVerified !== null) {
    await prisma.$disconnect();
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
