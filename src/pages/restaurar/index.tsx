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
import { useResetPassword } from "@/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const resetSchema = z.object({
  email: z.string(),
});

type FormData = z.infer<typeof resetSchema>;

const ResetPasswordPage = () => {
  const form = useForm<FormData>();

  const resetPassword = useResetPassword();
  const onResetPassword = async (data: FormData) => {
    try {
      await resetPassword.mutateAsync(data.email);
      toast.success("Correo enviado, revisa tu bandeja de entrada");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Restablecer contraseña</h1>
        <p className="text-muted-foreground">
          Ingresa tu correo electrónico enlazado a tu cuenta para restablecer tu
          contraseña
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
            disabled={resetPassword.isPending ? true : false}
          >
            Solicitar cambio de contraseña
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
