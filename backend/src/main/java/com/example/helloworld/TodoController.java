package com.example.helloworld;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/todos")
public class TodoController {
    private final TodoRepository repository;

    @GetMapping
    public List<TodoItem> getTodos() {
        return repository.findAll();
    }

    @PostMapping
    public TodoItem createTodoItem(@RequestBody TodoItem todoItem) {
        if (todoItem.getContent().contains("test")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot contain the word 'test'");
        }
        return repository.save(todoItem);
    }

    @PutMapping("/{id}")
    public TodoItem updateTodoItem(@PathVariable String id, @RequestBody TodoItem todoItem) {
        return repository.save(todoItem);
    }

    @DeleteMapping("/{id}")
    public void deleteTodoById(@PathVariable String id) {
        repository.deleteById(id);
    }
}
