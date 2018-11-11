import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CartSelect from './CartSelect';
import CartPickers from './CartPickers';
import CartProduct from './CartProduct';
import CartTotal from './CartTotal';
// import { Input } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing.unit * 3,
        alignContent: 'center'
    //   ...theme.mixins.gutters(),
    //   paddingTop: theme.spacing.unit * 2,
    //   paddingBottom: theme.spacing.unit * 2,
    },
  });

class Cart extends Component{

    handleSelectChange = (productId, quantity) => {
        console.log('funca cambio select');
    }

    handlePickerChange = (productId, selected) => {
        console.log('funca cambio picker');
        let value = selected === 1 ? false : true;
        this.props.cartEnvioChange(productId, value);
    }

    // handleDelete = (productId) => {
    //     console.log('funca borrado', productId);
    // }

    render(){

        const { classes, productos } = this.props;

        return(
            <Fragment>
                {/* <Typography variant='h5'>
                    Carrito
                </Typography> */}
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Producto</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Envio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos.map(prod => (
                                <TableRow key={prod.id}>
                                    <TableCell>
                                        <CartProduct 
                                            product={prod}
                                            onClick={this.props.onDelete}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='body1'>
                                            ${prod.price}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <CartSelect 
                                            quantity={prod.quantity}
                                            productId={prod.id}
                                            onChange={this.handleSelectChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <CartPickers 
                                            priceEnvio={prod.priceEnvio}
                                            productId={prod.id}
                                            onChange={this.handlePickerChange}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <CartTotal productos={productos} />
            </Fragment>
        );
    }
}
Cart.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Cart);