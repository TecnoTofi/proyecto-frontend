import React, { Component } from 'react';
import '../App.css';

class SignupForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            userPassword: '',
            userDocument: '',
            userPhone: '',
            userFirstStreet: '',
            userSecondStreet: '',
            userDoorNumber: '',
            companyName: '',
            companyRut: '',
            companyPhone: '',
            companyFirstStreet: '',
            companySecondStreet: '',
            companyDoorNumber: '',
            category: 0,
            role: 0
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();

        let companyType = this.props.companyTypes.find(type => {
            // eslint-disable-next-line
            return type.id == this.state.category;
        });

        let userRole = this.props.userTypes.find(type => {
            // eslint-disable-next-line
            return type.name == companyType.name;
        });

        this.setState({role: userRole.id}, () => {
            this.props.onClick(this.state);
        });
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){

        let companyTypes = this.props.companyTypes;

        return(
            <form ref='registerForm'>
                <label ref='userName'>Nombre completo: </label>
                <input type='text' name='userName' onChange={this.onChange} placeholder='Nombre completo' />
                <br />
                <label ref='userEmail'>Email: </label>
                <input type='text' name='userEmail' onChange={this.onChange} placeholder='Email' />
                <br />
                <label ref='userPassword'>Contraseña: </label>
                <input type='password' name='userPassword' onChange={this.onChange} placeholder='Contraseña' />
                <br />
                <label ref='userDocument'>Documento: </label>
                <input type='text' name='userDocument' onChange={this.onChange} placeholder='Documento' />
                <br />
                <label ref='userPhone'>Telefono: </label>
                <input type='text' name='userPhone' onChange={this.onChange} placeholder='Telefono' />
                <br />
                <label ref='userAddress'>Domicilio: </label>
                <input type='text' name='userFirstStreet' onChange={this.onChange} placeholder='Primera calle' />
                <br />
                <input type='text' name='userSecondStreet' onChange={this.onChange} placeholder='Segunda calle' />
                <br />
                <input type='text' name='userDoorNumber' onChange={this.onChange} placeholder='Numero de puerta' />
                <br />
                <label ref='companyName'>Nombre de la empresa: </label>
                <input type='text' name='companyName' onChange={this.onChange} placeholder='Nombre de la empresa' />
                <br />
                <label ref='companyRut'>RUT: </label>
                <input type='text' name='companyRut' onChange={this.onChange} placeholder='RUT' />
                <br />
                <label ref='companyPhone'>Telefono de la empresa: </label>
                <input type='text' name='companyPhone' onChange={this.onChange} placeholder='Telefono de la empresa' />
                <br />
                <label ref='companyAddress'>Direccion de la empresa: </label>
                <input type='text' name='companyFirstStreet' onChange={this.onChange} placeholder='Primera calle' />
                <br />
                <input type='text' name='companySecondStreet' onChange={this.onChange} placeholder='Segunda calle' />
                <br />
                <input type='text' name='companyDoorNumber' onChange={this.onChange} placeholder='Numero de puerta' />
                <br />
                <label ref='category'>Tipo de empresa: </label>
                <select onChange={this.onChange} value={this.state.typeSelected} name='category'>
                    <option value='' >Seleccione...</option>
                    {companyTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
                <br />
                <button onClick={this.onSubmit}>Registrarse</button>
            </form>
        );
    }
}

export default SignupForm;