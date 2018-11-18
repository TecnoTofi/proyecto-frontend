import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Item from './ProductItem';
import SelectMultiple from './SelectMultiple';

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
      }
});

class List extends Component{

    // constructor(props){
    //     super(props);
        state = {
            listado: [],
            categorias: [],
            searchName: '',
            selectedCategory: [],
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
            let listado = await this.props.getContent(this.props.company);
        // }
        // else
        //     listado = await this.props.getContent();
        let categorias = await this.props.getCategories();
        
        await this.setState({
            listado: listado,
            categorias: categorias
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
                if(this.props.flag === 'productos'){
                    let i = 0;
                    let counter = 0;
                    while(i<item.categories.length){
                        if(this.state.selectedCategory.includes(item.categories[i].id)){
                            counter++;
                        }
                        i++;
                    }
                    if(counter > 0) res = true;
                    else res = false;
                }
                else{
                    res = this.state.selectedCategory.includes(Number(item.categoryId));
                }
                return res;
            });
        }

        return(
            <Fragment>
                {filteredList ? (
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
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Fragment>
                ) : `No hay ${this.props.flag} registradas aun` }
            </Fragment>
        );
    }
}

List.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(List);