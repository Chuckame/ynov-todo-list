import { Comment, Delete } from "@mui/icons-material";
import { Button, IconButton, Input, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { useState } from "react";

type Todo = {
  content: string;
  done: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      content: "Ne pas perdre à mario kart",
      done: false,
    },
    {
      content: "Donner à manger au chat",
      done: false,
    },
    {
      content: "Ne rien faire",
      done: true,
    }
  ])
  const [newTodoContent, setNewTodoContent] = useState("")

  function handleTodoClick(index: number) {
    const newTodos = [...todos]
    newTodos[index].done = !newTodos[index].done

    setTodos(newTodos)
  }

  function handleTodoDelete(index: number) {
    const newTodos = [...todos]
    newTodos.splice(index, 1);

    setTodos(newTodos)
  }

  function addTodo() {
    const newTodos = [...todos]

    newTodos.push({
      content: newTodoContent,
      done: false,
    })

    setNewTodoContent("")
    setTodos(newTodos)
  }

  return (
    <>
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
              <ListItemButton onClick={() => handleTodoClick(index)}>
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
    </>
  )
}

export default App