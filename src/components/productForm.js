import React, { Component } from 'react';
import 'typeface-roboto';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SelectType from './SelectForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import AddIcon from '@material-ui/icons/AddBox';
import Validator from 'validator';
import InputLabel from '@material-ui/core/InputLabel';


export default class ProductForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            productName: '',
            productCode: '',
            category: [],
            productNameError:'',
            productCodeError:'',
            categoryError:0,

        };
    }

    validate = () => {
        let isError = false;
        const errors = {
            productNameError: '',
            productCodeError: '',
            categoryError: 0,
        };
        if(!this.state.productName){
            isError = true;
            errors.productNameError = 'Debe ingresar un nombre para el producto';
        }
        else if(!Validator.isLength(this.state.productName, {min: 3, max: 30})){
            isError = true;
            errors.productNameError='El largo del nombre debe ser estar entre 3 y 30 caracteres';
        }

        if (!this.state.productCode) {
            isError = true;
            errors.productCodeError ='Debe ingresar un codigo para el producto';
        }
        else if(!Validator.isNumeric(this.state.productCode)){
            isError = true;
            errors.productCodeError='Debe contener unicamente numeros';
        }
        /*if(!this.state.category == 0){
            isError = true;
            errors.userPhoneError='Debe seleccionar una categoria';
        }*/
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
          category: 0,
          productNameError:'',
          productCodeError:'',
          categoryError:0,
        });
      }

    onSelectChange = (tipo) => {
        this.setState({category: Number(tipo)});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (event)=> {
        event.preventDefault();
        const error = this.validate();
        
        if (!error){
            this.props.onClick(this.state);
            this.handleToggle();
        } 
    }
    
    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    render(){
        return(
            <div>
            <Button color='inherit' onClick={this.handleToggle}>Nuevo producto</Button>
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
                    <InputLabel htmlFor="select-multiple-checkbox">Tipo de producto</InputLabel>
                    <SelectType
                            multiple
                            content={this.props.categories}
                            required
                            helperText={this.state.categoryError}
                            error={this.state.categoryError ? true : false}
                            onChange={this.onSelectChange}
                            //label={'Tipo de producto'}
                            helper={'Seleccione el tipo de producto'}
                        />
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