import React, { Component } from 'react';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SelectMultiple from '../Helpers/SelectMultiple';
import UploadImage from '../Helpers/UploadImage';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/AddBox';
import Validator from 'validator';

export default class AltaProducto extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            productName: '',
            productCode: '',
            categories: [],
            categoryList:[],
            productImage: null,
            companyId: 0,
            productDescription: '',
            productPrice: '',
            productStock: '',
            productNameError: '',
            productCodeError: '',
            categoriesError: '',
            productImageError: '',
            productDescriptionError: '',
            productPriceError: '',
            productStockError: ''
        };
    }

    async componentWillMount() {
        this.getInfo();
    }

    async componentWillReceiveProps(){
        this.getInfo();
    }

    getInfo = async () => {
        let categories = await this.props.getCategories();
        await this.setState({categoryList: categories});
    }

    validate = () => {
        let isError = false;
        const errors = {
            productNameError: '',
            productCodeError: '',
            categoriesError: '',
            productImageError: '',
            productDescriptionError: '',
            productPriceError: '',
            productStockError: ''
        };
        if(!this.state.productName){
            isError = true;
            errors.productNameError = 'Debe ingresar un nombre';
        }
        else if(!isNaN(this.state.productName)){
            isError = true;
            errors.productNameError='No puede constatar unicamente de numeros';
        }
        else if(!/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(this.state.productName)){
            isError = true;
            errors.productNameError='Debe contener unicamente numeros y letras';
        }
        else if(!Validator.isLength(this.state.productName, {min: 3, max: 30})){
            isError = true;
            errors.productNameError='Debe tener 3 y 30 caracteres';
        }

        if (!this.state.productCode) {
            isError = true;
            errors.productCodeError ='Debe ingresar un codigo';
        }
        else if(!Validator.isAlphanumeric(this.state.productCode)){
            isError = true;
            errors.productCodeError='Debe contener unicamente numeros y letras';
        }
        else if(!Validator.isLength(this.state.productCode, {min: 3, max: 20})){
            isError = true;
            errors.productCodeError='Debe tener entre 3 y 20 caracteres';
        }

        if(this.state.categories.length === 0){
            isError = true;
            errors.categoriesError='Debe seleccionar al menos una categoria';
        }

        if(this.state.companyImage && this.state.companyImage.type !== 'image/jpeg' && this.state.companyImage.type !== 'image/jpg' && this.state.companyImage.type !== 'image/png'){
            isError = true;
            errors.productImageError="Debe subir una imagen JPEG, JPG o PNG";
        }

        if(!this.state.productDescription){
            isError = true;
            errors.productDescriptionError='Debe ingresar una descripcion';
        }
        else if(!Validator.isLength(this.state.productDescription, {min: 5, max: 50})){
            isError = true;
            errors.productDescriptionError='Debe tener entre 5 y 50 caracteres';
        }

        if(!this.state.productPrice || this.state.productPrice <= 0){
            isError = true;
            errors.productPriceError='Debe ingresar un precio mayor a 0';
        }
        else if(isNaN(this.state.productPrice)){
            isError = true;
            errors.productPriceError='Debe contener unicamente numeros';
        }
        else if(this.state.productPrice <= 0 || this.state.productPrice > 999999){
            isError = true;
            errors.productPriceError='Debe ser mayor a 0 y menor a 100000';
        }

        if(!this.state.productStock || this.state.productStock <= 0){
            isError = true;
            errors.productStockError='Debe ingresar un stock mayor a 0';
        }
        else if(isNaN(this.state.productStock)){
            isError = true;
            errors.productStockError='Debe contener unicamente numeros';
        }
        else if(this.state.productStock <= 0 || this.state.productStock > 999999){
            isError = true;
            errors.productStockError='Debe ser mayor a 0 y menor a 1000000';
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
          productName: '',
          productCode: '',
          categories: [],
          productImage: null,
          companyId:0,
          productDescription: '',
          productPrice:'',
          productStock: '',
          productNameError: '',
          productCodeError: '',
          categoriesError: '',
          productImageError: '',
          companyIdError:0,
          productDescriptionError: '',
          productPriceError:'',
          productStockError: '',
        });
      }

    onSelectChange = (seleccionados) => {
        let selectedCategories = seleccionados.map(selected => {
            return selected.id;
        })
        this.setState({categories: selectedCategories});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onImageUpload = (image) => {
        this.setState({
            productImage: image
        })
    }

    onSubmit = (event)=> {
        event.preventDefault();
        
        const error = this.validate();

        if (!error){
            console.log('categories', this.state.categories);
            const request = new FormData();
            request.set('name', this.state.productName);
            request.set('code', this.state.productCode);
            request.set('categories', this.state.categories);
            request.set('companyId', this.props.companyId);
            request.set('description', this.state.productDescription);
            request.set('price', this.state.productPrice);
            request.set('stock', this.state.productStock);
            request.append('image', this.state.productImage, this.state.productImage.name);
            
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
            <ListItem button  onClick={this.handleToggle}>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary='Nuevo producto' />
            </ListItem>
            <Dialog
                open={this.state.open}
                onClose={this.handleToggle}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Nuevo producto</DialogTitle>
                <DialogContent>
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
                        margin='dense'
                        id='productCode'
                        name='productCode'
                        label='Codigo del producto'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.productCodeError}
                        error={this.state.productCodeError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <SelectMultiple
                        flagType='productos'
                        flagForm={true}
                        content={this.state.categoryList}
                        onChange={this.onSelectChange}
                        selectError={this.state.categoriesError}
                        helper={'Seleccione categorias para el producto'}
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
                    <UploadImage onImageUpload={this.onImageUpload} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleToggle} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={this.onSubmit} color="primary" variant='contained'>
                        Aceptar
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    }
}