const getListadoTransacciones = async (url, userId) => {
    let transacciones = await fetch(`${url}/api/pedido/user/${userId}/complete`)
                            .then(response => (
                                response.json()
                            ))
                            .then(data => {
                                console.log('transacciones de un usuario', data);
                                return data;
                            })
                            .catch(err => console.log(err));
    return transacciones;
};

const getPedidosByUser = async (url, token, userId) => {
    let request = new Request(`${url}/api/pedido/user/${userId}`, {
		method: 'GET',
		headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
		credentials: 'same-origin'
	  });

    let status = '';
    let pedidos = await fetch(request)
                            .then(response => {
                                status = response.status;
                                return response.json();
                            })
                            .then(data => {
                                if(data){
                                    if(status === 200){
                                        return data;
                                    }
                                    console.log('User no tiene pedidos');
                                    return null;
                                }
                                else{
                                    console.log('Ocurrio un error en fetch de pedidos de un usuario');
                                    return null;
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                return null;
                            });
    return pedidos;
};

const getTransactionsByCompany = async (url, token, companyId) => {
    let request = new Request(`${url}/api/pedido/company/${companyId}`, {
		method: 'GET',
		headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
		credentials: 'same-origin'
	  });

    let status = '';
    let transacciones = await fetch(request)
                            .then(response => {
                                status = response.status;
                                return response.json();
                            })
                            .then(data => {
                                if(data){
                                    if(status === 200){
                                        return data;
                                    }
                                    console.log('Company no tiene ventas');
                                    return null;
                                }
                                else{
                                    console.log('Ocurrio un error en fetch de trasacciones de una compania');
                                    return null;
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                return null;
                            });
    return transacciones;
};

const getTransactionsPedido = async (url, pedidoId) => {
    let transacciones = await fetch(`${url}/api/pedido/${pedidoId}/transactions`)
                        .then(response => (
                            response.json()
                        ))
                        .then(data => {
                            console.log('transacciones de un pedido', data);
                            return data;
                        })
                        .catch(err => console.log(err));
    return transacciones;
};

const getTransactionProducts = async (url, transactionId) => {
    let productos = await fetch(`${url}/api/pedido/transaction/${transactionId}/products`)
                                .then(response => (
                                    response.json()
                                ))
                                .then(data => {
                                    console.log('productos de una transaccion', data);
                                    return data;
                                })
                                .catch(err => console.log(err));
    return productos;
};

const getTransactionPackages = async (url, transactionId) => {
    let paquetes = await fetch(`${url}/api/pedido/transaction/${transactionId}/packages`)
                                .then(response => (
                                    response.json()
                                ))
                                .then(data => {
                                    return data;
                                })
                                .catch(err => console.log(err));
    return paquetes;
}

const getTopCincoMasVendidos = async (url, token, id, date) => {
    let request = new Request(`${url}/api/pedido/company/${id}/masVendidos`, {
		method: 'POST',
		headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
        credentials: 'same-origin',
        body: JSON.stringify({ dateFrom: date })
    });

    let productos = await fetch(request)
                            .then(response => (
                                response.json()
                            ))
                            .then(data => {
                                return data;
                            })
                            .catch(err => console.log(err));
    return productos;
}

const getTopCincoMenosVendidos = async (url, token, id, date) => {
    let request = new Request(`${url}/api/pedido/company/${id}/menosVendidos`, {
		method: 'POST',
		headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
        credentials: 'same-origin',
        body: JSON.stringify({ dateFrom: date })
    });
      
    let productos = await fetch(request)
                            .then(response => (
                                response.json()
                            ))
                            .then(data => {
                                return data;
                            })
                            .catch(err => console.log(err));
    return productos;
}

export default {
    getPedidosByUser,
    getTransactionsByCompany,
    getTransactionsPedido,
    getTransactionProducts,
    getTransactionPackages,
    getListadoTransacciones,
    getTopCincoMasVendidos,
    getTopCincoMenosVendidos
}