import React, { useEffect, useState } from 'react';
import './App.css';
import { uuid } from 'uuidv4';

interface Task {
  id: string;
  description: string;
  done: boolean;
  createdAt: Date;
}

function App() {
  const [taskDraft, setTaskDraft] = useState<string>('create an awesome app with react');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (localStorage) {
      const taksString = localStorage.getItem('tasks');
      if (taksString) {
        setTasks(JSON.parse(taksString));
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage) {
      const tasksString = JSON.stringify(tasks);
      localStorage.setItem('tasks', tasksString);
    }
  }, [tasks]);

  function handleAddTask() {
    setErrorMessage('');

    if (!taskDraft.trim()) {
      setErrorMessage('Fill the task description.');
      return;
    }

    let newTask : Task = {
      id: uuid(),
      description: taskDraft,
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
    <div className="container">
      <h1 className="title">REACT TODO APP</h1>

      <div className="new-task-box">
        <input
          type="text"
          value={taskDraft}
          onChange={e => setTaskDraft(e.target.value)}
        ></input>
        <button type="button" onClick={handleAddTask}>ADD</button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>

      <div className="tasks-box">
        {tasks.map(task => {
          return <div>
            <button type="button" onClick={() => handleMarkTaskAdDone(task.id)}>
              DONE
            </button>
            <p>{task.id}</p>
            <p>{task.description}</p>
            <p>{task.done ? "YES" : "NO"}</p>
            <p>{task.createdAt.toLocaleString()}</p>
            <button type="button" onClick={() => handleRemoveTask(task.id)}>
              REMOVE
            </button>
          </div>
        })}

        <div className="clear-button-box">
          <button  type="button" onClick={handleClearTaskList}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default App;
