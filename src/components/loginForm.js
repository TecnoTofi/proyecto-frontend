import React, { Component } from 'react';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import isEmail from 'validator/lib/isEmail';
import LoginIcon from '@material-ui/icons/LockOpen'

export default class FormDialog extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            userEmail: '',
            userPassword: '',
            userEmailError: '',
            userPasswordError: ''
        };        
    }

    handleToggle = () => {
      this.setState({
        open: !this.state.open,
        userEmail: '',
        userPassword: '',
        userEmailError: '',
        userPasswordError: ''
      });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    validate = () => {
      let isError = false;
      const errors = {
        userEmailError: '',
        userPasswordError: ''
      };

      if(!this.state.userEmail){
        isError = true;
        errors.userEmailError = 'Debe ingresar un email';
      }
      else if(!isEmail(this.state.userEmail)){
        isError = true;
        errors.userEmailError = 'Debe ser un email valido';
      }

      if(!this.state.userPassword){
        isError = true;
        errors.userPasswordError = 'Debe ingresar una contraseña';
      }
      else if(this.state.userPassword.length < 8){
        isError = true;
        errors.userPasswordError = 'Debe tener al menos 8 caracteres';
      }

      this.setState({
        ...this.state,
        ...errors
      });

      return isError;
    };

    onSubmit = (e) =>{
        e.preventDefault();
        
        const error = this.validate();

        if (!error){
          this.props.onClick(this.state.userEmail, this.state.userPassword)
          this.handleToggle();
        }      
    }
  
    onEnterPress = (e) => {
      if(e.key === 'Enter') this.onSubmit(e);
    }

  render() {
    return (
      <div>
        <Button color='inherit' onClick={this.handleToggle}><LoginIcon />Iniciar Sesion</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Inicio de sesion</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='userEmail'
              name='userEmail'
              label='Direccion de Email'
              type='email'
              fullWidth
              required
              helperText={this.state.userEmailError}
              error={this.state.userEmailError ? true : false}
              onChange={this.onChange}
              onKeyPress={this.onEnterPress}
            />
            <TextField
                margin='dense'
                id='userPassword'
                name='userPassword'
                label='Contaseña'
                type='password'
                fullWidth
                required
                helperText={this.state.userPasswordError}
                error={this.state.userPasswordError ? true : false}
                onChange={this.onChange}
                onKeyPress={this.onEnterPress}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggle} color="primary">
              Cancelar
            </Button>
            <Button className="btnAceptar" onClick={this.onSubmit} color="primary" variant='contained'>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}