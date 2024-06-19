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
import { signOut } from "next-auth/react";
import {
  CircleUserIcon,
  MapPinIcon,
  MenuIcon,
  Package2Icon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const AdminLayout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                href="#"
                className="flex items-center gap-2 font-semibold"
                prefetch={false}
              >
                <Package2Icon className="h-6 w-6" />
                <span className="">Orgullosamente Tuyo</span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="/equipos"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  <UsersIcon className="h-4 w-4" />
                  Equipos
                </Link>
                <Link
                  href="/estaciones"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  <MapPinIcon className="h-4 w-4" />
                  Estaciones
                </Link>
                <Link
                  href="/puntuacion"
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                  prefetch={false}
                >
                  <TrophyIcon className="h-4 w-4" />
                  Tabla de puntuación
                </Link>
                <Link
                  href="/colaboradores"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  <UsersIcon className="h-4 w-4" />
                  Colaboradores
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 justify-end items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    <Package2Icon className="h-6 w-6" />
                    <span className="sr-only">Orgullosamente Tuyo</span>
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <UsersIcon className="h-5 w-5" />
                    Equipos
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <MapPinIcon className="h-5 w-5" />
                    Estaciones
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <TrophyIcon className="h-5 w-5" />
                    Tabla de puntuación
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <UsersIcon className="h-5 w-5" />
                    Colaboradores
                  </Link>
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
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </main>
        </div>
      </div>
    </>
  );
};
