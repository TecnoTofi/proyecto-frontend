import axios from 'axios';

const getAllProducts = async (url) => {
    let productos = await fetch(`${url}/api/product`)
                                .then(response => (
                                response.json()
                                ))
                                .then(data => {
                                    if(!data.message){
                                        let response = data.map(prod => {
                                            prod.imageUrl = `${url}/${prod.imagePath}`;
                                            prod.esPackage = false;
                                            return prod;
                                            });
                                        return response;
                                    }
                                    else{
                                        return null;
                                    }
                                })
                                .catch(err => console.log(err));
    return productos;
};

const getProductsByCompany = async (url, id) => {
    let productos = await fetch(`${url}/api/product/company/${id}`)
                            .then(response => (
                                response.json()
                            ))
                            .then(data => {
                                if(data){
                                    let response = data.map(prod => {
                                        prod.imageUrl = `${url}/${prod.imagePath}`;
                                        prod.esPackage = false;
                                        return prod;
                                    });
                                    return response;
                                }
                                else{
                                    return null;
                                }                                
                            })
                            .catch(err => {
                                console.log(err);
                                return [];
                            });
    return productos;
};

const getProductById = async (url, id) =>{
    let producto = await fetch(`${url}/api/product/${id}`)
                                .then(response => (
                                  response.json()
                                ))
                                .then(data => {
                                  data.imageUrl = `${url}/${data.imagePath}`;
                                  return data;
                                })
                                .catch(err => console.log(err));
      return producto;
};

const getCompanyProductsByProduct = async (url, id) => {
    let productos = await fetch(`${url}/api/product/${id}/companies`)
                                .then(response => (
                                  response.json()
                                ))
                                .then(data => {
                                  let response = data.map(prod => {
                                              prod.imageUrl = `${url}/${prod.imagePath}`;
                                              prod.esPackage = false;
                                              return prod;
                                            });
                                  return response;
                                })
                                .catch(err => console.log(err));
    return productos;
};

const getNotAssociated = async(url, id) => {
    let productos = await fetch(`${url}/api/product/company/${id}/notassociated`)
                            .then(response => (response.json()))
                            .then(data => {
                            let response = data.map(prod => {
                                        prod.imageUrl = `${url}/${prod.imagePath}`;
                                        prod.esPackage = false;
                                        return prod;
                                        });
                            return response;
                            })
                            .catch(err => console.log(err));
    return productos;
}

const getAllCompanyProductsByCompany = async (url, id) => {
    let productos = await fetch(`${url}/api/product/company/${id}/all`)
                            .then(response => (
                                response.json()
                            ))
                            .then(data => {
                                if(data){
                                    let response = data.map(prod => {
                                        prod.imageUrl = `${url}/${prod.imagePath}`;
                                        prod.esPackage = false;
                                        return prod;
                                    });
                                    return response;
                                }
                                else{
                                    return null;
                                }                                
                            })
                            .catch(err => {
                                console.log(err);
                                return [];
                            });
    return productos;
};

const registroProducto = async (url, token, request) => {
    let response = await axios({
        method: 'post',
        url: `${url}/api/product/company`,
        headers: { 'Content-Type': 'application/json', token: token },
        data: request
    })
    .then(res => {
        if (res) return { status: res.status, message: res.data.message, producto: res.data.product };
        else return{status: 500, message: 'Ocurrio un error al procesar la solicitud'};
    })
    .catch(err => {
        return {status: err.response.status, errores: err.response.data};
    });

    return response;
};

const asociarProducto = async (url, token, request) => {
    let response = await axios({
        method: 'post',
        url: `${url}/api/product/associate`,
        headers: { 'Content-Type': 'application/json', token: token },
        data: request
    })
    .then(res => {
        return { status: res.status, message: res.data.message, producto: res.data.product };
    })
    .catch(err => {
        return {status: err.response.status, errores: err.response.data};
    });

    return response;
};

const modificarProducto = async (url, token, request, productId, companyId) => {
    let response = await axios({
        method: 'put',
        url: `${url}/api/product/${productId}/company/${companyId}`,
        headers: { 'Content-Type': 'application/json', token: token },
        data: request
    })
    .then(res => {
        return { status: res.status, message: res.data.message, producto: res.data.product };
    })
    .catch(err => {
        return {status: err.response.status, errores: err.response.data};
    });

    return response;
};


const eliminarProducto = async (url, token, id) =>{
    let response = await axios({
        method: 'delete',
        url: `${url}/api/product/company/${id}`,
        headers: { 'Content-Type': 'application/json', token: token }
    })
    .then(res => {
        return { status: res.status, message: res.data.message };
    })
    .catch(err => {
        if(err.response.data.message) return {status: err.response.status, message: err.response.data.message};
        return {status: err.response.status, errores: err.response.data};
    });

    return response;
};

const restaurarProducto = async (url, token, id) =>{
    let response = await axios({
        method: 'put',
        url: `${url}/api/product/company/${id}/restore`,
        headers: { 'Content-Type': 'application/json', token: token }
    })
    .then(res => {
        return { status: res.status, message: res.data.message };
    })
    .catch(err => {
        if(err.response.data.message) return {status: err.response.status, message: err.response.data.message};
        return {status: err.response.status, errores: err.response.data};
    });

    return response;
};

const registroProductosBulk = async (url, token, request) => {
    let response = await axios({
        method: 'post',
        url: `${url}/api/product/bulk`,
        headers: { 'Content-Type': 'application/json', token: token },
        data: request
    })
    .then(res => {
        return { status: res.status, errores: res.data };
    })
    .catch(err => {
        return {status: err.response.status, errores: err.response.data};
    });

    return response;
};

const ajustarPrecioCategoria = async (url, token, category, company, body) => {
    let request = new Request(`${url}/api/product/company/${company}/category/${category}/price`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json', token: token}),
        body: JSON.stringify(body)
        });

        let status;
        let message = await fetch(request)
                        .then((response) => {
                            status = response.status
                            return response.json();
                        })
                        .then(data => {
                            return data.message;
                        })
                        .catch(err => {
                            return {status: err.response.status, errores: err.response.data};
                        });
    return { status, message };
}

export default {
    getAllProducts,
    getProductsByCompany,
    registroProducto,
    asociarProducto,
    modificarProducto,
    eliminarProducto,
    getProductById,
    getCompanyProductsByProduct,
    getNotAssociated,
    registroProductosBulk,
    ajustarPrecioCategoria,
    getAllCompanyProductsByCompany,
    restaurarProducto
}