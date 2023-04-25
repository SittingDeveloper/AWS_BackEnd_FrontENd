package com.example.demo.config;

/*
스프링 시큐리티에게 JwtAuthenticationFilter 를 사용하라고 알려주는 것
*/

import com.example.demo.security.JwtAuthenticationFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@Slf4j
public class WebSecurityConfig  {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // http 시큐리티 빌더
        http.cors()
                .and()
                .csrf() // 현재는 사용X, Disable
                    .disable()
                .httpBasic() // token 을 사용하므로 basic 인증 Disable
                    .disable()
                .sessionManagement() // Session 기반이 아님을 선언
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests() // '/' 와 '/auth/**' 경로는 인증 안해도 됨
                    .antMatchers("/", "/auth/**").permitAll()
                .anyRequest() // '/' 와 '/auth/**' 이외의 모든 경로는 인증해야됨
                    .authenticated();

        /*
        filter 등록,
        매 요청마다 CorsFilter 실행한 후에 jwtAuthenticationFilter 실행
        */
        http.addFilterAfter(
                jwtAuthenticationFilter,
                CorsFilter.class
        );

        return http.build();
    }

}
