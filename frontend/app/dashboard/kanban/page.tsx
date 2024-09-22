"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Task = {
  id: string
  title: string
  description: string
  status: "To Do" | "In Progress" | "Completed"
  priority: "Low" | "Medium" | "High"
  dueDate: string
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Create project proposal",
    description: "Draft a detailed project proposal for the new client",
    status: "In Progress",
    priority: "High",
    dueDate: "2023-06-15",
  },
  {
    id: "2",
    title: "Update website content",
    description: "Review and update the content on the company website",
    status: "To Do",
    priority: "Medium",
    dueDate: "2023-06-20",
  },
  {
    id: "3",
    title: "Prepare quarterly report",
    description: "Compile and analyze data for the quarterly financial report",
    status: "Completed",
    priority: "High",
    dueDate: "2023-06-10",
  },
]

const columns = ["To Do", "In Progress", "Completed"]

export default function KanbanPage() {
  const [tasks, setTasks] = useState(initialTasks)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newTasks = Array.from(tasks)
    const [reorderedItem] = newTasks.splice(result.source.index, 1)
    reorderedItem.status = result.destination.droppableId
    newTasks.splice(result.destination.index, 0, reorderedItem)

    setTasks(newTasks)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {columns.map((column) => (
          <div key={column} className="w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>{column}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={column}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[500px]"
                    >
                      {tasks
                        .filter((task) => task.status === column)
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2"
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
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}