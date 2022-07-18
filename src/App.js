import TodosList from './components/TodosList/TodosList';
import TodosConfig from './configs/TodosConfig';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{TodosConfig.TODOS_TITLE}</h1>
        <TodosList />
      </header>
    </div>
  );
}

export default App;
