import axios from 'axios';

const getUserTypes = async (url) => {
    let userTypes = await fetch(`${url}/api/user/role/signup`)
                            .then(response => (
                              response.json()
                            ))
                            .then(data => {
                              // console.log('user Types', data);
                              return data;
                              // this.setState({userTypes: data});
                            })
                            .catch(err => console.log(err));
    return userTypes;
};

const getUserById = async (url, id) => {
    let usuario = await fetch(`${url}/api/user/${id}`)
              .then(res => (
                res.json()
              ))
              .then(data => {
                return data;
              })
              .catch(err => {
                console.log(`Error al buscar Usuario : ${err}`);
              });
    return usuario;
};

//ver de devolver algo
const registroUsuarioEmpresa = async (url, request) => {
    await axios.post(`${url}/api/auth/signup`, request)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
}

const modificarPerfil = async (url, userId, companyId, request) => {
    // console.log(request.getAll());
    await axios.post(`${url}/api/auth/update/user/${userId}/company/${companyId}`,
    request)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
};

export default {
    getUserTypes,
    getUserById,
    registroUsuarioEmpresa,
    modificarPerfil
}