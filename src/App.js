import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import { Header } from './components/Layouts/';
import CompanyList from './components/ListadoEmpresas/CompanyList';
import ProductList from './components/ListadoProductos/ProductList';
import axios from 'axios';
import Home from './components/PaginasPrincipales/Home';
import Dashboard from './components/PaginasPrincipales/Dashboard';
import Profile from './components/Profile/Profile';
import Carrito from './components/Cart/Cart';
import CartFunctions from './components/Cart/CartFunctions';
import MisProductos from './components/Productos/MisProductos';
import ProductForm from './components/Productos/ProductForm';
import HistorialCompras from './components/HistorialCompras/HistorialCompras';
import HistorialComprasFunctions from './components/HistorialCompras/HistorialComprasFunctions';
// import Snackbar from '@material-ui/core/Snackbar';
import Snackbar from './components/Helpers/Snackbar';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// const url = 'https://backend-ort.herokuapp.com';
const url = 'http://localhost:3000';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      shownWindow: 'home',
      snackbarStatus: false,
      snackbarMessage: '',
      snackbarVariant: '',
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
      productCategories:[],
      products:[],
      myProducts: [],
      cart: {
        contenido: [],
        subTotal: 0,
        subTotalEnvios: 0,
        total: 0
      },
      companiaSeleccionada: 0
    }
  }

  componentWillMount(){

    let token = cookies.get('access_token');

    if(token){
      	this.verificarToken(token);
    }
  }

  cambiarVentana = (ventana) => {
    this.setState({shownWindow: ventana});
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
					})
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

  getCompanyTypes = async () => {
    let tipos = await fetch(`${url}/api/company/type`)
                            .then(response => (
                              response.json()
                            ))
                            .then(data => {
                              // console.log('tipos empresa', data);
                              return data;
                              // this.setState({companyTypes: data});
                            })
                            .catch(err => console.log(err));
    return tipos;
  }

  getCompanyCategories = async () => {
    let categories = await fetch(`${url}/api/company/category`)
                            .then(response => (
                              response.json()
                            ))
                            .then(data => {
                              // console.log('categorias empresa', data);
                              return data;
                              // this.setState({companyCategories: data});
                            })
                            .catch(err => console.log(err));
    return categories;
  }

  getUserTypes = async () => {
    let userTypes = await fetch(`${url}/api/user/role/signup`)
                            .then(response => (
                              response.json()
                            ))
                            .then(data => {
                              // console.log('user Types', data);
                              return data;
                              // this.setState({userTypes: data});
                            })
                            .catch(err => console.log(err));
    return userTypes;
  }

  getAllCompanies = async () => {
    let companias = await fetch(`${url}/api/company`)
                            .then(response => (
                              response.json()
                            ))
                            .then(data => {
                              let companias = data.map(comp => {
                                comp.imageUrl = `${url}/${comp.imagePath}`;
                                return comp;
                              });
                              // console.log('companias', companias);
                              return companias;
                              // this.setState({companies: companias});
                            })
                            .catch(err => console.log(err));
    return companias;
  }

  getAllProducts = async () => {
    let productos = await fetch(`${url}/api/product`)
                              .then(response => (
                                response.json()
                              ))
                              .then(data => {
                                let response = data.map(prod => {
                                            prod.imageUrl = `${url}/${prod.imagePath}`;
                                            return prod;
                                          });
                                // console.log('productos', response);
                                return response;
                                // this.setState({products: response});
                              })
                              .catch(err => console.log(err));
    return productos;
  }

  getProductCategories = async () => {
    let categories = await fetch(`${url}/api/product/category`)
                              .then(response => (
                                response.json()
                              ))
                              .then(data => {
                                // console.log('categorias productos', data);
                                return data;
                                // this.setState({productCategories: data})
                              })
                              .catch(err => console.log(err));
    return categories;
  }

  getProductsByCompany = async (id) => {
    let productos = await fetch(`${url}/api/product/company/${id}`)
                                .then(response => (
                                  response.json()
                                ))
                                .then(data => {
                                  // console.log('data', data);
                                  let response = data.map(prod => {
                                              prod.imageUrl = `${url}/${prod.imagePath}`;
                                              return prod;
                                            });
                                  return response;
                                })
                                .catch(err => console.log(err));
      return productos;
  }

getCompanyById = async () => {
  let compania = await fetch(`${url}/api/company/${this.state.loggedUser.userCompanyId}`)
            .then(res => (
              res.json()
            ))
            .then(data => {
              return data;
            })
            .catch(err => console.log(`Error al buscar Company : ${err}`));
  return compania;
}

