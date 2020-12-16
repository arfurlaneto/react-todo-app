import React, {useEffect, useState} from 'react';
import './App.css';
import { uuid } from 'uuidv4';

interface Task {
  id: string;
  description: string;
  done: boolean;
  createdAt: Date;
}

function App() {
  const [taskDraft, setTaskDraft] = useState<string>('New Task');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const taksString = localStorage.getItem('tasks');
    if (taksString) {
      setTasks(JSON.parse(taksString));
    }
  }, []);

  useEffect(() => {
    const tasksString = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksString);
  }, [tasks]);

  function handleAddTask() {
    setErrorMessage('');

    if (!taskDraft.trim()) {
      setErrorMessage('Fill the task description.');
      return;
    }

    let newTask : Task = {
      id: uuid(),
      description: "Ir ao mercado comprar ovo.",
      done: false,
      createdAt: new Date()
    };

    setTasks([...tasks, newTask]);
  }

  function handleRemoveTask(id: string) {
    setTasks(tasks.filter(f => f.id !== id));
  }

  function handleMarkTaskAdDone(id: string) {
    let newTasks = tasks.map(task => {
      if (task.id !== id) {
        return task;
      }

      return {
        ...task,
        done: !task.done
      };
    });

    setTasks(newTasks);
  }

  function handleClearTaskList() {
    setTasks([]);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <button type="button" onClick={handleClearTaskList}>Clear Tasks</button>
      <input type="text" value={taskDraft} onChange={e => setTaskDraft(e.target.value)} ></input>
      <button type="button" onClick={handleAddTask}>Adicionar Tarefa</button>
      {errorMessage && <p>{errorMessage}</p>}
      {tasks.map(task => {
        return <div style={{ border: '1px solid red'}}>
          <button type="button" onClick={() => handleMarkTaskAdDone(task.id)}>DONE</button>
          <p>{task.id}</p>
          <p>{task.description}</p>
          <p>{task.done ? "SIM" : "NÃO"}</p>
          <p>{task.createdAt.toLocaleString()}</p>
          <button type="button" onClick={() => handleRemoveTask(task.id)}>REMOVE</button>
        </div>
      })}
    </div>
  );
}

export default App;
