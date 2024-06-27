import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateFormResponse } from "@/hooks/admin/useFormResponse";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { items } from "@/util/typesUtils";

const inspectionSchema = z.object({
  stationId: z.string(),
  labeledItems: z.string(),
  nonLabeledItems: z.array(z.string()),
  solutionNonLabeledItems: z.string(),
  separateItems: z.string(),
  nonSeparateItems: z.array(z.string()),
  solutionNonSeparateItems: z.string(),
});

type FormData = z.infer<typeof inspectionSchema>;

export const InspectionForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(inspectionSchema),
    mode: "onChange",
    defaultValues: {
      stationId: "",
      labeledItems: "",
      nonLabeledItems: [],
      separateItems: "",
      nonSeparateItems: [],
      solutionNonLabeledItems: "",
      solutionNonSeparateItems: "",
    },
  });

  const labeledItems = form.watch("labeledItems");
  const separateItems = form.watch("separateItems");

  const formResponse = useCreateFormResponse();
  const { data: session } = useSession();

  const onSubmit = async (data: FormData) => {
    try {
      await formResponse.mutateAsync({ ...data, userId: session.user });
      toast.success("Formulario enviado correctamente");
      form.reset();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="w-[480px] p-4 bg-white rounded-md text-black"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-xl my-4">I. Información General</h3>
          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="stationId"
              render={({ field }) => (
                <FormItem className="w-full my-2">
                  <FormLabel className="text-base">
                    1. Indique el número de estación a la que se realizó la
                    inspección
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full text-black border-4 border-[#006838]"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h3 className="font-bold text-xl my-4">
            II. Criterios de Inspección de estaciones de residuos
          </h3>
          <div className="flex-col gap-4 justify-center">
            <FormField
              control={form.control}
              name="labeledItems"
              render={({ field }) => (
                <FormItem className="space-y-3 my-2">
                  <FormLabel className="text-base text-left">
                    2. ¿Las estaciones de separación están debidamente
                    rotuladas?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" className="invisible" />
                        </FormControl>
                        <FormLabel className="font-normal hover:cursor-pointer">
                          <CheckIcon
                            className={
                              labeledItems === "true"
                                ? " w-10 h-10 bg-[#046A38] rounded-md text-black"
                                : "w-10 h-10 bg-[#046A38] rounded-md text-white"
                            }
                          />
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" className="invisible" />
                        </FormControl>
                        <FormLabel className="font-normal hover:cursor-pointer">
                          <XIcon
                            className={
                              labeledItems === "false"
                                ? "bg-[#046A38] rounded-md text-black w-10 h-10"
                                : "bg-[#046A38] rounded-md text-white w-10 h-10"
                            }
                          />
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {labeledItems === "false" ? (
              <>
                <FormField
                  control={form.control}
                  name="nonLabeledItems"
                  render={() => (
                    <FormItem className="space-y-3 my-2">
                      <div className="mb-4">
                        <FormLabel className="text-base text-justify">
                          3. Si los recipientes de la estación no están
                          debidamente rotulados, favor seleccione el o los
                          recipientes que presentaron la incidencia
                        </FormLabel>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="nonLabeledItems"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                      className="w-8 h-8 border-4 border-[#046A38]"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-md">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="solutionNonLabeledItems"
                  render={({ field }) => (
                    <FormItem className="space-y-3 my-2">
                      <FormLabel className="text-base">
                        {labeledItems === "false" ? "4." : "3."} Favor indique
                        como solucionó la incidencia:
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                className="border-4 border-[#046A38] p-2"
                                value="Gestioné la rotulación con Gestión Ambiental a
                              corto plazo"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-md">
                              Gestioné la rotulación con Gestión Ambiental a
                              corto plazo
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                className="border-4 border-[#046A38] p-2"
                                value="Coloque una rotulación temporal"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-md">
                              Coloque una rotulación temporal
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                className="border-4 border-[#046A38] p-2"
                                value="false"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-md">
                              Solamente reporté la incidencia
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : null}

            <FormField
              control={form.control}
              name="separateItems"
              render={({ field }) => (
                <FormItem className="space-y-3 my-2">
                  <FormLabel className="text-base text-justify">
                    {labeledItems === "false" ? "5." : "4."} ¿La estación
                    muestra una adecuada separación de residuos sólidos?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" className="invisible" />
                        </FormControl>
                        <FormLabel className="font-bold hover:cursor-pointer">
                          <CheckIcon
                            className={
                              separateItems === "true"
                                ? "bg-[#046A38] rounded-md text-black w-10 h-10"
                                : "bg-[#046A38] rounded-md text-white w-10 h-10"
                            }
                          />
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" className="invisible" />
                        </FormControl>
                        <FormLabel className="font-normal hover:cursor-pointer">
                          <XIcon
                            className={
                              separateItems === "false"
                                ? "bg-[#046A38] rounded-md text-black w-10 h-10"
                                : "bg-[#046A38] rounded-md text-white w-10 h-10"
                            }
                          />
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {separateItems === "false" ? (
              <>
                <FormField
                  control={form.control}
                  name="nonLabeledItems"
                  render={() => (
                    <FormItem className="space-y-3 my-2">
                      <div className="mb-4">
                        <FormLabel className="text-base text-justify">
                          {labeledItems === "false" ? "5." : "4."} Si los
                          residuos de los recipientes no están debidamente
                          separados, por favor seleccione el o los recipientes
                          que presentaron la incidencia
                        </FormLabel>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="nonSeparateItems"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      className="w-8 h-8 border-4 border-[#046A38]"
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-md">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="solutionNonSeparateItems"
                  render={({ field }) => (
                    <FormItem className="space-y-3 my-2">
                      <FormLabel className="text-base">
                        {labeledItems === "false" ? "6." : "5."} Favor indique
                        como solucionó la incidencia:
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                className="border-4 border-[#046A38] p-2"
                                value="Notifiqué a mis compañeros aledaños para corregir
                              la incidencia"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-md">
                              Notifiqué a mis compañeros aledaños para corregir
                              la incidencia
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                className="border-4 border-[#046A38] p-2"
                                value="Retirar el residuo de la estación equivocada"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-md">
                              Retirar el residuo de la estación equivocada
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                className="border-4 border-[#046A38] p-2"
                                value="Solamente reporté la incidencia"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-md">
                              Solamente reporté la incidencia
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : null}

            <h3 className="text-xl font-bold mt-8">
              Cualquier comentario adicional comunicarte al grupo de WhatsApp
            </h3>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#F3B800] mt-4 font-bold"
            disabled={formResponse.isLoading ? true : false}
          >
            Enviar
          </Button>
        </form>
      </Form>
    </>
  );
};
