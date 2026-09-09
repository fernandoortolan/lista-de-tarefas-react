import { useState } from "react";
import './App.css';

function Header({ title }) {
  return (
    <h1>
      {title}
    </h1>
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
  const listItems = list.map(item =>
    <li key={item.id}>
      <Checkbox changeTaskStatus={() => changeTaskStatus(item.id)} />
      <span className="spacing"></span>
      <span className={item.completed ? 'checked' : ''}>{item.task}</span>
      <span className="spacing"></span>
      <DeleteTaskButton deleteTask={() => deleteTask(item.id)} />
    </li>
  );

  return (
    <ul>
      {listItems}
    </ul>
  );
}

function Input({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
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
    setTasks([...tasks, { id: uuid, task: inputValue, completed: false }]);
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
    <>
      <Header title={"Lista de tarefas"} />

      <Input
        value={inputValue}
        onChange={handleChange}
      />
      <AddTaskButton onClick={handleSubmit} />
      <ToDoList list={tasks} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus} />
    </>
  );
}

export default App
