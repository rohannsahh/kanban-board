"use client"

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Task = {
  id: string
  title: string
  description: string
  status: 'To Do' | 'In Progress' | 'Completed'
  priority: 'Low' | 'Medium' | 'High'
  dueDate: string
}

const mockTasks: Task[] = [
  { id: '1', title: 'Create mockup', description: 'Design UI mockup', status: 'To Do', priority: 'High', dueDate: '2023-06-30' },
  { id: '2', title: 'Implement backend', description: 'Set up Express server', status: 'In Progress', priority: 'Medium', dueDate: '2023-07-15' },
  { id: '3', title: 'Write tests', description: 'Create unit tests', status: 'Completed', priority: 'Low', dueDate: '2023-07-01' },
]

export function Page() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [priorityFilter, setPriorityFilter] = useState<string>('All')

  const filteredTasks = tasks.filter(task => 
    (statusFilter === 'All' || task.status === statusFilter) &&
    (priorityFilter === 'All' || task.priority === priorityFilter)
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Task List</h1>
        <div className="flex mb-4 space-x-4">
          <Select onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setPriorityFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
          <Button>Add New Task</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2">Edit</Button>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}