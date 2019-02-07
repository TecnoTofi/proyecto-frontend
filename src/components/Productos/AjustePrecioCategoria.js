import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from '../Helpers/SelectForm';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing.unit * 3,
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
    margen: {
        margin: theme.spacing.unit,
    }
});

class AjustePrecioCategoria extends React.Component {

    state = {
        open: false,
        difference: 0,
        category: 0,
        type: '',
        aumento: true,
        differenceError: '',
        categoryError: '',
        typeError: '',
        types: [{id: 1, name: 'Valor'}, {id: 2, name: 'Porcentaje'}],
        aumentoString: 'true'
    }

    handleClickOpen = () => {
        this.setState({ open: true});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onChange = (e) => {
        this.setState({[e.target.name]: Number(e.target.value)});
    }

    onSelectCategoryChange = (c) => {
        this.setState({category: Number(c)});
    }

    onSelectTypeChange = (t) => {
        let type = '';
        if(t === 1) type = 'valor'
        else type = 'porcentaje'
        this.setState({ type });
    }

    handlePickerChange = event => {
        let aumento = true;
        if(event.target.value === "true") aumento = true;
        else aumento = false;
        this.setState({ aumento, aumentoString: event.target.value });
      };

    validate = () => {
        let isError = false;
        const errors = {
            categoryError: '',
            typeError: '',
            differenceError: '',
        };

        if(!this.state.category){
            isError = true;
            errors.categoryError = 'Debe seleccionar una categoria';
        }

        if(!this.state.type){
            isError = true;
            errors.typeError = 'Debe seleccionar un tipo';
        }

        if(!this.state.difference){
            isError = true;
            errors.differenceError = 'Debe ingresar un valor';
        }
        else if(isNaN(this.state.difference)){
            isError = true;
            errors.differenceError = 'Debe ingresar unicamente numeros';
        }
        else if(this.state.difference <= 0 || this.state.difference > 999999){
            isError = true;
            errors.differenceError = 'Valor fuera de rango';
        }
        else if(this.state.type === 'porcentaje' && this.state.difference > 99){
            isError = true;
            errors.differenceError = 'Valor no puede ser mayor a 99 con tipo porcentaje';
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const error = this.validate();

        if(!error){
            let request = {
                difference: this.state.difference,
                type: this.state.type,
                aumento: this.state.aumento
            };

            let status = await this.props.ajustarPrecioCategoria(this.state.category, request);
            if(status === 200) this.handleClose();
        }
    }

    render(){
        let { classes } = this.props;
        return(
            <div>
                <Button onClick={this.handleClickOpen} variant='contained' color='primary' className={classes.margen}>
                    Ajustar precios
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Ajuste de precios por categoria"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Seleccione la categoria a ajustar, elija el tipo de ajuste e ingrese el valor o porcentaje del ajuste.
                        </DialogContentText>
                        <Select 
                            content={this.props.categories}
                            onChange={this.onSelectCategoryChange}
                            selectError={this.state.categoryError}
                            label={'Categoria de productos'}
                            helper={'Seleccione la categoria de los productos'}
                        />
                        <Select 
                            content={this.state.types}
                            onChange={this.onSelectTypeChange}
                            selectError={this.state.typeError}
                            label={'Tipo de ajuste'}
                            helper={'Seleccione el tipo de ajuste'}
                        />
                        <RadioGroup
                            aria-label="Aumento"
                            name="aumento"
                            className={classes.group}
                            value={this.state.aumentoString}
                            onChange={this.handlePickerChange}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Aumentar" />
                            <FormControlLabel value="false" control={<Radio />} label="Reducir" />
                        </RadioGroup>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="difference"
                            name="difference"
                            label="Valor"
                            type="number"
                            onChange={this.onChange}
                            helperText={this.state.differenceError}
                            error={this.state.differenceError ? true : false}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="default" variant="contained" autoFocus>
                            Cancelar
                        </Button>
                        <Button onClick={this.onSubmit} color="primary"  variant="contained">
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AjustePrecioCategoria.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AjustePrecioCategoria);