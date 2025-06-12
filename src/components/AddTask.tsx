import { useState, type FormEvent } from "react"
import { v4 as uuidv4 } from 'uuid';


type Task = {
  id: string
  title: string,
  description: string,
  checked: boolean
}

interface AddTaskProps {
  tasks: Task[],
  updateTasks(tasks: Task[]): void
}


function AddTask({tasks, updateTasks}: AddTaskProps) {


    const [titleTask, setTitleTask] = useState('')
    const [descriptionTask, setDescriptionTask] = useState('')

    
    const handleSubmit = (event: FormEvent) => {

      event.preventDefault()

      if (titleTask === '' || descriptionTask === '') {
        return
      }

      const newTask: Task = {
        id: uuidv4(),
        title: titleTask,
        description: descriptionTask,
        checked: false,
      }

      updateTasks([...tasks, newTask])

     
      setTitleTask('')
      setDescriptionTask('')
  
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input onChange={(event) => setTitleTask(event.target.value)} value={titleTask} type="text" name="title_task" autoComplete="off" className="bg-white text-slate-700 rounded-md px-4 py-2 text-left" placeholder="Título da tareda"/>
        <input onChange={(event) => setDescriptionTask(event.target.value)} value={descriptionTask} type="text" name="description_task" autoComplete="off" className="bg-white text-slate-700 rounded-md px-4 py-2 text-left" placeholder="Descrição da tareda"/>
        <button type="submit" className="py-2 bg-slate-500 hover:bg-slate-400 text-slate-200 rounded-sm font-semibold text-center cursor-pointer">Adicionar</button>
      </form>
    )
}

export default AddTask