getUserById = async () => {
  let usuario = await fetch(`${url}/api/user/${this.state.loggedUser.userId}`)
            .then(res => (
              res.json()
            ))
            .then(data => {
              return data;
            })
            .catch(err => {
              console.log(`Error al buscar Usuario : ${err}`);
            });
  return usuario;
}

getMisPackage = async () => {
  let token = cookies.get('access_token');
    if(token){
    let request = new Request(`${url}/api/package/company/${this.state.loggedUser.userCompanyId}`, {
      method: 'GET',
      headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
      credentials: 'same-origin'
      });
      
      let packages = await fetch(request)
                              .then(response => (
                                response.json()
                              ))
                              .then(data => {
                                return data;
                              })
                              .catch(err => console.log(err));
      return packages;
    }
}

getLineasPackage = async (id) => {
  let token = cookies.get('access_token');
    if(token){
    let request = new Request(`${url}/api/package/products/${id}`, {
      method: 'GET',
      headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
      credentials: 'same-origin'
      });
      
      let packages = await fetch(request)
                              .then(response => (
                                response.json()
                              ))
                              .then(data => {
                                console.log(data);
                                return data;
                              })
                              .catch(err => console.log(err));
      return packages;
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

  modificarPerfil = (request) => {
    // console.log(request.getAll());
    axios.post(`${url}/api/auth/update/user/${this.state.loggedUser.userId}/company/${this.state.loggedUser.userCompanyId}`,
    request)
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
    let status = '';
    fetch(request)
        .then((res) => {
          status = res.status;
          return res.json()
        })
        .then(data => {
          if(data && status === 200) {
            cookies.set('access_token', data.token, { path: '/' });
            this.setState({
              shownWindow: 'dashboard',
              logged: true,
              loggedUser: {
                ...data.userData
              }
            });
          }
          else{
            console.log('fallo'); //devolver response status para no cerrar diaog y mostar error
            // this.setearSnackbar(true, 'Error al iniciar sesion', 'error'); //no se llama, probablemente por el cierre del dialog
          }
        })
        .catch(err => {
          console.log(`Error al enviar inicio de sesion : ${err}`);
          this.setearSnackbar(true, 'Error al iniciar sesion', 'error');
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

  crearPaquete = (request) =>{
    let token = cookies.get('access_token');
    console.log('token enviado',token);
    console.log(request);
    if(token){
      let instance = axios.create({
        baseURL: `${url}/api/package`,
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
    /*axios.post(`${url}/api/package`, request)
      .then(res => {
        console.log(res);
        //return res.status;
        if(res.status === 201){
          return <Snacks />
        }
      })
      .catch(err => {
        console.log(err);
      });*/
  }

  seleccionarCompany = (id) => {
    this.setState({companiaSeleccionada: Number(id), shownWindow: 'productsCompany'});
  }

  getEmpresaSeleccionada = () => {
    return this.state.companiaSeleccionada;
  }

  modificarProducto = (request,id) => {
    axios.post(`${url}/api/product/update/company/${id}`,
      request)
        .then(res => {
          console.log(res);
            
        })
        .catch(err => {
          console.log(err);
        });
  }

  eliminarProducto = (id) =>{
      axios.post(`${url}/api/product/delete/company/${id}`)
        .then(res => {
          console.log(res);
            
        })
        .catch(err => {
          console.log(err);
        });
  }

  agregarAlCarrito = (producto, cantidad=1) => {
    if(producto.companyId === this.state.loggedUser.userCompanyId) return;
    let cart = CartFunctions.agregarAlCarrito(this.state.cart, producto, cantidad);
    this.setState({cart: cart}, () => this.cartTotalCalculate());
    this.setearSnackbar(true,'Producto agregado al carrito','success');
  }
  
  borrarItemCarrito = (prodId, prodCode, companyId) => {
    let cart = CartFunctions.borrarItemCarrito(this.state.cart, prodId, prodCode, companyId);
    this.setState({cart: cart}, () => this.cartTotalCalculate());
    this.setearSnackbar(true,'Producto eliminado del carrito','success');
  }

  cambiarCantidadProdCarrito = async (prodId, prodCode, companyId,  cantidad) => {
    let cart = CartFunctions.cambiarCantidadProdCarrito(this.state.cart, prodId, prodCode, companyId, cantidad);
    this.setState({cart: cart}, () => this.cartTotalCalculate());
  }

  // cartEnvioChange = (id, value, selectedEnvio) => {
  //   let cart = CartFunctions.cartEnvioChange(this.state.cart, id, value, selectedEnvio);
  //   this.setState({cart: cart}, () => this.cartTotalCalculate());
  // }

  cartTotalCalculate = () => {
    let cart = CartFunctions.calcularTotal(this.state.cart);
    this.setState({cart: cart});
  }

  realizarPedido = async () => {
    let token = cookies.get('access_token');
    if(!token) return
    let request = {
      userId: this.state.loggedUser.userId,
      buyerId: this.state.loggedUser.userCompanyId,
      amount: this.state.cart.total,
      specialDiscount: 0, //luego se trabajara este valor que debera ir dentro de cada seller
      deliveryType: 'Comprador', //trabajar este punto
      contenido: this.state.cart.contenido
    }
    let {response, status} = await CartFunctions.realizarPedido(request, url, token);
    console.log('response', response)
    console.log('status', status);
    if(status === 201 || status === 200) this.setearSnackbar(true,'Pedido realizado con exito','success');
    else this.setearSnackbar(true, 'Fallo el pedido', 'error');
    
    console.log(response);
  }

  setearSnackbar = (status, message, variant) => {
    this.setState({
      snackbarStatus: status,
      snackbarMessage: message,
      snackbarVariant: variant
    });
  }

  render() {
    return (
        <Fragment>
          <Snackbar
            open={this.state.snackbarStatus}
            message={this.state.snackbarMessage}
            variant={this.state.snackbarVariant}
            onClose={this.setearSnackbar}
          />
          <Header 
            cambiarVentana={this.cambiarVentana}
            logged={this.state.logged}
            loggedUser={this.state.loggedUser}
            login={this.login}
            logout={this.logout}
            signup={this.registroUsuarioEmpresa}
            getCompanyTypes={this.getCompanyTypes}
            getCompanyCategories={this.getCompanyCategories}
            getUserTypes={this.getUserTypes}
            getProductCategories={this.getProductCategories}
            registrarProducto={this.registroProducto}
            getProducts={this.getAllProducts}
            companies={this.state.companies}
            registroEmpresaProducto={this.asociarProducto}
            getProductosByCompany = {this.getProductsByCompany}
            crearPaquete = {this.crearPaquete}
          />
          {this.state.shownWindow === 'home' ? (
            <Home />
          ) : (
            this.state.shownWindow === 'dashboard' ? (
              <Dashboard />
            ) : (
              this.state.shownWindow === 'companies' ? (
                <CompanyList
                  flag='companias'
                  getContent={this.getAllCompanies}
                  getCategories={this.getCompanyCategories}
                  getTipos={this.getCompanyTypes}
                  onCompanyClick={this.seleccionarCompany}
                />
              ) : (
                this.state.shownWindow === 'productsGeneric' ? (
                  <ProductList 
                    flag='productos'
                    getContent={this.getAllProducts}
                    getCategories={this.getProductCategories}
                  />
                ) : (
                  this.state.shownWindow === 'productsCompany' ? (
                    <ProductList 
                      flag='productos'
                      flagCart={true}
                      agregarAlCarrito={this.agregarAlCarrito}
                      getContent={this.getProductsByCompany}
                      company={this.state.companiaSeleccionada}
                      getCategories={this.getProductCategories}
                    />
                  ) : (
                    this.state.shownWindow === 'myProducts' ? (
                      <MisProductos
                        getProductos={this.getProductsByCompany}
                        company={this.state.loggedUser.userCompanyId}
                      />
                    ) : (
                      this.state.shownWindow === 'carrito' ? (
                        <Carrito 
                          cart={this.state.cart}
                          onDelete={this.borrarItemCarrito}
                          cartEnvioChange={this.cartEnvioChange}
                          cambiarCantidadProdCarrito={this.cambiarCantidadProdCarrito}
                          realizarPedido={this.realizarPedido}
                        />
                      ) : (
                        this.state.shownWindow === 'profile' ? (
                          <Profile 
                            getUser = {this.getUserById}
                            getCompany = {this.getCompanyById}
                            userId = {this.state.loggedUser.userId}
                            companyId = {this.state.loggedUser.userCompanyId}
                            getCategories={this.getCompanyCategories}
                            modificarPerfil={this.modificarPerfil}
                          />
                        ) : (
                          this.state.shownWindow === 'productForm' ? (
                            <ProductForm 
                              getCategories={this.getProductCategories}
                              onClick={this.registroProducto}
                            />
                          ) : (
                            this.state.shownWindow === 'historialCompras' ? (
                              <HistorialCompras
                                userId={this.state.loggedUser.userId}
                                url={url}
                              />
                            ) : (
                              null
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )}
        </Fragment>
    );
  }
}

export default App;