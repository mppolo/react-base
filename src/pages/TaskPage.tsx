import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


type Task = {
  id: string
  title: string,
  description: string,
  completed: boolean
}

function TaskPage() {
  
  const navigate = useNavigate()
  const params = useParams()
  

  const [task, setTask] = useState<Task | null>(null)

   useEffect(() => {
  
    // const tasksStore = localStorage.getItem('tasks');
  
    // if (!tasksStore || !params.taskId) return;

    // const tasks: Task[] = JSON.parse(tasksStore);

    // const foundTask = tasks.find((item) => item.id === params.taskId);

    // setTask(foundTask ?? null)


    if (!params.taskId) return;

    const getTodos = async () => {

       const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
        method: 'GET'
      })

      const data = await response.json()

      const tasks: Task[] = data;

      // console.log(tasks)

      const foundTask = tasks.find((item) => item.id.toString() === params.taskId?.toString());

      // tasks.map((item) => console.log(item.id))
    
      // console.log(params.taskId)
      // console.log(foundTask)

      setTask(foundTask ?? null)

    }


     getTodos() 


  }, [params.taskId])


  

  return (
     <div className="h-screen w-screen flex flex-col bg-slate-400 items-center p-6 space-y-4">

      <div className="flex items-center justify-center w-[500px]">
        <button onClick={() => {navigate(-1)}} className="text-slate-100 rounded-sm hover:bg-slate-600 cursor-pointer">
          <ChevronLeft className="size-6"/>
        </button>
        <h1 className="text-2xl font-bold text-slate-100 text-center flex-1">Detalhes da Tarefa</h1>
      </div>

      <div className="w-[500px] bg-slate-100 px-4 py-4 rounded-md shadow-sm space-y-4">
          <div className="flex flex-col space-y-6">
            
            <span className="text-xl font-semibold text-slate-600">
              {task?.title}
            </span>
            
            <span className="text-slate-600">
              {task?.description}
            </span>
            
          </div>
      </div>

    </div>
  )
}

export default TaskPage