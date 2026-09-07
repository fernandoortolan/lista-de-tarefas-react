function Header({ title }) {
  return (
    <h1>
      {title}
    </h1>
  )
}

function App() {
  return (
    <Header title={"Lista de tarefas"} />
  );
}

export default App
