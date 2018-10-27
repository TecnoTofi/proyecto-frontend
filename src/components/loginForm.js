import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
                <TextField
                    // style={{padding: 24}}    
                    name='userEmail'
                    placeholder='example@email.com'
                    // margin='normal'
                    onChange={this.onChange}
                />
                <br />
                <label ref='userPassword'>Contraseña: </label>
                <TextField
                    name='userPassword'
                    type='password'
                    placeholder='pa$$w0rd!'
                    // margin='normal'
                    onChange={this.onChange}
                />
                <br />
                <Button variant='contained' color='primary' onClick={this.onSubmit}>Aceptar</Button>
            </form>
        );
    }
}

export default LoginForm;