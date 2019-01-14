import axios from 'axios';

const getAllPackages = async (url) => {
    let paquetes = await fetch(`${url}/api/package`)
                              .then(res => (
                                res.json()
                              ))
                              .then(data => {
                                let response = data.map(pack => {
                                            pack.imageUrl = `${url}/${pack.imagePath}`;
                                            pack.esPackage = true;
                                            return pack;
                                          });
                                // console.log('paquetes', response);
                                return response;
                                // return data;
                              })
                              .catch(err => console.log(err));
    return paquetes;
};

const getPackageById = async (url, id) => {
  let paquetes = await fetch(`${url}/api/package/${id}`)
                          .then(res => (
                            res.json()
                          ))
                          .then(data => {
                            // console.log('data', data);
                            data.imageUrl = `${url}/${data.imagePath}`;
                            data.esPackage = true;
                            return data;
                          })
                          .catch(err => console.log(err));
    return paquetes;
}

const getPackagesByCompany = async (url, id) => {
    let paquetes = await fetch(`${url}/api/package/company/${id}`)
                          .then(res => (
                            res.json()
                          ))
                          .then(data => {
                            // console.log('data', data);
                            let response = data.map(pack => {
                                        pack.imageUrl = `${url}/${pack.imagePath}`;
                                        pack.esPackage = true;
                                        return pack;
                                      });
                            return response;
                            // return data
                          })
                          .catch(err => console.log(err));
    return paquetes;
};

const getLineasPackage = async (url, token, id) => {
    // let token = cookies.get('access_token');
      if(token){
      let request = new Request(`${url}/api/package/products/${id}`, {
        method: 'GET',
        headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
        credentials: 'same-origin'
        });
        
        let packages = await fetch(request)
                                .then(response => (
                                  response.json()
                                ))
                                .then(data => {
                                  console.log(data);
                                  return data;
                                })
                                .catch(err => console.log(err));
        return packages;
      }
};

const crearPaquete = (url, token, request) =>{
    // let token = cookies.get('access_token');
    // console.log('token enviado',token);
    // console.log(request);
    if(token){
      let instance = axios.create({
        baseURL: `${url}/api/package`,
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
};

const modificarPaquete = async (url, token, request, id) => {

  let response = await axios({
    method: 'put',
    url: `${url}/api/package/${id}`,
    headers: { 'Content-Type': 'application/json', token: token },
    data: request
  })
  .then(res => {
      console.info(res);
      if (res) return { status: res.status, message: res.data.message };
      else return{status: 500, message: 'Ocurrio un error al procesar la solicitud'};
  })
  .catch(err => {
      console.log(`Error al modificar el paquete ${err}`);
      return {status: 500, message: err};
  });

  return response;

  // axios.post(`${url}/api/package/update/${id}`,
  //   request)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
};

const eliminarPaquete = async (url, token, id) =>{
  let request = new Request(`${url}/api/package/${id}`, {
    method: 'DELETE',
    headers: new Headers({ 'Content-Type': 'application/json', token: token})
    });

    let response = await fetch(request)
                    .then((response) => {
                        console.info('res', response);
                        return response.json();
                    })
                    .then(data => {
                        if(data) return data.message;
                        else return null;
                    })
                    .catch(err => {
                        console.log(`Error al eliminar paquete : ${err}`);
                    });
  return response;
    // axios.post(`${url}/api/package/delete/${id}`)
    //   .then(res => {
    //     console.log(res);
          
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
};

export default {
    getAllPackages,
    getPackageById,
    getPackagesByCompany,
    getLineasPackage,
    crearPaquete,
    modificarPaquete,
    eliminarPaquete,
}