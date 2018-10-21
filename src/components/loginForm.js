import React, { Component } from 'react';
import '../App.css';

class LoginForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            userEmail: '',
            userPassword: ''
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
        return(
            <form ref='loginUsuarios'>
                <label ref='userEmail'>Email: </label>
                <input type='text' name='userEmail' onChange={this.onChange} placeholder='Email' />
                <br />
                <label ref='userPassword'>Contraseña: </label>
                <input type='password' name='userPassword' onChange={this.onChange} placeholder='Contraseña' />
                <br />
                <button onClick={this.onSubmit}>Iniciar sesion</button>
            </form>
        );
    }
}

export default LoginForm;