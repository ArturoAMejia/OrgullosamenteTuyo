import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import toast from "react-hot-toast";
import { useCreateQuestionaryResponse } from "@/hooks/admin/useFormResponse";
import { Button } from "@/components/ui/button";

const questionarySchema = z.object({
  question1: z.string(),
  question2: z.string(),
  question3: z.string(),
});

type FormData = z.infer<typeof questionarySchema>;

export const QuestionaryForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(questionarySchema),
    mode: "onChange",
    defaultValues: {
      question1: "",
      question2: "",
      question3: "",
    },
  });

  const createQuestionaryRes = useCreateQuestionaryResponse();

  const onSubmitQuestionary = async (data: FormData) => {
    try {
      await createQuestionaryRes.mutateAsync(data);
      form.reset();

      toast.success("Formulario enviado con éxito");
    } catch (error) {
      toast.error("Error al enviar el formulario");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="w-[480px] p-4 bg-white rounded-md text-black"
          onSubmit={form.handleSubmit(onSubmitQuestionary)}
        >
          <h3 className="font-bold text-xl my-4">Informe de Charla Mensual</h3>
          <div className="flex flex-col justify-center">
            <FormField
              control={form.control}
              name="question1"
              render={({ field }) => (
                <FormItem className="w-full my-2">
                  <FormLabel className="text-base">
                    1. ¿Cuántas personas logró reunir?
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full text-black border-4 border-[#006838]"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    2. ¿Cuáles fueron las preguntas frecuentes?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none text-black border-4 border-[#006838]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    3. ¿Cuál fue el mayor aprendizaje con este tema y la
                    experiencia?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none text-black border-4 border-[#006838]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#F3B800] mt-4 font-bold"
            disabled={createQuestionaryRes.isLoading ? true : false}
          >
            Enviar respuesta
          </Button>
        </form>
      </Form>
    </>
  );
};
