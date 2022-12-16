import './App.css';
// import Table from './components/table/table-ui-kit';
import Table from './components/table/table-base';
// import Table from './components/table/table';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <Table/>
  </DndProvider>
  );
}

export default App;
