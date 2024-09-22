import { Request, Response } from 'express';
import { Task, ITask } from '../models/taskModel';
import { AuthRequest } from '../middleware/authMiddleware';

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = new Task({ title, description, status, priority, dueDate, userId: req.userId });
    await task.save();
    res.status(201).json({message:"new task created",task});
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId= req.userId;
    const tasks = await Task.find({ userId }).sort({createdAt:-1});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const userId = req.userId;

    const task = await Task.findOneAndDelete({ _id: id, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized to delete' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updates = req.body;

    const task = await Task.findOneAndUpdate({ _id: id, userId }, updates, {new:true } );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }


    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }
};

