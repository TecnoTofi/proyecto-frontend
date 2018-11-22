import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import { Header } from './components/layouts/';
import CompanyList from './components/CompanyList';
import ProductList from './components/ProductList';
import axios from 'axios';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Carrito from './components/Cart/Cart';
import MisProductos from './components/MisProductos';
import ProductForm from './components/ProductForm';
import ModificarProducto from './components/ModificarProducto';
import Package from './components/PackageForm';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const url = 'http://localhost:3000';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      shownWindow: 'home',
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
      cart: [],
      companiaSeleccionada: 0
    }
  }

  componentWillMount(){

    let token = cookies.get('access_token');

    if(token){
      	this.verificarToken(token);
    }
    // else{
    //   this.getUserRolesSignup();
    // }
  
    // this.getCompanyTypes();
    // this.getCompanyCategories();
    // this.getAllCompanies();
    // this.getAllProducts();
    // this.getProductCategories();
  }

  cambiarVentana = (ventana) => {
    this.setState({shownWindow: ventana});
    // if(ventana === 'companies'){
    //   // console.log('llegue a buscar companies');
    //   this.getAllCompanies();
    //   this.getCompanyCategories();
    //   this.getCompanyTypes();
    // }else if(ventana === 'productsGeneric'){
    //   this.getAllProducts();
    //   this.getProductCategories();
    // }
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
                                comp.imagePath = `${url}/${comp.imagePath}`;
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
                                            prod.imagePath = `${url}/${prod.imagePath}`;
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
    console.log('llegue', 'id', id)
    let productos = await fetch(`${url}/api/product/company/${id}`)
                                .then(response => (
                                  response.json()
                                ))
                                .then(data => {
                                  // console.log('data', data);
                                  let response = data.map(prod => {
                                              prod.imagePath = `${url}/${prod.imagePath}`;
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

    fetch(request)
      .then((res) => {
        res.json()
          .then(data => {
            if(res.status === 200){
				
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
    // console.log('idEmpresa', typeof this.state.companiaSeleccionada);
    // console.log('idEmpresa', this.state.companiaSeleccionada);
    this.setState({companiaSeleccionada: Number(id), shownWindow: 'productsCompany'});
  }

  getEmpresaSeleccionada = () => {
    return this.state.companiaSeleccionada;
  }

  mostrarCompanias = () => {
    return <CompanyList
      listado={this.state.companies}
      flag='companias'
      categories={this.state.companyCategories}
      tipos={this.state.companyTypes}
      onCompanyClick={this.seleccionarCompany}
    />;
  }

  mostrarProductos = () => {
    return <CompanyList 
      listado={this.state.products}
      flag='productos'
      categories={this.state.productCategory}
    />;
  }

  mostrarCompanyProducts = async () => {
    // console.log(this.state.companiaSeleccionada);;
    // let productos = await this.getProductsByCompany(this.state.companiaSeleccionada);
    return <CompanyList 
      listado={this.getProductsByCompany}
      comapny={this.state.companiaSeleccionada}
      flag='productos'
      categories={this.state.productCategory}
    />;
  }

  mostrarPerfil = () => {
    return <Profile 
      getUser = {this.getUserById}
      getCompany = {this.getCompanyById}
      userId = {this.state.loggedUser.userId}
      companyId = {this.state.loggedUser.userCompanyId}
      getCategories={this.getCompanyCategories}
      modificarPerfil={this.modificarPerfil}
    />
  }

  mostrarPackages = () => {
    return <Package
    getCompany = {this.getCompanyById}
    companyId = {this.state.loggedUser.userCompanyId}
    getMisProductos = {this.getMisProductos}
    getMisPackage = {this.getMisPackage}
    getLineasPackage = {this.getLineasPackage}
    />
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
  
mostrarMisProductos = () => {
	return <MisProductos products={this.state.myProducts} />
  }

  // cargarCarrito = () => {
  //   let datosTest = this.state.myProducts.map(prod => {
  //     prod.quantity = 1;
  //     prod.priceEnvio = 100;
  //     prod.envio = false;
  //     return prod;
  //   });
  //   this.setState({cart: datosTest});
  // }

  agregarAlCarrito = (producto) => {
    let cart = this.state.cart;
    producto.quantity = 1;
    producto.priceEnvio = 100
    cart.push(producto);
    this.setState({
      cart: cart
    })
  }

  cambiarCantidadProdCarrito = async (id, cantidad) => {
    let cart = await this.state.cart.map(prod => {
      if(prod.id === id) prod.quantity = cantidad;
      return prod;
    });
    this.setState({cart: cart});
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
        <Fragment>
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
                          productos={this.state.cart} 
                          onDelete={this.borrarItemCarrito} 
                          cartEnvioChange={this.cartEnvioChange}
                          cambiarCantidadProdCarrito={this.cambiarCantidadProdCarrito}
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
                            this.state.shownWindow === 'package' ? (
                            this.mostrarPackages()
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