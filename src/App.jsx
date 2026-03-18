import { useEffect, useState } from "react";
import AddTask from "./components/AddTasks";
import Tasks from "./components/Tasks";
import {v4} from "uuid"
import Title from "./components/Title"

function App(){
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []) //Isso é um Hook, serve para armazenar valores que serão mostrados na tela, essas listas são as tarefas a serem completadas

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  
  useEffect(() => {
  async function fetchTasks(){
    // CHAMA A API
  // usando o fetch do javascript

  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10",
    {
      method: 'GET',
    }
  )
    // o limit faz com que só apareça 10 tarefas
  
  // PEGAR OS DADOS QUE ELA RETORNA
  const  data = await response.json()

  // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
  setTasks(data)
  }

  fetchTasks()
  }, []) 
  /*
  Você precisa executar uma ação assim que o usuário acessar o componente, a lista vazia faz essa ação ser executada somente na primeira vez que o usuário acessa a aplicação
  */

  function onTaskClick(taskId){
    const newTasks = tasks.map(task =>{
      //Preciso Atualizar essa Tarefa
      if (task.id == taskId){
        return {...task, isCompleted: !task.isCompleted}
      }
      //Não preciso atualizar essa tarefa
      return task;
    });
    setTasks(newTasks)
  }

  function onDeleteTaskClick(taskId){
    const newTasks = tasks.filter((task) => task.id != taskId)
    setTasks(newTasks);
  }
  
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    }
    setTasks([...tasks, newTask])

  }

  return (
    <div className="w-screen min-h-screen bg-slate-500 flex justify-center p-6">
    <div className="w-125 space-y-4">
      <Title>
        Gerenciador de tarefas
      </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
      <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
    </div>
    </div>
  );
}

export default App