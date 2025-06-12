import { Check, ChevronRight, Trash2 } from "lucide-react"
import { useNavigate } from "react-router"
// import EditTaskModal from "./EditTaskModal"
// import { useState } from "react"


type Task = {
  id: string
  title: string,
  description: string,
  checked: boolean
}

interface TasksProps {
  tasks: Task[],
  checkTask(task_id: string): void,
  deleteTask(task_id: string): void,
  updateTasks(tasks: Task[]): void
}


function Tasks({tasks, checkTask, deleteTask /*, updateTasks*/} : TasksProps) {

  const navigate = useNavigate();

  // const [isAlterTaskModalOpen, setIsAlterTaskModalOpen] = useState(false)

  // const [selectedTask, setSelectedTask] = useState<Task>()
  

  
  // function closeAlterTaskModal(){
  //   setIsAlterTaskModalOpen(false)
  // }


  // function openAlterTaskModal(task_id: string){

    
  //   const task = tasks.find(task => task.id === task_id)
    
  //   if (!task) {
  //     return
  //   }

  //   setSelectedTask(task)
  //   setIsAlterTaskModalOpen(true)

  // }


  return (
    

    <div className="flex flex-col space-y-3">
      
    {tasks.length === 0 ? 
      ( <span className="text-slate-300 text-center">Nenhuma task listada</span> ) 
    : (
        tasks.map((task) => (
          
          <div key={task.id} className="flex items-center gap-2 w-full text-slate-100">
            <button
              onClick={() => checkTask(task.id)}
              className="bg-slate-400 flex items-center gap-3 pl-3 pr-3 py-2 flex-1 rounded-sm cursor-pointer hover:bg-slate-500 overflow-hidden"
            >
              {task.checked && <Check className="size-5 shrink-0" />}

              <span className={`text-left font-medium truncate ${task.checked ? "line-through" : ""}`}>
                {task.title}
              </span>
            </button>

            <button
              // onClick={() => openAlterTaskModal(task.id)}
              onClick={() => {navigate(`/tasks/${task.id}/edit`)}}
              className="bg-slate-400 p-2 text-left rounded-sm cursor-pointer hover:bg-slate-500"
            >
              <ChevronRight className="size-6" />
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-900 p-2 text-left rounded-sm cursor-pointer hover:bg-red-800"
            >
              <Trash2 className="size-6 text-red-300" />
            </button>
          </div>
        ))
      )}

    
      {/* {isAlterTaskModalOpen && 
        <EditTaskModal 
          closeAlterTaskModal={closeAlterTaskModal} 
          task={selectedTask} 
          tasks={tasks}
          updateTasks={updateTasks}
        />
      } */}

    </div>
  )
}

export default Tasks