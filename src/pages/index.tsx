import { AuthProviders } from "@/components/ui/AuthProviders";
import { getSession, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <>
      <h1>Hola {session?.user?.name}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, omnis.
      </p>
      {session && <button onClick={() => signOut()}>Cerrar sesión</button>}

      {!session && <AuthProviders register={false} />}
    </>
  );
}
