import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import { Header } from './components/Layouts/';
import CompanyList from './components/Companies/CompanyList'
import ProductList from './components/Productos/ProductList';
// import axios from 'axios';
import Home from './components/PaginasPrincipales/Home';
import Dashboard from './components/PaginasPrincipales/Dashboard';
import Profile from './components/Profile/Profile';
import AuthFunctions from './components/Auth/Functions';
import UserFunctions from './components/User/Functions';
import CompanyFunctions from './components/Companies/Functions';
import ProductFunctions from './components/Productos/Functions';
import DetalleProducto from './components/Productos/DetalleProducto';
import PackageFunctions from './components/Paquetes/Functions';
import Carrito from './components/Cart/Cart';
import CartFunctions from './components/Cart/Functions';
import MisProductos from './components/Productos/MisProductos';
import ProductForm from './components/Productos/ProductForm';
import HistorialCompras from './components/Historiales/ComprasList';
// import HistorialFunctions from './components/Historiales/Functions';
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
      companiaSeleccionada: 0,
      productSeleccionado:0
    }
  }

  componentWillMount(){

    let token = cookies.get('access_token');

    if(token){
      	this.verificarToken(token);
    }
  }

  cambiarVentana = (ventana, id) => {
    if(id) this.setState({shownWindow: ventana, productSeleccionado: id});
    else this.setState({shownWindow: ventana});
    
  }

  verificarToken = async (token) => {
    let { valido, data } = await AuthFunctions.verificarToken(url, token);
    if(valido){
      // console.log('entre en valido status');
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
    else{
      console.log('error en auth de token, o vencido');
    }

    // let requestAuth = new Request(`${url}/api/auth`, {
    //     method: 'POST',
    //     headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
    //     credentials: 'same-origin',
    //     body: JSON.stringify({message: 'AuthToken'})
    //   })
      
    //   fetch(requestAuth)
    //     .then(res => {
    //       res.json()
    //         .then(data => {
		// 		if(res.status === 200){
		// 			cookies.set('access_token', data.token, { path: '/' });
				
		// 			this.setState({
		// 				logged: true,
		// 				loggedUser: {
		// 					userType: data.userData.userType,
		// 					userName: data.userData.userName,
		// 					userEmail: data.userData.userEmail,
		// 					userId: data.userData.userId,
		// 					userCompanyName: data.userData.userCompanyName,
		// 					userCompanyId: data.userData.userCompanyId
		// 				}
		// 			})
		// 		}
		// 	})
    //         .catch(err => {
    //           console.log(err);
    //         });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
  }

  getCompanyTypes = async () => {
    return await CompanyFunctions.getCompanyTypes(url);
    // let tipos = await fetch(`${url}/api/company/type`)
    //                         .then(response => (
    //                           response.json()
    //                         ))
    //                         .then(data => {
    //                           // console.log('tipos empresa', data);
    //                           return data;
    //                           // this.setState({companyTypes: data});
    //                         })
    //                         .catch(err => console.log(err));
    // return tipos;
  }

  getCompanyCategories = async () => {
    return await CompanyFunctions.getCompanyCategories(url);
    // let categories = await fetch(`${url}/api/company/category`)
    //                         .then(response => (
    //                           response.json()
    //                         ))
    //                         .then(data => {
    //                           // console.log('categorias empresa', data);
    //                           return data;
    //                           // this.setState({companyCategories: data});
    //                         })
    //                         .catch(err => console.log(err));
    // return categories;
  }

  getUserTypes = async () => {
    return await UserFunctions.getUserTypes(url);
    // let userTypes = await fetch(`${url}/api/user/role/signup`)
    //                         .then(response => (
    //                           response.json()
    //                         ))
    //                         .then(data => {
    //                           // console.log('user Types', data);
    //                           return data;
    //                           // this.setState({userTypes: data});
    //                         })
    //                         .catch(err => console.log(err));
    // return userTypes;
  }

  getAllCompanies = async () => {
    return await CompanyFunctions.getAllCompanies(url);
    // let companias = await fetch(`${url}/api/company`)
    //                         .then(response => (
    //                           response.json()
    //                         ))
    //                         .then(data => {
    //                           let companias = data.map(comp => {
    //                             comp.imageUrl = `${url}/${comp.imagePath}`;
    //                             return comp;
    //                           });
    //                           // console.log('companias', companias);
    //                           return companias;
    //                           // this.setState({companies: companias});
    //                         })
    //                         .catch(err => console.log(err));
    // return companias;
  }

  getAllProducts = async () => {
    return await ProductFunctions.getAllProducts(url);
    // let productos = await fetch(`${url}/api/product`)
    //                           .then(response => (
    //                             response.json()
    //                           ))
    //                           .then(data => {
    //                             let response = data.map(prod => {
    //                                         prod.imageUrl = `${url}/${prod.imagePath}`;
    //                                         return prod;
    //                                       });
    //                             // console.log('productos', response);
    //                             return response;
    //                             // this.setState({products: response});
    //                           })
    //                           .catch(err => console.log(err));
    // return productos;
  }

  getProductById = async (id) => {
    return await ProductFunctions.getProductById(url, id);
  }

  getProductsCompanyByCompanies = async (id) => {
    return await ProductFunctions.getProductsCompanyByCompanies(url, id);
  }

  getAllPackages = async () => {
    return await PackageFunctions.getAllPackages(url);
    // let paquetes = await fetch(`${url}/api/package`)
    //                           .then(res => (
    //                             res.json()
    //                           ))
    //                           .then(data => {
    //                             // let response = data.map(prod => {
    //                             //             prod.imageUrl = `${url}/${prod.imagePath}`;
    //                             //             return prod;
    //                             //           });
    //                             // console.log('productos', response);
    //                             // return response;
    //                             return data;
    //                           })
    //                           .catch(err => console.log(err));
    // return paquetes;
  }

  getProductCategories = async () => {
    return await ProductFunctions.getProductCategories(url);
    // let categories = await fetch(`${url}/api/product/category`)
    //                           .then(response => (
    //                             response.json()
    //                           ))
    //                           .then(data => {
    //                             // console.log('categorias productos', data);
    //                             return data;
    //                             // this.setState({productCategories: data})
    //                           })
    //                           .catch(err => console.log(err));
    // return categories;
  }

  getProductsByCompany = async (id) => {
    return await ProductFunctions.getProductsByCompany(url, id);
    // let productos = await fetch(`${url}/api/product/company/${id}`)
    //                             .then(response => (
    //                               response.json()
    //                             ))
    //                             .then(data => {
    //                               // console.log('data', data);
    //                               let response = data.map(prod => {
    //                                           prod.imageUrl = `${url}/${prod.imagePath}`;
    //                                           return prod;
    //                                         });
    //                               return response;
    //                             })
    //                             .catch(err => console.log(err));
    //   return productos;
  }

getCompanyById = async () => {
  return await CompanyFunctions.getCompanyById(url, this.state.loggedUser.userCompanyId);
  // let compania = await fetch(`${url}/api/company/${this.state.loggedUser.userCompanyId}`)
  //           .then(res => (
  //             res.json()
  //           ))
  //           .then(data => {
  //             return data;
  //           })
  //           .catch(err => console.log(`Error al buscar Company : ${err}`));
  // return compania;
}

getUserById = async () => {
  return await UserFunctions.getUserById(url, this.state.loggedUser.userId);
  // let usuario = await fetch(`${url}/api/user/${this.state.loggedUser.userId}`)
  //           .then(res => (
  //             res.json()
  //           ))
  //           .then(data => {
  //             return data;
  //           })
  //           .catch(err => {
  //             console.log(`Error al buscar Usuario : ${err}`);
  //           });
  // return usuario;
}

getPackagesByCompany = async (id) => {
  return await PackageFunctions.getPackagesByCompany(url, id);
  // let paquetes = await fetch(`${url}/api/package/company/${id}`)
  //                       .then(res => (
  //                         res.json()
  //                       ))
  //                       .then(data => {
  //                         // console.log('data', data);
  //                         // let response = data.map(pack => {
  //                         //             pack.imageUrl = `${url}/${pack.imagePath}`;
  //                         //             return pack;
  //                         //           });
  //                         // return response;
  //                         return data
  //                       })
  //                       .catch(err => console.log(err));
  // return paquetes;
}

getLineasPackage = async (id) => {
  let token = cookies.get('access_token');
  return await PackageFunctions.getLineasPackage(url, token, id);
  //   if(token){
  //   let request = new Request(`${url}/api/package/products/${id}`, {
  //     method: 'GET',
  //     headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
  //     credentials: 'same-origin'
  //     });
      
  //     let packages = await fetch(request)
  //                             .then(response => (
  //                               response.json()
  //                             ))
  //                             .then(data => {
  //                               console.log(data);
  //                               return data;
  //                             })
  //                             .catch(err => console.log(err));
  //     return packages;
  //   }
}

  registroUsuarioEmpresa = async (request) => {
    return await UserFunctions.registroUsuarioEmpresa(url, request);
    // axios.post(`${url}/api/auth/signup`, request)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  modificarPerfil = async (request) => {
    return await UserFunctions.modificarPerfil(url, this.state.loggedUser.userId, this.state.loggedUser.companyId, request);
    // console.log(request.getAll());
    // axios.post(`${url}/api/auth/update/user/${this.state.loggedUser.userId}/company/${this.state.loggedUser.userCompanyId}`,
    // request)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  login = async (userEmail, userPassword) => {
    let { result, status } = await AuthFunctions.login(url, userEmail, userPassword);

    if(result && status === 200) {
      cookies.set('access_token', result.token, { path: '/' });
      this.setState({
        shownWindow: 'dashboard',
        logged: true,
        loggedUser: {
          ...result.userData
        }
      });
    }
    else{
      console.log('Error al iniciar sesion'); //devolver response status para no cerrar diaog y mostar error
      this.setearSnackbar(true, 'Error al iniciar sesion', 'error'); //no se llama, probablemente por el cierre del dialog
    }

    // let request = new Request(`${url}/api/auth/login`, {
    //   method: 'POST',
    //   headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json'}),
    //   credentials: 'same-origin',
    //   body: JSON.stringify({userEmail, userPassword})
    // });
    // let status = '';
    // fetch(request)
    //     .then((res) => {
    //       status = res.status;
    //       return res.json()
    //     })
    //     .then(data => {
    //       if(data && status === 200) {
    //         cookies.set('access_token', data.token, { path: '/' });
    //         this.setState({
    //           shownWindow: 'dashboard',
    //           logged: true,
    //           loggedUser: {
    //             ...data.userData
    //           }
    //         });
    //       }
    //       else{
    //         console.log('fallo'); //devolver response status para no cerrar diaog y mostar error
    //         // this.setearSnackbar(true, 'Error al iniciar sesion', 'error'); //no se llama, probablemente por el cierre del dialog
    //       }
    //     })
    //     .catch(err => {
    //       console.log(`Error al enviar inicio de sesion : ${err}`);
    //       this.setearSnackbar(true, 'Error al iniciar sesion', 'error');
    //     });
  }

  logout = async () => {
    let { result, status } = await AuthFunctions.logout(url);

    if(result && status === 200){
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
    }
    else{
      console.log('Error al cerrar sesion');
      this.setearSnackbar(true, 'Error al cerrar sesion', 'error');
    }
    // let request = new Request(`${url}/api/auth/logout`, {
    //   method: 'POST',
    //   headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json'}),
    //   credentials: 'same-origin'
    // });

    // fetch(request)
    //   .then((res) => {
    //     res.json()
    //       .then(data => {
            
    //         this.setState({
    //           logged: false,
    //           loggedUser: {
    //             userType: '',
    //             userName: '',
    //             userEmail: '',
    //             userId: 0,
    //             userCompanyName: '',
    //             userCompanyId: 0
    //           }
    //         });
    //         cookies.remove('access_token', { path: '/' })
    //         console.log(data);
    //       })
    //       .catch(err => {
    //         console.log(`Error al enviar cierre de sesion : ${err}`);
    //       });
    //   });
  }

  registroProducto = async (request) => {
    let token = cookies.get('access_token');
    return await ProductFunctions.registroProducto(url, token, request);
    // if(token){
    
    //   let instance = axios.create({
    //                     baseURL: `${url}/api/product`,
    //                     method: 'post',
    //                     headers: {token: token},
    //                     data: request
    //                   });
    //   instance()
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
    // else{
    //   console.log('No hay token');
    // }
  }

  asociarProducto = async (request) => {
    let token = cookies.get('access_token');
    return await ProductFunctions.asociarProducto(url, token, request);
    // if(token){

    //   let request = new Request(`${url}/api/product/company`, {
    //     method: 'POST',
    //     headers: new Headers({ 'Content-Type': 'application/json', token: token}),
    //     body: JSON.stringify(body)
    //   });
  
    //   fetch(request)
    //     .then((res) => {
    //       res.json()
    //         .then(data => {
    //           console.log(data);
    //         })
    //         .catch(err => {
    //           console.log(`Error al enviar registro de productoEmpresa : ${err}`);
    //         });
    //     });
    // }
    // else{
    //   console.log('No hay token')
    // }
  }

  crearPaquete = async (request) =>{
    let token = cookies.get('access_token');
    return await PackageFunctions.crearPaquete(url, token, request);
    // console.log('token enviado',token);
    // console.log(request);
    // if(token){
    //   let instance = axios.create({
    //     baseURL: `${url}/api/package`,
    //     method: 'post',
    //     headers: {token: token},
    //     data: request
    //   });
    //   instance()
    //   .then(res => {
    //   console.log(res);
    //   })
    //   .catch(err => {
    //   console.log(err);
    //   });
    // }
    // else{
    // console.log('No hay token');
    // }
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

  modificarProducto = async (request, id) => {
    return await ProductFunctions.modificarProducto(url, request, id);
    // axios.post(`${url}/api/product/update/company/${id}`,
    //   request)
    //     .then(res => {
    //       console.log(res);
            
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
  }

  eliminarProducto = async (id) =>{
    return await ProductFunctions.eliminarProducto(url, id);
      // axios.post(`${url}/api/product/delete/company/${id}`)
      //   .then(res => {
      //     console.log(res);
            
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
  }

  agregarAlCarrito = (producto, cantidad=1) => {
    console.log('agregarCarrito producto', producto);
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
                    getProductos={this.getAllProducts}
                    getPaquetes={this.getAllPackages}
                    getCategories={this.getProductCategories}
                    cambiarVentana={this.cambiarVentana}
                  />
                ) : (
                  this.state.shownWindow === 'productsCompany' ? (
                    <ProductList 
                      flag='productos'
                      flagCart={this.state.loggedUser.userCompanyId}
                      agregarAlCarrito={this.agregarAlCarrito}
                      getProductos={this.getProductsByCompany}
                      getPaquetes={this.getPackagesByCompany}
                      company={this.state.companiaSeleccionada}
                      getCategories={this.getProductCategories}
                    />
                  ) : (
                    this.state.shownWindow === 'myProducts' ? (
                      <MisProductos
                        getProductos={this.getProductsByCompany}
                        getPaquetes={this.getPackagesByCompany}
                        company={this.state.loggedUser.userCompanyId}
                        modificarProducto={this.modificarProducto}
                        eliminarProducto={this.eliminarProducto}
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
                              this.state.shownWindow === 'productDetalle' ? (
                                <DetalleProducto 
                                  getProductsCompanyByCompanies={this.getProductsCompanyByCompanies}
                                  productId={this.state.productSeleccionado}
                                  getProductById={this.getProductById}
                                  agregarAlCarrito={this.agregarAlCarrito}
                                  //onClick={this.registroProducto}
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
            )
          )}
        </Fragment>
    );
  }
}

export default App;