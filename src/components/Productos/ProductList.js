import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SelectMultiple from '../Helpers/SelectMultiple';
import Grid from '@material-ui/core/Grid';
import Item from './ProductItem';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        marginTop: theme.spacing.unit * 2
    },
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
});

class List extends Component{

    // constructor(props){
    //     super(props);
        state = {
            listado: [],
            categorias: [],
            searchName: '',
            selectedCategory: [],
            textoCarga: 'Cargando productos...'
        }
    // }

    async componentWillMount(){
        // console.log('companyId, mount', this.props);
        this.getInfo();
    }

    async componentWillReceiveProps(){
        // console.log('recibe', this.props);
        // console.log('flag', this.props.flag)
        this.getInfo();
    }

    async getInfo(){
        let productos = await this.props.getProductos(this.props.company);
        let paquetes = await this.props.getPaquetes(this.props.company);
        let categorias = await this.props.getCategories();
        
        let listado = [];
        if(productos && paquetes) listado = productos.concat(paquetes);
        else if(productos && !paquetes) listado = productos;
        else if(!productos && paquetes) listado = paquetes;
        else listado = [];

        let textoCarga = '';
        if(listado.length === 0) textoCarga = 'Esta compañia aun no tiene productos a la venta.';
        
        await this.setState({
            listado: listado,
            categorias: categorias,
            textoCarga
        });
    }

    onSearchNameChange = (e) => {
        this.setState({
            searchName: e.target.value
        });
    };

    handleSelectCategories = (seleccionados) => {
        let selectedCategory = seleccionados.map(selected => {
            return selected.id;
        })
        this.setState({selectedCategory: selectedCategory});
    }

    handleSelectTypes = (seleccionados) => {
        let selectedType = seleccionados.map(selected => {
            return selected.id;
        })
        this.setState({selectedType: selectedType});
    }

    render(){
        const { classes } = this.props;

        let filteredList = this.state.listado.filter((item) => {
            return item.name.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1;
        });

        if(this.state.selectedCategory.length > 0){
            filteredList = filteredList.filter(item => {
                let res = false;
                let i = 0;
                let counter = 0;
                while(i<item.categories.length){
                    if(this.state.selectedCategory.includes(item.categories[i].id)){
                        counter++;
                    }
                    i++;
                }
                if(counter > 0) res = true;
                return res;
            });
        }

        return(
            <Fragment>
                {this.state.listado.length === 0 ? (
                    <Typography variant='h6' className={classes.texto}>
                        {this.state.textoCarga}
                        {/* cambiar esto por una loading animation */}
                    </Typography>
                ) : (
                    filteredList ? (
                        <Fragment>
                            <div className={classes.container}>
                                <TextField
                                    // margin='dense'
                                    className={classes.textField}
                                    name='searchName'
                                    placeholder='Nombre producto'
                                    onChange={this.onSearchNameChange}
                                />
                                <SelectMultiple
                                    flagType='productos'
                                    flagForm={false}
                                    content={this.state.categorias}
                                    onChange={this.handleSelectCategories}
                                />
                            </div>
                            <Grid container spacing={24} style={{padding: 24}}>
                                {filteredList.map(item => (
                                    <Grid item key={item.id} xs={12} sm={6} lg={4} xl={3}>
                                        <Item
                                        item={item}
                                        flag={this.props.flag}
                                        onCompanyClick={this.props.onCompanyClick}
                                        flagCart={this.props.flagCart}
                                        agregarAlCarrito={this.props.agregarAlCarrito}
                                        cambiarVentana={this.props.cambiarVentana}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Fragment>
                    ) : `No hay productos que cumplan esos criterios` 
                )}
            </Fragment>
        );
    }
}

List.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(List);