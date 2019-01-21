import React, { Component, Fragment } from 'react';
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
import AddIcon from '@material-ui/icons/LibraryBooks';
import SelectMultiple from '../Helpers/SelectMultiple';
import Validator from 'validator';
import UploadImage from '../Helpers/UploadImage';
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import { Typography } from '@material-ui/core';

// const styles = theme => ({
//     root: {
//       width: '100%',
//       maxWidth: 360,
//       backgroundColor: theme.palette.background.paper,
//       position: 'relative',
//       overflow: 'auto',
//       maxHeight: 300,
//     },
//     listSection: {
//       backgroundColor: 'inherit',
//     },
//     ul: {
//       backgroundColor: 'inherit',
//       padding: 0,
//     },
//   });

export default class PackageForm extends Component{

    constructor(props){
        super(props);
        this.state = {
                open: false,
                products: [],
                categoryList: [],
                code: '',
                name: '',
                description: '',
                price: 0,
                stock: 0,
                categories: [],
                image: null,
                codeError: '',
                nameError: '',
                descriptionError: '',
                priceError: '',
                stockError: '',
                categoriesError: '',
                imageError: '',
                productId: 0, 
                productosSeleccionados:[],
                cantidad: '',
            }
    };

    async componentWillMount(){
        let products = await this.props.getProducts(this.props.companyId);
        let categorias = await this.props.getCategories();

        this.setState({ products, categoryList: categorias });
     };

    validate = () => {
        let isError = false;
        const errors = {
            codeError: '',
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            imageError: '',
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

        if(this.state.iamge && this.state.iamge.type !== 'image/jpeg' && this.state.iamge.type !== 'image/jpg' && this.state.iamge.type !== 'image/png'){
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
            price: 0,
            stock: 0,
            categories: [],
            image: null,
            codeError: '',
            nameError: '',
            descriptionError: '',
            priceError: '',
            stockError: '',
            categoriesError: '',
            imageError: '',
            productId: 0, 
            productosSeleccionados:[],
            cantidad: '',
        });
      }

    onSelectChange = (value) => {
        this.setState({productId: Number(value)});
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

    onSubmit = async (event)=> {
        event.preventDefault();
        
        const error = this.validate();
        console.log(this.state);
        if (!error){

            //  const request = new FormData();
            //  request.set('code', this.state.code);
            //  request.set('name', this.state.name);
            //  request.set('description', this.state.description);
            //  request.set('price', this.state.price);
            //  request.set('stock', this.state.stock);
            //  request.set('categories', this.state.categories);
            //  request.set('productos',this.state.productosSeleccionados);
            //  request.append('image', this.state.image, this.state.image.name);

            /*let request = {
                price: this.state.price,
                description: this.state.description,
                companyId: this.props.companyId,
                products: this.state.productosSeleccionados,
                //packageImage:this.state.packageImage,
            }*/
            //console.log(request);

            let request = {
                // id: this.state.id,
                // companyId: this.state.companyId,
                code: this.state.code,
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                stock: this.state.stock,
                productos: this.state.productosSeleccionados,
                categories: this.state.categories
            }
            
            // this.props.crearPaquete(request);

            let { status, message, id } = await this.props.crearPaquete(request);
            if(status === 201) this.handleToggle();
        } 
    }
    
    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    agregarProducto = () =>{
        let productosSeleccionados = this.state.productosSeleccionados;
        let existe = productosSeleccionados.map(prod => prod.id).indexOf(this.state.productId);

        if(existe > -1){
            productosSeleccionados[existe].cantidad += Number(this.state.cantidad);
        }
        else{
            let name;
            this.state.products.map(p => {
                if(Number(p.id) === this.state.productId) name = p.name;
                return null;
            });
            let prod = {'id': this.state.productId, name, 'cantidad': Number(this.state.cantidad)};
            productosSeleccionados.push(prod);
        }
        this.setState({'cantidad': '', 'productId': 0, productosSeleccionados});
    }

    onImageUpload = (image) => {
        this.setState({
            image: image
        })
    }

    handleDelete = (e) =>{
        console.log(e.target.value)
    }


    render(){
        //console.log(this.state.packages);
        return(
            <div>
                <ListItem button onClick={this.handleToggle}>
                    <ListItemIcon><AddIcon /></ListItemIcon>
                    <ListItemText primary='Nuevo paquete' />
                </ListItem>
                <Dialog
                     open={this.state.open}
                     onClose={this.handleToggle}
                     aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Crear paquete nuevo</DialogTitle>
                    <DialogContent>
                    <TextField
                        margin='dense'
                        id='code'
                        name='code'
                        label='Codigo del paquete'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.codeError}
                        error={this.state.codeError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='name'
                        name='name'
                        label='Nombre del paquete'
                        type='text'
                        fullWidth
                        required
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
                        helperText={this.state.priceError}
                        error={this.state.priceError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <SelectMultiple
                        flagType='productos'
                        flagForm={true}
                        content={this.state.categoryList}
                        seleccionados={this.state.categories}
                        onChange={this.onMultipleSelectChange}
                        selectError={this.state.categoriesError}
                        helper={'Seleccione categorias para el paquete'}
                    />
                    <Divider variant="middle" />
                    {this.state.productosSeleccionados.length > 0 ? (
                        <Fragment>
                            <Typography>Productos Seleccionados</Typography>
                            <ul>
                                {this.state.productosSeleccionados.map(prod => (
                                    <li key={prod.id}>
                                        {prod.name}
                                        {' x ' + prod.cantidad}
                                        <IconButton id={prod.id} onClick={this.handleDelete}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </li>
                                ))}
                            </ul>
                        </Fragment>
                    ) : (
                        <Typography>Debe agregar productos</Typography>
                    )}
                    <Divider variant="middle" />
                    <SelectForm
                            content={this.state.products}
                            onChange={this.onSelectChange}
                            //selected={this.state.productId}
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
                        //helperText={this.state.descriptionError}
                        //error={this.state.descriptionError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <Button onClick={this.agregarProducto} color="primary" variant='contained'>
                        Agregar
                    </Button> 
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