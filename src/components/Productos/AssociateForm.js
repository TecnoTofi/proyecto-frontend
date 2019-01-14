import React, { Component } from 'react';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SelectForm from '../Helpers/SelectForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssociateIcon from '@material-ui/icons/Queue';
import Validator from 'validator';

export default class AssociateForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            productos: [],
            companyId: 0,
            productId: 0,
            productName: '',
            productDescription: '',
            productPrice: '',
            productStock: '',
            productIdError: 0,
            productNameError: '',
            productDescriptionError: '',
            productPriceError: '',
            productStockError: ''
        };
    }

    async componentWillMount() {
        let productos = await this.props.getProducts();
        await this.setState({productos: productos});
    }

    validate = () => {
        let isError = false;
        const errors = {
            productIdError: 0,
            productNameError: '',
            productDescriptionError: '',
            productPriceError: '',
            productStockError: ''
        };

        /*if(!this.state.companyId){
            isError = true;
            errors.companyIdError = 'Debe seleccionar una compania';
        }
        else if(!Validator.isNumeric(this.state.companyId)){
            isError = true;
            errors.companyIdError='Debe contener unicamente numeros';
        }
        else if(!Validator.state.companyId == -1){
            isError = true;
            errors.companyIdError='Debe seleccionar una compania2';
        }*/
        if (!this.state.productId) {
            isError = true;
          errors.productIdError = "Debe seleccionar un producto";
        }
        /*else if(!Validator.isNumeric(this.state.productId)){
            isError = true;
            errors.productIdError='Debe seleccionar un producto2';
        }
         if(Validator.state.productId < 0){
            isError = true;
            errors.productIdError='Debe seleccionar un producto';
        }*/
        if (!this.state.productName) {
            isError = true;
            errors.productNameError ='Debe ingresar un nombre';
        }
        else if(!Validator.isLength(this.state.productName, {min: 3, max: 30})){
            isError = true;
            errors.productNameError='Debe tener entre 3 o 30 caracteres';
        }
        if(!this.state.productDescription){
            isError = true;
            errors.productDescriptionError='Debe ingresar una descripcion';
        }
        else if(!Validator.isLength(this.state.productDescription, {min: 5, max: 50})){
            isError = true;
            errors.productDescriptionError='Debe tener entre 5 o 50 caracteres';
        }
        if(this.state.productPrice <= 0){
            isError = true;
            errors.productPriceError='Debe ingresar un precio mayor a 0';
        }
        else if(!Validator.isNumeric(this.state.productPrice)){
            isError = true;
            errors.productPriceError='Debe contener unicamente numeros';
        }
        if(this.state.productStock <= 0){
            isError = true;
            errors.productStockError='Debe ingresar un stock mayor a 0';
        }
        else if(!Validator.isNumeric(this.state.productStock)){
            isError = true;
            errors.productStockError='Debe contener unicamente numeros';
        }
        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
      };

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
            companyId:0,
            productId:0,
            productName: '',
            productDescription: '',
            productPrice:'',
            productStock: '',
            //companyIdError:0,
            productIdError:0,
            productNameError: '',
            productDescriptionError: '',
            productPriceError:'',
            productStockError: '',
        });
    }

    onSelectChange = (value) => {
        this.setState({productId: Number(value)});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        const error = this.validate();
        if (!error){
            // console.log('productId', this.state.productId);
            // console.log('productos', this.state.productos);
            let product = this.state.productos.filter(prod => {
                return Number(prod.id) === this.state.productId
            })[0];
            // console.log('product', product);
            let {imageName, imagePath} = product;
            // console.log('imagen', imageName, imagePath);

			let request = {
				companyId: this.props.companyId,
				productId: this.state.productId,
				name: this.state.productName,
				description: this.state.productDescription,
				price: this.state.productPrice,
                stock: this.state.productStock,
                imageName: imageName,
                imagePath: imagePath
			}
            // console.log('request', request);
            this.props.onClick(request);
            this.handleToggle();
        }
    }

    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }
    
    render(){
        return(
            <div>
                <ListItem button onClick={this.handleToggle}>
                    <ListItemIcon><AssociateIcon /></ListItemIcon>
                    <ListItemText primary='Asociar producto' />
                </ListItem>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleToggle}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>Asociar producto</DialogTitle> 
                    <DialogContent>
                        <SelectForm
                            content={this.state.productos}
                            onChange={this.onSelectChange}
                            required
                            label={'Productos'}
                            selectError={this.state.productIdError}
                            helper={'Seleccione el producto'}
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            id='productName'
                            name='productName'
                            label='Nombre del producto'
                            type='text'
                            fullWidth
                            required
                            helperText={this.state.productNameError}
                            error={this.state.productNameError ? true : false}
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                        <TextField
                            margin='normal'
                            id='productDescription'
                            name='productDescription'
                            label='Descripcion del producto'
                            fullWidth
                            required
                            helperText={this.state.productDescriptionError}
                            error={this.state.productDescriptionError ? true : false}
                            multiline
                            rowsMax="4"
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />                        
                        <TextField
                            margin='dense'
                            id='productPrice'
                            name='productPrice'
                            label='Precio'
                            type='text'
                            fullWidth
                            required
                            helperText={this.state.productPriceError}
                            error={this.state.productPriceError ? true : false}
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                        <TextField
                            margin='dense'
                            id='productStock'
                            name='productStock'
                            label='Stock'
                            type='text'
                            fullWidth
                            required
                            helperText={this.state.productStockError}
                            error={this.state.productStockError ? true : false}
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color='primary'>
                            Cancelar
                        </Button>
                        <Button onClick={this.onSubmit} color='primary' variant='contained'>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}