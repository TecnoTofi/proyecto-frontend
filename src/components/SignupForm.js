import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
                <TextField
                    name='userName'
                    placeholder='Juan Perez'
                    onChange={this.onChange}
                />
                <br />
                <label ref='userEmail'>Email: </label>
                <TextField
                    type='email'
                    name='userEmail'
                    placeholder='example@email.com'
                    onChange={this.onChange}
                />
                <br />
                <label ref='userPassword'>Contraseña: </label>
                <TextField
                    type='password'
                    name='userPassword'
                    placeholder='pa$$w0rd!'
                    onChange={this.onChange}
                />
                <br />
                <label ref='userDocument'>Documento: </label>
                <TextField
                    name='userDocument'
                    placeholder='37682937'
                    onChange={this.onChange}
                />
                <br />
                <label ref='userPhone'>Telefono: </label>
                <TextField
                    name='userPhone'
                    placeholder='26009999'
                    onChange={this.onChange}
                />
                <br />
                <label ref='userAddress'>Domicilio: </label>
                <br />
                <label ref='userAddress'>Primer calle: </label>
                <TextField
                    name='userFirstStreet'
                    placeholder='Av. Brasil'
                    onChange={this.onChange}
                />
                <br />
                <label ref='userAddress'>Segunda calle: </label>
                <TextField
                    name='userSecondStreet'
                    placeholder='Benito Blanco'
                    onChange={this.onChange}
                />
                <br />
                <label ref='userAddress'>Numero de puerta: </label>
                <TextField
                    name='userDoorNumber'
                    placeholder='123'
                    onChange={this.onChange}
                />
                <br />
                <label ref='companyName'>Nombre de la empresa: </label>
                <TextField
                    name='companyName'
                    placeholder='Mi Empresa'
                    onChange={this.onChange}
                />
                <br />
                <label ref='companyRut'>RUT: </label>
                <TextField
                    name='companyRut'
                    placeholder='123456789012'
                    onChange={this.onChange}
                />
                <br />
                <label ref='companyPhone'>Telefono de la empresa: </label>
                <TextField
                    name='companyPhone'
                    placeholder='26009999'
                    onChange={this.onChange}
                />
                <br />
                <label ref='companyAddress'>Direccion de la empresa: </label>
                <br />
                <label ref='userAddress'>Primer calle: </label>
                <TextField
                    name='companyFirstStreet'
                    placeholder='Av. Brasil'
                    onChange={this.onChange}
                />
                <br />
                <label ref='userAddress'>Segunda calle: </label>
                <TextField
                    name='companySecondStreet'
                    placeholder='Benito Blanco'
                    onChange={this.onChange}
                />
                <br />
                <label ref='userAddress'>Numero de puerta: </label>
                <TextField
                    name='companyDoorNumber'
                    placeholder='123'
                    onChange={this.onChange}
                />
                <br />
                <label ref='category'>Tipo de empresa: </label>
                <select onChange={this.onChange} value={this.state.typeSelected} name='category'>
                    <option value='' >Seleccione...</option>
                    {companyTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
                <br />
                <Button variant='contained' color='primary' onClick={this.onSubmit}>Aceptar</Button>
            </form>
        );
    }
}

export default SignupForm;