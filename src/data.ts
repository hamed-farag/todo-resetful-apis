import { PrismaClient, Todo } from "@prisma/client";

// https://github.com/prisma/prisma/discussions/3209
const prisma = new PrismaClient();

async function getAllTodoData(offset: number, size: number) {
  const results = await prisma.todo.findMany({
    skip: offset,
    take: size,
    orderBy: { updatedAt: "desc" },
  });
  return results;
}

async function getTodoByIdData(id: number) {
  const todo = await prisma.todo.findUnique({
    where: { id: id },
  });
  return todo;
}

async function createTodoData(todo: Todo) {
  const newTodo = await prisma.todo.create({
    data: todo,
  });
  return newTodo;
}

async function updateTodoData(id: number, todo: Partial<Todo>) {
  const updatedTodo = await prisma.todo.update({
    where: { id: id },
    data: todo,
  });
  return updatedTodo;
}

async function deleteTodoData(id: number) {
  const deletedTodo = await prisma.todo.update({
    where: { id: id },
    data: { deleted: true },
  });
  return deletedTodo;
}

export {
  getAllTodoData,
  getTodoByIdData,
  createTodoData,
  updateTodoData,
  deleteTodoData,
};
