import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ItemVentas from '../Reportes/VentasItem';
import ItemCompras from '../Reportes/ComprasItem';
import Button from '@material-ui/core/Button';
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

    async componentWillMount() {
        this.getInfo();
    }

    async componentWillReceiveProps(){
        this.getInfo();
    }

    getInfo = async () => {
        let band = await this.props.bandera;
        await this.setState({bandera: band});

        if(this.props.bandera === "ventas"){
            let data = await this.props.ventas;
            if(data) this.setState({data: data});
        }
        else if(this.props.bandera === "compras"){
            let data = await this.props.pedidos;
            if(data) this.setState({data: data});
        }
    }

    print = () => {
        if(this.state.bandera === "ventas"){
            const string = renderToString(<Fragment>
                {this.state.data.map(transaction => (
                    <ItemVentas key={transaction.id} transaction={transaction} />
                ))}
            </Fragment>);
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.fromHTML(string);
            pdf.save("ventas.pdf");
        }
        else if(this.state.bandera === "compras"){
            const string = renderToString(<Fragment>
                {this.state.data.map(pedido => (
                    <ItemCompras key={pedido.id} pedido={pedido} />
                ))}
            </Fragment>);
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.fromHTML(string);
            pdf.save("compras.pdf");
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