package com.example.demo;

import com.example.demo.Entity.TodoEntity;
import com.example.demo.Repository.TodoRepository;
import com.example.demo.Service.TodoService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.List;
import java.util.Optional;

@SpringBootTest
class DemoApplicationTests {

    TodoService Service;

    @Autowired
    private TodoRepository repository;

    @Test
    @DisplayName("Create Test")
    public void createTest() {

        // Create
        TodoEntity todoEntity = TodoEntity.builder()
                .id("t-533135")
                .userId("kms")
                .title("Call")
                .build();
        repository.save(todoEntity);

    }

    @Test
    @DisplayName("Read Test")
    public void readTest() {

        List<TodoEntity> todoEntityList = repository.findAll();
        System.out.println(todoEntityList);

    }

    @Test
    @DisplayName("Update Test")
    public void updateTest() {

        Optional<TodoEntity> original = repository.findById("40288198870d369c01870d36ac8e0000");

        if (original.isPresent()) {
            TodoEntity todoEntity = original.get();

            todoEntity.setTitle("변경!");

            repository.save(todoEntity);
        }

    }

    @Test
    @DisplayName("Delete Test")
    public void deleteTest() {

        Optional<TodoEntity> original = repository.findById("402881a2872b0ca301872b4cd1f1000e");

        if (original.isPresent()) {
            TodoEntity todoEntity = original.get();

            repository.deleteById(todoEntity.getId());
        }
    }

}
