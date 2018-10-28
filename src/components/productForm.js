import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SelectType from './SelectForm';

class ProductForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            productName: '',
            productCode: '',
            category: 0,
        };
    }

    onSelectChange = (tipo) => {
        this.setState({category: Number(tipo)});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (event)=> {
        event.preventDefault();

        this.props.onClick(this.state);
    }
    
    render(){
        return(
            <form ref='productForm'>
                <TextField
                    autoFocus
                    margin='dense'
                    id='productName'
                    name='productName'
                    label='Nombre del producto'
                    type='text'
                    fullWidth
                    onChange={this.onChange}
                />
                <TextField
                    margin='dense'
                    id='productCode'
                    name='productCode'
                    label='Codigo del producto'
                    type='text'
                    fullWidth
                    onChange={this.onChange}
                />
                <SelectType
                        content={this.props.categories}
                        onChange={this.onSelectChange}
                        label={'Tipo de producto'}
                        helper={'Seleccione el tipo de producto'}
                    />
                <Button variant='contained' color='primary' onClick={this.onSubmit}>Aceptar</Button>
            </form>
        );
    }
}

export default ProductForm;