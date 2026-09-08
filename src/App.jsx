import { useState } from "react";

function Header({ title }) {
  return (
    <h1>
      {title}
    </h1>
  );
}

function ToDoList({ list }) {
  const listItems = list.map(item => <li>{item}</li>);

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
    setTasks([...tasks, inputValue]);
    setInputValue('');
  };

  return (
    <>
      <Header title={"Lista de tarefas"} />

      <Input
        value={inputValue}
        onChange={handleChange}
      />
      <AddTaskButton onClick={handleSubmit} />
      <ToDoList list={tasks} />
    </>
  );
}

export default App
