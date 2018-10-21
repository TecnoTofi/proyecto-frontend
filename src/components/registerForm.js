import React, { Component } from 'react';

class RegisterForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            typeSelected: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.registroUsuarioEmpresa = this.registroUsuarioEmpresa.bind(this);
    }

    // componentDidMount(){

    // }

    registroUsuarioEmpresa(event){
        event.preventDefault();

        let companyType = this.props.companyTypes.find(type => {
            return type.id == this.state.typeSelected;
        });

        let userRole = this.props.userTypes.find(type => {
            return type.name == companyType.name;
        });

        let registerData = {
            userName: this.refs.userName.value,
            userEmail: this.refs.userEmail.value,
            userPassword: this.refs.userPassword.value,
            userDocument: this.refs.userDocument.value,
            userPhone: this.refs.userPhone.value,
            companyName: this.refs.companyName.value,
            companyRut: this.refs.companyRut.value,
            companyPhone: this.refs.companyPhone.value,
            category: this.state.typeSelected,
            role: userRole.id
        };

        this.props.onClick(registerData);
    }

    handleChange(event){
        event.preventDefault();
        this.setState({typeSelected: event.target.value});
    }

    render(){

        let companyTypes = this.props.companyTypes;

        return(
            <form ref='registerForm'>
                <label ref='userName'>Nombre completo: </label>
                <input type='text' ref='userName' placeholder='Nombre completo' />
                <br />
                <label ref='userEmail'>Email: </label>
                <input type='text' ref='userEmail' placeholder='Email' />
                <br />
                <label ref='userPassword'>Contraseña: </label>
                <input type='text' ref='userPassword' placeholder='Contraseña' />
                <br />
                <label ref='userDocument'>Documento: </label>
                <input type='text' ref='userDocument' placeholder='Documento' />
                <br />
                <label ref='userPhone'>Telefono: </label>
                <input type='text' ref='userPhone' placeholder='Telefono' />
                <br />
                <label ref='companyName'>Nombre de la empresa: </label>
                <input type='text' ref='companyName' placeholder='Nombre de la empresa' />
                <br />
                <label ref='companyRut'>RUT: </label>
                <input type='text' ref='companyRut' placeholder='RUT' />
                <br />
                <label ref='companyPhone'>Telefono de la empresa: </label>
                <input type='text' ref='companyPhone' placeholder='Telefono de la empresa' />
                <br />
                <label ref='companyType'>Tipo de empresa: </label>
                <select onChange={this.handleChange} value={this.state.typeSelected} ref='companyType'>
                    <option key={0} value={0}>Seleccione...</option>
                    {companyTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
                <br />
                <button onClick={this.registroUsuarioEmpresa}>Registrarse</button>
            </form>
        );
    }
}

export default RegisterForm;