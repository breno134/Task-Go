package com.Bdev.taskgo.entidades.repositorio;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Bdev.taskgo.entidades.Tarefa;

@Repository
@EnableJpaRepositories
public interface TarefaRepositorio extends CrudRepository<Tarefa, Long> {

    
    @Query(value = "SELECT * FROM tarefa WHERE situacao = :situacao", nativeQuery = true)
    Iterable<Tarefa> tarefasBySituacao(@Param("situacao") int situacao);
    
    
}