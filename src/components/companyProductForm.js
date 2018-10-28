import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SelectForm from './SelectForm';

class CompanyProductForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            companyId:0,
            productId:0,
            productName: '',
            productDescription: '',
            productPrice:0,
            productStock: 0,
        };
    }

    onSelectChange = (tipo) => {
        this.setState({category: Number(tipo)});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.props.onClick(this.state);
    }
    
    render(){
        return(
            <form ref='companyProductForm'>
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
                    margin='normal'
                    id='productDescription'
                    name='productDescription'
                    label='Descripcion del producto'
                    fullWidth
                    multiline
                    rowsMax="4"
                    onChange={this.onChange}
                />
                <SelectForm
                        content={this.props.products}
                        onChange={this.onSelectChange}
                        label={'Productos'}
                        helper={'Seleccione el producto'}
                />
                <TextField
                    margin='dense'
                    id='productPrice'
                    name='productPrice'
                    label='Precio'
                    type='text'
                    fullWidth
                    onChange={this.onChange}
                />
                <TextField
                    margin='dense'
                    id='productStock'
                    name='productStock'
                    label='Stock'
                    type='text'
                    fullWidth
                    onChange={this.onChange}
                />
                <br />
                <Button variant='contained' color='primary' onClick={this.onSubmit}>Aceptar</Button>
            </form>
        );
    }
}

export default CompanyProductForm;