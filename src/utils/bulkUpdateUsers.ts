import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// VIP
// 1-1000

// นิสิต
// 1001-3000

// นิสิตเก่า
// 3001 - 6000

// ประชาคมจุฬาฯ
// 6001 - 7000

// ประชาชนทั่วไป
// 7001 - 8000

// สปอนเซอร์ + PACER (รอสรุปจำนวน)
// 9001 - 9999
async function updateUser(offset = 0, update: boolean) {
    const users = await prisma.user.findMany({
        where: {
            type: 'STUDENT',
        },
        select: {
            email: true,
            runnerNo: true,
            id: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
        take: 200,
        skip: offset,
    });
    users.forEach((user) => {
        console.log(user);
    });
    if (!update) return;
    users.forEach(async (user, index) => {
        const results = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                // runnerNo: '7' + String(index + 1 + offset).padStart(3, '0'),
                runnerNo: String(index + 1001 + offset),
            },
            select: {
                runnerNo: true,
            },
        });
        // await prisma.$disconnect()
        console.log(results); // not in order
    });
}

updateUser(200, true);
