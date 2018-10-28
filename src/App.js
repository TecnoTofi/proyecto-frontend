import React, { Component, Fragment } from 'react';
import './App.css';
import { Header, Footer } from './components/layouts/';
import NavBar from './components/NavBar';
import RegisterForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import CompanyList from './components/CompanyList';
import ProductForm from './components/ProductForm';
import CompanyProductForm from './components/CompanyProductForm';

import Prueba from './components/prueba';

//Incluimos modulo para manejo de cookie
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ipServidor = 'localhost';
const port = 3000;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      companyTypes: [],
      userTypes: [],
      companies:[],
      productCategory:[],
      products:[]
    }

    this.registroUsuarioEmpresa = this.registroUsuarioEmpresa.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    fetch(`http://${ipServidor}:${port}/api/company/category`)
      .then(res => {
        res.json()
          .then(data => {
            // console.log(`Info de CompanyCategory obtenida : ${data}`);
            this.setState({companyTypes: data});
          })
          .catch(err => {
            console.log(`Error al buscar CompanyCategory : ${err}`);
          });
      });

      fetch(`http://${ipServidor}:${port}/api/user/role/signup`)
      .then(res => {
        res.json()
          .then(data => {
            // console.log(`Info de Role obtenida : ${data}`);
            this.setState({userTypes: data});
          })
          .catch(err => {
            console.log(`Error al buscar Role : ${err}`);
          });
      });
      fetch(`http://${ipServidor}:${port}/api/company`)
      .then(res => {
        res.json()
          .then(data => {
            // console.log(`Info de Company obtenida : ${data}`);
            this.setState({companies: data});
          })
          .catch(err => {
            console.log(`Error al buscar Company : ${err}`);
          });
      });

      fetch(`http://${ipServidor}:${port}/api/product`)
      .then(res => {
        res.json()
          .then(data => {
            // console.log(`Info de Product obtenida : ${data}`);
            this.setState({products: data});
          })
          .catch(err => {
            console.log(`Error al buscar Product : ${err}`);
          });
      });

      fetch(`http://${ipServidor}:${port}/api/product/category`)
      .then(res => {
        res.json()
          .then(data => {
            // console.log(`Info de ProductCategory obtenida : ${data}`);
            this.setState({productCategory: data});
          })
          .catch(err => {
            console.log(`Error al buscar ProductCategory : ${err}`);
          });
      });
  }

  registroUsuarioEmpresa(signupdata){

    const userData = {
      userName: signupdata.userName,
      userEmail: signupdata.userEmail,
      userPassword: signupdata.userPassword,
      userDocument: signupdata.userDocument,
      userPhone: signupdata.userPhone,
      userFirstStreet: signupdata.userFirstStreet,
      userSecondStreet: signupdata.userSecondStreet,
      userDoorNumber: signupdata.userDoorNumber,
      role: signupdata.role
    };
    const companyData = {
      companyName: signupdata.companyName,
      companyRut: signupdata.companyRut,
      companyPhone: signupdata.companyPhone,
      companyFirstStreet: signupdata.companyFirstStreet,
      companySecondStreet: signupdata.companySecondStreet,
      companyDoorNumber: signupdata.companyDoorNumber,
      category: signupdata.category
    };  

    let request = new Request(`http://${ipServidor}:${port}/api/auth/signup`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify({userData, companyData})
    });

    fetch(request)
      .then((res) => {
        res.json()
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(`Error al enviar registro de usuario : ${err}`);
          });
      });
  }

  login(userEmail, userPassword){
    let request = new Request(`http://${ipServidor}:${port}/api/auth/login`, {
      method: 'POST',
      headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json'}),
      credentials: 'same-origin',
      body: JSON.stringify({userEmail, userPassword})
    });

    fetch(request)
      .then((res) => {
        res.json()
          .then(data => {
            cookies.set('access_token', data.token, { path: '/' });
            console.log(data);
          })
          .catch(err => {
            console.log(`Error al enviar inicio de sesion : ${err}`);
          });
      });
  }

  registroProducto(productdata){
    let request = new Request(`http://${ipServidor}:${port}/api/product`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(productdata)
    });

    fetch(request)
      .then((res) => {
        res.json()
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(`Error enviar registro de producto : ${err}`);
          });
      });
  }

  registroEmpresaProducto(productdata){
    let request = new Request(`http://${ipServidor}:${port}/api/product/company`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(productdata)
    });

    fetch(request)
      .then((res) => {
        res.json()
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(`Error al enviar registro de productoEmpresa : ${err}`);
          });
      });
  }

  render() {
    return (
      <Fragment>
      {/* <Prueba /> */}
        <Header 
          login={this.login} 
          signup={this.registroUsuarioEmpresa} 
          companyTypes={this.state.companyTypes} 
          userTypes={this.state.userTypes}
        />
        <div>
          <div>
            {/* <RegisterForm companyTypes={this.state.companyTypes} userTypes={this.state.userTypes} onClick={this.registroUsuarioEmpresa}/> */}
          </div>  
          <div>
            {/* <LoginForm onClick={this.login} /> */}
          </div>
          <div>
          {/* <CompanyList companies={this.state.companies} /> */}
          </div>
          <div>
            {/* <ProductForm categories={this.state.productCategory} onClick={this.registroProducto}/> */}
          </div>
          <br />
          <div>
            {/* <CompanyProductForm products={this.state.products} companies={this.state.companies} onClick={this.registroEmpresaProducto} /> */}
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default App;