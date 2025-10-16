import { Todo } from "../models/todoModel.js";

export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({ ...req.body, user: req.user });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.status(200).json(todos);
};

export const getTodoById = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.status(200).json(todo);
};

export const updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.status(200).json(todo);
};

export const deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.status(200).json({ message: "Todo deleted successfully" });
};

export const deleteAllTodos = async (req, res) => {
  await Todo.deleteMany({ user: req.user });
  res.status(200).json({ message: "All todos deleted successfully" });
};