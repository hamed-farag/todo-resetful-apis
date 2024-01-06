import { Todo } from "@prisma/client";

import {
  getAllTodoData,
  createTodoData,
  deleteTodoData,
  getTodoByIdData,
  updateTodoData,
} from "./data";

async function getAllTodoService(offset: number, size: number) {
  return getAllTodoData(offset, size);
}

async function createTodoService(todo: Todo) {
  return createTodoData(todo);
}

async function deleteTodoService(id: number) {
  return deleteTodoData(id);
}

async function getTodoByIdService(id: number) {
  return getTodoByIdData(id);
}

async function updateTodoService(id: number, updatedTodo: Partial<Todo>) {
  return updateTodoData(id, updatedTodo);
}

export {
  getAllTodoService,
  createTodoService,
  deleteTodoService,
  getTodoByIdService,
  updateTodoService,
};
