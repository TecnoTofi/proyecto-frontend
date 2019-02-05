import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import { withSnackbar } from 'notistack';
import { Header } from './components/Layouts/';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CompanyList from './components/Companies/CompanyList'
import ProductList from './components/Productos/ProductList';
import Home from './components/PaginasPrincipales/Home';
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
import ReporteCompras from './components/Reportes/ComprasList';
import ReporteVentas from './components/Reportes/VentasList';
import ReportesFunctions from './components/Reportes/Functions';
import Cookies from 'universal-cookie';
import TopCincoMasVendidos from './components/Reportes/TopCincoMasVendidos';
import TopCincoMenosVendidos from './components/Reportes/TopCincoMenosVendidos';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

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
      	this.verificarToken();
    }
  }

  cambiarVentana = (ventana, id) => {
    if(id) this.setState({shownWindow: ventana, productSeleccionado: id});
    else this.setState({shownWindow: ventana});
  }

  verificarToken = async () => {
    let token = cookies.get('access_token');
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
    return valido;
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

  signup = async (request) => {
    let { status, message } = await AuthFunctions.signup(url, request);
    if(status === 201) this.props.enqueueSnackbar('Registro exitoso', { variant: 'success' });
    else  this.props.enqueueSnackbar(message, { variant: 'error' });
    return status;
  }

  modificarPerfil = async (request) => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return;
      let { status, message } = await UserFunctions.modificarPerfil(url, token, this.state.loggedUser.userId, this.state.loggedUser.userCompanyId, request);
      if(status === 200){
        this.props.enqueueSnackbar('Modificacion exitosa.', { variant: 'success' });
        history.goBack();
      }
      else  this.props.enqueueSnackbar(message, { variant: 'error' });
    }
  }

  login = async (userEmail, userPassword) => {
    let { result, status } = await AuthFunctions.login(url, userEmail, userPassword);

    if(result && status === 200) {
      cookies.set('access_token', result.token, { path: '/' });
      this.setState({
        shownWindow: 'home',
        logged: true,
        loggedUser: {
          ...result.userData
        }
      });
    }
    
    return status;
  }

  logout = async () => {
    let token = cookies.get('access_token');
    if(!token) return;
    let { result, status } = await AuthFunctions.logout(url, token);

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
        // companiaSeleccionada: 0,
        // productSeleccionado:0
      });
      cookies.remove('access_token', { path: '/' });
      // this.cambiarVentana('home');
      history.push('/');
      history.go();
    }
    else{
      console.log('Error al cerrar sesion');
    }
  }

  seleccionarCompany = (id) => {
    this.setState({companiaSeleccionada: Number(id), shownWindow: 'productsCompany'});
  }

  getEmpresaSeleccionada = () => {
    return this.state.companiaSeleccionada;
  }

  registroProductoAsociacion = async (request) => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return;
      let { status, message, errores } = await ProductFunctions.registroProducto(url, token, request);
      if(status === 201) this.props.enqueueSnackbar('Producto creado exitosamente.', { variant: 'success' });
      else if(message ) this.props.enqueueSnackbar(message, { variant: 'error' });
      else if (errores){
        for(let e of errores){
          this.props.enqueueSnackbar(e, { variant: 'error' });
        }
      }
      else this.props.enqueueSnackbar('Ocurrio un error', { variant: 'error' });
      return status;
    }
  }

  asociarProducto = async (request) => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return;
      let { status, message, errores } = await ProductFunctions.asociarProducto(url, token, request);
      if(status === 201) this.props.enqueueSnackbar('Producto asociado correctamente.', { variant: 'success' });
      else if(message ) this.props.enqueueSnackbar(message, { variant: 'error' });
      else if (errores){
        for(let e of errores){
          this.props.enqueueSnackbar(e, { variant: 'error' });
        }
      }
      else this.props.enqueueSnackbar('Ocurrio un error', { variant: 'error' });
      return status;
    }
  }

  registroProductosBulk = async (request) => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return;
      let { status, errores } = await ProductFunctions.registroProductosBulk(url, token, request);
      if(status === 201) this.props.enqueueSnackbar('Carga bulk finalizada con exito.', { variant: 'success' });
      else{
        for(let e of errores){
          this.props.enqueueSnackbar(`${e.codigo} - ${e.mensaje}`, { variant: 'error' });
        }
      }
      return status;
    }
  }


  modificarProducto = async (request, productId) => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return;
      let { status, message, errores, producto } =  await ProductFunctions.modificarProducto(url, token, request, productId, this.state.loggedUser.userCompanyId);
      if(status === 200) this.props.enqueueSnackbar('Producto modificado exitosamente.', { variant: 'success' });
      else if(message ) this.props.enqueueSnackbar(message, { variant: 'error' });
      else if (errores){
        for(let e of errores){
          this.props.enqueueSnackbar(e, { variant: 'error' });
        }
      }
      else this.props.enqueueSnackbar('Ocurrio un error', { variant: 'error' });
      return { status, producto };
    }
  }

  eliminarProducto = async (id) =>{
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return;
      let { status, message, errores } = await ProductFunctions.eliminarProducto(url, token, id);
      if(status === 200) this.props.enqueueSnackbar('Producto eliminado correctamente.', { variant: 'success' });
      else if(message ) this.props.enqueueSnackbar(message, { variant: 'error' });
      else if (errores){
        for(let e of errores){
          this.props.enqueueSnackbar(e, { variant: 'error' });
        }
      }
      else this.props.enqueueSnackbar('Ocurrio un error', { variant: 'error' });
      return status;
    }
  }

  crearPaquete = async (request) =>{
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return;
      let { status, message, errores } = await PackageFunctions.crearPaquete(url, token, request);
      if(status === 201) this.props.enqueueSnackbar('Paquete creado exitosamente.', { variant: 'success' });
      else if(message ) this.props.enqueueSnackbar(message, { variant: 'error' });
      else if (errores){
        for(let e of errores){
          this.props.enqueueSnackbar(e, { variant: 'error' });
        }
      }
      else this.props.enqueueSnackbar('Ocurrio un error', { variant: 'error' });
      return status;
    }
  }

  modificarPaquete = async (request, id) => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return;
      let { status, message, paquete } = await PackageFunctions.modificarPaquete(url, token, request, id);
      if(status === 200) this.props.enqueueSnackbar('Paquete modificado correctamente.', { variant: 'success' });
      else this.props.enqueueSnackbar(message, { variant: 'error' });
      return { status, message, paquete };
    }
  }

  eliminarPaquete = async (id) =>{
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token'); 
      if(!token) return;
      let { status, message } = await PackageFunctions.eliminarPaquete(url, token, id);
      if(status === 200) this.props.enqueueSnackbar('Paquete eliminado correctamente.', { variant: 'success' });
      else this.props.enqueueSnackbar(message, { variant: 'error' });
      return status;
    }
  }

  agregarAlCarrito = (producto, cantidad=1) => {
    let token = cookies.get('access_token'); 
    if(!token) return;

    if(producto.companyId === this.state.loggedUser.userCompanyId) return;

    let cart = CartFunctions.agregarAlCarrito(this.state.cart, producto, cantidad);

    this.setState({cart: cart}, async () => {
      await this.cartTotalCalculate();
    });
    this.props.enqueueSnackbar('Producto agregado al carrito.', { variant: 'success' });
  }
  
  borrarItemCarrito = (id, esPackage, companyId) => {
    let token = cookies.get('access_token'); 
    if(!token) return;

    let cart = CartFunctions.borrarItemCarrito(this.state.cart, id, esPackage, companyId);

    this.setState({cart: cart}, () => this.cartTotalCalculate());

    this.props.enqueueSnackbar('Producto eliminado del carrito.', { variant: 'success' });
  }

  cambiarCantidadProdCarrito = async (id, esPackage, companyId,  cantidad) => {
    let token = cookies.get('access_token'); 
    if(!token) return;

    let cart = CartFunctions.cambiarCantidadProdCarrito(this.state.cart, id, esPackage, companyId, cantidad);
    this.setState({cart: cart}, () => this.cartTotalCalculate());
  }

  // cartEnvioChange = (id, value, selectedEnvio) => {
  //   let token = cookies.get('access_token'); 
  //   if(!token) return;

  //   let cart = CartFunctions.cartEnvioChange(this.state.cart, id, value, selectedEnvio);
  //   this.setState({cart: cart}, () => this.cartTotalCalculate());
  // }

  cartTotalCalculate = async (voucher) => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return
  
      let request = {
        contenido: this.state.cart.contenido,
        voucher: voucher ? voucher : this.state.cart.voucher
      }
  
      let { status, cart, voucher: voucherValido} = await CartFunctions.calcularTotal(url, token, request, this.state.cart);
  
      this.setState({cart});
  
      if(status === 200 && voucherValido && voucher) this.props.enqueueSnackbar('Voucher agregado exitosamente.', { variant: 'success' });
      else if(status === 200 && !voucherValido && voucher) this.props.enqueueSnackbar('Voucher invalido', { variant: 'error' });
      else if(status !== 200) this.props.enqueueSnackbar('Ocurrio un error al calcular el carrito', { variant: 'error' });
    }
  }

  realizarPedido = async () => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return

      if(this.state.cart.contenido.length === 0) return;
      
      let request = {
        userId: this.state.loggedUser.userId,
        buyerId: this.state.loggedUser.userCompanyId,
        amount: this.state.cart.total,
        voucher: this.state.cart.voucher,
        deliveryType: 'Comprador', //trabajar este punto
        contenido: this.state.cart.contenido
      }
      let { message, status } = await CartFunctions.realizarPedido(request, url, token);
      
      if(status === 201 || status === 200) {
        this.props.enqueueSnackbar('Pedido realizado con exito.', { variant: 'success' });
        this.setState({
          cart: {
            contenido: [],
            subTotal: 0,
            subTotalEnvios: 0,
            total: 0
          }
        });
        history.push('/products');
        history.go();
      }
      else this.props.enqueueSnackbar(message, { variant: 'error' });
    }
  }

  ajustarPrecioCategoria = async (category, request) => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return
  
      let { status, message } = await ProductFunctions.ajustarPrecioCategoria(url, token, category, this.state.loggedUser.userCompanyId, request);
      if(status === 200) this.props.enqueueSnackbar('Precios ajustados.', { variant: 'success' });
      else this.props.enqueueSnackbar(message, { variant: 'error' });
      return status;
    }
  }

  getReporteCompras = async () => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return
      return await ReportesFunctions.getPedidosByUser(url, token, this.state.loggedUser.userId);
    }
  }

  getReporteVentas = async () => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return
      return await ReportesFunctions.getTransactionsByCompany(url, token, this.state.loggedUser.userCompanyId);
    }
  }

  getTopCincoMasVendidos = async (date) => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return
      return await ReportesFunctions.getTopCincoMasVendidos(url, token, this.state.loggedUser.userCompanyId, date);
    }
  }

  getTopCincoMenosVendidos = async (date) => {
    let tokenValido = await this.verificarToken();

    if(!tokenValido){
      this.props.enqueueSnackbar('Token invalido, vuelva a iniciar sesion.', { variant: 'error' });
    }
    else{
      let token = cookies.get('access_token');
      if(!token) return
      return await ReportesFunctions.getTopCincoMenosVendidos(url, token, this.state.loggedUser.userCompanyId, date);
    }
  }

  linkProductList = () => (
    <ProductList
      getProductos={this.getAllProducts}
      getPaquetes={this.getAllPackages}
      getCategories={this.getCategories}
      cambiarVentana={this.cambiarVentana}
    />
  );

  linkCompanyList = () => (
    <CompanyList
      getContent={this.getAllCompanies}
      getCategories={this.getRubros}
      getTipos={this.getTypes}
      onCompanyClick={this.seleccionarCompany}
    />
  );

  linkCarrito = () => (
    <Carrito 
      cart={this.state.cart}
      onDelete={this.borrarItemCarrito}
      cartEnvioChange={this.cartEnvioChange}
      cambiarCantidadProdCarrito={this.cambiarCantidadProdCarrito}
      realizarPedido={this.realizarPedido}
      sendVoucher={this.cartTotalCalculate}
      verificarToken={this.verificarToken}
      enqueueSnackbar={this.props.enqueueSnackbar}
    />
  );

  linkProfile = () => (
    <Profile 
      getUser={this.getUserById}
      getCompany={this.getCompanyById}
      userId={this.state.loggedUser.userId}
      companyId={this.state.loggedUser.userCompanyId}
      getRubros={this.getRubros}
      modificarPerfil={this.modificarPerfil}
      verificarToken={this.verificarToken}
    />
  );

  linkMisProductos = () => (
    <MisProductos
      getProductos={this.getProductsByCompany}
      getPaquetes={this.getPackagesByCompany}
      company={this.state.loggedUser.userCompanyId}
      getCategories={this.getCategories}
      modificarProducto={this.modificarProducto}
      eliminarProducto={this.eliminarProducto}
      modificarPaquete={this.modificarPaquete}
      eliminarPaquete={this.eliminarPaquete}
      ajustarPrecioCategoria={this.ajustarPrecioCategoria}
      enqueueSnackbar={this.props.enqueueSnackbar}
      flag={'productos'}
      verificarToken={this.verificarToken}
    />
  );

  linkReporteCompras = () => (
    <ReporteCompras
      getPedidos={this.getReporteCompras}
      verificarToken={this.verificarToken}
    />
  );

  linkReporteVentas = () => (
    <ReporteVentas
      getTransactions={this.getReporteVentas}
      verificarToken={this.verificarToken}
    />
  );

  linkReporteTopCincoMas = () => (
    <TopCincoMasVendidos
      getDatos={this.getTopCincoMasVendidos}
      verificarToken={this.verificarToken}
    />
  );

  linkReporteTopCincoMenos = () => (
    <TopCincoMenosVendidos
      getDatos={this.getTopCincoMenosVendidos}
      verificarToken={this.verificarToken}
    />
  );

  linkProductsCompanyList = () => (
    <ProductList
      flagCart={this.state.loggedUser.userCompanyId}
      agregarAlCarrito={this.agregarAlCarrito}
      getProductos={this.getProductsByCompany}
      getPaquetes={this.getPackagesByCompany}
      company={this.state.companiaSeleccionada}
      getCategories={this.getCategories}
      cambiarVentana={this.cambiarVentana}
      verificarToken={this.verificarToken}
    />
  );

  linkDetalleProducto = ({match: {params}}) => (
    <DetalleProducto 
      getCompanyProductsByProduct={this.getCompanyProductsByProduct}
      productId={params.productId}
      getProductById={this.getProductById}
      agregarAlCarrito={this.agregarAlCarrito}
      loggedCompany={this.state.loggedUser.userCompanyId}
      verificarToken={this.verificarToken}
      // test={props}
    />
  );

  linkDetallePackage = () => (
    <DetallePackage 
      packageId={this.state.productSeleccionado}
      getPackageById={this.getPackageById}
      agregarAlCarrito={this.agregarAlCarrito}
      loggedCompany={this.state.loggedUser.userCompanyId}
      verificarToken={this.verificarToken}
    />
  );

  render() {
    return (
        <BrowserRouter>
          <Fragment>
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
              registroProductosBulk={this.registroProductosBulk}
              getProductosByCompany = {this.getProductsByCompany}
              crearPaquete={this.crearPaquete}
              enqueueSnackbar={this.props.enqueueSnackbar}
            />
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/products' component={this.linkProductList} exact />
              <Route path='/companies' component={this.linkCompanyList} exact />
              <Route path='/carrito' component={this.linkCarrito} exact />
              <Route path='/profile' component={this.linkProfile} exact />
              <Route path='/misProductos' component={this.linkMisProductos} exact />
              <Route path='/reporte/compras' component={this.linkReporteCompras} exact />
              <Route path='/reporte/ventas' component={this.linkReporteVentas} exact />
              <Route path='/reporte/topcincomas' component={this.linkReporteTopCincoMas} exact />
              <Route path='/reporte/topcincomenos' component={this.linkReporteTopCincoMenos} exact />
              <Route path='/products/company' component={this.linkProductsCompanyList} exact />
              <Route path='/product/:productId' component={this.linkDetalleProducto} exact/>
              <Route path='/package/:productId' component={this.linkDetallePackage} exact />
            </Switch>
          </Fragment>
        </BrowserRouter>
    );
  }
}

export default withSnackbar(App);