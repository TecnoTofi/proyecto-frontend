import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Item from './VentasItem';
import Export from '../Helpers/Export'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
});

class ReporteVentas extends Component{

    state = {
        transacciones: []
    }

    //Recibir data
    async componentWillMount(){
        let transacciones = await this.props.getTransactions();
        if(transacciones) this.setState({transacciones: transacciones});
    }

    //Renderizar data
    render(){
        let { classes } = this.props;
        return(
            <Fragment>
                {this.state.transacciones.length === 0 ? (
                    <Typography variant='h6' className={classes.texto}>
                            Aun no tiene ventas realizadas
                    </Typography>
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