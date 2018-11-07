import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import { Header, Footer } from './components/layouts/';
import List from './components/List';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Carrito from './components/Cart/Cart';
//Incluimos modulo para manejo de cookie
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ipServidor = 'localhost';
const port = 3000;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      logged: false,
      loggedUser: {
        userType: '',
        userName: '',
        userEmail: '',
        userId: 0,
        userCompanyName: '',
        userCompanyId: 0
      },
      companyTypes: [],
      companyCategories: [],
      userTypes: [],
      companies:[],
      productCategory:[],
      products:[]
    }
  }

  componentDidMount(){

    let token = cookies.get('access_token');
    if(token){
      let requestAuth = new Request(`http://${ipServidor}:${port}/api/auth`, {
        method: 'POST',
        headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
        credentials: 'same-origin',
        body: JSON.stringify({message: 'AuthToken'})
      })
      
      fetch(requestAuth)
        .then(res => {
          res.json()
            .then(data => {
              if(res.status === 200){
                cookies.set('access_token', data.token, { path: '/' });
            
                this.setState({
                  logged: true,
                  loggedUser: {
                    userType: data.userData.userType,
                    userName: data.userData.userName,
                    userEmail: data.userData.userEmail,
                    userId: data.userData.userId,
                    userCompanyName: data.userData.userCompanyName,
                    userCompanyId: data.userData.userCompanyId
                  }
                });
              }
              
              // console.log(data);
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        });
    }
  
    fetch(`http://${ipServidor}:${port}/api/company/type`)
      .then(res => {
        res.json()
          .then(data => {
            // console.log(`Info de CompanyCategory obtenida : ${data}`);
            this.setState({companyTypes: data});
          })
          .catch(err => {
            console.log(`Error al buscar CompanyType : ${err}`);
          });
      });

      fetch(`http://${ipServidor}:${port}/api/company/category`)
      .then(res => {
        res.json()
          .then(data => {
            // console.log(`Info de CompanyCategory obtenida : ${data}`);
            this.setState({companyCategories: data});
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
            let companias = data.map(comp => {
              comp.imagePath = `http://${ipServidor}:${port}/${comp.imagePath}`;
              return comp;
            })
            this.setState({companies: companias});
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
            let productos = data.map(prod => {
              prod.imagePath = `http://${ipServidor}:${port}/${prod.imagePath}`;
              return prod;
            })
            this.setState({products: productos});
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

  registroUsuarioEmpresa = (signupdata) => {
    console.log(signupdata);

    const request = new FormData();
    //user
    request.set('userName', signupdata.userName);
    request.set('userEmail', signupdata.userEmail);
    request.set('userPassword', signupdata.userPassword);
    request.set('userDocument', signupdata.userDocument);
    request.set('userPhone', signupdata.userPhone);
    request.set('userFirstStreet', signupdata.userFirstStreet);
    request.set('userSecondStreet', signupdata.userSecondStreet);
    request.set('userDoorNumber', signupdata.userDoorNumber);
    request.set('role', signupdata.role);
    //company
    request.set('companyName', signupdata.companyName);
    request.set('companyRut', signupdata.companyRut);
    request.set('companyPhone', signupdata.companyPhone);
    request.set('companyFirstStreet', signupdata.companyFirstStreet);
    request.set('companySecondStreet', signupdata.companySecondStreet);
    request.set('companyDoorNumber', signupdata.companyDoorNumber);
    request.set('companyType', signupdata.companyType);
    request.set('companyCategory', signupdata.companyCategory);
    request.set('companyDescription', signupdata.companyDescription);

    //image
    request.append('companyImage', signupdata.companyImage, signupdata.companyImage.name);

    axios.post(`http://${ipServidor}:${port}/api/auth/signup`, request)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    // let request = new Request(`http://${ipServidor}:${port}/api/auth/signup`, {
    //   method: 'POST',
    //   headers: new Headers({ 'Content-Type': 'application/json'}),
    //   body: JSON.stringify({userData, companyData})
    // });

    // fetch(request)
    //   .then((res) => {
    //     res.json()
    //       .then(data => {
    //         console.log(data);
    //       })
    //       .catch(err => {
    //         console.log(`Error al enviar registro de usuario : ${err}`);
    //       });
    //   });
  }

  login = (userEmail, userPassword) => {
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
            if(res.status === 200){
              cookies.set('access_token', data.token, { path: '/' });
            
              this.setState({
                logged: true,
                loggedUser: {
                  userType: data.userData.userType,
                  userName: data.userData.userName,
                  userEmail: data.userData.userEmail,
                  userId: data.userData.userId,
                  userCompanyName: data.userData.userCompanyName,
                  userCompanyId: data.userData.userCompanyId
                }
              });
            }
            else{
              console.log(data.message);
            }
          })
          .catch(err => {
            console.log(`Error al enviar inicio de sesion : ${err}`);
          });
      });
  }

  logout = () => {
    let request = new Request(`http://${ipServidor}:${port}/api/auth/logout`, {
      method: 'POST',
      headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json'}),
      credentials: 'same-origin'
    });

    fetch(request)
      .then((res) => {
        res.json()
          .then(data => {
            
            this.setState({
              logged: false,
              loggedUser: {
                userType: '',
                userName: '',
                userEmail: '',
                userId: 0,
                userCompanyName: '',
                userCompanyId: 0
              }
            });
            cookies.remove('access_token', { path: '/' })
            console.log(data);
          })
          .catch(err => {
            console.log(`Error al enviar cierre de sesion : ${err}`);
          });
      });
  }

  registroProducto = (productData) => {

    let token = cookies.get('access_token');
    if(token){

      const request = new FormData();
      
      request.set('name', productData.productName);
      request.set('code', productData.productCode);
      request.set('categories', productData.categories);
      
      request.append('image', productData.productImage, productData.productImage.name);
      console.log(productData.productImage);
      let instance = axios.create({
                        baseURL: `http://${ipServidor}:${port}/api/product`,
                        method: 'post',
                        headers: {token: token},
                        data: request
                      });
      instance()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      
      // productName: '',
      // productCode: '',
      // category: [],
      // productImage: null,

      // let requestBody = {
      //   productName: productData.productName,
      //   productCode: productData.productCode,
      //   category: productData.category
      // }

      // let request = new Request(`http://${ipServidor}:${port}/api/product`, {
      //   method: 'POST',
      //   headers: new Headers({ 'Content-Type': 'application/json', token: token}),
      //   body: JSON.stringify(requestBody)
      // });
  
      // fetch(request)
      //   .then((res) => {
      //     res.json()
      //       .then(data => {
      //         console.log(data);
      //       })
      //       .catch(err => {
      //         console.log(`Error enviar registro de producto : ${err}`);
      //       });
      //   });
    }
    else{
      console.log('No hay token');
    }
  }

  asociarProducto = (productData) => {

    let token = cookies.get('access_token');
    if(token){

      let requestBody = {
        companyId: this.state.loggedUser.userCompanyId,
        productId: productData.productId,
        productName: productData.productName,
        productDescription: productData.productDescription,
        productPrice: productData.productPrice,
        productStock: productData.productStock,
      }

      let request = new Request(`http://${ipServidor}:${port}/api/product/company`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json', token: token}),
        body: JSON.stringify(requestBody)
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
    else{
      console.log('No hay token')
    }
  }

  mostrarCompanias = () => {
    return <List
      listado={this.state.companies}
      flag='companias'
      tipos={this.state.companyCategories}
    />;
  }

  mostrarProductos = () => {
    return <List 
    listado={this.state.products}
    flag='productos'
    tipos={this.state.productCategory}
    />;
  }

  mostrarPerfil = () => {
    return <Profile />
  }

  mostrarCarrito = () => {
    let datosTest =[
      {
        id: 1,
        name: 'Jugo Citrus Frute x 20 unidades',
        price: 300,
        company: 'Salus',
        quantity: 1,
        priceEnvio: 150
      },
      {
        id: 2,
        name: 'Coca Cola 2.l x 10 unidades',
        price: 500,
        company: 'Coca cola',
        quantity: 2,
        priceEnvio: 120
      },
      {
        id: 3,
        name: 'Yogurt Biotop - Frutilla x 10 unidades',
        price: 350,
        company: 'Conaprole',
        quantity: 1,
        priceEnvio: 100
      },
      {
        id: 4,
        name: 'Dulce de leche 500g x 10 unidades',
        price: 600,
        company: 'Conaprole',
        quantity: 3,
        priceEnvio: 100
      }
    ];
    return <Carrito datosTest={datosTest} />
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header 
            logged={this.state.logged}
            loggedUser={this.state.loggedUser}
            login={this.login}
            logout={this.logout}
            signup={this.registroUsuarioEmpresa}
            companyTypes={this.state.companyTypes}
            companyCategories={this.state.companyCategories}
            userTypes={this.state.userTypes}
            categories={this.state.productCategory}
            registrarProducto={this.registroProducto}
            products={this.state.products}
            companies={this.state.companies}
            registroEmpresaProducto={this.asociarProducto}
          />
          <Switch>
            <Route path='/' component={Dashboard} exact />
            <Route path='/companies' component={this.mostrarCompanias} />
            <Route path='/products' component={this.mostrarProductos} />
            <Route path='/profile' component={this.mostrarPerfil} />
            <Route path='/carrito' component={this.mostrarCarrito} />
          </Switch>
          <Footer />
        </Fragment>
      </BrowserRouter>
      // <Fragment>
        // <Header 
        //   logged={this.state.logged}
        //   loggedUser={this.state.loggedUser}
        //   login={this.login}
        //   logout={this.logout}
        //   signup={this.registroUsuarioEmpresa}
        //   companyTypes={this.state.companyTypes}
        //   userTypes={this.state.userTypes}
        //   categories={this.state.productCategory}
        //   registrarProducto={this.registroProducto}
        //   products={this.state.products}
        //   companies={this.state.companies}
        //   registroEmpresaProducto={this.registroEmpresaProducto}
        // />
      //   <div>
      //     <div>
      //     {this.state.logged ? (
      //       <List listado={this.state.companies} flag='companias'/>
      //     ) : null}
      //     </div>
      //   </div>
      //   <Footer />
      // </Fragment>
    );
  }
}

export default App;