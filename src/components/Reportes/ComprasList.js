import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
// import HCFunctions from './Functions';
import Item from './ComprasItem';

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
            <Fragment>
                {this.state.pedidos.map(pedido => (
                    <Item key={pedido.id} pedido={pedido} />
                ))}
            </Fragment>
        );
    }
}

export default ReporteCompras;