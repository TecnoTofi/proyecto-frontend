import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Item from './ComprasItem';
import Export from '../Helpers/Export'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
});

class ReporteCompras extends Component{

    state = {
        pedidos: []
    }

    //Recibir data
    async componentWillMount(){
        let pedidos = await this.props.getPedidos();
        if(pedidos) this.setState({pedidos: pedidos});
    }

    //Renderizar data
    render(){
        let { classes } = this.props;
        return(
            <Fragment>
                {this.state.pedidos.length === 0 ? (
                    <Typography variant='h6' className={classes.texto}>
                        Aun no tiene compras realizadas
                    </Typography>
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