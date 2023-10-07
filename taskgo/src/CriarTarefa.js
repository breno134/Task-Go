function CriarTarefa({eventoTeclado, criarTarefa, modo, obj}) {

    return (

        <form>
            <div className="container">
            <h1 className="text text-center">Organize suas tarefas de forma fácil com o Task Go!</h1>
                <h3 className="text text-center">Crie uma tarefa utilizando os campos abaixo</h3>
                <input type='text' value={obj.titulo} onChange={eventoTeclado} name="titulo" placeholder="Título" className="form-control"/>
                <input type='text' value={obj.descricao} onChange={eventoTeclado} name="descricao" placeholder="Descrição" className="form-control"/>
                <input type='text' value={obj.prazo} onChange={eventoTeclado} name="prazo" placeholder="Prazo" className="form-control"/>
                <input type='text' value={obj.prioridade} onChange={eventoTeclado} name="prioridade" placeholder="Prioridade" className="form-control"/>
                <input type='button' value={modo==="cadastro"?"Salvar":"Atualizar"} id="salvar" onClick={criarTarefa} className="btn btn-success"/>
            </div>
        </form>
    )

}
export default CriarTarefa;