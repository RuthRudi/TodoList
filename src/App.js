import Form from './components/Form';
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';
import './App.css';

function App() {


  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setfilteredTodos] = useState([]);
  
 

  useEffect(() =>{
    
   const filterHandler = () => {
    switch(status){
      case  'completed':
        setfilteredTodos(todos.filter(todo => todo.completed === true));
        break;
        case  'uncompleted':
          setfilteredTodos(todos.filter(todo => todo.completed === false));
          break;
          default:
            setfilteredTodos(todos);
            break;
      }
  }
 //savetolocalstorage
 const saveLocalTodos = () => {
  
  localStorage.setItem("todos", JSON.stringify(todos));

 };
    filterHandler();
    saveLocalTodos();
   }, [todos, status])

   useEffect(() =>{
    const getLocalTodos = () => {
      if(localStorage.getItem("todos") === null){
        localStorage.setItem("todos", JSON.stringify([]));
       }else{
       let todoLocal= JSON.parse(localStorage.getItem("todos"));
       setTodos(todoLocal);
       
      }
    }
    getLocalTodos();
  }, [])
  return (
    <div className="App">
     <header>
       <h1>Ruth's Todo List</h1>
     </header>
     <Form  setStatus={setStatus} todos={todos}  setTodos={setTodos} inputText={inputText} setInputText={setInputText}/>
     <TodoList filteredTodos = {filteredTodos} setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
