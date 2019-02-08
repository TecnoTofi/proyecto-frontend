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
// import { CSVLink } from "react-csv";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const styles = theme => ({
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
});

// const csvData = [
//     ["firstname", "lastname", "email"],
//     ["Ahmed", "Tomi", "ah@smthing.co.com"],
//     ["Raed", "Labes", "rl@smthing.co.com"],
//     ["Yezzi", "Min l3b", "ymin@cocococo.com"]
// ];

// const users = [
//     {firtstname: 'Ahmed', lastname: 'Tomi' , email: 'ah@smthing.co.com'},
//     {firtstname: 'Raed', lastname: 'Labes' , email: 'rl@smthing.co.com'},
//     {firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com'}
// ];

// const headers = [
//     { label: 'ID Pedido', key: 'id' },
//     { label: 'Fecha', key: 'fecha' },
//     { label: 'Valor Voucher', key: 'voucherValue' },
//     { label: 'Tipo Voucher', key: 'voucherType' },
//     { label: 'Total', key: 'total' },
//     { label: 'Codigo', key: 'code' },
//     { label: 'Nombre', key: 'name' },
//     { label: 'Precio', key: 'price' },
//     { label: 'Cantidad', key: 'cantidad' },
// ];

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
        console.log('pedidos', pedidos)
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
                        <Export
                                bandera = {"compras"}
                                pedidos = {this.state.pedidos} 
                                onClick={this.onClick}
                            >
                            </Export>
                            {/* <CSVLink data={users} headers={headers}>Download me</CSVLink>; */}
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