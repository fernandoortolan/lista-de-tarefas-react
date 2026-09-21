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
    <button className="delete-button" onClick={deleteTask}>Excluir</button>
  );
}

function DeleteCompletedTasksButton({ deleteCompletedTasks }) {
  return (
    <button className="delete-button" onClick={deleteCompletedTasks}>Excluir concluídas</button>
  );
}

function EditTaskButton() {
  return (
    <button className="edit-button">Editar</button>
  );
}

function ToggleModalButton({ content, toggleModal, id }) {
  return (
    <button onClick={() => toggleModal(id)}>{content}</button>
  );
}

function ConfirmDeleteTaskModal({ task, deleteTask, toggleModal, id }) {
  return (
    <>
      <div className="modal-overlay"></div>

      <div className="todo confirm-delete-modal">
        <h2>Confirmação de exclusão</h2>
        <p>{task}</p>
        <p>Tem certeza que deseja excluir esta tarefa?</p>
        <div className="modal-buttons">
          <ToggleModalButton
            content="Cancelar"
            toggleModal={toggleModal}
            id={id}
          />
          <DeleteTaskButton deleteTask={() => deleteTask(id)} />
        </div>
      </div>
    </>
  );
}

function ToggleModalDeleteCompletedTasksButton({ content, toggleModal }) {
  return (
    <button className="delete-completed-button" onClick={toggleModal}>{content}</button>
  );
}

function ConfirmDeleteCompletedTasksModal({ toggleModal, deleteCompletedTasks }) {
  return (
    <>
      <div className="modal-overlay"></div>

      <div className="todo confirm-delete-completed-tasks-modal">
        <h2>Confirmação de exclusão</h2>
        <p>Tem certeza que deseja excluir as tarefas concluídas?</p>
        <div className="modal-buttons">
          <ToggleModalDeleteCompletedTasksButton
            content="Cancelar"
            toggleModal={toggleModal}
          />
          <DeleteCompletedTasksButton deleteCompletedTasks={deleteCompletedTasks} />
        </div>
      </div>
    </>
  );
}

function ToDoList({ list, deleteTask, changeTaskStatus }) {
  const [enabledDeleteTaskModal, setEnabledDeleteTaskModal] = useState(null);

  function handleClickToggleDeleteTaskModal(id) {
    setEnabledDeleteTaskModal(enabledDeleteTaskModal === id ? null : id);
  }

  const listItems = list.map((item) =>
    <li key={item.id} className="task">
      <div className="task-content">
        <Checkbox changeTaskStatus={() => changeTaskStatus(item.id)} />
        <span className={item.completed ? 'checked' : ''}>{item.task}</span>
      </div>
      <div className="task-buttons">
        <EditTaskButton />
        <ToggleModalButton
          content="Excluir"
          toggleModal={handleClickToggleDeleteTaskModal}
          id={item.id}
        />
      </div>
      {
        enabledDeleteTaskModal === item.id && (
          <ConfirmDeleteTaskModal
            task={item.task}
            deleteTask={deleteTask}
            id={item.id}
            toggleModal={handleClickToggleDeleteTaskModal}
          />
        )
      }
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

  const [enabledDeleteCompletedTasksModal, setEnabledDeleteCompletedTasksModal] = useState(null);

  function handleClickToggleModalDeleteCompletedTasks() {
    setEnabledDeleteCompletedTasksModal(enabledDeleteCompletedTasksModal === null ? true : null);
  }

  function deleteCompletedTasks() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  const handleClickDeleteCompletedTasks = () => {
    deleteCompletedTasks();
    handleClickToggleModalDeleteCompletedTasks();
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
        <div className="info-completed-tasks-container">
          <Info
            content={"Tarefas concluídas: " + completedTasks}
            className="info-completed-tasks"
          />
          <ToggleModalDeleteCompletedTasksButton
            content="Excluir concluídas"
            toggleModal={handleClickToggleModalDeleteCompletedTasks}
          />
        </div>
        <Info
          content={"Tarefas pendentes: " + pendingTasks}
          className="info-pending-tasks"
        />
      </div>
      {
        enabledDeleteCompletedTasksModal && (
          <ConfirmDeleteCompletedTasksModal
            toggleModal={handleClickToggleModalDeleteCompletedTasks}
            deleteCompletedTasks={handleClickDeleteCompletedTasks}
          />
        )
      }
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
