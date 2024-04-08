package com.example.helloworld;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.ListCrudRepository;

public interface TodoRepository extends ListCrudRepository<TodoItem, String> {
}
