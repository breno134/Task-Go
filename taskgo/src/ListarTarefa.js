function ListarTarefa({lista, remover, preparar}) {
    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Título</td>
                    <td>Descrição</td>
                    <td>Prazo</td>
                    <td>Prioridade</td>
                    <td>Ações</td>
                </tr>
            </thead>
            <tbody>
                    {
                        lista.map((obj, indice) =>
                        ( 
                            <tr key={indice}>
                            <td>{obj.id}</td>
                            <td>{obj.titulo}</td>
                            <td>{obj.descricao}</td>
                            <td>{obj.prazo}</td>
                            <td>{obj.prioridade}</td>
                            <td type="button" onClick={() => remover(obj.id)} className="btn btn-outline-danger"><i className="bi bi-trash3"> Remover</i></td>
                            <td type="button" onClick={() => preparar(obj)} className="btn btn-outline-primary"><i className="bi bi-pencil-square"> Editar</i></td>
                            </tr>
                        ))
                    } 
            </tbody>
        </table>        
    )
}
export default ListarTarefa;