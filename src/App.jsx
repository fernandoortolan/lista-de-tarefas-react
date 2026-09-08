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

function Input() {
  return (
    <input type="text"></input>
  )
}

function App() {
  const tasks = [
    'Fazer exercício',
    'Ler documentação',
    'Lavar cafeteira',
  ];

  return (
    <>
      <Header title={"Lista de tarefas"} />
      <Input />
      <ToDoList list={tasks} />
    </>
  );
}

export default App
