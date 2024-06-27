import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import {
  CircleUserIcon,
  MapPinIcon,
  MenuIcon,
  Package2Icon,
  StickyNoteIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import Image from "next/image";

interface Props {
  title: string;
  children: React.ReactNode;
  roleId?: number;
}

export const AdminLayout: FC<Props> = ({ title, children, roleId }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/img/logo.ico" type="image/x-icon" />
        <title>{title}</title>
      </Head>

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden  md:block bg-[#046A38] text-black">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center  px-4 lg:h-[60px] lg:px-6 bg-[#046A38] text-black">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold"
                prefetch={false}
              >
                <Package2Icon className="h-6 w-6" />
                <span className="text-white font-bold">
                  Embajadores Ambientales
                </span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4 bg-[#046A38]">
                <Link
                  href="/"
                  className="flex items-center text-black font-bold gap-3 rounded-lg px-3 py-2 transition-all "
                  prefetch={false}
                >
                  <UsersIcon className="h-4 w-4" />
                  Inicio
                </Link>
                {roleId === 1 && (
                  <>
                    <Link
                      href="/equipos"
                      className="flex items-center text-black font-bold gap-3 rounded-lg px-3 py-2 transition-all "
                      prefetch={false}
                    >
                      <UsersIcon className="h-4 w-4" />
                      Equipos
                    </Link>
                    <Link
                      href="/estaciones"
                      className="flex items-center text-black font-bold gap-3 rounded-lg px-3 py-2 transition-all "
                      prefetch={false}
                    >
                      <MapPinIcon className="h-4 w-4" />
                      Estaciones
                    </Link>

                    <Link
                      href="/colaboradores"
                      className="flex items-center text-black font-bold gap-3 rounded-lg px-3 py-2 transition-all "
                      prefetch={false}
                    >
                      <UsersIcon className="h-4 w-4" />
                      Colaboradores
                    </Link>
                    <Link
                      href="/respuestas-cuestionario"
                      className="flex items-center text-black font-bold gap-3 rounded-lg px-3 py-2 transition-all "
                      prefetch={false}
                    >
                      <StickyNoteIcon className="h-4 w-4" />
                      Respuestas de cuestionario
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-24 justify-end items-center gap-4   px-4 lg:h-[60px] lg:px-6 bg-[#046A38]">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col font-sans">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-bold"
                  prefetch={false}
                >
                  <Package2Icon className="h-6 w-6" />
                  <span>Embajadores Ambientales</span>
                </Link>
                <nav className="grid gap-2 text-lg font-bold">
                  <Link
                    href="/"
                    className="mx-[-0.65rem] flex font-bold items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
                    prefetch={false}
                  >
                    <UsersIcon className="h-5 w-5" />
                    Inicio
                  </Link>
                  {roleId === 1 && (
                    <>
                      <Link
                        href="/puntuacion"
                        className="mx-[-0.65rem] flex font-bold items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                        prefetch={false}
                      >
                        <TrophyIcon className="h-5 w-5" />
                        Tabla de puntuación
                      </Link>
                      <Link
                        href="/equipos"
                        className="mx-[-0.65rem] flex font-bold items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
                        prefetch={false}
                      >
                        <UsersIcon className="h-5 w-5" />
                        Equipos
                      </Link>
                      <Link
                        href="/estaciones"
                        className="mx-[-0.65rem] flex font-bold items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
                        prefetch={false}
                      >
                        <MapPinIcon className="h-5 w-5" />
                        Estaciones
                      </Link>
                      <Link
                        href="/colaboradores"
                        className="mx-[-0.65rem] flex font-bold items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
                        prefetch={false}
                      >
                        <UsersIcon className="h-5 w-5" />
                        Colaboradores
                      </Link>
                      <Link
                        href="/respuestas-cuestionario"
                        className="mx-[-0.65rem] flex font-bold items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
                        prefetch={false}
                      >
                        <UsersIcon className="h-5 w-5" />
                        Respuestas de cuestionario
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUserIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/configuracion">Configuración</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-2  bg-white bg-opacity-80">
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </main>
          <footer className="border-8 border-[#046A38] py-8 w-full bg-[url('/img/g3.png')]">
            <div className="container flex items-center justify-center gap-8">
              {/* <Link href="#" prefetch={false}>
                <MountainIcon className="h-8 w-8" />
                <span className="sr-only">Acme Inc</span>
              </Link> */}
              <Link href="/" prefetch={false}>
                <Image
                  src={"/img/carbon-trust.png"}
                  width={80}
                  height={100}
                  alt="Carbon Trust Logo"
                />
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
