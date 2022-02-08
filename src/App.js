import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  override: {
    
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
