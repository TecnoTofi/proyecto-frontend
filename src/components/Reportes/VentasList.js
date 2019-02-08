import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Item from './VentasItem';
import Export from '../Helpers/Export'
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CSVLink } from "react-csv";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const styles = theme => ({
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
});

const headers = [
    { label: 'ID Transaccion', key: 'id' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Comprador', key: 'buyer' },
    { label: 'Total', key: 'total' },
    { label: 'Tipo producto', key: 'productType' },
    { label: 'Codigo', key: 'code' },
    { label: 'Nombre', key: 'name' },
    { label: 'Precio', key: 'price' },
    { label: 'Cantidad', key: 'cantidad' },
];

const headersTotales = [
    { label: 'ID Transaccion', key: 'id' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Comprador', key: 'buyer' },
    { label: 'Total', key: 'total' },
];

class ReporteVentas extends Component{

    state = {
        transacciones: [],
        textoCarga: 'Cargando ventas...',
        cargaTerminada: false,
    }

    //Recibir data
    async componentWillMount(){

        this.verificarLogin();

        let transacciones = await this.props.getTransactions();
        console.log('transacciones', transacciones)

        let textoCarga = '', cargaTerminada = false;
        if(transacciones.length === 0){
            cargaTerminada = true;
            textoCarga = 'Aun no ah realizado ventas.';
        }

        if(transacciones) this.setState({
            transacciones,
            textoCarga,
            cargaTerminada
        });
    }

    verificarLogin = async () => {
        let tokenValido = await this.props.verificarToken();

        if(!tokenValido){
            this.props.enqueueSnackbar('No ha iniciado sesion.', { variant: 'error'});
            setTimeout(() => history.goBack(), 2000);
        }
    }

    armarExport = () => {
        let exportData = [];

        for(let transaction of this.state.transacciones){
            let objeto = {
                id: transaction.id,
                fecha: transaction.timestamp,
                buyer: transaction.buyerName,
                total: transaction.amount,
            };
            for(let producto of transaction.products){
                let insert = {
                    ...objeto,
                    productType: 'Producto',
                    code: producto.code,
                    name: producto.name,
                    price: producto.price,
                    cantidad: producto.quantity
                };
                exportData.push(insert);
            }

            for(let paquete of transaction.packages){
                let insert = {
                    ...objeto,
                    productType: 'Paquete',
                    code: paquete.code,
                    name: paquete.name,
                    price: paquete.price,
                    cantidad: paquete.quantity
                };
                exportData.push(insert);
            }
        }
        
        return exportData;
    }

    volverAtras = () => {
        history.goBack();
    }

    //Renderizar data
    render(){
        let { classes } = this.props;
        return(
            <Fragment>
                {this.state.transacciones.length === 0 ? (
                    <div className={classes.texto}>
                        <Typography variant='h6' className={classes.texto}>
                            {this.state.textoCarga}
                        </Typography>
                        {this.state.cargaTerminada ? (
                            <Button onClick={this.volverAtras}>
                                <BackIcon />
                                Volver
                            </Button>
                        ) : <CircularProgress className={classes.progress} />}
                    </div>
                ) : (
                    <Fragment>
                        {this.state.transacciones.map(transaction => (
                            <Item key={transaction.id} transaction={transaction} />
                        ))}
                        <Export
                            bandera = {"ventas"}
                            ventas = {this.state.transacciones} 
                            onClick={this.onClick}
                        > 
                        </Export>
                        <CSVLink data={this.armarExport()} headers={headers}>Exportar ventas</CSVLink>;
                        <CSVLink data={this.armarExport()} headers={headersTotales}>Exportar totales</CSVLink>;
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

ReporteVentas.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReporteVentas);