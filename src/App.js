import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
  override: {
    
  }
});

function App() {
  return (
    <ThemeProvider theme={theme} >
      <div className="App">
        <Form />
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
