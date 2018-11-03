import React, { Component } from 'react';
import 'typeface-roboto';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SelectType from './SelectForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/AddBox';


export default class ProductForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            productName: '',
            productCode: '',
            category: 0,
        };
    }

    handleToggle = () => {
        this.setState({
          open: !this.state.open
        });
      }

    onSelectChange = (tipo) => {
        this.setState({category: Number(tipo)});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (event)=> {
        event.preventDefault();

        this.props.onClick(this.state);
        this.handleToggle();
    }
    
    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    render(){
        return(
            <div>
            <ListItem button onClick={this.handleToggle}>
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary='Nuevo producto' />
            </ListItem>
            <Dialog
                open={this.state.open}
                onClose={this.handleToggle}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Nuevo producto</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='productName'
                        name='productName'
                        label='Nombre del producto'
                        type='text'
                        fullWidth
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <TextField
                        margin='dense'
                        id='productCode'
                        name='productCode'
                        label='Codigo del producto'
                        type='text'
                        fullWidth
                        onChange={this.onChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <SelectType
                            content={this.props.categories}
                            onChange={this.onSelectChange}
                            label={'Tipo de producto'}
                            helper={'Seleccione el tipo de producto'}
                        />
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