import './App.css';
import './NavBar.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <ItemListContainer />
    </div>
    
  );
}

export default App;
