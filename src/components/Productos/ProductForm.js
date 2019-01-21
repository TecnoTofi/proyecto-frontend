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


export default class ProductForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            categoryList:[],
            code: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            categories: [],
            image: null,
            codeError: '',
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            categoriesError: '',
            imageError: ''
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
        this.setState({categoryList: categories});
    }

    validate = () => {
        let isError = false;
        const errors = {
            codeError: '',
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            categoriesError: '',
            imageError: ''
        };

        if (!this.state.code) {
            isError = true;
            errors.codeError ='Debe ingresar un codigo';
        }
        else if(!Validator.isAlphanumeric(this.state.code)){
            isError = true;
            errors.codeError='Debe contener unicamente numeros y letras';
        }

        if(!this.state.name){
            isError = true;
            errors.nameError = 'Debe ingresar un nombre';
        }
        else if(!Validator.isLength(this.state.name, {min: 3, max: 30})){
            isError = true;
            errors.nameError='Debe tener 3 y 30 caracteres';
        }

        if(!this.state.description){
            isError = true;
            errors.descriptionError='Debe ingresar una descripcion';
        }
        else if(!Validator.isLength(this.state.description, {min: 5, max: 50})){
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

        if(this.state.categories.length === 0){
            isError = true;
            errors.categoriesError='Debe seleccionar al menos una categoria';
        }

        if(this.state.companyImage && this.state.companyImage.type !== 'image/jpeg' && this.state.companyImage.type !== 'image/jpg' && this.state.companyImage.type !== 'image/png'){
            isError = true;
            errors.imageError="Debe subir una imagen JPEG, JPG o PNG";
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
            code: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            categories: [],
            image: null,
            codeError: '',
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            categoriesError: '',
            imageError: ''
        });
      };

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
            image: image
        })
    }

    onSubmit = (event)=> {
        event.preventDefault();
        
        const error = this.validate();
        // console.log(this.state);
        if (!error){

            const request = new FormData();
      
            request.set('name', this.state.name);
            request.set('code', this.state.code);
            request.set('categories', this.state.categories);
            
            request.append('image', this.state.image, this.state.image.name);

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
                        margin='dense'
                        id='code'
                        name='code'
                        label='Codigo del producto'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.descriptionError}
                        error={this.state.descriptionError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        name='name'
                        label='Nombre del producto'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.nameError}
                        error={this.state.nameError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        id='description'
                        name='description'
                        label='Descrip del producto'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.nameError}
                        error={this.state.nameError ? true : false}
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