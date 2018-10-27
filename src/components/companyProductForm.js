import React, { Component } from 'react';
import '../App.css';

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
                <input type='text' name='productName' onChange={this.onChange} placeholder='Name' />
                <br />
                <label ref='productDescription'>Descripcion del producto: </label>
                <input type='text' name='productDescription' onChange={this.onChange} placeholder='Description' />
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
                <label ref='productPrice'>Precio: </label>
                <input type='text' name='productPrice' onChange={this.onChange} placeholder='Precio' />
                <br />
                <label ref='productStock'>Stock: </label>
                <input type='text' name='productStock' onChange={this.onChange} placeholder='Stock' />
                <br />
                <button onClick={this.onSubmit}>Registrar</button>
            </form>
        );
    }
}

export default CompanyProductForm;