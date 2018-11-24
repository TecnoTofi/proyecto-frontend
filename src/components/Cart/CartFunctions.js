const agregarAlCarrito = (cart, producto, cantidad=1) => {
    // let cart = this.state.cart;
    let existePos = 0;
    let existe = cart.productos.filter((prod, i) => {
      let val = prod.id === producto.id;
      if(val) existePos = i;
      return val;
    })[0];

    if(existe){
      existe.quantity += cantidad
      cart.productos[existePos] = existe;
    }
    else{
      producto.quantity = cantidad;
      producto.envio = false;
      producto.envioType = '1';
      producto.priceEnvio = 100 //esto debe ser parte del producto? o de la empresa?
      cart.productos.push(producto);
    }
    return cart;
    // this.setState({
    //   cart: cart
    // }, () => this.cartTotalCalculate())
  }
  
  const borrarItemCarrito = (cart, id) => {
    // let cart = this.state.cart;
    let productos = cart.productos.filter(item => {
      return item.id !== id;
    });
    cart.productos = productos;
    return cart;
    // this.setState({cart: cart}, () => this.cartTotalCalculate());
  }

  const cambiarCantidadProdCarrito = (cart, id, cantidad) => {
    // let cart = this.state.cart;
    let productos = cart.productos.map(prod => {
      if(prod.id === id) prod.quantity = cantidad;
      return prod;
    });
    cart.productos = productos;
    return cart;
    // this.setState({cart: cart}, () => this.cartTotalCalculate());
  }

  const cartEnvioChange = (cart, id, value, selectedEnvio) => {
    // let cart = this.state.cart;
    let productos = cart.productos.map(prod => {
      if(prod.id === id){
        prod.envio = value;
        prod.envioType = selectedEnvio
      }
      return prod;
    });
    cart.productos = productos;
    return cart;
    // this.setState({cart: cart}, () => this.cartTotalCalculate());
  }

  const cartTotalCalculate = (cart) => {
    // let cart = this.state.cart;
    let subTotal = 0;
    let subTotalEnvios = 0;
    let total = 0;

    cart.productos.map(prod => {
      subTotal += prod.price * prod.quantity;
      if(prod.envio) subTotalEnvios += prod.priceEnvio
      total += subTotal + subTotalEnvios;
      return true;
    });
    cart.subTotal = subTotal;
    cart.subTotalEnvios = subTotalEnvios;
    cart.total = total;

    return cart;
    // this.setState({cart: cart});
  }

  export default {
    agregarAlCarrito,
    borrarItemCarrito,
    cambiarCantidadProdCarrito,
    cartEnvioChange,
    cartTotalCalculate
  }