-- CreateTable
CREATE TABLE "PersonalInformation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Address" (
    "idUser" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    CONSTRAINT "Address_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "PersonalInformation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Coordinator" (
    "personalInformationId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Coordinator_personalInformationId_fkey" FOREIGN KEY ("personalInformationId") REFERENCES "PersonalInformation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeachingManager" (
    "personalInformationId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "TeachingManager_personalInformationId_fkey" FOREIGN KEY ("personalInformationId") REFERENCES "PersonalInformation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Teacher" (
    "personalInformationId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Teacher_personalInformationId_fkey" FOREIGN KEY ("personalInformationId") REFERENCES "PersonalInformation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Student" (
    "personalInformationId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Student_personalInformationId_fkey" FOREIGN KEY ("personalInformationId") REFERENCES "PersonalInformation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacherId" TEXT NOT NULL,
    CONSTRAINT "Subject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("personalInformationId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StudentToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Student" ("personalInformationId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToSubject_AB_unique" ON "_StudentToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToSubject_B_index" ON "_StudentToSubject"("B");
