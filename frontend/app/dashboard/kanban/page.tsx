"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {DragDropContext,  Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

type Task = {
  id: string
  title: string
  description: string
  status: "To Do" | "In Progress" | "Completed"
  priority: "Low" | "Medium" | "High"
  dueDate: string
}

const columns: { id: Task['status']; title: string }[] = [
  { id: "To Do", title: "To Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Completed", title: "Completed" }
]

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true)
    const {toast} =useToast()
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token')

      try {
        setIsLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gettask`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedTasks = response.data.map((task: any) => ({
          id: task._id,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        }))

        setTasks(fetchedTasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
         toast({
          title: "Error",
          description: "Failed to fetch tasks. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  })
 const onDragEnd = async (result: DropResult) => {
  const { source, destination, draggableId } = result;

  if (!destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  // Find the task that was dragged
  const draggedTask = tasks.find(task => task.id === draggableId);
  
  if (!draggedTask) {
    console.error('Dragged task not found');
    return;
  }

  // Optimistically update the UI
  const updatedTasks = tasks.map(task =>
    task.id === draggedTask.id
      ? { ...task, status: destination.droppableId as Task['status'] }
      : task
  );

  setTasks(updatedTasks);

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/updatetask/${draggedTask.id}`,
      { status: destination.droppableId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to update task status');
    }

    const updatedTask = response.data;
    
    // Update the local state with the response from the server
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    ));

    toast({
      title: "Success",
      description: "Task status updated successfully.",
    });

  } catch (error) {
    console.error('Error updating task status:', error);
    
    // Revert the optimistic update
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === draggedTask.id ? { ...task, status: source.droppableId as Task['status'] } : task
    ));

    toast({
      title: "Error",
      description: "Failed to update task status. Please try again.",
      variant: "destructive",
    });
  }
};
  

 

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {columns.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`bg-secondary p-4 rounded-lg ${
                  snapshot.isDraggingOver ? "bg-secondary-focus" : ""
                }`}
              >
                <h2 className="text-xl font-bold mb-4">{column.title}</h2>
                {tasks
                  .filter((task) => task.status === column.id)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-2 ${
                            snapshot.isDragging ? "opacity-50" : ""
                          }`}
                        >
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">{task.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-xs text-muted-foreground">{task.description}</p>
                              <div className="mt-2 flex justify-between text-xs">
                                <span className="font-semibold">Priority: {task.priority}</span>
                                <span>Due: {task.dueDate}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}

      </div>
      </DragDropContext>
  )
}

