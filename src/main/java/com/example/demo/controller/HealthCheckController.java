package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    // "/" , "/auth/**" 등은 WebSecurityConfig에서 인증하지 않아도 되도록 설정해서 인증필요없음
    @GetMapping("/")
    public String healthCheck() {
        return "The Service is up and running ... ver2 ";
    }
}
