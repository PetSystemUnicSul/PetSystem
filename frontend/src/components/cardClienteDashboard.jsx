import "../styles/cardClienteDashboard.css";

function CardClienteDashboard(){
    return(
      <div className="card">
        
        <div className="name">Lucas Fernandes</div>
        
        
        <div 
            className="pets">Pipow, Palucia
        </div>

        <div
             className="telefone">(11) 96837-7710
        </div>
        
        <div 
            className="endereço">Rua Fulano da Silva, 852
        </div>   

            <button className="btnEditar">Editar</button>

    </div>
    );
}

export default CardClienteDashboard;
