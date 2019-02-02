import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import Item from './ComprasItem';
import Export from '../Helpers/Export'
import Typography from '@material-ui/core/Typography';

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
                    {this.state.pedidos.length > 0 ? (
                        <Export
                            bandera = {"compras"}
                            pedidos = {this.state.pedidos} 
                            onClick={this.onClick}
                        >
                        </Export>
                    ) : (
                        <Typography variant='body2'>
                            Aun no tiene compras realizadas
                        </Typography>
                    )}
            </div>
            
        );
    }
}

export default ReporteCompras;