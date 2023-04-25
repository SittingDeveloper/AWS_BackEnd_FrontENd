package com.example.demo.Entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = "username")})
@ToString
public class UserEntity {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    @Column(nullable = false)
    private String username; // 아이디로 사용할 유저 네임, 이메일일 수도 그냥 문자열일 수도 있다

    // 이후 7장에서 OAuth 를 이용해 SSO 를 구현한다면 password가 필요없다.
    // password 에 notNull 속성을 걸어버리면 이후 SSO 구현 시 문제가 생기므로 처음부터 null을 입력할 수 있도록 설정.
    private String password; // 패스워드

    private String role; // 사용자의 역할 (어드민, 일반사용자)

    private String authProvider; // 이후 OAuth 에서 사용할 유저 정보 제공자 : github
}
