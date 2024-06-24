import React, { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";

type Props = {
  answers: any;
};

export const ShowAnswers: FC<Props> = ({ answers }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Mostrar respuestas</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Respuestas del cuestionario</AlertDialogTitle>
        </AlertDialogHeader>

        <div>
          <h2 className="text-xl font-bold ">
            1. ¿Cuántas personas logró reunir?
          </h2>
          <p>{answers.question1}</p>
          <h2 className="text-xl font-bold">
            2. ¿Cuáles fueron las preguntas frecuentes?
          </h2>
          <p>{answers.question2}</p>
          <h2 className="text-xl font-bold">
            3. ¿Cuál fue el mayor aprendizaje con este tema y la experiencia?
          </h2>
          <p>{answers.question3}</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
