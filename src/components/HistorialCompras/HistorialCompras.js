import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import HCFunctions from './HistorialComprasFunctions';
import Item from './HistorialComprasItem';

class HistorialCompras extends Component{

    state = {
        pedidos: []
    }

    //Recibir data
    async componentWillMount(){
        console.log('entramos a component will mount');
        let pedidos = await HCFunctions.getPedidos(this.props.url, this.props.userId);
        console.log('pedidos: ', pedidos);
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

export default HistorialCompras;