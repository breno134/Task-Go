function CriarTarefa({eventoTeclado, criar, obj}) {

    return (

        <form>
            <h1 className="text text-center">Organize suas tarefas de forma fácil com o Task Go!</h1>
                <input type='text' value={obj.titulo} onChange={eventoTeclado} name="titulo" placeholder="Título" className="form-control"/>
                <input type='text' value={obj.descricao} onChange={eventoTeclado} name="descricao" placeholder="Descrição" className="form-control"/>
                <input type='text' value={obj.prazo} onChange={eventoTeclado} name="prazo" placeholder="Prazo" className="form-control"/>
                <p className="border rounded">  Selecione a Prioridade da tarefa
                    <div className="form-check">
                        <input type='radio' name="prioridade" value={obj.prioridade} onChange={eventoTeclado} id="nao urgente" placeholder="Não urgnete" className="form-check-input"/>Não urgente
                    </div>
                    <div className="form-check">
                        <input type='radio' name="prioridade" value={obj.prioridade} onChange={eventoTeclado} id="urgente" placeholder="Urgene" className="form-check-input"/>Urgente
                    </div>
                </p>
                <input type='button' onClick={criar} value='Salvar' className="btn btn-success"/>
        </form>
    )

}
export default CriarTarefa;