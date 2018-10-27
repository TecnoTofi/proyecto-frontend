import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import RegisterForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import CompanyList from './components/CompanyList';
import ProductForm from './components/ProductForm';
import CompanyProductForm from './components/CompanyProductForm';
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
            console.log(`Info de CompanyCategory obtenida : ${data}`);
            this.setState({companyTypes: data});
          })
          .catch(err => {
            console.log(`Error al buscar CompanyCategory : ${err}`);
          });
      });

      fetch(`http://${ipServidor}:${port}/api/user/role`)
      .then(res => {
        res.json()
          .then(data => {
            console.log(`Info de Role obtenida : ${data}`);
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
            console.log(`Info de Company obtenida : ${data}`);
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
            console.log(`Info de Product obtenida : ${data}`);
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
            console.log(`Info de ProductCategory obtenida : ${data}`);
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

  login(loginData){
    let request = new Request(`http://${ipServidor}:${port}/api/auth/login`, {
      method: 'POST',
      headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json'}),
      credentials: 'same-origin',
      body: JSON.stringify(loginData)
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
      <div className="App">
      <NavBar />
       {/* <navigator className="Nav">
        <a href="">Login |</a>
        <a href="">Registro |</a>
        <a href="">Listado de empresas</a>
       </navigator> */}
       <div className="ContenedorApp">
        <div className="RegistroApp">
         {/* <RegisterForm companyTypes={this.state.companyTypes} userTypes={this.state.userTypes} onClick={this.registroUsuarioEmpresa}/> */}
        </div>  
        <div className="LoginApp">
         <LoginForm onClick={this.login} />
        </div>
        <div className="ListadoApp">
         {/* <CompanyList companies={this.state.companies} /> */}
        </div>
        <div className="RegistroProduct">
         {/* <ProductForm categories={this.state.productCategory} onClick={this.registroProducto}/> */}
        </div>
        <br />
        <br />
        <div className="RegistroCompanyProduct">
         {/* <CompanyProductForm products={this.state.products} companies={this.state.companies} onClick={this.registroEmpresaProducto} /> */}
        </div>
       </div>
      </div>
    );
  }
}

export default App;
