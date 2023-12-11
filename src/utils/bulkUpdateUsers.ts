import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateUser() {
    const users = await prisma.user.findMany({
        where: {
            type: 'CHULA',
        },
        select: {
            email: true,
            runnerNo: true,
            id: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
        take: 10,
    });
    users.forEach((user) => {
        console.log(user);
    })
    users.forEach(async (user, index) => {
        const results = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                runnerNo: '3' + String(index + 1).padStart(4, '0')
            },
            select: {
                runnerNo: true,
            }
        });
        console.log(results); // not in order
    });
}

updateUser();
