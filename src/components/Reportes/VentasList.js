import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Item from './VentasItem';
// import Export from '../Helpers/Export';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import DownloadIcon from '@material-ui/icons/CloudDownload';
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
    link: {
        color: 'inherit',
        textDecoration: 'none',
        marginLeft: theme.spacing.unit * 2
    },
    margen: {
        marginLeft: theme.spacing.unit
    },
    margenDiv: {
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        textAlign: 'right'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        width: 200,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
});

const headersVentas = [
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
    { label: 'Cantidad de productos', key: 'cantidadProductos' },
];

class ReporteVentas extends Component{

    state = {
        transacciones: [],
        transaccionesFiltrables: [],
        textoCarga: 'Cargando ventas...',
        cargaTerminada: false,
        dateFrom: '',
        dateTo: '',
        defaultFrom: '',
        defaultTo: ''
    }

    //Recibir data
    async componentWillMount(){

        this.verificarLogin();

        let transacciones = await this.props.getTransactions();
        console.log('transacciones', transacciones)

        let textoCarga = '', cargaTerminada = false;
        if(transacciones.length === 0){
            cargaTerminada = true;
            textoCarga = 'Aun no ha realizado ventas.';
        }

        if(transacciones) this.setState({
            transacciones,
            transaccionesFiltrables: transacciones,
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

    armarExportVentas = () => {
        let exportData = [];

        for(let transaction of this.state.transaccionesFiltrables){
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

    armarExportTotales = () => {
        let exportData = [];

        for(let transaction of this.state.transaccionesFiltrables){
            let objeto = {
                id: transaction.id,
                fecha: transaction.timestamp,
                buyer: transaction.buyerName,
                total: transaction.amount,
            };
            
            let cantidadProductos = 0;

            for(let producto of transaction.products){
                cantidadProductos += producto.quantity;
            }

            for(let paquete of transaction.packages){
                cantidadProductos += paquete.quantity;
            }
            objeto.cantidadProductos = cantidadProductos;
            exportData.push(objeto);
        }
        
        return exportData;
    }

    onPickerChange = (e) => {
        let date, valido = true, defaultFrom = this.state.defaultFrom, defaultTo = this.state.defaultTo;
        if(!e.target.value && e.target.id === 'dateFrom') date = new Date(this.state.transacciones[0].timestamp);
        else if(!e.target.value && e.target.id === 'dateTo') date = new Date(this.state.transacciones[this.state.transacciones.length-1].timestamp);
        else date = new Date(e.target.value);
        
        if(e.target.id === 'dateFrom'){
            date.setUTCHours(0, 0, 0, 0);
            
            if(this.state.dateTo && this.state.dateTo < date){
                this.props.enqueueSnackbar('Fecha desde no puede ser mayor a fecha hasta.', { variant: 'error'});
                valido = false;
            }
        }
        else{
            date.setUTCHours(23, 59, 59, 999);

            if(this.state.dateFrom && this.state.dateFrom > date){
                this.props.enqueueSnackbar('Fecha hasta no puede ser menor a fecha desde.', { variant: 'error'});
                valido = false;
            }
        }

        let dia = date.getUTCDate();
        if(dia < 10) dia = '0' + dia;
        let mes = date.getUTCMonth() + 1;
        if(mes < 10) mes = '0' + mes;
        let anio = date.getUTCFullYear();
        let fecha = `${anio}-${mes}-${dia}`;
        if(e.target.id === 'dateFrom') defaultFrom = fecha;
        else defaultTo = fecha;

        if(valido) this.setState({ [e.target.id]: date, defaultFrom, defaultTo}, () => this.filtrarPedidos());
        else{
            if(e.target.id === 'dateFrom') this.setState({ defaultFrom: '' }, () => this.filtrarPedidos());
            else this.setState({ defaultTo: '' }, () => this.filtrarPedidos());
        }
    }

    filtrarPedidos = () => {
        let transacciones = this.state.transacciones;
        
        if(transacciones.length !== 0){
            if(this.state.dateFrom){
                transacciones = transacciones.filter(t => {
                    return new Date(t.timestamp) >= this.state.dateFrom;
                });
            }

            if(this.state.dateTo){
                transacciones = transacciones.filter(t => {
                    return new Date(t.timestamp) <= this.state.dateTo;
                });
            }
        }

        this.setState({ transaccionesFiltrables: transacciones });
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
                        <Typography variant='h6' className={classes.texto}>
                            Historial de ventas
                        </Typography>
                        <TextField
                            id="dateFrom"
                            label="Desde"
                            type="date"
                            value={this.state.defaultFrom}
                            className={classes.textField}
                            InputLabelProps={{shrink: true}}
                            onChange={this.onPickerChange}
                        />
                        <TextField
                            id="dateTo"
                            label="Hasta"
                            type="date"
                            value={this.state.defaultTo}
                            className={classes.textField}
                            InputLabelProps={{shrink: true}}
                            onChange={this.onPickerChange}
                        />
                        {this.state.transaccionesFiltrables.length !== 0 ? (
                            <div className={classes.margenDiv}>
                                <CSVLink data={this.armarExportVentas()} headers={headersVentas} >
                                    <Button color='primary' variant='contained' className={classes.leftIcon}>
                                        <DownloadIcon color='inherit' className={classes.leftIcon} />
                                        Exportar ventas
                                    </Button>
                                </CSVLink>
                                <CSVLink data={this.armarExportTotales()} headers={headersTotales} >
                                    <Button color='primary' variant='contained' className={classes.leftIcon}>
                                        <DownloadIcon color='inherit' className={classes.leftIcon} />
                                        Exportar totales
                                    </Button>
                                </CSVLink>
                            </div>
                        ) : (
                            <Typography variant='h6' className={classes.texto}>
                                No hay ventas para este rango de fecha.
                            </Typography>
                        )}
                        {this.state.transaccionesFiltrables.map(transaction => (
                            <Item key={transaction.id} transaction={transaction} />
                        ))}
                        {/* <Export
                            bandera = {"ventas"}
                            ventas = {this.state.transacciones} 
                            onClick={this.onClick}
                        > 
                        </Export> */}
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