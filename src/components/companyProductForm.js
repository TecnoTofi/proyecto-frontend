import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        let companies = this.props.companies;
        let products = this.props.products;
        return(
            <form ref='companyProductForm'>
                <label ref='productName'>Nombre del producto: </label>
                <TextField
                    name='productName'
                    placeholder='Agua 1.5 Litros'
                    onChange={this.onChange}
                />
                <br />
                <label ref='productDescription'>Descripcion del producto: </label>
                <TextField
                    // type='Multi-line'
                    name='productDescription'
                    placeholder='Botella de agua gasificada de 1.5 Litros no retornable.'
                    onChange={this.onChange}
                />
                <br />
                <label ref='companyId'>Compania: </label>
                <select onChange={this.onChange} value={this.state.typeSelected} name='companyId'>
                    <option value='' >Seleccione...</option>
                    {companies.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
                <br />
                <label ref='productId'>Producto: </label>
                <select onChange={this.onChange} value={this.state.typeSelected} name='productId'>
                    <option value='' >Seleccione...</option>
                    {products.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
                <br />
                <label ref='productPrice'>Precio: $</label>
                <TextField
                    name='productPrice'
                    placeholder='30'
                    onChange={this.onChange}
                />
                <br />
                <label ref='productStock'>Stock: </label>
                <TextField
                    name='productStock'
                    placeholder='500'
                    onChange={this.onChange}
                />
                <br />
                <Button variant='contained' color='primary' onClick={this.onSubmit}>Aceptar</Button>
            </form>
        );
    }
}

export default CompanyProductForm;