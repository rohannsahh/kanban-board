"use client"

import {  useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    id: z.string().optional(), 

  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "Completed"]),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Please enter a valid date ",
  }),
})

type TaskFormProps = {
  task?: z.infer<typeof formSchema>
  onSubmit: (data: z.infer<typeof formSchema>) => void
  closeForm: () => void;
}

export function TaskForm({ task, onSubmit,closeForm }: TaskFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const {toast} =useToast()
  const token = localStorage.getItem('token');


  const form = useForm<z.infer<typeof formSchema> & { id?: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: task || {
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      dueDate: "",
    },
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    console.log("Submitting Task Form:", task, "Form Values:", values);

    try {
      if (task) {
        // Edit existing task
        await editTask(task.id, values)
      } else {
        // Create new task
        await createTask(values)
      }
      onSubmit(values)
      toast({
        title: task ? "Task updated successfully!" : "Task created successfully!",
      })
      closeForm();
    } catch (error) {
      console.error("Error submitting task:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  async function editTask(id: string| undefined, data: z.infer<typeof formSchema>) {
    if (!id) {
      throw new Error("Task ID is required for updating a task");
    }
  

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/updatetask/${id}`, 
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to update task");
    }
    return response.data;
  }

  async function createTask(data: z.infer<typeof formSchema>) {
  if (!token) {
    throw new Error('No token found');
  }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/createtask`, data,  {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
    if (response.status !== 201) {
      throw new Error('Failed to create task')
    }
    return response.data
  }

  return (
    <div className="h-[80vh">
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : (task ? "Update Task" : "Create Task")}
        </Button>
      </form>
    </Form>
    </div>
  )
}