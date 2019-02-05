import React, { Component } from 'react';
import 'typeface-roboto';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadImage from '../Helpers/UploadImage';
import Validator from 'validator';
import SelectMultiple from '../Helpers/SelectMultiple';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Create";

class ModificarProducto extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            id: 0,
            name: '',
            description: '',
            price: 0,
            stock: 0,
            image: null,
            categories: [],
            productId: 0,
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            categoriesError: '',
            imageError: '',
        }
    }

    componentWillMount(){
        let categories = this.props.product.categories.map(c => Number(c.id));
        
         this.setState({
            id: this.props.product.id,
            name: this.props.product.name,
            description: this.props.product.description,
            price: this.props.product.price,
            stock: this.props.product.stock,
            productId: this.props.product.productId,
            categories
        });
    };

    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            categoriesError: '',
            imageError: '',
        };
        
        if(!this.state.name){
            isError = true;
            errors.nameError = 'Debe ingresar un nombre';
        }
        else if(!isNaN(this.state.name)){
            isError = true;
            errors.nameError='No puede constatar unicamente de numeros';
        }
        else if(!/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(this.state.name)){
            isError = true;
            errors.nameError='Debe contener unicamente numeros y letras';
        }
        else if(!Validator.isLength(this.state.name, {min: 3, max: 30})){
            isError = true;
            errors.nameError = 'Debe tener 3 y 30 caracteres';
        }
        
        if(!this.state.description){
            isError = true;
            errors.descriptionError = 'Debe ingresar una descripcion';
        }
        else if(!Validator.isLength(this.state.description, {min: 5, max: 50})){
            isError = true;
            errors.descriptionError = 'Debe tener entre 5 o 50 caracteres';
        }
        
        if(!this.state.price){
            isError = true;
            errors.priceError = 'Debe ingresar un precio mayor a 0';
        }
        else if(isNaN(this.state.price)){
            isError = true;
            errors.priceError = 'Debe contener unicamente numeros';
        }
        else if(this.state.price <= 0 || this.state.price > 999999){
            isError = true;
            errors.priceError='Debe ser mayor a 0 y menor a 100000';
        }
        
        if(!this.state.stock){
            isError = true;
            errors.stockError = 'Debe ingresar un stock mayor a 0';
        }
        else if(isNaN(this.state.stock)){
            isError = true;
            errors.stockError = 'Debe contener unicamente numeros';
        }
        else if(this.state.stock <= 0 || this.state.stock > 999999){
            isError = true;
            errors.stockError='Debe ser mayor a 0 y menor a 1000000';
        }
        
        if(this.state.categories.length === 0){
            isError = true;
            errors.categoriesError = 'Debe seleccionar al menos una categoria';
        }
        
        if(this.state.image && this.state.image.type !== 'image/jpeg' && this.state.image.type !== 'image/jpg' && this.state.image.type !== 'image/png'){
            isError = true;
            errors.packageImageError="Debe subir una imagen JPEG, JPG o PNG";
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
        });
      }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onMultipleSelectChange = (seleccionados) => {
        let selectedCategories = seleccionados.map(selected => {
            return selected.id;
        })
        this.setState({categories: selectedCategories});
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const error = this.validate();

        if (!error){

            const request = new FormData();

            request.set('name', this.state.name);
            request.set('description', this.state.description);
            request.set('price', this.state.price);
            request.set('stock', this.state.stock);
            request.set('categories', this.state.categories);

            //image
            if(this.state.image) request.append('image', this.state.image, this.state.image.name);
            let { status, producto } = await this.props.modificar(request, this.state.id);

            if(status === 200){
                this.props.actualizarLista(producto, this.props.posicion);
                this.handleToggle();
            }
        }
    }

    onImageUpload = (image) => {
        this.setState({
            image
        })
    }

    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    render(){
        return(
            <div>
                <IconButton onClick={this.handleToggle} className={this.props.buttonClass}>
                    <EditIcon />
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleToggle}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">ModificarProducto</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        name='name'
                        label='Nombre del producto'
                        type='text'
                        fullWidth
                        value={this.state.name}
                        helperText={this.state.nameError}
                        error={this.state.nameError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='description'
                        name='description'
                        label='Descripcion del producto'
                        type='text'
                        value={this.state.description}
                        fullWidth
                        helperText={this.state.descriptionError}
                        error={this.state.descriptionError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='price'
                        name='price'
                        label='Precio del producto'
                        type='number'
                        value={this.state.price}
                        fullWidth
                        helperText={this.state.priceError}
                        error={this.state.priceError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='stock'
                        name='stock'
                        label='Stock del producto'
                        type='number'
                        value={this.state.stock}
                        fullWidth
                        helperText={this.state.stockError}
                        error={this.state.stockError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <SelectMultiple
                        flagType='productos'
                        flagForm={true}
                        content={this.props.categories}
                        seleccionados={this.props.product.categories}
                        onChange={this.onMultipleSelectChange}
                        selectError={this.state.categoriesError}
                        helper={'Seleccione categorias para el producto'}
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

export default ModificarProducto;