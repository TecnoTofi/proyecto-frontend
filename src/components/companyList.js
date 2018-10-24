import React, { Component } from 'react';
// import '../App.css';

class CompanyList extends Component{

  //  constructor(props){
      //  super(props);
     //   this.state = {
     //   };

        //this.onChange = this.onChange.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
    //}
    
    render(){
        let companies = this.props.companies;
        return(
            <div ref="listadoEmpresa" >
                <h1>Lista de empresas</h1>
                <br />
                <div>
                    {companies.map(company => <div>{company.name}</div>)}
                </div>  
            </div>
        );
    }
}

export default CompanyList;