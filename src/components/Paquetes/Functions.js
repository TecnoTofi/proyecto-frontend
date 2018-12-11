import axios from 'axios';

const getAllPackages = async (url) => {
    let paquetes = await fetch(`${url}/api/package`)
                              .then(res => (
                                res.json()
                              ))
                              .then(data => {
                                let response = data.map(pack => {
                                            // pack.imageUrl = `${url}/${pack.imagePath}`;
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

const getPackagesByCompany = async (url, id) => {
    let paquetes = await fetch(`${url}/api/package/company/${id}`)
                          .then(res => (
                            res.json()
                          ))
                          .then(data => {
                            // console.log('data', data);
                            let response = data.map(pack => {
                                        // pack.imageUrl = `${url}/${pack.imagePath}`;
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

export default {
    getAllPackages,
    getPackagesByCompany,
    getLineasPackage,
    crearPaquete
}