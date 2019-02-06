import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Validator from 'validator';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import isEmail from 'validator/lib/isEmail';
import LoginIcon from '@material-ui/icons/LockOpen'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            userEmail: '',
            userPassword: '',
            userEmailError: '',
            userPasswordError: '',
            showPassword: false
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
      else if(!Validator.isLength(this.state.userEmail, {min: 5, max: 30})){
        isError = true;
        errors.userEmailError='Debe tener entre 5 y 30 caracteres';
      }

      if(!this.state.userPassword){
        isError = true;
        errors.userPasswordError = 'Debe ingresar una contraseña';
      }
      else if(!Validator.isLength(this.state.userPassword, {min: 8, max: 30})){
        isError = true;
        errors.userPasswordError = 'Debe tener al menos 8 caracteres, maximo 30';
      }

      this.setState({
        ...this.state,
        ...errors
      });

      return isError;
    };

    onSubmit = async (e) =>{
        e.preventDefault();
        
        const error = this.validate();

        if (!error){
          let result = await this.props.onClick(this.state.userEmail, this.state.userPassword);

          if(result === 400){
            this.setState({userEmailError: 'Email y/o contraseña ingresados son incorrectos', userPasswordError: ' '})
          }
          else if(result === 204){
            this.setState({userEmailError: 'Usuario o compania se encuentra bloqueado', userPasswordError: ' '})
          }
          else this.handleToggle();
        }
    }
  
    onEnterPress = (e) => {
      if(e.key === 'Enter') this.onSubmit(e);
    }

    handleClickShowPassword = () => {
      this.setState(state => ({ showPassword: !state.showPassword }));
    };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        {this.props.cajon ? (
          <ListItem button onClick={this.handleToggle}>
            <ListItemIcon><LoginIcon /></ListItemIcon>
            <ListItemText primary='Iniciar sesion' />
          </ListItem>
        ) : (
          <Button color='inherit' onClick={this.handleToggle}>
            <LoginIcon className={classes.leftIcon} />Iniciar Sesion
          </Button>
        )}
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
            <FormControl className={(classes.margin, classes.textField)} fullWidth>
              	<InputLabel 
                  htmlFor="adornment-password" 
                  error={this.state.userPasswordError ? true : false}
                  required
                >
					        Contaseña
				        </InputLabel>
              <Input
                id="userPassword"
                name='userPassword'
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                error={this.state.userPasswordError ? true : false}
                onChange={this.onChange}
                onKeyPress={this.onEnterPress}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                  id="userPasswordError"
                error={this.state.userPasswordError ? true : false}>
                {this.state.userPasswordError}
              </FormHelperText>
            </FormControl>
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
      </Fragment>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);