import { useEffect, useState } from "react"
import AddTask from "./components/AddTask"
import Tasks from "./components/Tasks"


function App() {

  type Task = {
    id: string,
    title: string,
    description: string,
    checked: boolean
  }

  // const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');

  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem('tasks') ?? '[]')
  )

  // { 
  //     id: '971ad767-a9fc-48b1-971c-f72d97139a5c',
  //     title: 'Estudar React',
  //     description: 'Estudar React',
  //     checked: true
  //   },
  //   {
  //     id: '505a29d8-d87b-4f2a-9cb3-949d3216f9df',
  //     title: 'Estudar Tailwind CSS',
  //     description: 'Estudar Tailwind CSS',
  //     checked: false
  //   },
  //   {
  //     id: '5d2abdd6-915a-4548-bce8-d720776c8051',
  //     title: 'Estudar TypeScript',
  //     description: 'Estudar TypeScript',
  //     checked: false
  //   }

  function updateTasks(newTasks: Task[]) {
    setTasks(newTasks)
  }


  function checkTask(task_id: string) {

    const new_tasks = tasks.map((task) => {
      if (task.id === task_id) {
        return {
          ...task,
          checked: !task.checked, 
        };
      }
      return task;
    });

    setTasks(new_tasks)

  }

  function deleteTask(task_id: string) {

    const new_tasks = tasks.filter(task => task.id !== task_id)

    setTasks(new_tasks)

  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {

   const getTodos = async () => {

      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
        method: 'GET'
      })

      const data = await response.json()

      setTasks(data)

   }

   getTodos()

  }, [])

  return (

    <div className="h-screen w-screen flex flex-col bg-slate-400 items-center p-6 space-y-4">

      <h1 className="text-2xl font-bold text-slate-100 text-center">
        Gerenciador de Tarefas
      </h1>

      <div className="w-[500px] bg-slate-100 px-4 py-4 rounded-md shadow-sm space-y-4">
          <AddTask 
            tasks={tasks}  
            updateTasks={updateTasks}
          />
      </div>

        <div className="w-[500px] bg-slate-100 px-4 py-4 rounded-md shadow-sm space-y-4">
          <Tasks 
            tasks={tasks} 
            checkTask={checkTask}
            deleteTask={deleteTask}
            updateTasks={updateTasks}   
          />
      </div>

    </div>
  )
}

export default App