import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import { Header } from './components/layouts/';
import List from './components/List';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Carrito from './components/Cart/Cart';
import MisProductos from './components/MisProductos';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const url = 'http://localhost:3000';

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
      products:[],
      myProducts: [],
      cart: [],
      companiaSeleccionada: 0
    }
  }

  componentWillMount(){

    let token = cookies.get('access_token');

    if(token){
      	this.verificarToken(token);
    }
    else{
      this.getUserRolesSignup();
    }
  
    this.getCompanyTypes();
    this.getCompanyCategories();
    this.getAllCompanies();
    this.getAllProducts();
    this.getProductCategories();
  }

  verificarToken = (token) => {
    let requestAuth = new Request(`${url}/api/auth`, {
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
					}, () => this.getMisProductos()) //esto no tiene que ir aca!
				}
			})
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
  }

  getCompanyTypes = () => {
    fetch(`${url}/api/company/type`)
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
  }

  getCompanyCategories = () => {
    fetch(`${url}/api/company/category`)
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
  }

  getUserRolesSignup = () => {
    fetch(`${url}/api/user/role/signup`)
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
  }

  getAllCompanies = () => {
    fetch(`${url}/api/company`)
    .then(res => {
      res.json()
        .then(data => {
          let companias = data.map(comp => {
            comp.imagePath = `${url}/${comp.imagePath}`;
            return comp;
          })
          this.setState({companies: companias});
        })
        .catch(err => {
          console.log(`Error al buscar Company : ${err}`);
        });
    });
  }

  getAllProducts = () => {
    fetch(`${url}/api/product`)
      .then(res => {
        res.json()
          .then(data => {
            // console.log(`Info de Product obtenida : ${data}`);
            let productos = data.map(prod => {
              prod.imagePath = `${url}/${prod.imagePath}`;
              return prod;
            })
            this.setState({products: productos});
          })
          .catch(err => {
            console.log(`Error al buscar Product : ${err}`);
          });
      });
  }

  getProductCategories = () => {
    fetch(`${url}/api/product/category`)
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

  getMisProductos = async () => {
	  // console.log('llego');
	let token = cookies.get('access_token');
    if(token){
		let request = new Request(`${url}/api/product/company/${this.state.loggedUser.userCompanyId}`, {
			method: 'GET',
			headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
			credentials: 'same-origin'
			});		
			
		fetch(request)
			.then(response => response.json())
			.then(data => {
        // console.log(data);
        let productos = data.map(prod => {
          prod.imagePath = `${url}/${prod.imagePath}`;
          return prod;
        })
				this.setState({myProducts: productos}, () => {
          this.carcarCarrito();//esto se tiene que ir de aca
        });
			})
			.catch(err => console.log(err));
	}
}

  registroUsuarioEmpresa = (request) => {

    axios.post(`${url}/api/auth/signup`, request)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  login = (userEmail, userPassword) => {
    let request = new Request(`${url}/api/auth/login`, {
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
						...data.userData
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
    let request = new Request(`${url}/api/auth/logout`, {
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

  registroProducto = (request) => {

    let token = cookies.get('access_token');
    if(token){
    
      let instance = axios.create({
                        baseURL: `${url}/api/product`,
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
    }
    else{
      console.log('No hay token');
    }
  }

  asociarProducto = (body) => {

    let token = cookies.get('access_token');
    if(token){

      let request = new Request(`${url}/api/product/company`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json', token: token}),
        body: JSON.stringify(body)
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

  seleccionarCompany = (id) => {
    console.log('empresa clickeada: ', id);
  }

  mostrarCompanias = () => {
    return <List
      listado={this.state.companies}
      flag='companias'
      categories={this.state.companyCategories}
      tipos={this.state.companyTypes}
      onCompanyClick={this.seleccionarCompany}
    />;
  }

  mostrarProductos = () => {
    return <List 
      listado={this.state.products}
      flag='productos'
      categories={this.state.productCategory}
    />;
  }

  mostrarCompanyProducts = (id) => {
    //cambiar el this.state.products, debe obtener el listado por medio de un fetch
    let productos = this.state.products.filter(prod => {
      return prod.companyId === id;
    });

    return <List 
      listado-={productos}
      flag='productos'
      categories={this.state.productCategory}
      companiaSeleccionada={this.state.companiaSeleccionada}
    />
  }

  mostrarPerfil = () => {
    return <Profile />
  }
  
mostrarMisProductos = () => {
	return <MisProductos products={this.state.myProducts} />
  }

  carcarCarrito = () => {
    let datosTest = this.state.myProducts.map(prod => {
      prod.quantity = 1;
      prod.priceEnvio = 100;
      prod.envio = false;
      return prod;
    });
    this.setState({cart: datosTest});
  }

  borrarItemCarrito = (id) => {
    let carrito = this.state.cart.filter(item => {
      return item.id !== id;
    });
    this.setState({cart: carrito});
  }

  cartEnvioChange = (id, value) => {
    let productos = this.state.cart;
    let data = productos.map(prod => {
      if(prod.id === id) prod.envio = value;
      return prod;
    });
    this.setState({cart: data});
  }

  mostrarCarrito = () => {
    // id: 1, //de CompanyProduct
    // name: 'Jugo Citrus Frute x 20 unidades', //de CompanyProduct
    // price: 300, //de CompanyProduct
    // companyId: 1
    // company: 'Salus',
    // quantity: 1,
    // priceEnvio: 150
    // envio: false
    // let datosTest = await this.state.myProducts.map(prod => {
    //   prod.quantity = 1;
    //   prod.priceEnvio = 100
    //   return prod;
    // });
    // this.setState({cart: datosTest});
    return <Carrito 
      productos={this.state.cart} 
      onDelete={this.borrarItemCarrito} 
      cartEnvioChange={this.cartEnvioChange}
      />
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
            <Route path='/misProductos' component={this.mostrarMisProductos} />
            {/* <Route path='/company/products' component={this.mostrarCompanyProducts} /> */}
          </Switch>
          {/* <Footer /> */}
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;