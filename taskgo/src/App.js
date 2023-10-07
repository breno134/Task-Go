import './App.css';
import CriarTarefa from './CriarTarefa';
import ListarTarefa from './ListarTarefa';
import { useEffect, useState } from 'react';

function App() {

  const [modoCadastro, setModoCadastro] = useState("cadastro");

  const [tarefas, setTarefas] = useState([]);

  const tarefa = {
    id: 0,
    titulo: '',
    descricao: '',
    prazo: '',
    prioridade: ''
  }

  const [objTarefa, setObjTarefa] =
    useState(tarefa);
  useEffect(() => {
    fetch("http://localhost:8080/tarefas")
      .then(retorno => retorno.json())
      .then(retornoConvertidoEmJson =>
        setTarefas(retornoConvertidoEmJson))
  }, [])//esse colchete é para realizar a requisição uma vez

  const eventoDigitar = (e) => {
    setObjTarefa({...objTarefa,[e.target.name]:e.target.value})
  }


  const limparForm = () => {
    setObjTarefa(tarefa);
  }

  const criarTarefa = () =>{
    fetch('http://localhost:8080/tarefas',{
      method: "post",
      body:JSON.stringify(objTarefa),
      headers:{
        "Content-type":"Application/json",
        "Accept":"Application/json"
      }
    }).then(retorno => retorno.json())
    .then(retornoConvertido =>{
      if (retornoConvertido.mensagem !== undefined){
      alert (retornoConvertido.mensagem);
      }else{
      setTarefas([...tarefas,retornoConvertido]);
      alert("Salvo com sucesso!")
      limparForm();
      }})
  }

  const prepararTarefa = (tarefaParaEditar) => {
    setModoCadastro("edicao");
    setObjTarefa(tarefaParaEditar);
  };

  const atualizarTarefa = () => {
    fetch("http://localhost:8080/tarefas/"+objTarefa.id, {
      method: "put",
      body: JSON.stringify(objTarefa),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retornoConvertidoEmJson) => {
        if (retornoConvertidoEmJson.mensagem !== undefined) {
          alert(retornoConvertidoEmJson.mensagem);
        } else {
          alert("Atualizado com sucesso!");
        }
      }).then(()=>{
        fetch("http://localhost:8080/tarefas")
        .then((retorno) => retorno.json())
        .then((retornoConvertidoEmJson) => setTarefas(retornoConvertidoEmJson));
      });;
  };

  const removerTarefa = (id) =>{
    fetch('http://localhost:8080/tarefas/'+ id,{
      method: "delete"
    })
    .then(retorno => retorno.json())
    .then(retornoConvertido =>{
      if (retornoConvertido.mensagem !== undefined){
      alert (retornoConvertido.mensagem);
      }else{
      alert("Removido com sucesso!")
      }})
      .then(
        () => {
          fetch('http://localhost:8080/tarefas')
          .then(retorno => retorno.json())
          .then(retornoConvertidoEmJson => setTarefas(retornoConvertidoEmJson))
        }
      );
  }
  

  return (
    <div className="App">
      <p>{JSON.stringify(tarefa)}</p>
      <CriarTarefa 
      modo={modoCadastro}
      eventoTeclado={eventoDigitar} 
      criarTarefa={() => {
        if (modoCadastro === "cadastro") {
          criarTarefa();
        } else if (modoCadastro === "edicao") {
          atualizarTarefa();
          setModoCadastro("cadastro");
        }
        limparForm();
      }}

      obj={objTarefa}>
      </CriarTarefa>

      <ListarTarefa 
      lista={tarefas}
      remover={removerTarefa} 
      preparar={prepararTarefa}></ListarTarefa>
    </div>
  );
}

export default App;
