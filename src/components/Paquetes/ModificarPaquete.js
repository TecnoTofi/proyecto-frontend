import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadImage from '../Helpers/UploadImage';
import Validator from 'validator';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Create";
import SelectForm from '../Helpers/SelectForm';
import SelectMultiple from '../Helpers/SelectMultiple';
import DeleteIcon from "@material-ui/icons/Delete";
import { Typography } from '@material-ui/core';

const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit
    }
});

class ModificarPaquete extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            products: [],
            id: 0,
            code: '',
            name: '',
            description: '',
            price: 0,
            stock: 0,
            categories: [],
            packageImage: null,
            productId: 0,
            packageProdcuts: [],
            cantidad: '',
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            packageImageError: '',
            categoriesError: '',
            cantidadError: '',
            productIdError: '',
        }
    }

    componentWillMount(){
        let packageProdcuts = [];
        for(let p of this.props.package.products){
            packageProdcuts.push({ productId: Number(p.id), name: p.name, quantity: p.quantity });
        }
        
        let categories = this.props.package.categories.map(c => Number(c.id));

         this.setState({
            id: this.props.package.id,
            code: this.props.package.code,
            name: this.props.package.name,
            description: this.props.package.description,
            price: Number(this.props.package.price),
            stock: Number(this.props.package.stock),
            products: this.props.products,
            packageProdcuts,
            categories,
        });
    };

    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            packageImageError: '',
            categoriesError: '',
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
            errors.nameError='Debe tener 3 y 30 caracteres';
        }

        if(!this.state.description){
            isError = true;
            errors.descriptionError = 'Debe ingresar una descripcion';
        }
        else if(!Validator.isLength(this.state.description, {min: 5, max: 50})){
            isError = true;
            errors.descriptionError = 'Debe tener entre 5 o 50 caracteres';
        }
        console.info('prueba 1')
        if(!this.state.price || this.state.price <= 0){
            isError = true;
            errors.priceError='Debe ingresar un precio mayor a 0';
        }
        else if(isNaN(this.state.price)){
            isError = true;
            errors.priceError='Debe contener unicamente numeros';
        }
        else if(this.state.price <= 0 || this.state.price > 999999){
            isError = true;
            errors.priceError='Debe ser mayor a 0 y menor a 100000';
        }
        console.info('prueba 2')
        if(!this.state.stock || this.state.stock <= 0){
            isError = true;
            errors.stockError='Debe ingresar un stock mayor a 0';
        }
        else if(isNaN(this.state.stock)){
            isError = true;
            errors.stockError='Debe contener unicamente numeros';
        }
        else if(this.state.stock <= 0 || this.state.stock > 999999){
            isError = true;
            errors.stockError='Debe ser mayor a 0 y menor a 1000000';
        }

        if(this.state.categories.length === 0){
            isError = true;
            errors.categoriesError = 'Debe seleccionar al menos una categoria';
        }

        if(this.state.packageImage && this.state.packageImage.type !== 'image/jpeg' && this.state.packageImage.type !== 'image/jpg' && this.state.packageImage.type !== 'image/png'){
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

    onMultipleSelectChange = (seleccionados) => {
        let selectedCategories = seleccionados.map(selected => {
            return selected.id;
        })
        this.setState({categories: selectedCategories});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectChange = (value) => {
        this.setState({ productId: Number(value) });
    }

    agregarProducto = () =>{
        let isError = false;
        let errors = { cantidadError: '', productIdError: '' };
        
        if(!this.state.productId){
            isError = true;
            errors.productIdError = 'Debe seleccionar un producto';
        }

        if(!this.state.cantidad){
            isError = true;
            errors.cantidadError = 'Debe ingresar una cantidad mayor a 0';
        }
        else if(isNaN(this.state.cantidad)){
            isError = true;
            errors.cantidadError = 'Debe ingresar solo numeros';
        }
        else if(this.state.cantidad <= 0){
            isError = true;
            errors.cantidadError = 'La cantidad debe ser mayor a 0';
        }

        if(isError){
            this.setState({
                ...this.state,
                ...errors
            });
        }
        else{
            let packageProdcuts = this.state.packageProdcuts;
            let existe = packageProdcuts.map(p => p.id).indexOf(this.state.productId);
    
            if(existe > -1){
                packageProdcuts[existe].cantidad += Number(this.state.cantidad);
            }
            else{
                let length = this.state.products.length;
                for(let i = 0; i < length; i++) {
                    if (Number(this.state.products[i].id) === this.state.productId) {
                        let prod = { 'productId': this.state.productId, name: this.state.products[i].name, 'quantity': Number(this.state.cantidad) };
                        packageProdcuts.push(prod);
                        break;
                    }
                }
            }
            this.setState({'cantidad': '', 'productId': 0, packageProdcuts});
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const error = this.validate();

        if (!error){
            if(this.state.packageProdcuts.length === 0){
                this.props.enqueueSnackbar('Debe ingresar al menos un producto', { variant: 'error' });
            }
            else{
                let request = {
                    code: this.state.code,
                    name: this.state.name,
                    description: this.state.description,
                    price: this.state.price,
                    stock: this.state.stock,
                    products: this.state.packageProdcuts,
                    categories: this.state.categories
                }
                let { status, paquete } = await this.props.modificarPaquete(request, this.state.id);
                
                if(status === 200){
                    this.props.actualizarLista(paquete, this.props.posicion)
                    this.handleToggle();
                }
            }
        }
    }

    onImageUpload = (image) => {
        this.setState({
            packageImage: image
        })
    }

    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    handleDelete = (id) =>{
        let packageProdcuts = this.state.packageProdcuts.filter(p => {
            return p.productId !== id;
        });
        this.setState({ packageProdcuts });
    }

    render(){
        return(
            <div>
                <IconButton onClick={this.handleToggle}>
                    <EditIcon />
                </IconButton>
                <Dialog
                     open={this.state.open}
                     onClose={this.handleToggle}
                     aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Modificar paquete</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin='dense'
                            id='name'
                            name='name'
                            label='Nombre del paquete'
                            type='text'
                            fullWidth
                            required
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
                            label='Descripcion del paquete'
                            type='text'
                            fullWidth
                            required
                            value={this.state.description}
                            helperText={this.state.descriptionError}
                            error={this.state.descriptionError ? true : false}
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            id='price'
                            name='price'
                            label='Precio del paquete'
                            type='text'
                            fullWidth
                            required
                            value={this.state.price}
                            helperText={this.state.priceError}
                            error={this.state.priceError ? true : false}
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            id='stock'
                            name='stock'
                            label='Stock del paquete'
                            type='text'
                            fullWidth
                            required
                            value={this.state.stock}
                            helperText={this.state.stockError}
                            error={this.state.stockError ? true : false}
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                        <SelectMultiple
                            flagType='productos'
                            flagForm={true}
                            content={this.props.categories}
                            seleccionados={this.props.package.categories}
                            onChange={this.onMultipleSelectChange}
                            selectError={this.state.categoriesError}
                            helper={'Seleccione categorias para el producto'}
                        />
                        {this.state.packageProdcuts.length > 0 ? (
                            <Fragment>
                                <Typography>Productos seleccionados</Typography>
                                <ul>
                                    {this.state.packageProdcuts.map(p => (
                                        <li key={p.productId}>
                                            {p.name}
                                            {' x ' + p.quantity}
                                            <IconButton id={p.productId} onClick={() => {
                                                this.handleDelete(p.productId);
                                                }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </li>
                                    ))}
                                </ul>
                            </Fragment>
                        ) : (
                            <Typography>Debe agregar productos</Typography>
                        )}                        
                        <SelectForm
                                content={this.state.products}
                                onChange={this.onSelectChange}
                                required
                                value= {this.state.productId}
                                label={'Productos'}
                                selectError={this.state.productIdError}
                                helper={'Seleccione el producto'}
                        />
                        <TextField
                            margin='dense'
                            id='cantidad'
                            name='cantidad'
                            label='Cantidad del producto'
                            type='number'
                            value={this.state.cantidad}
                            fullWidth
                            required
                            helperText={this.state.cantidadError}
                            error={this.state.cantidadError ? true : false}
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                        <Button onClick={this.agregarProducto} color="primary" variant='contained'>
                            Agregar
                        </Button> 
                        {/* <UploadImage onImageUpload={this.onImageUpload} /> */}
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

ModificarPaquete.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ModificarPaquete);