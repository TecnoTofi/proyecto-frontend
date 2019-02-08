import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Item from './ComprasItem';
import Export from '../Helpers/Export'
import Typography from '@material-ui/core/Typography';
import ForwardIcon from '@material-ui/icons/ArrowForward';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
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
        textDecoration: 'none'
    },
    margen: {
        marginLeft: theme.spacing.unit
    },
});

const headers = [
    { label: 'ID Pedido', key: 'id' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Valor Voucher', key: 'voucherValue' },
    { label: 'Tipo Voucher', key: 'voucherType' },
    { label: 'Total', key: 'total' },
    { label: 'Vendedor', key: 'sellerName' },
    { label: 'Tipo producto', key: 'productType' },
    { label: 'Codigo', key: 'code' },
    { label: 'Nombre', key: 'name' },
    { label: 'Precio', key: 'price' },
    { label: 'Cantidad', key: 'cantidad' },
];

const headersTotales = [
    { label: 'ID Pedido', key: 'id' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Valor Voucher', key: 'voucherValue' },
    { label: 'Tipo Voucher', key: 'voucherType' },
    { label: 'Total', key: 'total' },
    { label: 'Cantidad de productos', key: 'cantidadProductos' },
];

class ReporteCompras extends Component{

    state = {
        pedidos: [],
        textoCarga: 'Cargando compras...',
        cargaTerminada: false,
    }

    //Recibir data
    async componentWillMount(){

        this.verificarLogin();

        let pedidos = await this.props.getPedidos();

        let textoCarga = '', cargaTerminada = false;
        if(pedidos.length === 0){
            cargaTerminada = true;
            textoCarga = 'Aun no ah realizado compras.';
        }

        if(pedidos) this.setState({
            pedidos,
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

    armarExportCompras = () => {
        let exportData = [];

        for(let pedido of this.state.pedidos){
            let objeto = {
                id: pedido.id,
                fecha: pedido.timestamp,
                voucherValue: pedido.voucher ? pedido.voucher.value : null,
                voucherType: pedido.voucher ? pedido.voucher.type : null,
                total: pedido.amount,
            };
            for(let transaction of pedido.transactions){
                objeto.sellerName = transaction.sellerName;

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
        }
        
        return exportData;
    }

    armarExportTotales = () => {
        let exportData = [];

        for(let pedido of this.state.pedidos){
            let objeto = {
                id: pedido.id,
                fecha: pedido.timestamp,
                voucherValue: pedido.voucher ? pedido.voucher.value : null,
                voucherType: pedido.voucher ? pedido.voucher.type : null,
                total: pedido.amount,
            };
            for(let transaction of pedido.transactions){
                let cantidadProductos = 0;

                for(let producto of transaction.products){
                    cantidadProductos += producto.quantity;
                }

                for(let paquete of transaction.packages){
                    cantidadProductos += paquete.quantity;
                }
                objeto.cantidadProductos = cantidadProductos;
            }
            exportData.push(objeto);
        }

        return exportData;
    }

    //Renderizar data
    render(){
        let { classes } = this.props;
        return(
            <Fragment>
                {this.state.pedidos.length === 0 ? (
                    <div className={classes.texto}>
                        <Typography variant='h6' className={classes.texto}>
                            {this.state.textoCarga}
                        </Typography>
                        {this.state.cargaTerminada ? (
                            <NavLink to='/products'>
                                <Button>
                                    Productos
                                    <ForwardIcon /> 
                                </Button>
                            </NavLink>
                        ) : <CircularProgress className={classes.progress} />}
                    </div>
                ) : (
                    <Fragment>
                        {this.state.pedidos.map(pedido => (
                            <Item key={pedido.id} pedido={pedido} />
                        ))}
                        {/* <Export
                                bandera = {"compras"}
                                pedidos = {this.state.pedidos} 
                                onClick={this.onClick}
                            >
                            </Export> */}
                            {/* <Button variant='contained' color='inherit' className={classes.margen}> */}
                                <CSVLink data={this.armarExportCompras()} headers={headers}>Exportar compras</CSVLink>
                            {/* </Button> */}
                                <CSVLink data={this.armarExportTotales()} headers={headersTotales}>Exportar totales</CSVLink>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

ReporteCompras.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReporteCompras);