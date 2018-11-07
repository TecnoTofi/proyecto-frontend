import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
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
// import { Input } from '@material-ui/core';

class Cart extends Component{

    handleSelectChange = (productId, quantity) => {
        console.log('funca cambio select');
    }

    handlePickerChange = (productId, quantity) => {
        console.log('funca cambio picker');
    }

    handleDelete = (productId) => {
        console.log('funca borrado', productId);
    }

    render(){

        let productos = this.props.datosTest;

        return(
            <Fragment>
                <Typography variant='h5'>
                    Carrito
                </Typography>
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
                                            onClick={this.handleDelete}
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
            </Fragment>
        );
    }
}

export default Cart;