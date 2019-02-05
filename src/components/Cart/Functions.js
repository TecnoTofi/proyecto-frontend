const agregarAlCarrito = (cart, producto, cantidad=1) => {
	let existeProd = verificarExistenciaProd(cart.contenido, producto);

	if(existeProd.res){
		if(!producto.esPackage){
			existeProd.res.productos[existeProd.productoPos].timestamp = new Date();
			existeProd.res.productos[existeProd.productoPos].quantity += cantidad;
			cart.contenido[existeProd.sellerPos] = existeProd.res;
		}
		else{
			existeProd.res.paquetes[existeProd.productoPos].timestamp = new Date();
			existeProd.res.paquetes[existeProd.productoPos].quantity += cantidad;
			cart.contenido[existeProd.sellerPos] = existeProd.res;
		}
	}
	else{
		let existeSeller = verificarExistenciaSeller(cart.contenido, producto.companyId);
		producto.quantity = cantidad;
		producto.envio = false;
		producto.envioType = '1';
		producto.priceEnvio = 100 //esto debe ser parte del producto? o de la empresa?
		producto.timestamp = new Date();

		if(existeSeller.res){
			if(!producto.esPackage) existeSeller.res.productos.push(producto);
			else existeSeller.res.paquetes.push(producto);

			cart.contenido[existeSeller.sellerPos] = existeSeller.res;
		}
		else{
			let seller = {
				sellerId: producto.companyId,
				productos: [],
				paquetes: []
			}
			if(!producto.esPackage) seller.productos.push(producto);
			else seller.paquetes.push(producto);
			cart.contenido.push(seller);
		}
	}

	return cart;
}

const verificarExistenciaProd = (contenido, producto) => {
	let productoPos = 0;
	let sellerPos = 0;

	let res = contenido.filter((seller, i) => {
		let encontrado = false;
		if(seller.sellerId === producto.companyId){
			sellerPos = i;
			let x = 0;
			if(!producto.esPackage){
				while(x < seller.productos.length && !encontrado){
					if(seller.productos[x].id === producto.id){
						encontrado = true;
						productoPos = x;
					}
					x++;
				}
			}
			else{
				while(x < seller.paquetes.length && !encontrado){
					if(seller.paquetes[x].id === producto.id){
						encontrado = true;
						productoPos = x;
					}
					x++;
				}
			}
		}
		return encontrado;
	})[0];
	if(!res) res = null;
	return { res, sellerPos, productoPos };
}

const verificarExistenciaSeller = (contenido, id) => {
	let sellerPos = 0;

	let res = contenido.filter((seller, i) => {
		if(seller.sellerId === id){
			sellerPos = i;
			return true;
		}
		else return false;
	})[0];

	return { res, sellerPos };
}

const borrarItemCarrito = (cart, prodId, esPackage, companyId) => {
	let seller = verificarExistenciaSeller(cart.contenido, companyId);

	if(!esPackage){
		let productos = seller.res.productos.filter(item => {
			return item.id !== prodId;
		});
		seller.res.productos = productos;
	}
	else{
		let paquetes = seller.res.paquetes.filter(item => {
			return item.id !== prodId;
		});
		seller.res.paquetes = paquetes;
	}

	if(seller.res.productos.length === 0 && seller.res.paquetes.length === 0){
		cart.contenido = cart.contenido.filter(s => {
			return s.sellerId !== seller.res.sellerId;
		});
	}
	else cart.contenido[seller.sellerPos] = seller.res;
	return cart;
}

const cambiarCantidadProdCarrito = (cart, prodId, esPackage, companyId, cantidad) => {
	let product = {id: prodId, esPackage: esPackage, companyId};
	let seller = verificarExistenciaProd(cart.contenido, product);
	if(!esPackage) seller.res.productos[seller.productoPos].quantity = cantidad;
	else seller.res.paquetes[seller.productoPos].quantity = cantidad;

	cart.contenido[seller.sellerPos] = seller.res;
	return cart;
}

// const cartEnvioChange = (cart, id, value, selectedEnvio) => {
//   // let cart = this.state.cart;
// 	let productos = cart.contenido.map(prod => {
// 		if(prod.id === id){
// 			prod.envio = value;
// 			prod.envioType = selectedEnvio
// 		}
// 		return prod;
// 	});
// 	cart.contenido = productos;
// 	return cart;
//   // this.setState({cart: cart}, () => this.cartTotalCalculate());
// }

const calcularTotal = async (url, token, req, cart) => {

	let request = new Request(`${url}/api/pedido/calcular`,{
		method: 'POST',
		headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json' , token: token}),
		credentials: 'same-origin',
		body: JSON.stringify(req)
	});

	let status;
	let response = await fetch(request)
							.then(res => {
								status = res.status;
								return res.json();
							})
							.then(data => {
								return data;
							})
							.catch(err => {
								console.log('Error en fetch de calculo de carrito');
							});
	let subTotalEnvios = 0;

	cart.contenido.map(seller => {
		seller.productos.map(prod => {
			if(prod.envio) subTotalEnvios += prod.priceEnvio
			return true
		});

		seller.paquetes.map(pack => {
			if(pack.envio) subTotalEnvios += pack.priceEnvio
			return true
		});
		return true;
	});
	cart.subTotal = response.sumaProds + response.sumaPacks;
	cart.subTotalEnvios = subTotalEnvios;
	cart.total = response.total + subTotalEnvios;
	if(status === 200 && req.voucher) cart.voucher = req.voucher;
	
	return { status, cart, voucher: response.voucher };
}

const realizarPedido = async (req, url, token) => {
	let request = new Request(`${url}/api/pedido`, {
		method: 'POST',
		headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
		credentials: 'same-origin',
		body: JSON.stringify(req)
	  });
	  let status = '';
	  let message = await fetch(request)
					.then(res => {
						status = res.status;
						return res.json()
					})
					.then(data => {
							console.log(data);
							return data;
					})
					.catch(err => {
						console.log(`Error en fetch realizar pedido: ${err}`);
					})
	return { message, status };
}

export default {
	agregarAlCarrito,
	borrarItemCarrito,
	cambiarCantidadProdCarrito,
	// cartEnvioChange,
	calcularTotal,
	realizarPedido
}