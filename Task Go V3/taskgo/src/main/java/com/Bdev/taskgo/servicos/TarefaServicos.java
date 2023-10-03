package com.Bdev.taskgo.servicos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.Bdev.taskgo.entidades.Tarefa;
import com.Bdev.taskgo.entidades.modelo.TarefaResposta;
import com.Bdev.taskgo.entidades.repositorio.TarefaRepositorio;

@Service
public class TarefaServicos {

    @Autowired
    private TarefaRepositorio tarefaRepositorio;
    @Autowired
    private TarefaResposta tarefaResposta;

    public Iterable<Tarefa> list(){
        return tarefaRepositorio.findAll();
    }
    
    public ResponseEntity<?> save(Tarefa tarefa, String acao){
        if (tarefa.getDescricao().equals("")){
            tarefaResposta.setMensagem("Descrição inválida");
            return new ResponseEntity<TarefaResposta>(tarefaResposta ,HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("Salvar")){
                return new ResponseEntity<Tarefa>(tarefaRepositorio.save(tarefa) ,HttpStatus.CREATED);    
            } else{
            return new ResponseEntity<Tarefa>(tarefaRepositorio.save(tarefa) ,HttpStatus.OK);
            }
        }
    }
    public ResponseEntity<?> remover (Long id) {
            tarefaRepositorio.deleteById(id);
            tarefaResposta.setMensagem("tarefa removido com sucessso");
            return new ResponseEntity<TarefaResposta>(tarefaResposta ,HttpStatus.OK);
        }
}
