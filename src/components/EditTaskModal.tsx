import { X } from "lucide-react"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"


type Task = {
  id: string
  title: string,
  description: string,
  checked: boolean
}


interface EditTaskModalProps {
  task: Task | undefined
  tasks: Task[]
  closeAlterTaskModal: () => void
  updateTasks(tasks: Task[]): void
}

function EditTaskModal({task, tasks, updateTasks, closeAlterTaskModal}: EditTaskModalProps) {

  const [titleTask, setTitleTask] = useState('')
  const [descriptionTask, setDescriptionTask] = useState('')

  useEffect(() => {

    if (task) {

      setTitleTask(task.title)
      setDescriptionTask(task.description)

    }

  }, [task])
  
  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(event.target.value)
  }

 
   const handleSubmit = (event: FormEvent) => {

    event.preventDefault();

    if (!task) return

    const newTasks = tasks.map((t) =>
      t.id === task.id
        ? { ...t, title: titleTask, description: descriptionTask }
        : t
    )

    updateTasks(newTasks)
    closeAlterTaskModal()
  }



  return (
    <div className="fixed inset-0 bg-slate-950/70 flex items-center justify-center">

      <div className="w-[540px] h-[280px] rounded-md py-4 px-8 shadow-sm bg-slate-100">
        
        <div className="flex items-center justify-between">
          <p className="text-slate-800 font-bold text-lg">Alteração de Tarefa</p>
          <button onClick={closeAlterTaskModal}>
            <X className="size-5 text-slate-800 font-bold cursor-pointer"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 mt-10">
          <div className="flex flex-col space-y-4">
            <input onChange={handleChangeTitle} type="text" name="title_task" autoComplete="off" className="bg-white text-slate-700 rounded-md px-4 py-2 text-left" placeholder="Título da tareda" defaultValue={titleTask}/>
            <input onChange={event => setDescriptionTask(event.target.value)} type="text" name="description_task" autoComplete="off" className="bg-white text-slate-700 rounded-md px-4 py-2 text-left" placeholder="Descrição da tareda" defaultValue={descriptionTask}/>
          </div>
          <button type="submit" className="py-2 bg-slate-500 hover:bg-slate-400 text-slate-200 rounded-sm font-semibold text-center cursor-pointer">Alterar</button>
        </form>
       
      </div>

    </div>
  )
}

export default EditTaskModal