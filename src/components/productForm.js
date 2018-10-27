import React, { Component } from 'react';
import '../App.css';

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
                <input type='text' name='productName' onChange={this.onChange} placeholder='Name' />
                <br />
                <label ref='productCode'>Codigo del producto: </label>
                <input type='text' name='productCode' onChange={this.onChange} placeholder='Codigo' />
                <br />
                <label ref='category'>Tipo de producto: </label>
                <select onChange={this.onChange} value={this.state.typeSelected} name='category'>
                    <option value='' >Seleccione...</option>
                    {categories.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
                <button onClick={this.onSubmit}>Registrar</button>
            </form>
        );
    }
}

export default ProductForm;