// import React, { useState } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import TaskList from './TaskList';
// import KanbanBoard from './KanbanBoard';
// import TaskForm from './TaskForm';
// import useTasks from '../hooks/useTasks';
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// const Dashboard: React.FC = () => {
//   const [activeView, setActiveView] = useState<'list' | 'kanban'>('list');
//   const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
//   const { tasks, addTask, updateTask, deleteTask, moveTask, filterTasks, sortTasks } = useTasks();

//   const handleAddTask = (newTask: any) => {
//     addTask(newTask);
//     setIsAddTaskDialogOpen(false);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Task Management Dashboard</h1>
//       <div className="flex justify-between items-center mb-4">
//         <Tabs defaultValue="list" onValueChange={(value) => setActiveView(value as 'list' | 'kanban')}>
//           <TabsList>
//             <TabsTrigger value="list">List View</TabsTrigger>
//             <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
//           </TabsList>
//         </Tabs>
//         <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>Add Task</Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Task</DialogTitle>
//             </DialogHeader>
//             <TaskForm onSubmit={handleAddTask} />
//           </DialogContent>
//         </Dialog>
//       </div>
//       <TabsContent value="list">
//         <TaskList
//           tasks={tasks}
//           onUpdateTask={updateTask}
//           onDeleteTask={deleteTask}
//           onFilterTasks={filterTasks}
//           onSortTasks={sortTasks}
//         />
//       </TabsContent>
//       <TabsContent value="kanban">
//         <KanbanBoard tasks={tasks} onMoveTask={moveTask} />
//       </TabsContent>
//     </div>
//   );
// };

// export default Dashboard;


// 'use client'

// import { useAuth } from '../contexts/AuthContext'
// import ProtectedRoute from '../../components/ProtectedRoute'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// export default function DashboardPage() {
//   const { user, logout } = useAuth()

//   return (
//     <ProtectedRoute>
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-center">Dashboard</CardTitle>
//             <CardDescription className="text-center">Welcome to your dashboard</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-center mb-4">Hello, {user?.name}!</p>
//             <p className="text-center">Your email: {user?.email}</p>
//           </CardContent>
//           <CardFooter className="flex justify-center">
//             <Button onClick={logout}>Logout</Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </ProtectedRoute>
//   )
// }

'use client';

import { useAuth } from '@/hooks/useAuth';

const DashboardPage = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>; // Show a loading state while checking authentication
    }
  
    if (!isAuthenticated) {
      return null; // This will prevent the component from rendering before redirect
    }
  
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
       <h2>hello</h2>
    </div>
  );
}

export default DashboardPage;

