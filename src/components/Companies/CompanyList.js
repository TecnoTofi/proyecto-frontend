import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Item from './CompanyItem';
import SelectMultiple from '../Helpers/SelectMultiple';
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
            tipos: [],
            searchName: '',
            selectedCategory: [],
            selectedType: [],
            textoCarga: 'Cargando compañias...'
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
        
        // let listado = [];
        // if(!this.props.company && this.props.company !== 0){
            // console.log('companyId', this.props.company);
        let listado = await this.props.getContent();
        // }
        // else
        //     listado = await this.props.getContent();
        let categorias = await this.props.getCategories();
        // let tipos = [];
        // if(this.props.flag === 'companias')
        let tipos = await this.props.getTipos();

        let textoCarga = '';
        if(listado.length === 0) textoCarga = 'Esta compañia aun no tiene productos a la venta.';

        await this.setState({
            listado: listado,
            categorias: categorias,
            tipos: tipos,
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
                return this.state.selectedCategory.includes(item.rubroId);
            });
        }

        if(this.state.selectedType.length > 0){
            filteredList = filteredList.filter(item => {
                return this.state.selectedType.includes(item.typeId);
            })
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
                                    placeholder='Nombre empresa'
                                    onChange={this.onSearchNameChange}
                                />
                                <SelectMultiple
                                    flagType={this.props.flag}
                                    flagForm={false}
                                    content={this.state.categorias}
                                    onChange={this.handleSelectCategories}
                                />
                                {this.props.flag === 'companias' ? (
                                    <SelectMultiple
                                        flagType={this.props.flag}
                                        titulo='Tipo/s'
                                        flagForm={false}
                                        content={this.state.tipos}
                                        onChange={this.handleSelectTypes}
                                    />
                                ) : null}
                            </div>
                            <Grid container spacing={24} style={{padding: 24}}>
                                {filteredList.map(item => (
                                    <Grid item key={item.id} xs={12} sm={6} lg={4} xl={3}>
                                        <Item item={item} flag={this.props.flag} onCompanyClick={this.props.onCompanyClick} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Fragment>
                    ) : `No hay ${this.props.flag} registradas aun` 
                )}
            </Fragment>
        );
    }
}

List.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(List);