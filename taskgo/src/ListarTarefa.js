function ListarTarefa({listaTarefasFeitas, listaTarefasNaoFeitas, remover, preparar, mudar}) {
    return (
        <div className="container container-fluid bg-white"><h1 className="text-center">Tarefas Para Fazer</h1>
        <table className="table table-hover text-center" id="tarefas-para-fazer">
            <thead>
                <tr>
                    <td>Título</td>
                    <td>Descrição</td>
                    <td>Prazo</td>
                    <td>Prioridade</td>
                    <td>Situação</td>
                    <td>Ações</td>
                </tr>
            </thead>
            <tbody>
                    {
                        listaTarefasNaoFeitas.map((obj, indice) =>
                        ( 
                            <tr id={indice}>
                            <td>{obj.titulo}</td>
                            <td>{obj.descricao}</td>
                            <td>{obj.prazo}</td>
                            <td>{obj.prioridade}</td>
                            <td><input className="form-check-input" type="checkbox" id="tarefa-nCumprida" onClick={() => mudar(obj)}></input> Tarefa feita</td>
                            <td><button type="button" id="botaoRemover" onClick={() => remover(obj.id)} className="btn btn-outline-danger"><i className="bi bi-trash3"> Remover</i></button>
                            <button type="button" id="botaoEditar" onClick={() => preparar(obj)} className="btn btn-outline-primary"><i className="bi bi-pencil-square"> Editar</i></button></td>
                            </tr>
                        ))
                    } 
            </tbody>
        </table>
        <h1 className="text-center">Tarefas Feitas</h1>
        <table className="table table-hover text-center" id="tarefas-feitas">
        <thead>
                <tr>
                    <td>Título</td>
                    <td>Descrição</td>
                    <td>Prazo</td>
                    <td>Prioridade</td>
                    <td>Ações</td>
                </tr>
            </thead>
            <tbody>
            {
                        listaTarefasFeitas.map((obj, indice) =>
                        ( 
                            <tr id={indice}>
                            <td>{obj.titulo}</td>
                            <td>{obj.descricao}</td>
                            <td>{obj.prazo}</td>
                            <td>{obj.prioridade}</td>
                            <td><button type="button" id="botaoRemover" onClick={() => remover(obj.id)} className="btn btn-outline-danger"><i className="bi bi-trash3"> Remover</i></button></td>
                            </tr>
                        ))
                    }
            </tbody>
            </table>
        </div>
    )
}
export default ListarTarefa;