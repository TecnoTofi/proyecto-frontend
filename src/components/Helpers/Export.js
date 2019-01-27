import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import HCFunctions from './Functions';
import ItemVentas from './VentasItem';
import ItemCompras from './ComprasItem';
import ReactDOMServer from "react-dom/server";
import Button from '@material-ui/core/Button';
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

  class ExportButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            bandera:"",
        }
    }

    async componentWillMount(){
        if(this.props.bandera === "ventas"){
            let data = await this.props.getTransactions();
            if(data) this.setState({data: data});
        }
        else{
            let pedidos = await this.props.getPedidos();
            if(pedidos) this.setState({data: pedidos});
        }
        
    }

    print = () => {
        if(this.state.bandera === "ventas"){
            const string = renderToString(<Fragment>
                {this.state.transacciones.map(transaction => (
                    <ItemVentas key={transaction.id} transaction={transaction} />
                ))}
            </Fragment>);
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.fromHTML(string);
            pdf.save("pdf");
        }
        else{
            const string = renderToString(<Fragment>
                {this.state.transacciones.map(transaction => (
                    <ItemCompras key={transaction.id} transaction={transaction} />
                ))}
            </Fragment>);
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.fromHTML(string);
            pdf.save("pdf");
        }
        
      };

    render(){
        const { classes } = this.props;

        return (
            <div>
              <label htmlFor="contained-button-file">
                <Button 
                    color='inherit'
                    variant="contained"
                    component="span"
                    className={classes.button}
                    onClick={this.print}
                >
                  Exportar Documento
                </Button>
              </label>
            </div>
          );
    }
}

ExportButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExportButton);