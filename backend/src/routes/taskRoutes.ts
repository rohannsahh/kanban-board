
import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/createtask', authenticate, createTask);
router.get('/gettask', authenticate, getTasks);
router.delete('/deletetask/:id', authenticate, deleteTask);
router.put('/updatetask/:id', authenticate, updateTask);


export default router;
