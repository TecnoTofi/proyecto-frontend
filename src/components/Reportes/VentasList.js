import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
// import HCFunctions from './Functions';
import Item from './VentasItem';
// import ReactDOMServer from "react-dom/server";
import Button from '@material-ui/core/Button';
// import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import Export from '../Helpers/Export'

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
                <div>
                <Export bandera = {"ventas"} ventas = {this.state.transacciones} 
                    onClick={this.onClick}> 

                </Export>

                </div>
            </div>
        );
    }
}

export default ReporteVentas;