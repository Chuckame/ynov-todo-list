import { Comment, Delete } from "@mui/icons-material";
import { Button, Container, IconButton, Input, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type Todo = {
  id: string;
  content: string;
  done: boolean;
}

const BACKEND_BASE_URL = "http://localhost:8080"
const TODO_RESOURCE_URL = `${BACKEND_BASE_URL}/todos`

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    axios.get(TODO_RESOURCE_URL)
      .then((response) => response.data)
      .then((todoList) => setTodos(todoList))
  }, [])

  const [newTodoContent, setNewTodoContent] = useState("")

  function handleTodoSwapDone(index: number) {
    const newTodos = [...todos]
    newTodos[index].done = !newTodos[index].done




    const todoId = todos[index].id

    axios.put(`${TODO_RESOURCE_URL}/${todoId}`, newTodos[index])
      .then(() => {
        setTodos(newTodos)
      })
  }

  function handleTodoDelete(index: number) {
    const todoId = todos[index].id

    axios.delete(`${TODO_RESOURCE_URL}/${todoId}`)
      .then(() => {
        const newTodos = [...todos]
        newTodos.splice(index, 1);

        setTodos(newTodos)
      })
  }

  function addTodo() {
    const newTodo = {
      content: newTodoContent,
      done: false,
    }

    axios.post(TODO_RESOURCE_URL, newTodo)
      .then((response) => response.data)
      .then((todo) => {

        const newTodos = [...todos]
        newTodos.push(todo)

        setNewTodoContent("")
        setTodos(newTodos)
      })
      .catch((error) => {
        alert("Erreur: " + error.message)
      })
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Ma todo-list</Typography>
      <List>
        <ListItem>
          <TextField variant="standard" fullWidth onKeyUp={event => {
            if (event.key == 'Enter') addTodo();
          }} onChange={(e) => setNewTodoContent(e.target.value)} value={newTodoContent}></TextField>
        </ListItem>
        {
          todos.map((todo, index) => (
            <ListItem
              secondaryAction={
                <IconButton sx={{
                  ":hover": {
                    color: 'red'
                  }
                }} onClick={() => handleTodoDelete(index)}>
                  <Delete />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton onClick={() => handleTodoSwapDone(index)}>
                <ListItemText sx={{
                  textDecorationLine: todo.done
                    ? 'line-through'
                    : undefined,
                }}>{todo.content}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Container>
  )
}

export default App