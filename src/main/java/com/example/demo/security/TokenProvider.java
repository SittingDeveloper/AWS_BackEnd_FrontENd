package com.example.demo.security;

import com.example.demo.Entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

/*
TokenProvider 을 작성했다면
이제 로그인 부분에서 TokenProvider 를 이용해 토큰을 생성 후 UserDTO 에 이를 반환해야한다.
*/
@Slf4j
@Service
public class TokenProvider {

    private static final String SECRET_KEY = "NMA8JPctFuna59f5";

    // JWT 라이브러리를 이용해 JWT 토큰을 생성
    public String create(UserEntity userEntity) {

        // 기한을 지금으로부터 1일로 설정
        Date expiryDate = Date.from(
                Instant.now().plus(1, ChronoUnit.DAYS)
        );

        /*
		{ // header
		  "alg":"HS512"
		}.
		{ // payload
		  "sub":"40288093784915d201784916a40c0001",
		  "iss": "demo app",
		  "iat":1595733657,
		  "exp":1596597657
		}.
		// SECRET_KEY를 이용해 서명한 부분
		Nn4d1MOVLZg79sfFACTIpCPKqWmpZMZQsbNrXdJJNWkRv50_l7bPLQPwhMobT4vBOG6Q3JYjhDrKFlBSaUxZOg
		 */

        // JWT Token 생성
        return Jwts.builder()

                // header 에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)

                // payload 에 들어갈 내용
                .setSubject(userEntity.getId()) // sub
                .setIssuer("demo app") // iss
                .setIssuedAt(new Date()) // iat
                .setExpiration(expiryDate) // exp
                .compact();

    }

    // 토큰을 디코딩, 파싱 및 위조여부 확인
    public String validateAndGetUserId(String token) {

         /*
         parseClaimsJws 메서드가 Base 64로 디코딩 및 파싱
         즉, 헤더와 페이로드를 setSigningKey 로 넘어온 시크릿을 이용해 서명 후, token 의 서명과 비교
         위조되지 않았다면 페이로드(Claims) 리턴, 위조라면 예외를 날림
         그중 우리는 UserId가 필요하므로 getBody 를 부른다.
         */

        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token) // 이거 !
                .getBody();

        // userID 반환
        return claims.getSubject();

    }

}
