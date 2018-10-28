import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Company from './Company';

class CompanyList extends Component{

    constructor(props){
        super(props);

        this.onSearchNameChange = this.onSearchNameChange.bind(this);
    }

    onSearchNameChange(e){

    }

    render(){
        return(
            <div>
                {this.props.companies ? (
                    <div>
                        <TextField
                            name='searchName'
                            placeholder='Nombre empresa'
                            onChange={this.onSearchNameChange}
                        />
                        <Grid container spacing={24} style={{padding: 24}}>
                            {this.props.companies.map(company => (
                                <Grid item key={company.id} xs={12} sm={6} lg={4} xl={3}>
                                    <Company company={company} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : 'No hay empresas registradas aun' }
            </div>
        );
    }
}

export default CompanyList;