import React, { Component } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UploadImage from '../Helpers/UploadImage';
import Validator from 'validator';
import Select from '../Helpers/SelectForm';
import CardMedia from '@material-ui/core/CardMedia';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const styles = theme => ({
    root: {
      maxWidth: 600,
      margin: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      width: '90%',
      margin: theme.spacing.unit * 3,
    },
    media: {
        objectFit: 'contain',
    },
    input: {
        display: 'none',
    },
  });

  class Profile extends Component{
    state = {
        rubros: [],
        showPassword: false,
        userName: '',
        userEmail: '',
        userDocument: '',
        userPhone: '',
        userFirstStreet: '',
        userSecondStreet: '',
        userDoorNumber: '',
        type: 0,
        companyName: '',
        companyRut: '',
        companyPhone: '',
        companyFirstStreet: '',
        companySecondStreet: '',
        companyDoorNumber: '',
        companyDescription:'',
        companyRubro: 0,
        companyImage: null,
        userNameError: '',
        userEmailError: '',
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
        companyRubroError: '',
        companyDescriptionError:'',
        companyImageError: '',
        companyImageUrl:'',
    }

    async componentWillMount(){

        this.verificarLogin();

        let company= await this.props.getCompany(this.props.companyId);
        let user = await this.props.getUser(this.props.userId);
        let rubros = await this.props.getRubros();
        
        this.setState({
            userName: user.name,
            userEmail: user.email,
            userDocument: user.document,
            userPhone: user.phone,
            userFirstStreet: user.firstStreet,
            userSecondStreet: user.secondStreet,
            userDoorNumber: user.doorNumber.toString(),
            type: user.typeId,
            companyName: company.name,
            companyRut: company.rut,
            companyPhone: company.phone,
            companyFirstStreet: company.firstStreet,
            companySecondStreet: company.secondStreet,
            companyDoorNumber: company.doorNumber.toString(),
            companyDescription:company.description,
            companyRubro: company.rubroId,
            rubros,
            companyImageUrl:company.imageUrl,
        });
    };

    verificarLogin = async () => {
        let tokenValido = await this.props.verificarToken();

        if(!tokenValido){
            this.props.enqueueSnackbar('No ah iniciado sesion.', { variant: 'error'});
            setTimeout(() => history.goBack(), 2000);
        }
    }

      validate = () => {
        let isError = false;
        const errors = {
            userNameError: '',
            userEmailError: '',
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
            companyDescriptionError:'',
            companyRubroError: '',
            companyImageError: '',
        };

        if(!this.state.userName){
            isError = true;
            errors.userNameError = 'Debe ingresar un nombre';
        }
        else if(!/^[a-zA-Z ]+$/.test(this.state.userName)){
            isError = true;
            errors.userNameError = 'El nombre no puede contener numeros';
        }
        else if(!Validator.isLength(this.state.userName, {min: 3, max: 50})){
            isError = true;
            errors.userNameError='Debe tener 3 y 50 caracteres';
        }

        if (!this.state.userEmail) {
            isError = true;
          errors.userEmailError = "Debe ingresar un email";
        }
        else if(!Validator.isEmail(this.state.userEmail)){
            isError = true;
            errors.userEmailError = 'Debe ser un email valido';
        }
        else if(!Validator.isLength(this.state.userEmail, {min: 5, max: 30})){
            isError = true;
            errors.userEmailError='Debe tener entre 5 y 30 caracteres';
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

        if(this.state.userPhone && !Validator.isNumeric(this.state.userPhone)){
            isError = true;
            errors.userPhoneError='Debe contener unicamente numeros';
        }
        else if(this.state.userPhone && !Validator.isLength(this.state.userPhone, {min: 7, max: 15})){
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
        else if(this.state.userDoorNumber && !Validator.isLength(this.state.userDoorNumber, {min: 1, max: 5})){
            isError = true;
            errors.userDoorNumberError='Debe tener entre 1 y 5 caracteres';
        }
        
        if(!this.state.companyName){
            isError = true;
            errors.companyNameError='Debe ingresar un nombre';
        }        
        else if(!/^\w+(\s\w+)*$/.test(this.state.companyName)){
             isError = true;
             errors.companyNameError='Debe contener unicamente numeros y letras';
        }
        else if(!Validator.isLength(this.state.companyName, {min: 3, max: 30})){
            isError = true;
            errors.companyNameError='Debe tener entre 3 y 30 caracteres';
        }
        
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
        if(!this.state.companyDescription){
            isError = true;
            errors.companyDescriptionError='Debe ingresar una descripcion';
        }
        else if(!Validator.isLength(this.state.companyDescription, {min: 3, max: 100})){
            isError = true;
            errors.companyDescriptionError='Debe tener entre 3 y 100 caracteres';
        }

        if(!this.state.companyPhone){
            isError = true;
            errors.companyPhoneError='Debe ingresar un telefo de la empresa';
        }
        else if(!Validator.isNumeric(this.state.companyPhone)){
            isError = true;
            errors.companyPhoneError='Debe contener unicamente numeros';
        }
        else if(this.state.companyPhone && !Validator.isLength(this.state.companyPhone, {min: 7, max: 15})){
            isError = true;
            errors.companyPhoneError='Debe tener entre 7 y 15 caracteres';
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
        else if(this.state.companyDoorNumber && !Validator.isLength(this.state.companyDoorNumber, {min: 1, max: 5})){
            isError = true;
            errors.companyDoorNumberError='Debe tener entre 1 y 5 caracteres';
        }

        if(this.state.companyCategory === 0){
            isError = true;
            errors.companyCategoryError="Debe seleccionar el rubro de la empresa";
        }
        
        if(this.state.companyImage && this.state.companyImage.type !== 'image/jpeg' && this.state.companyImage.type !== 'image/jpg' && this.state.companyImage.type !== 'image/png'){
            isError = true;
            errors.imageName="Debe subir una imagen JPEG, JPG o PNG";
        }

        this.setState({
            ...this.state,
            ...errors
        });
        
        return isError;
      };
    
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectRubroChange = (tipo) => {
        let type = Number(tipo);
        this.setState({companyRubro: type});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const error = this.validate();
        if (!error){

            const request = new FormData();
            
            //user
            request.set('userName', this.state.userName);
            request.set('email', this.state.userEmail);
            request.set('document', this.state.userDocument);
            request.set('userPhone', this.state.userPhone);
            request.set('userFirstStreet', this.state.userFirstStreet);
            request.set('userSecondStreet', this.state.userSecondStreet);
            request.set('userDoorNumber', this.state.userDoorNumber);
            request.set('type', this.state.type);
            //company            
            request.set('companyId', this.props.companyId);
            request.set('companyName', this.state.companyName);
            request.set('companyRut', this.state.companyRut);
            request.set('companyPhone', this.state.companyPhone);
            request.set('companyFirstStreet', this.state.companyFirstStreet);
            request.set('companySecondStreet', this.state.companySecondStreet);
            request.set('companyDoorNumber', this.state.companyDoorNumber);
            request.set('rubro', this.state.companyRubro);
            request.set('companyDescription', this.state.companyDescription);

            //image
            if(this.state.companyImage) request.append('companyImage', this.state.companyImage, this.state.companyImage.name);

            this.props.modificarPerfil(request);
        }
    }

    filePreview = (input) => {
        if (input.target.files && input.target.files[0]) { 
            this.setState({
                companyImage: input.target.files[0],
                companyImageUrl: URL.createObjectURL(input.target.files[0])
            });
        }
    }

    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    volverAtras = () => {
        history.goBack();
    }

    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TextField
                                autoFocus
                                margin='dense'
                                id='userName'
                                name='userName'
                                label='Nombre completo'
                                type='text'
                                fullWidth
                                value= {this.state.userName}
                                helperText={this.state.userNameError}
                                error={this.state.userNameError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='userEmail'
                                name='userEmail'
                                label='Direccion de Email'
                                type='email'
                                fullWidth
                                value= {this.state.userEmail}
                                helperText={this.state.userEmailError}
                                error={this.state.userEmailError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='userDocument'
                                name='userDocument'
                                label='Documento de identidad'
                                type='text'
                                fullWidth
                                value= {this.state.userDocument}
                                helperText={this.state.userDocumentError}
                                error={this.state.userDocumentError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='userPhone'
                                name='userPhone'
                                label='Telefono personal'
                                type='text'
                                fullWidth
                                value= {this.state.userPhone}
                                helperText={this.state.userPhoneError}
                                error={this.state.userPhoneError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='userFirstStreet'
                                name='userFirstStreet'
                                label='Calle principal'
                                type='text'
                                fullWidth
                                value= {this.state.userFirstStreet}
                                helperText={this.state.userFirstStreetError}
                                error={this.state.userFirstStreetError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='userSecondStreet'
                                name='userSecondStreet'
                                label='Calle secundaria'
                                type='text'
                                fullWidth
                                value= {this.state.userSecondStreet}
                                helperText={this.state.userSecondStreetError}
                                error={this.state.userSecondStreetError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='userDoorNumber'
                                name='userDoorNumber'
                                label='Numero de puerta'
                                type='text'
                                fullWidth
                                value= {this.state.userDoorNumber}
                                helperText={this.state.userDoorNumberError}
                                error={this.state.userDoorNumberError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='companyName'
                                name='companyName'
                                label='Nombre de la empresa'
                                type='text'
                                fullWidth
                                value= {this.state.companyName}
                                helperText={this.state.companyNameError}
                                error={this.state.companyNameError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='companyRut'
                                name='companyRut'
                                label='RUT de la empresa'
                                type='text'
                                fullWidth
                                value= {this.state.companyRut}
                                helperText={this.state.companyRutError}
                                error={this.state.companyRutError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='companyDescription'
                                name='companyDescription'
                                label='Descripcion de la empresa'
                                type='text'
                                fullWidth
                                value= {this.state.companyDescription}
                                helperText={this.state.companyDescriptionError}
                                error={this.state.companyDescriptionError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='companyPhone'
                                name='companyPhone'
                                label='Telefono de la empresa'
                                type='text'
                                fullWidth
                                value= {this.state.companyPhone}
                                helperText={this.state.companyPhoneError}
                                error={this.state.companyPhoneError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='companyFirstStreet'
                                name='companyFirstStreet'
                                label='Calle principal'
                                type='text'
                                fullWidth
                                value= {this.state.companyFirstStreet}
                                helperText={this.state.companyFirstStreetError}
                                error={this.state.companyFirstStreetError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='companySecondStreet'
                                name='companySecondStreet'
                                label='Calle secundaria'
                                type='text'
                                fullWidth
                                value= {this.state.companySecondStreet}
                                helperText={this.state.companySecondStreetError}
                                error={this.state.companySecondStreetError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <TextField
                                margin='dense'
                                id='companyDoorNumber'
                                name='companyDoorNumber'
                                label='Numero de puerta'
                                type='text'
                                fullWidth
                                value= {this.state.companyDoorNumber}
                                helperText={this.state.companyDoorNumberError}
                                error={this.state.companyDoorNumberError ? true : false}
                                onChange={this.onChange}
                                onKeyPress={this.onEnterPress}
                            />
                        </TableRow>
                        <TableRow>
                            <Select 
                                content={this.state.rubros}
                                onChange={this.onSelectRubroChange}
                                selectError={this.state.companyRubroError}
                                label={'Rubro de la empresa'}
                                helper={'Seleccione el rubro de la empresa'}
                                seleccionado={this.state.companyRubro}
                            />
                        </TableRow>
                        {/* <TableRow>
                            <UploadImage onImageUpload={this.onImageUpload} />
                        </TableRow> */}
                        <TableRow>
                            <div>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={this.filePreview}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button 
                                        color='inherit'
                                        variant="contained"
                                        component="span"
                                        className={classes.button}
                                        >
                                        Subir imagen
                                    </Button>
                                </label>
                            </div>
                        </TableRow>
                        <TableRow>
                            <CardMedia
                                component="img"
                                //alt={this}
                                className={classes.media}
                                height="140"
                                src={`${this.state.companyImageUrl}`}
                                //title={this.props.item.name}
                            />
                        </TableRow>
                        <TableRow>
                            <Button onClick={this.volverAtras} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={this.onSubmit} color="primary" variant='contained'>
                                Aceptar
                            </Button>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);