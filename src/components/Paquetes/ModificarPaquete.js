import React, { Component } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Select from '../Helpers/SelectForm';
import UploadImage from '../Helpers/UploadImage';
import Validator from 'validator';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Create";
import SelectForm from '../Helpers/SelectForm';
import SelectMultiple from '../Helpers/SelectMultiple';
import DeleteIcon from "@material-ui/icons/Delete";



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
            // companyId: 0,
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
            // companyId: this.props.package.companyId,
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
        else if(!Validator.isLength(this.state.name, {min: 3, max: 30})){
            isError = true;
            errors.nameError = 'Debe tener 3 y 30 caracteres';
        }

        if(!this.state.description){
            isError = true;
            errors.nameError = 'Debe ingresar una descripcion';
        }
        else if(!Validator.isLength(this.state.description, {min: 5, max: 50})){
            isError = true;
            errors.descriptionError = 'Debe tener entre 5 o 50 caracteres';
        }
        
        if(!this.state.price || this.state.price <= 0){
            isError = true;
            errors.priceError = 'Debe ingresar un precio mayor a 0';
        }
        else if(isNaN(this.state.price)){
            isError = true;
            errors.priceError = 'Debe contener unicamente numeros';
        }

        if(!this.state.stock || this.state.stock <= 0){
            isError = true;
            errors.stockError = 'Debe ingresar un stock mayor a 0';
        }
        else if(isNaN(this.state.stock)){
            isError = true;
            errors.stockError = 'Debe contener unicamente numeros';
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

    onSubmit = async (e) => {
        e.preventDefault();
        const error = this.validate();

        if (!error){

            /*const request = new FormData();

            //request.set('name', this.state.name);
            request.set('description', this.state.description);
            request.set('price', this.state.price);
            request.set('companyId', this.state.companyId);
            request.set('products',this.state.productosSeleccionados);
            request.append('image', this.state.packageImage, this.state.packageImage.name);
            //request.set('categories', this.state.categories);
            //image
            console.log(this.props)
            if(this.state.packageImage) request.append('image', this.state.packageImage, this.state.packageImage.name);
            */
            let request = {
                // id: this.state.id,
                // companyId: this.state.companyId,
                code: this.state.code,
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                stock: this.state.stock,
                products: this.state.packageProdcuts,
                categories: this.state.categories
            }
            // if(this.state.image) request.append('image', this.state.image, this.state.image.name);
            // console.log(this.props)
            let { status, message, paquete } = await this.props.modificarPaquete(request, this.state.id);
            
            if(status === 200){

                this.props.actualizarLista(paquete, this.props.posicion)
                this.handleToggle();
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
            return p.id !== id;
        });
        this.setState({ packageProdcuts });
    }

    render(){
        // const { classes } = this.props;
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
                        <ul>
                            {this.state.packageProdcuts.map(p => (
                                <li key={p.productId}>
                                    {p.name}
                                    {' x ' + p.quantity}
                                    <IconButton id={p.id} onClick={() => {
                                        this.handleDelete(p.id);
                                        }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </li>
                            ))}
                        </ul>
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

ModificarPaquete.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ModificarPaquete);