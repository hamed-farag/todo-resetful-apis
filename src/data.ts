import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllTodoData(offset: number, size: number) {
    const results = await prisma.todo.findMany({
        skip: offset,
        take: size,
    });
    return results;
}

export { getAllTodoData }