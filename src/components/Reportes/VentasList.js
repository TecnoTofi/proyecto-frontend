import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
// import HCFunctions from './Functions';
import Item from './VentasItem';
// import ReactDOMServer from "react-dom/server";
import Button from '@material-ui/core/Button';
// import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";

class ReporteVentas extends Component{

    state = {
        transacciones: []
    }

    //Recibir data
    async componentWillMount(){
        let transacciones = await this.props.getTransactions();
        if(transacciones) this.setState({transacciones: transacciones});
    }

    print = () => {
        const string = renderToString(<Fragment>
            {this.state.transacciones.map(transaction => (
                <Item key={transaction.id} transaction={transaction} />
            ))}
        </Fragment>);
        const pdf = new jsPDF("p", "mm", "a4");
        /*const columns = [
          "id",
          "amount",
          "sellerId",
          "buyerId",
          "timestamp",
          "products",
          "packages",  
          "delivery"      
        ];*/

        /*for(tran in this.state.transacciones){

        }
        var rows = [
          [
            ,
            ,
            ,
            ,
            
          ]
        ];*/
        pdf.fromHTML(string);
        let date = new Date();
        
        pdf.save(`${date}.pdf`);
      };

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
                <Button onClick={this.print} color="primary" variant='contained'>
                    Descargar
                </Button>
                </div>
            </div>
        );
    }
}

export default ReporteVentas;