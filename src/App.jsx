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

function DeleteCompletedTasksButton() {
  return (
    <button>Excluir concluídas</button>
  )
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

function Input({ value, handleChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
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
  const placeholders = [
    "Comprar café",
    "Levar o gato passear",
    "Ler por 1 hora",
    "Ir ao supermercado",
    "Responder os e-mails",
    "Fazer exercícios",
    "Lavar a louça",
    "Pagar a conta de luz",
    "Organizar o quarto",
    "Terminar o projeto"
  ];
  const [placeholder, setPlaceholder] = useState(placeholders[Math.floor(Math.random() * placeholders.length)]);

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
    setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]);
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

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="todo">
      <div className="header-container">
        <Header title={"Lista de tarefas"} />
      </div>
      <div className="input-task-container">
        <Input
          value={inputValue}
          handleChange={handleChange}
          placeholder={placeholder}
        />
        <div>
          <AddTaskButton onClick={handleSubmit} />
        </div>
      </div>
      <div className="info-container">
        <Info
          content={"Tarefas concluídas: " + completedTasks}
          className="info-completed-tasks"
        />
        <Info
          content={"Tarefas pendentes: " + pendingTasks}
          className="info-pending-tasks"
        />
      </div>
      <DeleteCompletedTasksButton />
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
