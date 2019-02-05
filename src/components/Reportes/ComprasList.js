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

const styles = theme => ({
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
});

class ReporteCompras extends Component{

    state = {
        pedidos: [],
        textoCarga: 'Cargando compras...',
        cargaTerminada: false,
    }

    //Recibir data
    async componentWillMount(){
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

    //Renderizar data
    render(){
        let { classes } = this.props;
        return(
            <Fragment>
                {this.state.pedidos.length === 0 ? (
                    <div className={classes.texto}>
                        <Typography variant='h6' className={classes.texto}>
                            {this.state.textoCarga}
                            {/* cambiar esto por una loading animation */}
                        </Typography>
                        {this.state.cargaTerminada ? (
                            <NavLink to='/products'>
                                <Button>
                                    Productos
                                    <ForwardIcon />
                                </Button>
                            </NavLink>
                        ) : null}
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