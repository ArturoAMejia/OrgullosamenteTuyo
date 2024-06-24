-- CreateTable
CREATE TABLE "Questionary" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "question1" TEXT NOT NULL,
    "question2" TEXT NOT NULL,
    "question3" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questionary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Questionary" ADD CONSTRAINT "Questionary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
