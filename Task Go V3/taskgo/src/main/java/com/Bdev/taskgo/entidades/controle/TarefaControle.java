package com.Bdev.taskgo.entidades.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Bdev.taskgo.entidades.Tarefa;
import com.Bdev.taskgo.servicos.TarefaServicos;

@RestController
@CrossOrigin(origins = "*")
public class TarefaControle {
    

    @Autowired
    private TarefaServicos tarefaServicos;

    @GetMapping("/tarefas")
    public Iterable<Tarefa> userList (){
        return tarefaServicos.list();
    }

    @PostMapping("/tarefas")
    public ResponseEntity<?> save(@RequestBody Tarefa tarefa) {
        return tarefaServicos.save(tarefa, "Salvar");
    }

    @PutMapping("/tarefas")
    public ResponseEntity<?> update(@RequestBody Tarefa tarefa) {
        return tarefaServicos.save(tarefa, "Atualizar");
    }

    @DeleteMapping ("/tarefas/{id}")
    public ResponseEntity<?> remover(@PathVariable Long id) {
        return tarefaServicos.remover(id);
    }
}
