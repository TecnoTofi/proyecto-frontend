import React, { Component } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SelectSignup from '../Helpers/SelectForm';
import UploadImage from '../Helpers/UploadImage';
import Validator from 'validator';
import SignupIcon from '@material-ui/icons/PersonAdd'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


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
            types: [],
            categories: [],
            userName: '',
            userEmail: '',
            userPassword: '',
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
            // companyType: 0,
            companyDescription:'',
            rubro: 0,
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
            typeError: '',
            rubroError: '',
            companyDescriptionError:'',
            companyImageError: '',
            showPassword: false
        }
    }

    async componentWillMount(){
        let categories = await this.props.getCategories();
        // let userTypes = await this.props.getUserTypes();
        let types = await this.props.getTypes();
        // console.log('categories', categories);
        // console.log('types', types);
        this.setState({ //ver porque da error da no-op
            categories,
            // userTypes: userTypes,
            types
        })
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
            typeError: '',
            companyImageError: '',
            companyDescriptionError:'',
            rubroError: ''
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

        if (!this.state.userPassword) {
            isError = true;
            errors.userPasswordError ='Debe ingresar una contraseña';
        }
        else if(!Validator.isLength(this.state.userPassword, {min: 8, max: 30})){
            isError = true;
            errors.userPasswordError = 'Debe tener al menos 8 caracteres, maximo 30';
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
        
        if(this.state.type === 0 || this.state.type === 0){
            isError = true;
            errors.typeError="Debe seleccionar el tipo de empresa";
        }

        if(this.state.rubro === 0){
            isError = true;
            errors.rubroError="Debe seleccionar el rubro de la empresa";
            console.log('error en Rubro === 0');
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
            type: 0,
            companyName: '',
            companyRut: '',
            companyPhone: '',
            companyFirstStreet: '',
            companySecondStreet: '',
            companyDoorNumber: '',
            // companyType: 0,
            companyImage: null,
            companyDescription:'',
            rubro: 0,
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
            typeError: '',
            companyImageError: '',
            companyDescriptionError:'',
            rubroError: ''
        });
      }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectTypeChange = (id) => {
        // let companyTypeName = this.state.companyTypes.find(type => type.id === id).name;
        // let role = this.state.userTypes.find(rol => rol.name === companyTypeName);
        this.setState({type: Number(id)});
    }

    onSelectCategoryChange = (r) => {
        this.setState({rubro: Number(r)});
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const error = this.validate();

        if (!error){

            const request = new FormData();
            //user
            request.set('userName', this.state.userName);
            request.set('userEmail', this.state.userEmail);
            request.set('userPassword', this.state.userPassword);
            request.set('userDocument', this.state.userDocument);
            request.set('userPhone', this.state.userPhone);
            request.set('userFirstStreet', this.state.userFirstStreet);
            request.set('userSecondStreet', this.state.userSecondStreet);
            request.set('userDoorNumber', this.state.userDoorNumber);
            request.set('type', this.state.type);
            //company
            request.set('companyName', this.state.companyName);
            request.set('companyRut', this.state.companyRut);
            request.set('companyPhone', this.state.companyPhone);
            request.set('companyFirstStreet', this.state.companyFirstStreet);
            request.set('companySecondStreet', this.state.companySecondStreet);
            request.set('companyDoorNumber', this.state.companyDoorNumber);
            // request.set('companyType', this.state.companyType);
            request.set('rubro', this.state.rubro);
            request.set('companyDescription', this.state.companyDescription);

            //image
            request.append('companyImage', this.state.companyImage, this.state.companyImage.name);

            let status = await this.props.onClick(request);
            if(status === 201) this.handleToggle();
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
                    <FormControl className={(classes.margin, classes.textField)} fullWidth>
                        <InputLabel
                            htmlFor="adornment-password"
                            error={this.state.userPasswordError ? true : false}
                            required
                        >
                            Contraseña
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
                        id='companyDescription'
                        name='companyDescription'
                        label='Descripcion de la empresa'
                        type='text'
                        fullWidth
                        required
                        helperText={this.state.companyDescriptionError}
                        error={this.state.companyDescriptionError ? true : false}
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
                        content={this.state.types}
                        onChange={this.onSelectTypeChange}
                        selectError={this.state.typeError}
                        label={'Tipo de empresa'}
                        helper={'Seleccione el tipo de empresa'}
                    />
                    <SelectSignup 
                        content={this.state.categories}
                        onChange={this.onSelectCategoryChange}
                        selectError={this.state.rubroError}
                        label={'Rubro de la empresa'}
                        helper={'Seleccione el rubro de la empresa'}
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