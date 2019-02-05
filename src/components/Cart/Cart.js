import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Validator from 'validator';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CartSelect from './CartSelect';
// import CartPickers from './CartPickers';
import CartProduct from './CartProduct';
import CartTotal from './CartTotal';
import ForwardIcon from '@material-ui/icons/ArrowForward';
import { NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const styles = theme => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        textAlign: 'center'
    //   ...theme.mixins.gutters(),
    //   paddingTop: theme.spacing.unit * 2,
    //   paddingBottom: theme.spacing.unit * 2,
    },
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
  });

class Cart extends Component{

    state = {
        voucher: '',
        voucherError: '',
        contenido: 0
    }

    async componentWillMount(){

        this.verificarLogin();
        
        let voucher = this.props.cart.voucher;
        let contenido = this.props.cart.contenido.length;
        this.setState({voucher, contenido});
    }

    componentWillReceiveProps(){
        let contenido = this.props.cart.contenido.length;
        this.setState({contenido});
    }

    verificarLogin = async () => {
        let tokenValido = await this.props.verificarToken();

        if(!tokenValido){
            alert('No ah iniciado sesion.');
            history.goBack();
        }
    }

    handleSelectChange = (productId, productCode, companyId, quantity) => {
        this.props.cambiarCantidadProdCarrito(productId, productCode, companyId, quantity);
    }

    handlePickerChange = (productId, selected) => {
        let value = false;
        if(Number(selected) !== 1) value = true;
        this.props.cartEnvioChange(productId, value, selected);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onEnterPress = (e) => {
        if(e.key === 'Enter') this.sendVoucher(e);
    }

    sendVoucher = (e) => {
        let isError = false;

        if(!this.state.voucher){
            isError = true;
            this.setState({voucherError: 'Debe ingresar el codigo del voucher'});
        }
        else if(!Validator.isAlphanumeric(this.state.voucher)){
            isError = true;
            this.setState({voucherError: 'Debe contener unicamente numeros y letras'});
        }
        else if(this.state.voucher.length < 3 || this.state.voucher.length > 20){
            isError = true;
            this.setState({voucherError: 'Debe contener entre 3 y 20 caracteres'});
        }

        if(!isError){
            this.setState({voucherError: ''});
            e.preventDefault();
            this.props.sendVoucher(this.state.voucher);
        }
    }
    
    render(){
        const { contenido, subTotal, subTotalEnvios, total } = this.props.cart;
        const { classes } = this.props;

        return(
            <Fragment>
                {this.state.contenido === 0 ? (
                    <div className={classes.texto}>
                        <Typography variant='h6' className={classes.texto}>
                            Su carrito se encuentra vacio.
                        </Typography>
                        <NavLink to='/products'>
                            <Button>
                                Productos
                                <ForwardIcon />
                            </Button>
                        </NavLink>
                    </div>
                ) : 
                (
                <Fragment>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                    {/* <TableCell>Envio</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contenido.map((seller) => {
                                        let prods = seller.productos.map((prod, i) => (
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
                                                        product={prod}
                                                        onChange={this.handleSelectChange}
                                                    />
                                                </TableCell>
                                                {/* {i===0 ? (
                                                    <TableCell>
                                                        <CartPickers 
                                                            priceEnvio={prod.priceEnvio}
                                                            envioType={prod.envioType}
                                                            productId={prod.id}
                                                            onChange={this.handlePickerChange}
                                                        />
                                                    </TableCell>
                                                ) : (
                                                    null
                                                )} */}
                                            </TableRow>
                                        ))
                                        let packs = seller.paquetes.map(pack => (
                                            <TableRow key={pack.id}>
                                                <TableCell>
                                                <CartProduct
                                                        product={pack}
                                                        onClick={this.props.onDelete}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant='body1'>
                                                        ${pack.price}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <CartSelect
                                                        quantity={pack.quantity}
                                                        product={pack}
                                                        onChange={this.handleSelectChange}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        return prods.concat(packs);
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                    <div className={classes.root}>
                        <TextField
                            margin='dense'
                            id='voucher'
                            name='voucher'
                            label='Voucher de descuento'
                            type='text'
                            helperText={this.state.voucherError}
                            error={this.state.voucherError ? true : false}
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                        <Button className="btnVoucher" onClick={this.sendVoucher} color="primary" variant='contained'>
                            Agregar
                        </Button>
                    </div>
                    <CartTotal 
                        subTotal={subTotal} 
                        subTotalEnvios={subTotalEnvios} 
                        total={total} 
                        realizarPedido={this.props.realizarPedido}
                    />
                </Fragment>
                )}
            </Fragment>
        );
    }
}
Cart.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Cart);