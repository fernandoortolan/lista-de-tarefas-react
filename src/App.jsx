import { useState } from "react";
import './App.css';

function Header({ title }) {
  return (
    <h1>
      {title}
    </h1>
  );
}

function Info({ content, className }) {
  return (
    <p className={className}>
      {content}
    </p>
  );
}

function Checkbox({ changeTaskStatus }) {
  return (
    <input type="checkbox" onClick={changeTaskStatus}></input>
  );
}

function DeleteTaskButton({ deleteTask }) {
  return (
    <button onClick={deleteTask}>Excluir</button>
  );
}

function ToDoList({ list, deleteTask, changeTaskStatus }) {
  const listItems = list.map((item) =>
    <li key={item.id} className="task">
      <div className="task-content">
        <Checkbox changeTaskStatus={() => changeTaskStatus(item.id)} />
        <span className={item.completed ? 'checked' : ''}>{item.task}</span>
      </div>
      <DeleteTaskButton deleteTask={() => deleteTask(item.id)} />
    </li>
  );

  return (
    <ul>
      {listItems}
    </ul>
  );
}

function Input({ value, handleChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder='Continuar a leitura (Casa de Folhas)'
    >
    </input>
  );
}

function AddTaskButton({ onClick }) {
  return (
    <button onClick={onClick}>Adicionar</button>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = () => {
    const uuid = crypto.randomUUID();
    if (inputValue.trim() === '') {
      alert('Digite uma tarefa para adicinar a lista');
    } else {
      setTasks([...tasks, { id: uuid, task: inputValue, completed: false }]);
    }
    setInputValue('');
  };

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function changeTaskStatus(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.completed = task.completed ? false : true;
        }
        return task;
      })
    );
  }

  return (
    <div className="todo">
      <div className="header-container">
        <Header title={"Lista de tarefas"} />
      </div>
      <div className="input-task-container">
        <Input
          value={inputValue}
          handleChange={handleChange}
        />
        <div>
          <AddTaskButton onClick={handleSubmit} />
        </div>
      </div>
      <div className="info-container">
        <Info
          content={"Tarefas concluídas: 0"}
          className="info-completed-tasks"
        />
      </div>
      <div className="todo-list-container">
        <ToDoList
          list={tasks}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
        />
      </div>
    </div>
  );
}

export default App
