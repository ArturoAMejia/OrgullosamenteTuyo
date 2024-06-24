import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Layout } from "@/components/admin/Layout";
import Image from "next/image";
import { CircleUserRoundIcon, UserIcon, UserRoundIcon } from "lucide-react";

const loginSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

type FormData = z.infer<typeof loginSchema>;

const Login = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginUser = async ({ username, password }: FormData) => {
    await signIn("credentials", { username, password, callbackUrl: "/" });
  };

  return (
    <Layout title="Inicio de Sesión">
      <Image alt="logo" src="/img/logo.png" width={250} height={250} />
      <div className="flex justify-center">
        <CircleUserRoundIcon className="w-16 h-16 text-[#046A38]" />
      </div>
      <div className="w-[350px] gap-6 h-screen">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
          <p className="text-balance text-muted-foreground">
            Ingresa tu usuario para iniciar sesión
          </p>
        </div>
        <Form {...form}>
          <form
            className="grid gap-2"
            onSubmit={form.handleSubmit(onLoginUser)}
          >
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="font-bold text-lg">Usuario</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full text-white bg-[#42882B]"
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
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full text-white bg-[#42882B]"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full bg-[#046A38] mt-4">
              Iniciar sesión
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
