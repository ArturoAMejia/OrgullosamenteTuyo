import React, { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { useCreateExtraPoints } from "../../../hooks/admin/useFormResponse";
import toast from "react-hot-toast";

type Props = {
  userId: string;
  questionaryId: number;
};

export const AsignExtraPoints: FC<Props> = ({ questionaryId, userId }) => {
  const createExtraPoints = useCreateExtraPoints();

  const onSubmitExtraPoints = async () => {
    const data = {
      questionaryId,
      userId,
    };
    try {
      await createExtraPoints.mutateAsync(data);
      toast.success("Puntos extras asignados correctamente!")
    } catch (error) {
      toast.error("Error al asginar puntos extras")
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Asignar Puntos</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro de asignar los puntos extras de esta charla?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmitExtraPoints}>
            Asignar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
