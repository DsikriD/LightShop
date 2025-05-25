-- CreateTable
CREATE TABLE "products" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "manufacturer" VARCHAR(255),
    "type" VARCHAR(255),
    "power" INTEGER,
    "illuminated_area" INTEGER,
    "quantity" INTEGER NOT NULL,
    "collection" VARCHAR(255),
    "height" INTEGER,
    "diameter" INTEGER,
    "style" VARCHAR(255),
    "material" VARCHAR(255),
    "image" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
