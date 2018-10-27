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
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Company company={company} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : 'No hay empresas registradas aun' }
            </div>
        );
    }

    // render(){
    //     const companies = this.props.companies.map((company) =>{
    //       return(
    //               <div className="card" key={company.id}>
    //                   <div className="card-header">
    //                   <h3>{company.name}</h3>
    //                   </div>
    //                   <div className="card-body">
    //                   <p>{company.rut}-{company.phone}-{company.categoryId}</p>
    //                   </div>
    //               </div>
    //       )
    //     });
    //     return(
    //         <div ref="listadoEmpresa" >
    //             <h1>Lista de empresas</h1>
    //             <br />
    //             <div className="container">
    //              <div className="row">
    //              {companies}
    //              </div>   
    //             </div>  
    //         </div>
    //     );
    // }
}

export default CompanyList;