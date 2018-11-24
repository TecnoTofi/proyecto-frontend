import React, { Component } from 'react';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SelectMultiple from './SelectMultiple';
import UploadImage from './UploadImage';
// import SelectType from './SelectForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/AddBox';
import Validator from 'validator';
// import InputLabel from '@material-ui/core/InputLabel';


export default class ProductForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            productName: '',
            productCode: '',
            categories: [],
            categoryList:[],
            productImage: null,
            productNameError: '',
            productCodeError: '',
            categoriesError: '',
            productImageError: ''
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
            productImageError: ''
        };
        if(!this.state.productName){
            isError = true;
            errors.productNameError = 'Debe ingresar un nombre';
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
        if(this.state.categories.length === 0){
            isError = true;
            errors.categoriesError='Debe seleccionar al menos una categoria';
        }
        if(this.state.companyImage && this.state.companyImage.type !== 'image/jpeg' && this.state.companyImage.type !== 'image/jpg' && this.state.companyImage.type !== 'image/png'){
            isError = true;
            errors.productImageError="Debe subir una imagen JPEG, JPG o PNG";
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
          productName: '',
          productCode: '',
          categories: [],
          productImage: null,
          productNameError: '',
          productCodeError: '',
          categoriesError: '',
          productImageError: ''
        });
      }

    // onSelectChange = (tipo) => {
    //     this.setState({category: Number(tipo)});
    // }

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
        // console.log(this.state);
        if (!error){

            const request = new FormData();
      
            request.set('name', this.state.productName);
            request.set('code', this.state.productCode);
            request.set('categories', this.state.categories);
            
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