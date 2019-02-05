import React, { Component } from 'react';
import 'typeface-roboto';
import Input from '@material-ui/core/Input';
import ReadXlsxFile from 'read-excel-file';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
            companyId:0,
            products:[],
            columnas: ['name', 'code', 'description', 'stock', 'price', 'categories'],
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
          products:[],
        });
    }

    onSubmit = async (event)=> {
        event.preventDefault();

        if(this.state.products.length !== 0){
            const request = new FormData();

            request.set('products', this.state.products);
            request.set('companyId', this.state.companyId);
            let status = await this.props.onClick(request);
            if(status === 201) this.handleToggle();
        }
    }
    
    onEnterPress = (e) => {
        if(e.key === 'Enter') this.onSubmit(e);
    }

    input = (input) =>{
        ReadXlsxFile(input.target.files[0]).then((rows) =>{
            if(rows.length === 0){
                this.props.enqueueSnackbar('Archivo no cumple con los requisitos', { variant: 'error' });
            }
            else{
                let cabe = rows[0];
                if(cabe.length < 6){
                    this.props.enqueueSnackbar('Archivo no cumple con los requisitos', { variant: 'error' });
                }
                else if(cabe.length > 6){
                    this.props.enqueueSnackbar('Archivo no cumple con los requisitos', { variant: 'error' });
                }
                else{
                    let flag = false;
                    for(let c of cabe){
                        let indice = this.state.columnas.indexOf(c);
                        if(indice === -1) flag = true;
                    }

                    if(flag){
                        this.props.enqueueSnackbar('Archivo no cumple con los requisitos', { variant: 'error' });
                    }
                    else{
                        let json = "[";
                        for (let fila = 1; fila < rows.length; fila++) {
                            let row = rows[fila];
                            json += "{";
                                for (let columna = 0; columna < cabe.length; columna++) {
                                    json += "\"" + cabe[columna] + "\"" + ":";
                                    json += "\"" + row[columna] + "\"" + ",";                                    
                                }
                            json = json.substr(0, json.length-1) +  "},";
                        }
                        json = json.substr(0, json.length-1) + "]";
                        this.setState({ products: json });
                    }
                }
            }
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
                    <DialogContentText id="alert-dialog-description">
                        Formato de Excel: name | code | description | stock | price | categories
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Las categorias son numericas separadas por coma
                    </DialogContentText>
                    <DialogContent>
                        <Input
                            autoFocus
                            helper = 'Seleccione archivo excel'
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