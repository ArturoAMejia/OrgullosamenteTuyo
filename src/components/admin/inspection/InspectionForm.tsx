import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckIcon, XIcon } from "lucide-react";

const inspectionSchema = z.object({
  stationId: z.string(),
  labeledItems: z.string(),
  nonLabeledItems: z.array(z.string()),
  separateItems: z.string(),
  nonSeparateItems: z.array(z.string()),
  problemSolution: z.string(),
  observations: z.string(),
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
      problemSolution: "",
      observations: "",
    },
  });

  const labeledItems = form.watch("labeledItems");
  const separateItems = form.watch("separateItems");

  const items = [
    {
      id: "recents",
      label: "Recents",
    },
    {
      id: "home",
      label: "Home",
    },
    {
      id: "applications",
      label: "Applications",
    },
    {
      id: "desktop",
      label: "Desktop",
    },
    {
      id: "downloads",
      label: "Downloads",
    },
    {
      id: "documents",
      label: "Documents",
    },
  ] as const;

  const onSubmit = () => {};

  return (
    <>
      <Form {...form}>
        <form className="w-[480px] " onSubmit={form.handleSubmit(onSubmit)}>
          <h3 className="font-bold text-xl my-4 text-center">I. Información General</h3>
          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="stationId"
              render={({ field }) => (
                <FormItem className="w-full my-2">
                  <FormLabel className="text-base">
                    1. Ingrese su número de estación
                  </FormLabel>
                  <FormControl>
                    <Input className="w-full" {...field}  type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h3 className="font-bold text-xl my-4 text-center">
            II. Criterios de Inspección de estaciones de residuos
          </h3>
          <div className="flex-col gap-4 justify-center">
            <FormField
              control={form.control}
              name="labeledItems"
              render={({ field }) => (
                <FormItem className="space-y-3 my-2">
                  <FormLabel className="text-base">
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
                        <FormLabel className="font-normal">
                          <CheckIcon
                            className={
                              labeledItems === "true"
                                ? "bg-green-700 rounded-md text-white"
                                : ""
                            }
                          />
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" className="invisible" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <XIcon
                            className={
                              labeledItems === "false"
                                ? "bg-red-700 rounded-md text-white"
                                : ""
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
              <FormField
                control={form.control}
                name="nonLabeledItems"
                render={() => (
                  <FormItem className="space-y-3 my-2">
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        3. Si los recipientes de la estación no están
                        debidamente rotulados, por favor seleccione el o los
                        recipientes que presentaron la incidencia
                      </FormLabel>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {items.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="nonLabeledItems"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
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
                                    className="w-5 h-5"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
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
            ) : null}

            <FormField
              control={form.control}
              name="separateItems"
              render={({ field }) => (
                <FormItem className="space-y-3 my-2">
                  <FormLabel className="text-base">
                    {labeledItems === "false" ? "4." : "3."} ¿La estación
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
                        <FormLabel className="font-normal">
                          <CheckIcon
                            className={
                              separateItems === "true"
                                ? "bg-green-700 rounded-md text-white"
                                : ""
                            }
                          />
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" className="invisible" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <XIcon
                            className={
                              separateItems === "false"
                                ? "bg-red-700 rounded-md text-white"
                                : ""
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
                        <FormLabel className="text-base">
                          {labeledItems === "false" ? "5." : "4."} Si los
                          residuos de los recipientes no están debidamente
                          separados, por favor seleccione el o los recipientes
                          que presentaron la incidencia
                        </FormLabel>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
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
                                      className="w-5 h-5"
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
                                  <FormLabel className="font-normal">
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
                  name="problemSolution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        {labeledItems === "false" && separateItems === "false"
                          ? "6. "
                          : labeledItems === "false"
                          ? "5. "
                          : separateItems === "false"
                          ? "5. "
                          : "5. "}
                        Cuéntanos como solucionaste estos problemas
                      </FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : null}

            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    {labeledItems === "false" && separateItems === "false"
                      ? "7. "
                      : labeledItems === "false"
                      ? "5. "
                      : separateItems === "false"
                      ? "6. "
                      : "4. "}
                    Comentarios adicionales
                  </FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};
