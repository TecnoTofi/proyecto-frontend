import React, { Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider'

const styles = ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
        margin: 50+'px',
        overflowX: 'auto'
      },
    //   table: {
    //     minWidth: 700,
    //   },
})

const HistorialComprasItem = (props) => {
    const { classes } = props;
    return(
        <div className={classes.root}>
            <Typography variant='h4'>
                Pedido - {props.pedido.timestamp}
            </Typography>
            <Divider />
            {props.pedido.transactions.map(transaction => (
                <Fragment key={transaction.id}>
                    {transaction.productos.map(product => (
                        <Typography variant='body1' key={product.id}>
                            {`${product.name} - ${product.quantity}`}
                        </Typography>
                    ))}
                    <Divider />
                </Fragment>
            ))}
        </div>
    );
};

HistorialComprasItem.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HistorialComprasItem);