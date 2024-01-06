import { Express } from "express";

import {
  getAllTodoService,
  getTodoByIdService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
} from "./services";

export function routes(app: Express) {
  /**
   * @swagger
   * /todo:
   *   get:
   *     summary: Retrieve a list of todo items.
   *     description: Retrieve a list of users for todo. Should be used to populate a list of Todo items for the Todo App.
   *     parameters:
   *       - in: query
   *         name: offset
   *         required: true
   *         description: The number of items to skip before starting to collect the result set
   *         schema:
   *           type: integer
   *       - in: query
   *         name: size
   *         required: true
   *         description: The numbers of items to return
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A list of todo items.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         description: The todo item ID.
   *                         example: 324
   *                       description:
   *                         type: string
   *                         description: The todo item name.
   *                         example: Go for Shopping
   *                       done:
   *                         type: boolean
   *                         description: The todo item done or not.
   *                         example: true
   *                       deleted:
   *                         type: string
   *                         description: The todo item deleted or not.
   *                         example: false
   *                       createdAt:
   *                         type: string
   *                         description: Creation date in UTC.
   *                         example: 2024-01-06T09:10:44.892Z
   *                       updatedAt:
   *                         type: string
   *                         description: Last update date in UTC.
   *                         example: 2024-01-06T09:10:44.892Z
   */
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
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  /**
   * @swagger
   * /todo/{id}:
   *   get:
   *     summary: Retrieve todo item.
   *     description: Retrieve todo item by Id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the todo item to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A todo item.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       description: The todo item ID.
   *                       example: 324
   *                     description:
   *                       type: string
   *                       description: The todo item name.
   *                       example: Go for Shopping
   *                     done:
   *                       type: boolean
   *                       description: The todo item done or not.
   *                       example: true
   *                     deleted:
   *                       type: string
   *                       description: The todo item deleted or not.
   *                       example: false
   *                     createdAt:
   *                       type: string
   *                       description: Creation date in UTC.
   *                       example: 2024-01-06T09:10:44.892Z
   *                     updatedAt:
   *                       type: string
   *                       description: Last update date in UTC.
   *                       example: 2024-01-06T09:10:44.892Z
   */

  app.get("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (Number.isNaN(parseInt(String(id)))) {
        throw new Error("id should be numbers");
      }

      const results = await getTodoByIdService(Number(id));
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  /**
   * @swagger
   * /todo:
   *   post:
   *     summary: Create todo item.
   *     description: Create a new todo item.
   *     requestBody:
   *       description: Todo object that needs to be added to the store
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               description:
   *                 type: string
   *                 description: The todo item name.
   *                 example: Check the car oil.
   *     responses:
   *       201:
   *         description: A todo item.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       description: The todo item ID.
   *                       example: 324
   *                     description:
   *                       type: string
   *                       description: The todo item name.
   *                       example: Go for Shopping
   *                     done:
   *                       type: boolean
   *                       description: The todo item done or not.
   *                       example: true
   *                     deleted:
   *                       type: string
   *                       description: The todo item deleted or not.
   *                       example: false
   *                     createdAt:
   *                       type: string
   *                       description: Creation date in UTC.
   *                       example: 2024-01-06T09:10:44.892Z
   *                     updatedAt:
   *                       type: string
   *                       description: Last update date in UTC.
   *                       example: 2024-01-06T09:10:44.892Z
   */
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

  /**
   * @swagger
   * /todo/{id}:
   *   put:
   *     summary: Update todo item.
   *     description: Update a new todo item.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the todo item to retrieve.
   *         schema:
   *           type: integer
   *     requestBody:
   *       description: Todo object that needs to be update
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               description:
   *                 type: string
   *                 description: The todo item name.
   *                 example: Check the car oil.
   *               done:
   *                 type: boolean
   *                 description: The todo item done or not.
   *                 example: true
   *               deleted:
   *                 type: string
   *                 description: The todo item deleted or not.
   *                 example: false
   *     responses:
   *       200:
   *         description: A todo item.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       description: The todo item ID.
   *                       example: 324
   *                     description:
   *                       type: string
   *                       description: The todo item name.
   *                       example: Go for Shopping
   *                     done:
   *                       type: boolean
   *                       description: The todo item done or not.
   *                       example: true
   *                     deleted:
   *                       type: string
   *                       description: The todo item deleted or not.
   *                       example: false
   *                     createdAt:
   *                       type: string
   *                       description: Creation date in UTC.
   *                       example: 2024-01-06T09:10:44.892Z
   *                     updatedAt:
   *                       type: string
   *                       description: Last update date in UTC.
   *                       example: 2024-01-06T09:10:44.892Z
   */

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

  /**
   * @swagger
   * /todo/{id}:
   *   delete:
   *     summary: Delete todo item.
   *     description: Mark todo item as deleted (Soft Delete).
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the todo item to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A todo item.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       description: The todo item ID.
   *                       example: 324
   *                     description:
   *                       type: string
   *                       description: The todo item name.
   *                       example: Go for Shopping
   *                     done:
   *                       type: boolean
   *                       description: The todo item done or not.
   *                       example: true
   *                     deleted:
   *                       type: string
   *                       description: The todo item deleted or not.
   *                       example: false
   *                     createdAt:
   *                       type: string
   *                       description: Creation date in UTC.
   *                       example: 2024-01-06T09:10:44.892Z
   *                     updatedAt:
   *                       type: string
   *                       description: Last update date in UTC.
   *                       example: 2024-01-06T09:10:44.892Z
   */

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
}
