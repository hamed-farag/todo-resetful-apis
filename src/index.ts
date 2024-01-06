
import express from 'express'

import { getAllTodoService } from "./services"


const app = express()

app.use(express.json())

// async function main() {
//   const newTodoItem = await prisma.todo.create({
//     data: {
//       description: "Todo From Prisma",
//     },
//   })

//   console.log('Created new user: ', newTodoItem)

//   const allTodoItems = await prisma.todo.findMany()
//   console.log('All todo items: ')
//   console.dir(allTodoItems, { depth: null })
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect())

app.get('/todo', async (req, res) => {
  const { query } = req;
  const { offset = 0, size = 10 } = query;
  const results = await getAllTodoService(Number(offset), Number(size));
  res.json(results)
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)