package com.Bdev.taskgo.entidades.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.Bdev.taskgo.entidades.Tarefa;

@Repository
public interface TarefaRepositorio extends CrudRepository<Tarefa, Long> {
    
}

