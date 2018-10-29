import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SelectForm from './SelectForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class AssociateForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            companyId:0,
            productId:0,
            productName: '',
            productDescription: '',
            productPrice:0,
            productStock: 0,
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

    onSubmit = (event) => {
        event.preventDefault();

        this.props.onClick(this.state);
    }

    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }
    
    render(){
        return(
            <div>
            <Button color='inherit' onClick={this.handleToggle}>Asociar producto</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleToggle}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>Asociar producto</DialogTitle> 
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
                            margin='normal'
                            id='productDescription'
                            name='productDescription'
                            label='Descripcion del producto'
                            fullWidth
                            multiline
                            rowsMax="4"
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                        <SelectForm
                                content={this.props.products}
                                onChange={this.onSelectChange}
                                label={'Productos'}
                                helper={'Seleccione el producto'}
                        />
                        <TextField
                            margin='dense'
                            id='productPrice'
                            name='productPrice'
                            label='Precio'
                            type='text'
                            fullWidth
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                        <TextField
                            margin='dense'
                            id='productStock'
                            name='productStock'
                            label='Stock'
                            type='text'
                            fullWidth
                            onChange={this.onChange}
                            onKeyPress={this.onEnterPress}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color='primary'>
                            Cancelar
                        </Button>
                        <Button onClick={this.onSubmit} color='primary' variant='contained'>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}