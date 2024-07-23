-- CreateTable
CREATE TABLE "ConfirmAccountToken" (
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConfirmAccountToken_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmAccountToken_token_key" ON "ConfirmAccountToken"("token");

-- AddForeignKey
ALTER TABLE "ConfirmAccountToken" ADD CONSTRAINT "ConfirmAccountToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
