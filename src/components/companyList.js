import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Company from './Company';

class CompanyList extends Component{

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
        let filteredCompanies = this.props.companies.filter((comp) => {
            return comp.name.indexOf(this.state.searchName) !== -1;
        });
        return(
            <div>
                {filteredCompanies ? (
                    <div>
                        <TextField
                            name='searchName'
                            placeholder='Nombre empresa'
                            onChange={this.onSearchNameChange}
                        />
                        <Grid container spacing={24} style={{padding: 24}}>
                            {filteredCompanies.map(company => (
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