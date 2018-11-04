import React, { Component } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SelectSignup from './SelectForm';
import UploadImage from './UploadImage';
import Validator from 'validator';
import SignupIcon from '@material-ui/icons/PersonAdd'

const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit
    }
});

class SignupForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
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
            role: 0, 
            companyImage: null,
            userNameError: '',
            userEmailError: '',
            userPasswordError: '',
            userDocumentError: '',
            userPhoneError: '',
            userFirstStreetError: '',
            userSecondStreetError: '',
            userDoorNumberError: '',
            companyNameError: '',
            companyRutError: '',
            companyPhoneError: '',
            companyFirstStreetError: '',
            companySecondStreetError: '',
            companyDoorNumberError: '',
            categoryError: '',
            companyImageError: ''
        }
    }

    validate = () => {
        let isError = false;
        const errors = {
            userNameError: '',
            userEmailError: '',
            userPasswordError: '',
            userDocumentError: '',
            userPhoneError: '',
            userFirstStreetError: '',
            userSecondStreetError: '',
            userDoorNumberError: '',
            companyNameError: '',
            companyRutError: '',
            companyPhoneError: '',
            companyFirstStreetError: '',
            companySecondStreetError: '',
            companyDoorNumberError: '',
            categoryError: '',
            companyImageError: ''
        };

        if(!this.state.userName){
            isError = true;
            errors.userNameError = 'Debe ingresar un nombre';
        }
        // else if(!Validator.isAlpha(this.state.userName)){
        //     isError = true;
        //     errors.userNameError = 'El nombre no puede contener numeros';
        // }

        if (!this.state.userEmail) {
            isError = true;
          errors.userEmailError = "Debe ingresar un email";
        }
        else if(!Validator.isEmail(this.state.userEmail)){
            isError = true;
            errors.userEmailError = 'Debe ser un email valido';
        }

        if (!this.state.userPassword) {
            isError = true;
            errors.userPasswordError ='Debe ingresar una contraseña';
        }
        else if(this.state.userPassword.length < 8){
            isError = true;
            errors.userPasswordError ='Debe tener al menos 8 caracteres';
        }

        if(!this.state.userDocument){
            isError = true;
            errors.userDocumentError='Debe ingresar un documento';
        }
        else if(!Validator.isNumeric(this.state.userDocument)){
            isError = true;
            errors.userDocumentError='Debe contener unicamente numeros';
        }
        else if(!Validator.isLength(this.state.userDocument, {min: 7, max: 8})){
            isError = true;
            errors.userDocumentError='Debe tener 7 u 8 caracteres';
        }

        if(!this.state.userPhone){
            isError = true;
            errors.userPhoneError='Debe ingresar un telefono personal';
        }
        else if(!Validator.isNumeric(this.state.userPhone)){
            isError = true;
            errors.userPhoneError='Debe contener unicamente numeros';
        }
        else if(!Validator.isLength(this.state.userPhone, {min: 7, max: 15})){
            isError = true;
            errors.userPhoneError='Debe tener entre 7 y 15 caracteres';
        }

        if(this.state.userFirstStreet && !Validator.isLength(this.state.userFirstStreet, {min: 3, max: 30})){
            isError = true;
            errors.userFirstStreetError='Debe tener entre 3 y 30 caracteres';
        }

        if(this.state.userSecondStreet && !Validator.isLength(this.state.userSecondStreet, {min: 3, max: 30})){
            isError = true;
            errors.userSecondStreetError='Debe tener entre 3 y 30 caracteres';
        }

        if(this.state.userDoorNumber && !Validator.isAlphanumeric(this.state.userDoorNumber)){
            isError = true;
            errors.userDoorNumberError='Debe contener unicamente numeros y letras';
        }
        
        if(!this.state.companyName){
            isError = true;
            errors.companyNameError='Debe ingresar un nombre';
        }
        else if(!Validator.isLength(this.state.companyName, {min: 3, max: 30})){
            isError = true;
            errors.companyNameError='Debe tener entre 3 y 30 caracteres';
        }
        // else if(!Validator.isAlphanumeric(this.state.companyName)){
        //     isError = true;
        //     errors.companyNameError='Debe contener unicamente numeros y letras';
        // }
        
        if(!this.state.companyRut){
            isError = true;
            errors.companyRutError='Debe ingresar un RUT';
        }
        else if(!Validator.isNumeric(this.state.companyRut)){
            isError = true;
            errors.companyRutError='Debe contener unicamente numeros';
        }
        else if(this.state.companyRut.length !== 12){
            isError = true;
            errors.companyRutError='Debe tener 12 caracteres';
        }

        if(!this.state.companyPhone){
            isError = true;
            errors.companyPhoneError='Debe ingresar un telefo de la empresa';
        }
        else if(!Validator.isNumeric(this.state.companyPhone)){
            isError = true;
            errors.companyPhoneError='Debe contener unicamente numeros';
        }

        if(!this.state.companyFirstStreet){
            isError = true;
            errors.companyFirstStreetError='Debe ingresar la direccion de la empresa';
        }
        else if(!Validator.isLength(this.state.userSecondStreet, {min: 3, max: 30})){
            isError = true;
            errors.companyFirstStreetError='Debe tener entre 3 y 30 caracteres';
        }

        if(!this.state.companySecondStreet){
            isError = true;
            errors.companySecondStreetError='Debe ingresar la direccion de la empresa';
        }
        else if(!Validator.isLength(this.state.companySecondStreet, {min: 3, max: 30})){
            isError = true;
            errors.companySecondStreetError='Debe tener entre 3 y 30 caracteres';
        }

        if(!this.state.companyDoorNumber){
            isError = true;
            errors.companyDoorNumberError='Debe ingresar la direccion de la empresa';
        }
        else if(!Validator.isAlphanumeric(this.state.companyDoorNumber)){
            isError = true;
            errors.companyDoorNumberError='Debe contener unicamente numeros y letras';
        }
        
        if(this.state.category === 0 || this.state.role === 0){
            isError = true;
            errors.categoryError="Debe seleccionar el tipo de empresa";
        }
        
        if(this.state.companyImage.type !== 'image/jpeg' && this.state.companyImage.type !== 'image/jpg' && this.state.companyImage.type !== 'image/png'){
            isError = true;
            errors.imageName="Debe subir una imagen JPEG, JPG o PNG";
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
      };

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
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
            role: 0, 
            companyImage: null,
            userNameError: '',
            userEmailError: '',
            userPasswordError: '',
            userDocumentError: '',
            userPhoneError: '',
            userFirstStreetError: '',
            userSecondStreetError: '',
            userDoorNumberError: '',
            companyNameError: '',
            companyRutError: '',
            companyPhoneError: '',
            companyFirstStreetError: '',
            companySecondStreetError: '',
            companyDoorNumberError: '',
            categoryError: '',
            companyImageError: ''
        });
      }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectChange = (tipo) => {
        let type = Number(tipo);
        this.setState({category: type}, () => {
            this.setState({role: type});
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('entre a registro, mando a validar');
        const error = this.validate();

        if (!error){
            console.log('se valido bien, mando a registrar');
            this.props.onClick(this.state);
            this.handleToggle();
        }
    }

    onImageUpload = (image) => {
        this.setState({
            companyImage: image
        })
    }

    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Button color='inherit' onClick={this.handleToggle}>
                    <SignupIcon className={classes.leftIcon} />Registrarse
                </Button>
                <Dialog
                open={this.state.open}
                onClose={this.handleToggle}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Registro de usuario - empresa</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='userName'
                        name='userName'
                        label='Nombre completo'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.userNameError}
                        error={this.state.userNameError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
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
                        label='Contraseña'
                        type='password'
                        fullWidth
                        required
                        helperText={this.state.userPasswordError}
                        error={this.state.userPasswordError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='userDocument'
                        name='userDocument'
                        label='Documento de identidad'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.userDocumentError}
                        error={this.state.userDocumentError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='userPhone'
                        name='userPhone'
                        label='Telefono personal'
                        type='text'
                        fullWidth
                        helperText={this.state.userPhoneError}
                        error={this.state.userPhoneError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='userFirstStreet'
                        name='userFirstStreet'
                        label='Calle principal'
                        type='text'
                        fullWidth
                        helperText={this.state.userFirstStreetError}
                        error={this.state.userFirstStreetError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='userSecondStreet'
                        name='userSecondStreet'
                        label='Calle secundaria'
                        type='text'
                        fullWidth
                        helperText={this.state.userSecondStreetError}
                        error={this.state.userSecondStreetError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='userDoorNumber'
                        name='userDoorNumber'
                        label='Numero de puerta'
                        type='text'
                        fullWidth
                        helperText={this.state.userDoorNumberError}
                        error={this.state.userDoorNumberError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='companyName'
                        name='companyName'
                        label='Nombre de la empresa'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.companyNameError}
                        error={this.state.companyNameError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='companyRut'
                        name='companyRut'
                        label='RUT de la empresa'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.companyRutError}
                        error={this.state.companyRutError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='companyPhone'
                        name='companyPhone'
                        label='Telefono de la empresa'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.companyPhoneError}
                        error={this.state.companyPhoneError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='companyFirstStreet'
                        name='companyFirstStreet'
                        label='Calle principal'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.companyFirstStreetError}
                        error={this.state.companyFirstStreetError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='companySecondStreet'
                        name='companySecondStreet'
                        label='Calle secundaria'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.companySecondStreetError}
                        error={this.state.companySecondStreetError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='companyDoorNumber'
                        name='companyDoorNumber'
                        label='Numero de puerta'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.companyDoorNumberError}
                        error={this.state.companyDoorNumberError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <SelectSignup 
                        content={this.props.companyTypes}
                        onChange={this.onSelectChange}
                        label={'Tipo de empresa'}
                        helper={'Seleccione el tipo de empresa'}
                    />
                    <UploadImage onImageUpload={this.onImageUpload} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleToggle} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={this.onSubmit} color="primary" variant='contained'>
                        Aceptar
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    }
}

SignupForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupForm);