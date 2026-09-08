import { useState } from "react";

function Header({ title }) {
  return (
    <h1>
      {title}
    </h1>
  );
}

function Checkbox() {
  return (
    <input type="checkbox"></input>
  );
}

function DeleteTaskButton({ deleteTask }) {
  return (
    <button onClick={deleteTask}>Excluir</button>
  );
}

function ToDoList({ list, deleteTask }) {
  const listItems = list.map(item =>
    <li key={item.id}>
      <Checkbox /> {item.task} <DeleteTaskButton deleteTask={() => deleteTask(item.id)} />
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
    setTasks([...tasks, { id: uuid, task: inputValue }]);
    setInputValue('');
  };

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <Header title={"Lista de tarefas"} />

      <Input
        value={inputValue}
        onChange={handleChange}
      />
      <AddTaskButton onClick={handleSubmit} />
      <ToDoList list={tasks} deleteTask={deleteTask} />
    </>
  );
}

export default App
