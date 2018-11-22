import React, { Component } from 'react';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import SelectMultiple from './SelectMultiple';
import UploadImage from './UploadImage';
import SelectForm from './SelectForm';
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


export default class PackageForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            retorno:{
                open: false,
                price: '',
                description: '',
                companyId: 0,
                priceError: '',
                descriptionError: '',
                companyIdError: '',
            }, 
        products:[],
        packages:[]
     }
    }

    async componentWillMount(){
        let company= await this.props.getCompany(this.props.companyId);
         console.log('company', company);
        let products = await this.props.getMisProductos(this.props.companyId);
         console.log('products', products);
        let packages= await this.props.getMisPackage(this.props.companyId);
        console.log('packages', packages);
        

        
        await this.setState({
                companyId:company.id,
                products: products,
                packages: packages,

            });
     };

    validate = () => {
        let isError = false;
        const errors = {
            priceError: '',
            descriptionError: '',
            companyIdError: ''
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
            companyId: 0,
            priceError: '',
            descriptionError: '',
            companyIdError: '',
        });
      }


   /* onSelectChange = (seleccionados) => {
        let selectedCategories = seleccionados.map(selected => {
            return selected.id;
        })
        this.setState({categories: selectedCategories});
    }*/

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (event)=> {
        event.preventDefault();
        
        const error = this.validate();
        // console.log(this.state);
        if (!error){

            const request = new FormData();
      
            request.set('price', this.state.price);
            request.set('description', this.state.description);
            request.set('companyId', this.state.companyId);

            this.props.onClick(request);
            this.handleToggle();
        } 
    }
    
    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    render(){
        console.log(this.state.packages);
        return(
            <div>
            <FormControl>
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
                    <Button onClick={this.handleToggle} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={this.onSubmit} color="primary" variant='contained'>
                        Aceptar
                    </Button>
                    </FormControl>
                    <FormControl>
                    <SelectForm
                            content={this.state.packages}
                            onChange={this.onSelectChange}
                            required
                            label={'Packages'}
                            //selectError={this.state.productIdError}
                            helper={'Seleccione el paquete'}
                    />
                    <SelectForm
                            content={this.state.products}
                            onChange={this.onSelectChange}
                            required
                            label={'Productos'}
                            selectError={this.state.productIdError}
                            helper={'Seleccione el producto'}
                    />
                    <TextField
                        margin='dense'
                        id='cantidad'
                        name='cantidad'
                        label='cantidad del producto'
                        type='text'
                        fullWidth
                        required
                        //helperText={this.state.descriptionError}
                        //error={this.state.descriptionError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <Button onClick={this.handleToggle} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={this.onSubmit} color="primary" variant='contained'>
                        Aceptar
                    </Button>
                    </FormControl>
            </div>
        );
    }
}