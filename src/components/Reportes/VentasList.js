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
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const styles = theme => ({
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
});

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
            alert('No ah iniciado sesion.');
            history.goBack();
        }
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
                        <CircularProgress className={classes.progress} />
                        {this.state.cargaTerminada ? (
                            <Button onClick={this.volverAtras}>
                                <BackIcon />
                                Volver
                            </Button>
                        ) : null}
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