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
        this.props.cambiarCantidadProdCarrito(productId, quantity);
    }

    handlePickerChange = (productId, selected) => {
        let value = false;
        if(Number(selected) !== 1) value = true;
        this.props.cartEnvioChange(productId, value, selected);
    }
    render(){
        const { productos, subTotal, subTotalEnvios, total } = this.props.cart;

        return(
            <Fragment>
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
                                            envioType={prod.envioType}
                                            productId={prod.id}
                                            onChange={this.handlePickerChange}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <CartTotal subTotal={subTotal} subTotalEnvios={subTotalEnvios} total={total} />
            </Fragment>
        );
    }
}
Cart.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Cart);