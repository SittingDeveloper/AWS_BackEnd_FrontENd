package com.example.demo.Entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Builder
@AllArgsConstructor // 모든 매개변수 생성자
@NoArgsConstructor // 매개변수 X 생성자
@Data
@ToString
@Entity
@Table(name = "Todo")
public class TodoEntity {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id; // Object ID

    private String userId; // User Id

    private String title; // Todo 타이틀

    private boolean done; // true - todo 완료한 경우(checked)

}
