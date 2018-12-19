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

// const getProductCategories = async (url) => {
//     let categories = await fetch(`${url}/api/product/category`)
//                                 .then(response => (
//                                 response.json()
//                                 ))
//                                 .then(data => {
//                                 // console.log('categorias productos', data);
//                                 return data;
//                                 // this.setState({productCategories: data})
//                                 })
//                                 .catch(err => console.log(err));
//     return categories;
// }; 

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
    // let token = cookies.get('access_token');
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
        return null;
    }
};
//retornar algo
const asociarProducto = (url, token, body) => {
    // let token = cookies.get('access_token');
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
};

const getProductById = async (url, id) =>{
    console.log(id);
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

const getProductsCompanyByCompanies = async (url, id) => {
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

const modificarProducto = async (url, request, id) => {
    axios.post(`${url}/api/product/update/company/${id}`,
      request)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
};

const eliminarProducto = async (url, id) =>{
      axios.post(`${url}/api/product/delete/company/${id}`)
        .then(res => {
          console.log(res);
            
        })
        .catch(err => {
          console.log(err);
        });
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
    getProductsCompanyByCompanies
}