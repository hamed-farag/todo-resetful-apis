import { getAllTodoData } from "./data"

async function getAllTodoService(offset: number, size: number) {
    return getAllTodoData(offset, size)
}

export {getAllTodoService}