import './App.css';
import CriarTarefa from './CriarTarefa';
import ListarTarefa from './ListarTarefa';
import { useEffect, useState } from 'react';

function App() {

  const [modoCadastro, setModoCadastro] = useState("cadastro");

  const [tarefasNaoFeitas, setTarefasNaoFeitas] = useState([]);

  const [tarefasFeitas, setTarefasFeitas] = useState([]);


  const tarefa = {
    id: 0,
    titulo: '',
    descricao: '',
    prazo: '',
    prioridade: '',
    situacao: 0   
  }

  const [objTarefasFeitas, setObjTarefasFeitas] =
    useState(tarefa);
  useEffect(() => {
    fetch("http://localhost:8080/tarefasConcluidas")
      .then(retorno => retorno.json())
      .then(retornoConvertidoEmJson =>
        setTarefasFeitas(retornoConvertidoEmJson))
  }, [])//esse colchete é para realizar a requisição uma vez

  const [objTarefasNaoFeitas, setObjTarefasNaoFeitas] =
    useState(tarefa);
  useEffect(() => {
    fetch("http://localhost:8080/tarefasNaoConcluidas")
      .then(retorno => retorno.json())
      .then(retornoConvertidoEmJson =>
        setTarefasNaoFeitas(retornoConvertidoEmJson))
  }, [])//esse colchete é para realizar a requisição uma vez

  const [objTarefa, setObjTarefa] =
    useState(tarefa);
  useEffect(() => {
    fetch("http://localhost:8080/tarefasNaoConcluidas")
      .then(retorno => retorno.json())
      .then(retornoConvertidoEmJson =>
        setTarefasNaoFeitas(retornoConvertidoEmJson))
  }, [])//esse colchete é para realizar a requisição uma vez

  const eventoDigitar = (e) => {
    setObjTarefa({...objTarefa,[e.target.name]:e.target.value})
  }

  const limparForm = () => {
    setObjTarefa(tarefa);
  }

  const criarTarefa = () =>{
    fetch('http://localhost:8080/tarefasNaoConcluidas',{
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
      setTarefasNaoFeitas([...tarefasNaoFeitas,retornoConvertido]);
      alert("Salvo com sucesso!")
      limparForm();
      }})
  }

  const prepararTarefa = (tarefaParaEditar) => {
    setModoCadastro("edicao");
    setObjTarefa(tarefaParaEditar);
  };

  const atualizarTarefa = () => {
    fetch("http://localhost:8080/tarefasNaoConcluidas/"+objTarefa.id, {
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
        fetch("http://localhost:8080/tarefasNaoConcluidas")
        .then((retorno) => retorno.json())
        .then((retornoConvertidoEmJson) => setTarefasNaoFeitas(retornoConvertidoEmJson));
      });;
  };

  const mudarSituacaoTarefa = (objTarefa) => {
    setObjTarefa(objTarefa.situacao = 1);
    console.log("alterou a tarefa"+objTarefa );
    fetch("http://localhost:8080/tarefasNaoConcluidas/"+objTarefa.id, {
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
          alert("Tarefa marcada como concluida!");
        }
      }).then(()=>{
        fetch("http://localhost:8080/tarefasNaoConcluidas")
        .then((retorno) => retorno.json())
        .then((retornoConvertidoEmJson) => setTarefasNaoFeitas(retornoConvertidoEmJson));
      });;
  };

  const removerTarefa = (id) =>{
    fetch('http://localhost:8080/tarefasNaoConcluidas/'+ id,{
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
          fetch('http://localhost:8080/tarefasNaoConcluidas')
          .then(retorno => retorno.json())
          .then(retornoConvertidoEmJson => setTarefasNaoFeitas(retornoConvertidoEmJson))
        }
      );
  }
  

  return (
    <div className="App">
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
      listaTarefasFeitas={tarefasFeitas}
      listaTarefasNaoFeitas={tarefasNaoFeitas}
      remover={removerTarefa} 
      preparar={prepararTarefa}
      mudar={mudarSituacaoTarefa}></ListarTarefa>
    </div>
  );
}

export default App;
