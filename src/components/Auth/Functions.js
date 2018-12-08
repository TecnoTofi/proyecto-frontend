//retornar algo
const verificarToken = async (url, token) => {
    //cambiar a GET
    let requestAuth = new Request(`${url}/api/auth`, {
        method: 'POST',
        headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
        credentials: 'same-origin',
        body: JSON.stringify({message: 'AuthToken'})
      })
      let valido = false;
      let data = await fetch(requestAuth)
                    .then(res => {
                        if(res.status === 200) valido = true;
                        console.log('status', res.status);
                        return res.json()
                    })
                    .then(data => {
                        console.log('data', data);
                        return data
                    })
                    .catch(err => {
                        console.log(err);
                        valido = false;
                        return null;
                    });
    return { valido, data };
};

export default {
    verificarToken
}