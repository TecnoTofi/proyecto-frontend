import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Item from './Item';

class List extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchName: ''
        }
    }

    onSearchNameChange = (e) => {
        this.setState({
            searchName: e.target.value
        });
    };

    render(){
        let filteredList = this.props.listado.filter((item) => {
            return item.name.indexOf(this.state.searchName) !== -1;
        });
        return(
            <div>
                {filteredList ? (
                    <div>
                        <TextField
                            name='searchName'
                            placeholder='Nombre empresa'
                            onChange={this.onSearchNameChange}
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