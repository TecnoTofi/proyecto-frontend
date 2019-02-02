import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import Item from './VentasItem';
import Export from '../Helpers/Export'
import Typography from '@material-ui/core/Typography';

class ReporteVentas extends Component{

    state = {
        transacciones: []
    }

    //Recibir data
    async componentWillMount(){
        let transacciones = await this.props.getTransactions();
        if(transacciones) this.setState({transacciones: transacciones});
    }

    //Renderizar data
    render(){
        return(
            <div>
                <Fragment>
                    {this.state.transacciones.map(transaction => (
                        <Item key={transaction.id} transaction={transaction} />
                    ))}
                </Fragment>
                {this.state.transacciones.length > 0 ? (
                    <Export
                        bandera = {"ventas"}
                        ventas = {this.state.transacciones} 
                        onClick={this.onClick}
                    > 
                    </Export>
                ) : (
                    <Typography variant='body2'>
                            Aun no tiene ventas realizadas
                        </Typography>  
                )}
            </div>
        );
    }
}

export default ReporteVentas;