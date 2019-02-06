import React, { Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = () => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    paper: {
        textAlign: 'center'
    },
    button: {
    }
});

function CartTotal(props){
    const { classes, subTotal, subTotalEnvios, total } = props;

    return(
        <Fragment>
            <Paper className={classes.paper}>
                <Typography variant='h5'>
                    SubTotal
                </Typography>
                <Typography variant='h6'>
                    Producto/s: ${`${subTotal}`}
                </Typography>
                <Typography variant='h6'>
                    Envio/s: ${`${subTotalEnvios}`}
                </Typography>
                <Divider />
                <Typography variant='h4'>
                    Total: ${`${total}`}
                </Typography>
                <Divider />
                <Button variant='contained' color='primary' onClick={props.realizarPedido}>Continuar</Button>
            </Paper>
        </Fragment>
    );
}

CartTotal.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CartTotal);