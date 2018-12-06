import React, { Component } from 'react';
import 'typeface-roboto';
// import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import SelectMultiple from './SelectMultiple';
// import UploadImage from './UploadImage';
import SelectForm from '../Helpers/SelectForm';
// import SelectType from './SelectForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/LibraryBooks';
import Validator from 'validator';
import UploadImage from '../Helpers/UploadImage';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// import InputLabel from '@material-ui/core/InputLabel';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';

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
                price: '',
                description: '',
                companyId: 0,
                productosSeleccionados:[],
                packageImage:null,
                priceError: '',
                descriptionError: '',
                companyIdError: '',
                productId:0, 
                cantidad:'',
                products:[],
                packageImageError:'',
                //packages:[]
            }
    };

    async componentWillMount(){
        let products = await this.props.getProducts(this.props.companyId);
         console.log('products', products);
        /*let packages= await this.props.getMisPackage(this.props.companyId);
        console.log('packages', packages);*/

        await this.setState({
                products: products,
                companyId: this.props.companyId
        }, () => console.log(this.state));
     };

    validate = () => {
        let isError = false;
        const errors = {
            priceError: '',
            descriptionError: '',
            companyIdError: '',
            packageImageError:'',
        };
        if(!this.state.price){
            isError = true;
            errors.priceError = 'Debe ingresar un precio';
        }
        else if(this.state.price <= 0){
            isError = true;
            errors.priceError='Debe ingresar un precio mayor a 0';
        }
        if(!this.state.description){
            isError = true;
            errors.descriptionError='Debe ingresar una descripcion';
        }
        else if(!Validator.isLength(this.state.description, {min: 5, max: 50})){
            isError = true;
            errors.descriptionError='Debe tener entre 5 o 50 caracteres';
        }
        if (!this.state.companyId) {
            isError = true;
          errors.companyIdError = "Debe seleccionar una compania";
        }
        if(this.state.packageImage && this.state.packageImage.type !== 'image/jpeg' && this.state.packageImage.type !== 'image/jpg' && this.state.packageImage.type !== 'image/png'){
            isError = true;
            errors.imageName="Debe subir una imagen JPEG, JPG o PNG";
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
          price: '',
          description: '',
          productosSeleccionados:[],
          priceError: '',
          descriptionError: '',
          companyIdError: '',
          productId:0, 
          cantidad:'',
          packageImage:null,
        });
      }

    onSelectChange = (value) => {
        this.setState({productId: Number(value)});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (event)=> {
        event.preventDefault();
        
        const error = this.validate();
        console.log(this.state);
        if (!error){

             const request = new FormData();
             request.set('price', this.state.price);
             request.set('description', this.state.description);
             request.set('companyId', this.props.companyId);
             request.set('products',this.state.productosSeleccionados);
             request.append('image', this.state.packageImage, this.state.packageImage.name);

            /*let request = {
                price: this.state.price,
                description: this.state.description,
                companyId: this.props.companyId,
                products: this.state.productosSeleccionados,
                //packageImage:this.state.packageImage,
            }*/
            //console.log(request);
            
            this.props.crearPaquete(request);

            this.handleToggle();
        } 
    }
    
    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    agregarProducto = () =>{
        let productosSeleccionados = this.state.productosSeleccionados;
        let existe = productosSeleccionados.map(prod => {return prod.id}).indexOf(this.state.productId);

        if(existe > -1){
            productosSeleccionados[existe].cantidad += Number(this.state.cantidad);
        }
        else{
            let prod = {'id':this.state.productId , 'cantidad': Number(this.state.cantidad)};
            productosSeleccionados.push(prod);
        }
        this.setState({'cantidad': '', 'productId': 0, productosSeleccionados}, () => console.log(this.state.productosSeleccionados));
        //SelectForm.setState.type = 0;
    }

    onImageUpload = (image) => {
        this.setState({
            packageImage: image
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
                    <ListItemText primary='Alta paquete' />
                </ListItem>
                <Dialog
                     open={this.state.open}
                     onClose={this.handleToggle}
                     aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Crear paquete nuevo</DialogTitle>
                    <DialogContent>
                    
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
                      <ul>
                        {this.state.productosSeleccionados.map(prod => (
                            <li key={prod.id} >
                                {'id Producto :' + prod.id}
                                {'cantidad :' + prod.cantidad}
                                <IconButton id={prod.id} onClick={this.handleDelete}>
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
                        label='cantidad del producto'
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