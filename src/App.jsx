import { useState } from "react";
import './App.css';

function Header({ title }) {
  return (
    <h1>{title}</h1>
  );
}

function Info({ className, content }) {
  return (
    <p className={className}>
      {content}
    </p>
  );
}

function Checkbox({ changeTaskStatus }) {
  return (
    <input
      type="checkbox"
      onChange={changeTaskStatus}
    />
  );
}

function DeleteTaskButton({ deleteTask }) {
  return (
    <button
      className="delete-button"
      onClick={deleteTask}
    >
      Excluir
    </button>
  );
}

function DeleteCompletedTasksButton({ deleteCompletedTasks }) {
  return (
    <button
      className="delete-button"
      onClick={deleteCompletedTasks}
    >
      Excluir concluídas
    </button>
  );
}

function EditTaskButton({ editTask }) {
  return (
    <button
      className="edit-button"
      onClick={editTask}
    >
      Salvar alterações
    </button>
  );
}

function ToggleModalButton({ toggleModal, id, content }) {
  return (
    <button onClick={() => toggleModal(id)}>
      {content}
    </button>
  );
}

function ToggleModalDeleteCompletedTasksButton({ toggleModal, content }) {
  return (
    <button onClick={toggleModal}>
      {content}
    </button>
  );
}

function ConfirmEditTaskModal({
  task,
  id,
  setTasks,
  tasks,
  toggleModal
}) {
  const [editValue, setEditValue] = useState(task);

  function editTask(id) {
    const trimmedValue = editValue.trim();

    if (trimmedValue === '') {
      return;
    }

    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            task: trimmedValue
          };
        }

        return task;
      })
    );

    toggleModal(id);
  }

  return (
    <>
      <div className="modal-overlay"></div>

      <div className="todo confirm-edit-modal">
        <h2>Editar tarefa</h2>

        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />

        <div className="modal-buttons">
          <ToggleModalButton
            toggleModal={toggleModal}
            id={id}
            content="Cancelar"
          />

          <EditTaskButton
            editTask={() => editTask(id)}
          />
        </div>
      </div>
    </>
  );
}

function ConfirmDeleteTaskModal({
  task,
  toggleModal,
  deleteTask,
  id
}) {
  return (
    <>
      <div className="modal-overlay"></div>

      <div className="todo confirm-delete-modal">
        <h2>Confirmação de exclusão</h2>

        <p>{task}</p>

        <p>
          Tem certeza que deseja excluir esta tarefa?
        </p>
        <div className="modal-buttons">
          <ToggleModalButton
            toggleModal={toggleModal}
            id={id}
            content="Cancelar"
          />

          <DeleteTaskButton
            deleteTask={() => deleteTask(id)}
          />
        </div>
      </div>
    </>
  );
}

function ConfirmDeleteCompletedTasksModal({
  toggleModal,
  deleteCompletedTasks
}) {
  return (
    <>
      <div className="modal-overlay"></div>

      <div className="todo confirm-delete-completed-tasks-modal">
        <h2>Confirmação de exclusão</h2>

        <p>
          Tem certeza que deseja excluir as tarefas concluídas?
        </p>

        <div className="modal-buttons">
          <ToggleModalDeleteCompletedTasksButton
            toggleModal={toggleModal}
            content="Cancelar"
          />

          <DeleteCompletedTasksButton
            deleteCompletedTasks={deleteCompletedTasks}
          />
        </div>
      </div>
    </>
  );
}

function ToDoList({
  list,
  deleteTask,
  tasks,
  setTasks,
  changeTaskStatus
}) {
  const [
    enabledDeleteTaskModal,
    setEnabledDeleteTaskModal
  ] = useState(null);

  function handleClickToggleDeleteTaskModal(id) {
    setEnabledDeleteTaskModal(
      enabledDeleteTaskModal === id ? null : id
    );
  }

  const [
    enabledEditTaskModal,
    setEnabledEditTaskModal
  ] = useState(null);

  function handleClickToggleEditTaskModal(id) {
    setEnabledEditTaskModal(
      enabledEditTaskModal === id ? null : id
    );
  }

  const listItems = list.map((item) => (
    <li
      key={item.id}
      className="task"
    >
      <div className="task-content">
        <Checkbox
          changeTaskStatus={() => changeTaskStatus(item.id)}
        />

        <span className={item.completed ? 'checked' : ''}>
          {item.task}
        </span>
      </div>

      <div className="task-buttons">
        <ToggleModalButton
          toggleModal={handleClickToggleEditTaskModal}
          id={item.id}
          content="Editar"
        />

        <ToggleModalButton
          toggleModal={handleClickToggleDeleteTaskModal}
          id={item.id}
          content="Excluir"
        />
      </div>

      {
        enabledDeleteTaskModal === item.id && (
          <ConfirmDeleteTaskModal
            task={item.task}
            toggleModal={handleClickToggleDeleteTaskModal}
            deleteTask={deleteTask}
            id={item.id}
          />
        )
      }

      {
        enabledEditTaskModal === item.id && (
          <ConfirmEditTaskModal
            task={item.task}
            id={item.id}
            setTasks={setTasks}
            tasks={tasks}
            toggleModal={handleClickToggleEditTaskModal}
          />
        )
      }
    </li>
  ));

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
    />
  );
}

function AddTaskButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Adicionar
    </button>
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

  const [placeholder, setPlaceholder] = useState(
    () => placeholders[Math.floor(Math.random() * placeholders.length)]
  );

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = () => {
    const uuid = crypto.randomUUID();

    const trimmedValue = inputValue.trim();

    if (trimmedValue === '') {
      alert('Digite uma tarefa para adicinar à lista');
    } else {
      setTasks([...tasks, { id: uuid, task: trimmedValue, completed: false }]);
    }

    setInputValue('');

    setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]);
  }

  function deleteTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function changeTaskStatus(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed
          };
        }

        return task;
      })
    );
  }

  const [
    enabledDeleteCompletedTasksModal,
    setEnabledDeleteCompletedTasksModal
  ] = useState(null);

  function handleClickToggleModalDeleteCompletedTasks() {
    setEnabledDeleteCompletedTasksModal(
      enabledDeleteCompletedTasksModal === null ? true : null
    );
  }

  function deleteCompletedTasks() {
    setTasks((tasks) => tasks.filter((task) => !task.completed));
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
            className="info-completed-tasks"
            content={"Tarefas concluídas: " + completedTasks}
          />

          <ToggleModalDeleteCompletedTasksButton
            toggleModal={handleClickToggleModalDeleteCompletedTasks}
            content="Excluir concluídas"
          />
        </div>

        <Info
          className="info-pending-tasks"
          content={"Tarefas pendentes: " + pendingTasks}
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
          tasks={tasks}
          setTasks={setTasks}
          changeTaskStatus={changeTaskStatus}
        />
      </div>
    </div>
  );
}

export default App
