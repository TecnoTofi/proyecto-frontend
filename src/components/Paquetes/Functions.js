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
                                            pack.products = pack.products.map(p => {
                                              p.imageUrl = `${url}/${p.imagePath}`;
                                              return p;
                                            });
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
                            data.imageUrl = `${url}/${data.imagePath}`;
                            data.esPackage = true;
                            data.products = data.products.map(p => {
                              p.imageUrl = `${url}/${p.imagePath}`;
                              return p;
                            });
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
                            let response = data.map(pack => {
                                        pack.imageUrl = `${url}/${pack.imagePath}`;
                                        pack.esPackage = true;
                                        pack.products = pack.products.map(p => {
                                          p.imageUrl = `${url}/${p.imagePath}`;
                                          return p;
                                        });
                                        return pack;
                                      });
                            return response;
                          })
                          .catch(err => console.log(err));
    return paquetes;
};

const crearPaquete = async (url, token, request) =>{
  let response = await axios({
    method: 'post',
    url: `${url}/api/package`,
    headers: { 'Content-Type': 'application/json', token: token },
    data: request
  })
  .then(res => {
      return { status: res.status, message: res.data.message, id: res.data.id };
  })
  .catch(err => {
    if(err.response.data.message) return {status: err.response.status, message: err.response.data.message};
    return {status: err.response.status, errores: err.response.data};
  });

  return response;
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
      
      if (res) return { status: res.status, message: res.data.message, paquete: res.data.package };
      else return { status: 500, message: 'Ocurrio un error al procesar la solicitud' };
  })
  .catch(err => {
      console.log(`Error al modificar el paquete ${err}`);
      return {status: 500, message: err};
  });

  return response;
};

const eliminarPaquete = async (url, token, id) =>{
  let request = new Request(`${url}/api/package/${id}`, {
    method: 'DELETE',
    headers: new Headers({ 'Content-Type': 'application/json', token: token})
    });

    let status;
    let message = await fetch(request)
                    .then((response) => {
                        status = response.status;
                        return response.json();
                    })
                    .then(data => {
                        if(data) return data.message;
                        else return null;
                    })
                    .catch(err => {
                        console.log(`Error al eliminar paquete : ${err}`);
                    });
  return { status, message };
};

export default {
    getAllPackages,
    getPackageById,
    getPackagesByCompany,
    crearPaquete,
    modificarPaquete,
    eliminarPaquete,
}