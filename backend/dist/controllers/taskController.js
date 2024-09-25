"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.getTasks = exports.createTask = void 0;
const taskModel_1 = require("../models/taskModel");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        const task = new taskModel_1.Task({ title, description, status, priority, dueDate, userId: req.userId });
        yield task.save();
        res.status(201).json({ message: "new task created", task });
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating task' });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const tasks = yield taskModel_1.Task.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});
exports.getTasks = getTasks;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const task = yield taskModel_1.Task.findOneAndDelete({ _id: id, userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized to delete' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error });
    }
});
exports.deleteTask = deleteTask;
// export const updateTask = async (req: AuthRequest, res: Response) => {
//   try {
//     const { id } = req.params;
//     const userId = req.userId;
//     const updates = req.body;
//     const task = await Task.findOneAndUpdate({ _id: id, userId }, updates, { new: true });
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     res.status(200).json(task);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update task', error });
//   }
// };
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const updates = req.body;
        console.log("Updating task with ID:", id, "for user:", userId, "with updates:", updates);
        const task = yield taskModel_1.Task.findOneAndUpdate({ _id: id, userId }, updates, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: 'Failed to update task', error });
    }
});
exports.updateTask = updateTask;
