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
        // width: 200,
        textAlign: 'center'
    },
    paper: {
        // width: 200,
        // minWidth: 275,
        textAlign: 'center'
    },
    button: {
        // textAlign: 'center'
    }
});

function CartTotal(props){
    const { classes } = props;
    return(
        <Fragment className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant='h5'>
                    SubTotal
                </Typography>
                <Typography variant='h6'>
                    Producto/s: $
                </Typography>
                <Typography variant='h6'>
                    Envio/s: $
                </Typography>
                <Divider />
                <Typography variant='h4'>
                    Total: $
                </Typography>
                <Divider />
                <Fragment className={classes.button}>
                    <Button variant='contained' color='primary'>Continuar</Button>
                </Fragment>
            </Paper>
        </Fragment>
    );
}

CartTotal.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CartTotal);