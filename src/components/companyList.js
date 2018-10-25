import React, { Component } from 'react';
import '../App.css';

class CompanyList extends Component{

    render(){
        const companies = this.props.companies.map((company) =>{
          return(
                  <div className="card" key={company.id}>
                      <div className="card-header">
                      <h3>{company.name}</h3>
                      </div>
                      <div className="card-body">
                      <p>{company.rut}-{company.phone}-{company.categoryId}</p>
                      </div>
                  </div>
          )
        });
        return(
            <div ref="listadoEmpresa" >
                <h1>Lista de empresas</h1>
                <br />
                <div className="container">
                 <div className="row">
                 {companies}
                 </div>   
                </div>  
            </div>
        );
    }
}

export default CompanyList;