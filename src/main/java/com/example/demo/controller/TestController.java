package com.example.demo.controller;

import com.example.demo.DTO.TestRequestBodyDTO;
import com.example.demo.DTO.TodoDTO;
import com.example.demo.Entity.TodoEntity;
import com.example.demo.Service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final TodoService service;

    @GetMapping
    public String Init() {
        return "This is Init World";
    }

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World!";
    }

    @GetMapping("/{id}")
    public void PathVar(@PathVariable String id) {
        System.out.println(id);
    }

    @GetMapping("/testParam")
    public String testControllerRequestParam(@RequestParam int id) {
        return "hello This is Param ID :" + id;
    }

    @GetMapping("/testRequestBody")
    public String testControllerRequestBody(@RequestBody TestRequestBodyDTO testRequestBodyDTO) {
        return "hello World ID " + testRequestBodyDTO.getId() + "\nMessage : " + testRequestBodyDTO.getMessage();
    }


}
