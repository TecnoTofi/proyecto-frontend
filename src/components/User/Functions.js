import axios from 'axios';

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
    getUserById,
    modificarPerfil
}