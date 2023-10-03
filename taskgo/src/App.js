import logo from './logo.svg';
import './App.css';
import CriarTarefa from './CriarTarefa';
import ListarTarefa from './ListarTarefa';
import { useEffect, useState } from 'react';

function App() {

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
      <CriarTarefa eventoTeclado={eventoDigitar} criar={criarTarefa} obj={objTarefa}></CriarTarefa>
      <ListarTarefa lista={tarefas}  remover={removerTarefa}></ListarTarefa>
    </div>
  );
}

export default App;
