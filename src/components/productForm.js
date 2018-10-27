import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ProductForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            productName: '',
            productCode: '',
            category: 0,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(event){
        event.preventDefault();

        this.props.onClick(this.state);
    }
    
    render(){
        let categories = this.props.categories;
        return(
            <form ref='productForm'>
                <label ref='productName'>Nombre del producto: </label>
                <TextField
                    name='productName'
                    placeholder='Agua 1.5 Litros'
                    onChange={this.onChange}
                />
                <br />
                <label ref='productCode'>Codigo del producto: </label>
                <TextField
                    name='productCode'
                    placeholder='HX23G8'
                    onChange={this.onChange}
                />
                <br />
                <label ref='category'>Tipo de producto: </label>
                <select onChange={this.onChange} value={this.state.typeSelected} name='category'>
                    <option value='' >Seleccione...</option>
                    {categories.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
                <br />
                <Button variant='contained' color='primary' onClick={this.onSubmit}>Aceptar</Button>
            </form>
        );
    }
}

export default ProductForm;