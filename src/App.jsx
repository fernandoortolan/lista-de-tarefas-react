function Header({ title }) {
  return (
    <h1>
      {title}
    </h1>
  )
}

function App() {
  const tarefas = [
    'Fazer exercício',
    'Ler documentação',
    'Lavar cafeteira',
  ];

  const itensDaLista = tarefas.map(tarefa => <li>{tarefa}</li>);

  return (
    <>
      <Header title={"Lista de tarefas"} />
      <ul>{itensDaLista}</ul>
    </>
  );
}

export default App
