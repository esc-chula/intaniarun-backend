import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const newPackage = await prisma.package.create({
        data: {
            name: "VIP",
            price: 1299,
            items: ["เสื้อวิ่ง", "ป้าย BIB", "เหรียญรางวัล"]
        }
    })
    console.log(newPackage);
}

main().catch((e) => { console.error(e.message) })