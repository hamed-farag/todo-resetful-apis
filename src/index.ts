import express from "express";

import {
  getAllTodoService,
  getTodoByIdService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
} from "./services";

const app = express();

app.use(express.json());

app.get("/todo", async (req, res) => {
  try {
    const { offset = 0, size = 10 } = req.query;

    if (
      Number.isNaN(parseInt(String(offset))) ||
      Number.isNaN(parseInt(String(size)))
    ) {
      throw new Error("Both offset and size should be numbers");
    }

    const results = await getAllTodoService(Number(offset), Number(size));
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (Number.isNaN(parseInt(String(id)))) {
      throw new Error("id should be numbers");
    }

    const results = await getTodoByIdService(Number(id));
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post("/todo", async (req, res) => {
  try {
    const todo = req.body;

    if (Object.keys(todo).length === 0) {
      throw new Error("todo object should not be empty");
    }

    if (!todo.description) {
      throw new Error("body should contain description");
    }

    const date = new Date();
    const now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );

    const result = await createTodoService({
      id: Math.floor(Math.random() * 1000000) + 1,
      description: todo.description,
      createdAt: new Date(now_utc),
      updatedAt: new Date(now_utc),
      deleted: false,
      done: false,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = req.body;

    if (Number.isNaN(parseInt(String(id)))) {
      throw new Error("id should be numbers");
    }

    if (Object.keys(todo).length === 0) {
      throw new Error("todo object should not be empty");
    }

    const date = new Date();
    const now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );

    const result = await updateTodoService(Number(id), {
      description: todo.description,
      updatedAt: new Date(now_utc),
      deleted: todo.deleted,
      done: todo.done,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (Number.isNaN(parseInt(String(id)))) {
      throw new Error("id should be numbers");
    }

    const result = await deleteTodoService(Number(id));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
