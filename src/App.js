import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import { Header } from './components/Layouts/';
import CompanyList from './components/Companies/CompanyList'
import ProductList from './components/Productos/ProductList';
import axios from 'axios';
import Home from './components/PaginasPrincipales/Home';
import Dashboard from './components/PaginasPrincipales/Dashboard';
import Profile from './components/User/Profile';
import AuthFunctions from './components/Auth/Functions';
import HelperFunctions from './components/Helpers/Functions';
import UserFunctions from './components/User/Functions';
import CompanyFunctions from './components/Companies/Functions';
import ProductFunctions from './components/Productos/Functions';
import DetalleProducto from './components/Productos/DetalleProducto';
import PackageFunctions from './components/Paquetes/Functions';
import Carrito from './components/Cart/Cart';
import CartFunctions from './components/Cart/Functions';
import MisProductos from './components/Productos/MisProductos';
import ProductForm from './components/Productos/ProductForm';
import ReporteCompras from './components/Reportes/ComprasList';
import ReporteVentas from './components/Reportes/VentasList';
import ReportesFunctions from './components/Reportes/Functions';
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
  }

  getTypes = async () => {
    return await HelperFunctions.getTypes(url);
  }

  getRubros = async () => {
    return await HelperFunctions.getRubros(url);
  }

  getUserTypes = async () => {
    return await UserFunctions.getUserTypes(url);
  }

  getAllCompanies = async () => {
    return await CompanyFunctions.getAllCompanies(url);
  }

  getAllProducts = async () => {
    return await ProductFunctions.getAllProducts(url);
  }

  getProductById = async (id) => {
    return await ProductFunctions.getProductById(url, id);
  }

  getProductsCompanyByCompanies = async (id) => {
    return await ProductFunctions.getProductsCompanyByCompanies(url, id);
  }

  getAllPackages = async () => {
    return await PackageFunctions.getAllPackages(url);
  }

  getCategories = async () => {
    return await HelperFunctions.getCategories(url);
  }

  getProductsByCompany = async (id) => {
    return await ProductFunctions.getProductsByCompany(url, id);
  }

getCompanyById = async () => {
  return await CompanyFunctions.getCompanyById(url, this.state.loggedUser.userCompanyId);
}

getUserById = async () => {
  return await UserFunctions.getUserById(url, this.state.loggedUser.userId);
}

getPackagesByCompany = async (id) => {
  return await PackageFunctions.getPackagesByCompany(url, id);
}

getLineasPackage = async (id) => {
  let token = cookies.get('access_token');
  return await PackageFunctions.getLineasPackage(url, token, id);
}

  signup = async (request) => {
    return await AuthFunctions.signup(url, request);
  }

  modificarPerfil = async (request) => {
    return await UserFunctions.modificarPerfil(url, this.state.loggedUser.userId, this.state.loggedUser.companyId, request);
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
    
    return status;
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
      // this.setearSnackbar(true, 'Error al cerrar sesion', 'error');
    }
  }

  registroProducto = async (request) => {
    let token = cookies.get('access_token');
    return await ProductFunctions.registroProducto(url, token, request);
  }

  asociarProducto = async (request) => {
    let token = cookies.get('access_token');
    return await ProductFunctions.asociarProducto(url, token, request);
  }

  registroProductoAsociacion = (request) => {
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

  crearPaquete = async (request) =>{
    let token = cookies.get('access_token');
    return await PackageFunctions.crearPaquete(url, token, request);
  }

  seleccionarCompany = (id) => {
    this.setState({companiaSeleccionada: Number(id), shownWindow: 'productsCompany'});
  }

  getEmpresaSeleccionada = () => {
    return this.state.companiaSeleccionada;
  }

  modificarProducto = async (request, id) => {
    return await ProductFunctions.modificarProducto(url, request, id);
  }

  eliminarProducto = async (id) =>{
    return await ProductFunctions.eliminarProducto(url, id);
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
    let token = cookies.get('access_token');
    if(!token) return
    let request = {
      contenido: this.state.cart.contenido,
      specialDiscount: 0 //luego se trabajara este valor que debera ir dentro de cada seller
    }
    let cart = CartFunctions.calcularTotal(url, token, request, this.state.cart);
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

  getReporteCompras = async () => {
    let token = cookies.get('access_token');
    if(!token) return
    return await ReportesFunctions.getPedidosByUser(url, token, this.state.loggedUser.userId);
  }

  getReporteVentas = async () => {
    let token = cookies.get('access_token');
    if(!token) return
    return await ReportesFunctions.getTransactionsByCompany(url, token, this.state.loggedUser.userCompanyId);
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
            signup={this.signup}
            getTypes={this.getTypes}
            getRubros={this.getRubros}
            getCategories={this.getCategories}
            registrarProducto={this.registroProductoAsociacion}
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
                  getCategories={this.getRubros}
                  getTipos={this.getTypes}
                  onCompanyClick={this.seleccionarCompany}
                />
              ) : (
                this.state.shownWindow === 'productsGeneric' ? (
                  <ProductList 
                    flag='productos'
                    getProductos={this.getAllProducts}
                    getPaquetes={this.getAllPackages}
                    getCategories={this.getCategories}
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
                      getCategories={this.getCategories}
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
                            getUser={this.getUserById}
                            getCompany={this.getCompanyById}
                            userId={this.state.loggedUser.userId}
                            companyId={this.state.loggedUser.userCompanyId}
                            getCategories={this.getRubros}
                            modificarPerfil={this.modificarPerfil}
                          />
                        ) : (
                          this.state.shownWindow === 'productForm' ? (
                            <ProductForm 
                              getCategories={this.getCategories}
                              onClick={this.registroProducto}
                            />
                          ) : (
                            this.state.shownWindow === 'reporteCompras' ? (
                              <ReporteCompras
                                getPedidos={this.getReporteCompras}
                              />
                            ) : (
                              this.state.shownWindow === 'reporteVentas' ? (
                                <ReporteVentas
                                  getTransactions={this.getReporteVentas}
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
            )
          )}
        </Fragment>
    );
  }
}

export default App;