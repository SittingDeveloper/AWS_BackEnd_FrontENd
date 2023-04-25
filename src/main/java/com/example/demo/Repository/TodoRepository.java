package com.example.demo.Repository;

import com.example.demo.Entity.TodoEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, String> {

    List<TodoEntity> findByUserId(String userId);

    @Query(value = "select * from TodoEntity t where t.userId = ?1", nativeQuery = true)
    List<TodoEntity> findByUserIdQuery(String userId);


}