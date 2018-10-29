import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SelectSignup from './SelectForm';
import UploadImage from './uploadImage';

export default class SignupForm extends Component{

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
            companyImage: null
        }
    }

    handleToggle = () => {
        this.setState({
          open: !this.state.open
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
        this.props.onClick(this.state);
        this.handleToggle();
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

        return(

            <div>
                <Button color='inherit' onClick={this.handleToggle}>Registrarse</Button>
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