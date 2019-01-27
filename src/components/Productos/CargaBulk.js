import React, { Component } from 'react';
import 'typeface-roboto';
import Input from '@material-ui/core/Input';
import ReadXlsxFile from 'read-excel-file';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SelectMultiple from '../Helpers/SelectMultiple';
import UploadImage from '../Helpers/UploadImage';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/AddBox';
import Validator from 'validator';

export default class ProductForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            companyId:0,
            products:[],
        };
    }

    async componentWillMount() {
        this.getInfo();
    }

    async componentWillReceiveProps(){
        this.getInfo();
    }

    getInfo = async () => {
        let {companyId} = this.props; 
        this.setState({companyId});
    }

    handleToggle = () => {
        this.setState({
          open: !this.state.open,
          //companyId:0,
          products:[],
        });
    }

    onSubmit = (event)=> {
        event.preventDefault();
    
        console.log(this.state);

            const request = new FormData();
      
            request.set('products', this.state.products);
            request.set('companyId', this.state.companyId);
            this.props.onClick(request);
            this.handleToggle();
    }
    
    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    input = (input) =>{
        ReadXlsxFile(input.target.files[0]).then((rows) =>{
            let cabe = rows[0];
            let json = "[";
            for (let fila = 1; fila < rows.length; fila++) {
                let row = rows[fila];
                json += "{";
                    for (let columna = 0; columna < cabe.length; columna++) {
                        json += "\"" + cabe[columna] + "\"" + ":";
                        json += "\"" + row[columna] + "\"" + ","                                                 
                    }
                json = json.substr(0, json.length-1) +  "},";
            }
            json = json.substr(0, json.length-1) + "]";
            this.setState({products:json});
            console.log(this.state);
        });
    }

    render(){
        return(
            <div>
            <ListItem button  onClick={this.handleToggle}>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary='Carga bulk' />
            </ListItem>
            <Dialog
                open={this.state.open}
                onClose={this.handleToggle}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Carga en bulk</DialogTitle>
                <DialogContent>
                    
                    <Input 
                          helper = {'Seleccione archivo excel'}
                          type='file' 
                          id='input' 
                          onChange={this.input}

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