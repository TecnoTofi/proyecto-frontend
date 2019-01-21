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
                                // console.log('data', data);
                                if(data){ //ver que pasa aca
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

//revisar, que retorne algo, ver res.json
const registroProducto = (url, token, request) => {
    if(token){
        let instance = axios.create({
                        baseURL: `${url}/api/product/company`,
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
        return null;
    }
};
//retornar algo
const asociarProducto = (url, token, body) => {
    if(token){

        let request = new Request(`${url}/api/product/associate`, {
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
};

const getProductById = async (url, id) =>{
    let producto = await fetch(`${url}/api/product/${id}`)
                                .then(response => (
                                  response.json()
                                ))
                                .then(data => {
                                  // console.log('data', data);
                                  /*let response = data.map(prod => {
                                              prod.imageUrl = `${url}/${prod.imagePath}`;
                                              return prod;
                                            });
                                  return response;*/
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
                                  // console.log('data', data);
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
                            // console.log('data', data);
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

const modificarProducto = async (url, token, request, productId, companyId) => {

    let response = await axios({
        method: 'put',
        url: `${url}/api/product/${productId}/company/${companyId}`,
        headers: { 'Content-Type': 'application/json', token: token },
        data: request
    })
    .then(res => {
        console.info(res);
        if (res) return { status: res.status, message: res.data.message, producto: res.data.product };
        else return{status: 500, message: 'Ocurrio un error al procesar la solicitud'};
    })
    .catch(err => {
        console.log(`Error al modificar el producto ${err}`);
        return {status: 500, message: err};
    });

    return response;
};

const eliminarProducto = async (url, token, id) =>{
    let request = new Request(`${url}/api/product/company/${id}`, {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json', token: token})
        });

        let response = await fetch(request)
                        .then((response) => {
                            // console.info('res', response);
                            return response.json();
                        })
                        .then(data => {
                            if(data) return data.message;
                            else return null;
                        })
                        .catch(err => {
                            console.log(`Error al eliminar producto : ${err}`);
                        });
    return response;
};

export default {
    getAllProducts,
    getProductsByCompany,
    // getProductCategories,
    registroProducto,
    asociarProducto,
    modificarProducto,
    eliminarProducto,
    getProductById,
    getCompanyProductsByProduct,
    getNotAssociated,
}