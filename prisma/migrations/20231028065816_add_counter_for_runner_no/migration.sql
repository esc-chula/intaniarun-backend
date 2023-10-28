-- CreateTable
CREATE TABLE "Counter" (
    "packageType" "PackageType" NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("packageType")
);
