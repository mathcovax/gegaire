-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "password" VARCHAR(25) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "tel" VARCHAR(12) NOT NULL,
    "addressPostcode" VARCHAR(6),
    "addressText" VARCHAR(255),
    "adressCity" VARCHAR(50),
    "addressLng" DOUBLE PRECISION,
    "addressLat" DOUBLE PRECISION,
    "isManager" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_tel_key" ON "User"("tel");
