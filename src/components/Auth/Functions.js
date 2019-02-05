import axios from 'axios';

const verificarToken = async (url, token) => {
    let request = new Request(`${url}/api/auth`, {
        method: 'POST',
        headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', token: token}),
        credentials: 'same-origin',
    })
    let valido = false;
    let data = await fetch(request)
                    .then(res => {
                        if(res.status === 200) valido = true;
                        return res.json()
                    })
                    .then(data => {
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
                            return data;
                        })
                        .catch(err => {
                            console.log(`Error al enviar cierre de sesion : ${err}`);
                        });
    return { result, status };
};

const signup = async (url, request) => {
    let response = await axios({
        method: 'post',
        url: `${url}/api/auth/signup`,
        headers: { 'Content-Type': 'application/json' },
        data: request
    })
    .then(res => {
        if (res) return { status: res.status, message: res.data.message };
        else return{status: 500, message: 'Ocurrio un error al procesar la solicitud'};
    })
    .catch(err => {
        console.log(`Error al realizar registro ${err}`);
        return {status: err.response.status, errores: err.response.data};
    });

    return response;
}

export default {
    verificarToken,
    login,
    logout,
    signup
}