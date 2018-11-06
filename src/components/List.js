import React, { Component } from 'react';
import 'typeface-roboto';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Item from './Item';
import SelectMultiple from './SelectMultiple';

class List extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchName: '',
            selectedCategory: []
        }
    }

    onSearchNameChange = (e) => {
        this.setState({
            searchName: e.target.value
        });
    };

    handleSelectMultipleChange = (seleccionados) => {
        let selectedCategory = seleccionados.map(selected => {
            return selected.id;
        })
        this.setState({selectedCategory: selectedCategory});
    }

    render(){
        let filteredList = this.props.listado.filter((item) => {
            return item.name.indexOf(this.state.searchName) !== -1;
        });

        if(this.state.selectedCategory.length > 0){
            filteredList = filteredList.filter(item => {
                let res = this.state.selectedCategory.includes(Number(item.categoryId));
                return res;
            });
        }   

        return(
            <div>
                {filteredList ? (
                    <div>
                        <TextField
                            margin='dense'
                            name='searchName'
                            placeholder='Nombre empresa'
                            onChange={this.onSearchNameChange}
                        />
                        <SelectMultiple
                            flagType={this.props.flag}
                            content={this.props.tipos}
                            onChange={this.handleSelectMultipleChange}
                        />
                        <Grid container spacing={24} style={{padding: 24}}>
                            {filteredList.map(item => (
                                <Grid item key={item.id} xs={12} sm={6} lg={4} xl={3}>
                                    <Item item={item} flag={this.props.flag} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : 'No hay empresas registradas aun' }
            </div>
        );
    }
}

export default List;