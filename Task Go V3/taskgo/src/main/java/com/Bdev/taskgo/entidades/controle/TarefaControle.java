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

    @GetMapping("/tarefasConcluidas")
    public Iterable<Tarefa> tarefasConcluidas (){
        return tarefaServicos.tarefasConcluidas();
    }

   @GetMapping("/tarefasNaoConcluidas")
    public Iterable<Tarefa> tarefasNaoConcluidas (){
        return tarefaServicos.tarefasNaoConcluidas();
    }

    @PostMapping("/tarefasNaoConcluidas")
    public ResponseEntity<?> salvarTarefaNaoConcluida(@RequestBody Tarefa tarefa) {
        return tarefaServicos.save(tarefa, "Salvar");
    }

    @PutMapping("/tarefasNaoConcluidas/{id}")
    public ResponseEntity<?> atualizarTarefaNaoConcluida(@RequestBody Tarefa tarefa) {
        return tarefaServicos.save(tarefa, "Atualizar");
    }

    @DeleteMapping ("/tarefasNaoConcluidas/{id}")
    public ResponseEntity<?> removerTarefaNaoConcluida(@PathVariable Long id) {
        return tarefaServicos.remover(id);
    }

    @PostMapping("/tarefasConcluidas")
    public ResponseEntity<?> salvarTarefaConcluida(@RequestBody Tarefa tarefa) {
        return tarefaServicos.save(tarefa, "Salvar");
    }

    @PutMapping("/tarefasConcluidas/{id}")
    public ResponseEntity<?> atualizarTarefaConcluida(@RequestBody Tarefa tarefa) {
        return tarefaServicos.save(tarefa, "Atualizar");
    }

    @DeleteMapping ("/tarefasConcluidas/{id}")
    public ResponseEntity<?> removerTarefaConcluida(@PathVariable Long id) {
        return tarefaServicos.remover(id);
    }
}
