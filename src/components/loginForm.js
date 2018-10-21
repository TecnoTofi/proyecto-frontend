import React, { Component } from 'react';
import '../App.css';

class LoginForm extends Component{

    constructor(props){
        super(props);

        this.login = this.login.bind(this);
    }

    login(event){
        event.preventDefault();
        alert('llegue');
    }
    
    render(){
        return(
            <form ref='loginUsuarios'>
                <label ref='userEmail'>Email: </label>
                <input type='text' ref='userEmail' placeholder='Email' />
                <br />
                <label ref='userPassword'>Contraseña: </label>
                <input type='text' ref='userPassword' placeholder='Contraseña' />
                <br />
                <button onClick={this.login}>Iniciar sesion</button>
            </form>
        );
    }
}

export default LoginForm;