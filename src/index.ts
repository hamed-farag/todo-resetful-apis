import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newTodoItem = await prisma.todo.create({
    data: {
      description: "Todo From Prisma",
    },
  })

  console.log('Created new user: ', newTodoItem)

  const allTodoItems = await prisma.todo.findMany()
  console.log('All todo items: ')
  console.dir(allTodoItems, { depth: null })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())