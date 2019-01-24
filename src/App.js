import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import { withSnackbar } from 'notistack';
import { Header } from './components/Layouts/';
import CompanyList from './components/Companies/CompanyList'
import ProductList from './components/Productos/ProductList';
import Home from './components/PaginasPrincipales/Home';
import Dashboard from './components/PaginasPrincipales/Dashboard';
import Profile from './components/User/Profile';
import AuthFunctions from './components/Auth/Functions';
import HelperFunctions from './components/Helpers/Functions';
import UserFunctions from './components/User/Functions';
import CompanyFunctions from './components/Companies/Functions';
import ProductFunctions from './components/Productos/Functions';
import DetalleProducto from './components/Productos/DetalleProducto';
import DetallePackage from './components/Paquetes/DetallePackage';
import PackageFunctions from './components/Paquetes/Functions';
import Carrito from './components/Cart/Cart';
import CartFunctions from './components/Cart/Functions';
import MisProductos from './components/Productos/MisProductos';
// import ProductForm from './components/Productos/ProductForm';
import ReporteCompras from './components/Reportes/ComprasList';
import ReporteVentas from './components/Reportes/VentasList';
import ReportesFunctions from './components/Reportes/Functions';
// import Snackbar from '@material-ui/core/Snackbar';
// import Snackbar from './components/Helpers/Snackbar';
import Cookies from 'universal-cookie';
import TopCincoMasVendidos from './components/Reportes/TopCincoMasVendidos';
import TopCincoMenosVendidos from './components/Reportes/TopCincoMenosVendidos';

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
        total: 0,
        voucher: '',
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
      });
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

  getNotAssociatedProducts = async () => {
    return await ProductFunctions.getNotAssociated(url, this.state.loggedUser.userCompanyId);
  }

  getProductById = async (id) => {
    return await ProductFunctions.getProductById(url, id);
  }

  getPackageById = async (id) => {
    return await PackageFunctions.getPackageById(url, id);
  }

  getCompanyProductsByProduct = async (id) => {
    return await ProductFunctions.getCompanyProductsByProduct(url, id);
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

// getLineasPackage = async (id) => {
//   let token = cookies.get('access_token');
//   return await PackageFunctions.getLineasPackage(url, token, id);
// }

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
      });
      cookies.remove('access_token', { path: '/' });
      this.cambiarVentana('home');
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

  registroProductoAsociacion = async (request) => {
    let token = cookies.get('access_token');
    return await ProductFunctions.registroProducto(url, token, request);
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

  modificarProducto = async (request, productId) => {
    let token = cookies.get('access_token');
    return await ProductFunctions.modificarProducto(url, token, request, productId, this.state.loggedUser.userCompanyId);
  }

  eliminarProducto = async (id) =>{
    let token = cookies.get('access_token');
    return await ProductFunctions.eliminarProducto(url, token, id);
  }

  modificarPaquete = async (request, id) => {
    let token = cookies.get('access_token');
    return await PackageFunctions.modificarPaquete(url, token, request, id);
  }

  eliminarPaquete = async (id) =>{
    let token = cookies.get('access_token'); 
    return await PackageFunctions.eliminarPaquete(url, token, id);
  }

  agregarAlCarrito = (producto, cantidad=1) => {
    if(producto.companyId === this.state.loggedUser.userCompanyId) return;

    let cart = CartFunctions.agregarAlCarrito(this.state.cart, producto, cantidad);

    this.setState({cart: cart}, async () => {
      await this.cartTotalCalculate();
    });
    this.props.enqueueSnackbar('Producto agregado al carrito.', { variant: 'success' });
  }
  
  borrarItemCarrito = (id, esPackage, companyId) => {
    let cart = CartFunctions.borrarItemCarrito(this.state.cart, id, esPackage, companyId);

    this.setState({cart: cart}, () => this.cartTotalCalculate());

    this.props.enqueueSnackbar('Producto eliminado del carrito.', { variant: 'success' });
  }

  cambiarCantidadProdCarrito = async (id, esPackage, companyId,  cantidad) => {
    let cart = CartFunctions.cambiarCantidadProdCarrito(this.state.cart, id, esPackage, companyId, cantidad);
    this.setState({cart: cart}, () => this.cartTotalCalculate());
  }

  // cartEnvioChange = (id, value, selectedEnvio) => {
  //   let cart = CartFunctions.cartEnvioChange(this.state.cart, id, value, selectedEnvio);
  //   this.setState({cart: cart}, () => this.cartTotalCalculate());
  // }

  cartTotalCalculate = async (voucher) => {
    let token = cookies.get('access_token');
    if(!token) return

    let request = {
      contenido: this.state.cart.contenido,
      voucher: voucher ? voucher : this.state.cart.voucher
    }

    let cart = await CartFunctions.calcularTotal(url, token, request, this.state.cart);

    this.setState({cart: cart});
  }

  realizarPedido = async () => {
    let token = cookies.get('access_token');
    if(!token) return
    let request = {
      userId: this.state.loggedUser.userId,
      buyerId: this.state.loggedUser.userCompanyId,
      amount: this.state.cart.total,
      voucher: this.state.cart.voucher,
      deliveryType: 'Comprador', //trabajar este punto
      contenido: this.state.cart.contenido
    }
    let {response, status} = await CartFunctions.realizarPedido(request, url, token);
    
    if(status === 201 || status === 200) {
      this.props.enqueueSnackbar('Pedido realizado con exito.', { variant: 'success' });
      this.setState({
        cart: {
          contenido: [],
          subTotal: 0,
          subTotalEnvios: 0,
          total: 0
        }
      })
    }
    else this.props.enqueueSnackbar('Fallo el pedido.', { variant: 'error' });
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

  getTopCincoMasVendidos = async (date) => {
    let token = cookies.get('access_token');
    if(!token) return
    return await ReportesFunctions.getTopCincoMasVendidos(url, token, this.state.loggedUser.userCompanyId, date);
  }

  getTopCincoMenosVendidos = async (date) => {
    let token = cookies.get('access_token');
    if(!token) return
    return await ReportesFunctions.getTopCincoMenosVendidos(url, token, this.state.loggedUser.userCompanyId, date);
  }

  // setearSnackbar = (status, message, variant) => {
  //   this.setState({
  //     snackbarStatus: status,
  //     snackbarMessage: message,
  //     snackbarVariant: variant
  //   });
  // }

  render() {
    return (
        <Fragment>
          {/* <Snackbar
            open={this.state.snackbarStatus}
            message={this.state.snackbarMessage}
            variant={this.state.snackbarVariant}
            onClose={this.setearSnackbar}
          /> */}
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
            getNotAssociated={this.getNotAssociatedProducts}
            companies={this.state.companies}
            registroEmpresaProducto={this.asociarProducto}
            getProductosByCompany = {this.getProductsByCompany}
            crearPaquete={this.crearPaquete}
          />
          {this.state.shownWindow === 'home' ? (
            <Home />
          ) : (
            this.state.shownWindow === 'companies' ? (
              <CompanyList
                getContent={this.getAllCompanies}
                getCategories={this.getRubros}
                getTipos={this.getTypes}
                onCompanyClick={this.seleccionarCompany}
              />
            ) : (
              this.state.shownWindow === 'productsGeneric' ? (
                <ProductList
                  getProductos={this.getAllProducts}
                  getPaquetes={this.getAllPackages}
                  getCategories={this.getCategories}
                  cambiarVentana={this.cambiarVentana}
                />
              ) : (
                this.state.shownWindow === 'productsCompany' ? (
                  <ProductList
                    flagCart={this.state.loggedUser.userCompanyId}
                    agregarAlCarrito={this.agregarAlCarrito}
                    getProductos={this.getProductsByCompany}
                    getPaquetes={this.getPackagesByCompany}
                    company={this.state.companiaSeleccionada}
                    getCategories={this.getCategories}
                    cambiarVentana={this.cambiarVentana}
                  />
                ) : (
                  this.state.shownWindow === 'myProducts' ? (
                    <MisProductos
                      getProductos={this.getProductsByCompany}
                      getPaquetes={this.getPackagesByCompany}
                      company={this.state.loggedUser.userCompanyId}
                      getCategories={this.getCategories}
                      modificarProducto={this.modificarProducto}
                      eliminarProducto={this.eliminarProducto}
                      modificarPaquete={this.modificarPaquete}
                      eliminarPaquete={this.eliminarPaquete}
                    />
                  ) : (
                    this.state.shownWindow === 'carrito' ? (
                      <Carrito 
                        cart={this.state.cart}
                        onDelete={this.borrarItemCarrito}
                        cartEnvioChange={this.cartEnvioChange}
                        cambiarCantidadProdCarrito={this.cambiarCantidadProdCarrito}
                        realizarPedido={this.realizarPedido}
                        sendVoucher={this.cartTotalCalculate}
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
                                getCompanyProductsByProduct={this.getCompanyProductsByProduct}
                                productId={this.state.productSeleccionado}
                                getProductById={this.getProductById}
                                agregarAlCarrito={this.agregarAlCarrito}
                                loggedCompany={this.state.loggedUser.userCompanyId}
                              />
                            ) : (
                              this.state.shownWindow === 'packageDetalle' ? (
                              <DetallePackage 
                                packageId={this.state.productSeleccionado}
                                getPackageById={this.getPackageById}
                                agregarAlCarrito={this.agregarAlCarrito}
                                loggedCompany={this.state.loggedUser.userCompanyId}
                              />
                              ) : (
                                this.state.shownWindow === 'reporteTopCincoMas' ? (
                                  <TopCincoMasVendidos
                                    getDatos={this.getTopCincoMasVendidos}
                                  />
                                ) : (
                                  this.state.shownWindow === 'reporteTopCincoMenos' ? (
                                    <TopCincoMenosVendidos
                                      getDatos={this.getTopCincoMenosVendidos}
                                    />
                                  ) : (
                                    <Dashboard
                                      getDatos={this.getTopCincoMenosVendidos}
                                    />
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
            )
          )}
        </Fragment>
    );
  }
}

export default withSnackbar(App);