-- CreateTable
CREATE TABLE "FormResponseDetail" (
    "id" SERIAL NOT NULL,
    "formResponseId" INTEGER NOT NULL,
    "question2" TEXT,
    "question3" TEXT,
    "question4" TEXT,
    "question5" TEXT,
    "question6" TEXT,
    "question7" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormResponseDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormResponseDetail" ADD CONSTRAINT "FormResponseDetail_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "FormResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
