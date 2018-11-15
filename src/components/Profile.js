import React, { Component } from 'react';
import 'typeface-roboto';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UploadImage from './UploadImage';
import Validator from 'validator';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import EditIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Select from './SelectForm';
import FormHelperText from '@material-ui/core/FormHelperText';

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

  class Profile extends Component{

    // constructor(props){
    //     super(props);
        state = {
            categories: [],
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
            companyDescription:'',
            companyCategory: 0,
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
            companyCategoryError: '',
            companyDescriptionError:'',
            companyImageError: '',
            showPassword: false,
        }
    // }


    async componentWillMount(){
        let company= await this.props.getCompany(this.props.companyId);
        // console.log('comapny', company);
        let user = await this.props.getUser(this.props.userId);
        // console.log('user', user);
        let categories = await this.props.getCategories();
        // console.log('categories', categories);
        
        await this.setState({
                userName: user.name,
                userEmail: user.email,
                userDocument: user.document,
                userPhone: user.phone,
                userFirstStreet: user.firstStreet,
                userSecondStreet: user.secondStreet,
                userDoorNumber: user.doorNumber.toString(),
                role: user.roleId,
                companyName: company.name,
                companyRut: company.rut,
                companyPhone: company.phone,
                companyFirstStreet: company.firstStreet,
                companySecondStreet: company.secondStreet,
                companyDoorNumber: company.doorNumber.toString(),
                companyType: company.typeId,
                companyDescription:company.description,
                companyCategory: company.categoryId,
                categories: categories
            });
     };

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
            companyImageError: '',
            companyDescriptionError:'',
            companyCategoryError: ''
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
        
        if(!this.state.companyName){
            isError = true;
            errors.companyNameError='Debe ingresar un nombre';
        }
        else if(!Validator.isLength(this.state.companyName, {min: 3, max: 30})){
            isError = true;
            errors.companyNameError='Debe tener entre 3 y 30 caracteres';
        }
         else if(!/^\w+(\s\w+)*$/.test(this.state.companyName)){
             isError = true;
             errors.companyNameError='Debe contener unicamente numeros y letras';
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

        if(this.state.companyCategory === 0){
            isError = true;
            errors.companyCategoryError="Debe seleccionar el rubro de la empresa";
            console.log('error en companyCategory === 0');
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
            companyImage: null,
            companyDescription:'',
            companyCategory: 0,
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
            companyImageError: '',
            companyDescriptionError:'',
            companyCategoryError: ''
        });
      }

    
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    // onSelectTypeChange = (tipo) => {
    //     let type = Number(tipo);
    //     this.setState({companyType: type}, () => {
    //         this.setState({role: type});
    //     });
    // }

    onSelectCategoryChange = (tipo) => {
        let type = Number(tipo);
        this.setState({companyCategory: type});
    }

    onSubmit = (e) => {
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
            request.set('role', this.state.role);
            //company
            request.set('companyName', this.state.companyName);
            request.set('companyRut', this.state.companyRut);
            request.set('companyPhone', this.state.companyPhone);
            request.set('companyFirstStreet', this.state.companyFirstStreet);
            request.set('companySecondStreet', this.state.companySecondStreet);
            request.set('companyDoorNumber', this.state.companyDoorNumber);
            request.set('companyType', this.state.companyType);
            request.set('companyCategory', this.state.companyCategory);
            request.set('companyDescription', this.state.companyDescription);

            //image
            request.append('companyImage', this.state.companyImage, this.state.companyImage.name);

            this.props.modificarPerfil(request);
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

    /*cargarState = =>{

    }*/
    render(){
        const { classes } = this.props;
        // console.log(this.state)
        return(
            <div>
            <FormControl>
            <TextField
                        autoFocus
                        margin='dense'
                        id='userName'
                        name='userName'
                        label='Nombre completo'
                        type='text'
                        fullWidth
                        //required
                        value= {this.state.userName}
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
                        //required
                        value= {this.state.userEmail}
                        helperText={this.state.userEmailError}
                        error={this.state.userEmailError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <FormControl className={(classes.margin, classes.textField)} fullWidth>
                        <InputLabel
                            htmlFor="adornment-password"
                            error={this.state.userPasswordError ? true : false}
                            //required
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
                        //required
                        value= {this.state.userDocument}
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
                        value= {this.state.userPhone}
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
                        value= {this.state.userFirstStreet}
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
                        value= {this.state.userSecondStreet}
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
                        value= {this.state.userDoorNumber}
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
                        //required
                        value= {this.state.companyName}
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
                        //required
                        value= {this.state.companyRut}
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
                        //required
                        value= {this.state.companyDescription}
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
                        //required
                        value= {this.state.companyPhone}
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
                        //required
                        value= {this.state.companyFirstStreet}
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
                        //required
                        value= {this.state.companySecondStreet}
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
                        //required
                        value= {this.state.companyDoorNumber}
                        helperText={this.state.companyDoorNumberError}
                        error={this.state.companyDoorNumberError ? true : false}
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    {/* <Select 
                        content={this.props.companyTypes}
                        onChange={this.onSelectTypeChange}
                        selectError={this.state.companyTypeError}
                        label={'Tipo de empresa'}
                        helper={'Seleccione el tipo de empresa'}
                        //selectedValue= {this.state.datos.companyType}
                    /> */}
                    <Select 
                        content={this.state.categories}
                        onChange={this.onSelectCategoryChange}
                        selectError={this.state.companyCategoryError}
                        label={'Rubro de la empresa'}
                        helper={'Seleccione el rubro de la empresa'}
                        selectedValue = {this.state.companyCategory}
                    />
                    <UploadImage onImageUpload={this.onImageUpload} />

                    <Button onClick={this.handleToggle} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={this.onSubmit} color="primary" variant='contained'>
                        Aceptar
                    </Button>

            </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(Profile);