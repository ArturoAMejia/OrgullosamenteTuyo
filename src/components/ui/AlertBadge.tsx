import Link from "next/link";
import React from "react";

export const AlertBadge = () => {
  return (
    <div className="bg-red-600 px-4 py-3 text-white flex gap-2 justify-center items-center ">
      <p className="text-center text-sm font-medium">
        Por favor confirmar su correo electrónico para acceder a todas las
        funciones de la plataforma.
      </p>
      <Link href="/confirmar-cuenta" className="inline-block underline">
        Confirmar correo
      </Link>
    </div>
  );
};
