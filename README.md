# VerdIES

## Para poder arrancar el proyecto se debe de realizar los siguientes comandos

Para instalar las dependecias ejecutar el comando

```node
npm i
```

Una vez instaladas las dependencias, crear un archivo .env para ingresar las claves secretas y sustituir los valores

``` env
AUTH_SECRET=

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

DATABASE_URL="postgresql://user:password@localhost:5432/taller-arte-xolotl?schema=public"NEXTAUTH_SECRET=
```

Para realizar todas las migraciones, se debe de ejecutar el siguiente comando:

```node
npx prisma migrate dev
```

Para realizar un seed y llenar ciertos datos en la base de datos para realizar pruebas se debe de ejecutar el comando:

```node
npx prisma db seed
```

Una vez ejecutado todos los comandos con éxito, realizar el comando:

```node
npm run dev
```

Para ejecutar el servidor de desarrollo
