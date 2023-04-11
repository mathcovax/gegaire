-- CreateTable
CREATE TABLE "_GroupToLink" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToLink_AB_unique" ON "_GroupToLink"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToLink_B_index" ON "_GroupToLink"("B");

-- AddForeignKey
ALTER TABLE "_GroupToLink" ADD CONSTRAINT "_GroupToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToLink" ADD CONSTRAINT "_GroupToLink_B_fkey" FOREIGN KEY ("B") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
