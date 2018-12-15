//retornar algo
const verificarToken = async (url, token) => {
    //cambiar a GET
    let request = new Request(`${url}/api/auth`, {
        method: 'POST',
        headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
        credentials: 'same-origin',
      })
      let valido = false;
      let data = await fetch(request)
                    .then(res => {
                        if(res.status === 200) valido = true;
                        // console.log('status', res.status);
                        return res.json()
                    })
                    .then(data => {
                        // console.log('data', data);
                        return data
                    })
                    .catch(err => {
                        console.log(err);
                        valido = false;
                        return null;
                    });
    return { valido, data };
};

const login = async (url, userEmail, userPassword) => {
    let request = new Request(`${url}/api/auth/login`, {
      method: 'POST',
      headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json'}),
      credentials: 'same-origin',
      body: JSON.stringify({userEmail, userPassword})
    });
    let status = 0;
    let result = await fetch(request)
                    .then((res) => {
                        status = res.status;
                        return res.json();
                    })
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        console.log(`Error al enviar inicio de sesion : ${err}`);
                    });
    return { result, status };
};

const logout = async (url) => {
    let request = new Request(`${url}/api/auth/logout`, {
      method: 'POST',
      headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json'}),
      credentials: 'same-origin'
    });

    let status = 0;
    let result = await fetch(request)
                        .then((res) => {
                        status = res.status;
                        return res.json()
                        })
                        .then(data => {
                            console.log(data);
                            return data;
                        })
                        .catch(err => {
                            console.log(`Error al enviar cierre de sesion : ${err}`);
                        });
    return { result, status };
};

export default {
    verificarToken,
    login,
    logout
}