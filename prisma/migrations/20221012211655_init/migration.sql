-- CreateTable
CREATE TABLE "Advocate" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "shortBio" TEXT NOT NULL,
    "longBio" TEXT NOT NULL,
    "advocateSince" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Advocate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "advocateId" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Advocate" ADD CONSTRAINT "Advocate_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_advocateId_fkey" FOREIGN KEY ("advocateId") REFERENCES "Advocate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
