import Link from "next/link"

export default function Custom404Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl text-muted-foreground">Oops, la página que buscas no se encuentra.</p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}