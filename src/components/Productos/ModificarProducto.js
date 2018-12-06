import React, { Component } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '../Helpers/SelectForm';
import UploadImage from '../Helpers/UploadImage';
import Validator from 'validator';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Create";



const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit
    }
});

class ModificarProducto extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            id:0,
            name: '',
            description: '',
            price: '',
            stock: '',
            //categories: [],
            image: null,
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            //categoriesError: '',
            imageError: '',
        }
    }

    componentWillMount(){
        
        let product =  this.props.product;
        console.log(product);
         this.setState({
            id:product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            // categories: categories,
            image: product.image,
        });
        console.log(this.state)
    };

    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            //categoriesError: '',
            imageError: '',
        };

        if(!Validator.isLength(this.state.name, {min: 3, max: 30})){
            isError = true;
            errors.nameError='Debe tener 3 y 30 caracteres';
        }
        if(!Validator.isLength(this.state.description, {min: 5, max: 50})){
            isError = true;
            errors.descriptionError='Debe tener entre 5 o 50 caracteres';
        }
        if(this.state.price <= 0){
            isError = true;
            errors.priceError='Debe ingresar un precio mayor a 0';
        }
        else if(!Validator.isNumeric(this.state.price)){
            isError = true;
            errors.priceError='Debe contener unicamente numeros';
        }
        if(this.state.stock <= 0){
            isError = true;
            errors.stockError='Debe ingresar un stock mayor a 0';
        }
        else if(!Validator.isNumeric(this.state.stock)){
            isError = true;
            errors.stockError='Debe contener unicamente numeros';
        }
        /*if(this.state.categories.length === 0){
            isError = true;
            errors.categoriesError='Debe seleccionar al menos una categoria';
        }*/
        if(this.state.image && this.state.image.type !== 'image/jpeg' && this.state.image.type !== 'image/jpg' && this.state.image.type !== 'image/png'){
            isError = true;
            errors.imageError="Debe subir una imagen JPEG, JPG o PNG";
        }

        this.setState({
            ...this.state,
            ...errors
        }, () => {
            console.log(this.state);
        });

        return isError;
    };

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
            name: '',
            description: '',
            price: '',
            stock: '',
            //categories: [],
            image: null,
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            //categoriesError: '',
            imageError: '',
        });
      }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const error = this.validate();

        if (!error){

            const request = new FormData();

            request.set('name', this.state.name);
            request.set('description', this.state.description);
            request.set('price', this.state.price);
            request.set('stock', this.state.stock);
            //request.set('categories', this.state.categories);

            //image
            request.append('image', this.state.image, this.state.image.name);
            this.props.props.modificarProducto(request,this.state.id);
            this.handleToggle();
        }
    }

    onImageUpload = (image) => {
        this.setState({
            productImage: image
        })
    }

    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <IconButton color='inherit' onClick={this.handleToggle}>
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
                        id='productName'
                        name='productName'
                        label='Nombre del producto'
                        type='text'
                        fullWidth
                        value={this.state.name}
                        helperText={this.state.productNameError}
                        error={this.state.productNameError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='productDescription'
                        name='productDescription'
                        label='Descripcion del producto'
                        type='text'
                        value={this.state.description}
                        fullWidth
                        helperText={this.state.productDescriptionError}
                        error={this.state.productDescriptionError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='productPrice'
                        name='productPrice'
                        label='Precio del producto'
                        type='text'
                        value={this.state.price}
                        fullWidth
                        helperText={this.state.productPriceError}
                        error={this.state.productPriceError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='productStock'
                        name='productStock'
                        label='stock del producto'
                        type='text'
                        value={this.state.stock}
                        fullWidth
                        helperText={this.state.productStockError}
                        error={this.state.productStockError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    {/*<SelectMultiple
                        flagType='productos'
                        flagForm={true}
                        content={this.props.categories}
                        onChange={this.onSelectChange}
                        selectError={this.state.categoriesError}
                        helper={'Seleccione categorias para el producto'}
                    />*/}
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

ModificarProducto.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ModificarProducto);