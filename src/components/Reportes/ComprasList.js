import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
// import HCFunctions from './Functions';
import Item from './ComprasItem';
import Export from '../Helpers/Export'

class ReporteCompras extends Component{

    state = {
        pedidos: []
    }

    //Recibir data
    async componentWillMount(){
        let pedidos = await this.props.getPedidos();
        if(pedidos) this.setState({pedidos: pedidos});
    }

    //Renderizar data
    render(){
        return(
            <div>
            <Fragment>
                {this.state.pedidos.map(pedido => (
                    <Item key={pedido.id} pedido={pedido} />
                ))}
            </Fragment>
            <div>
                <Export bandera = {"compras"} pedidos = {this.state.pedidos} 
                    onClick={this.onClick}> 

                </Export>

                </div>
            </div>
            
        );
    }
}

export default ReporteCompras;