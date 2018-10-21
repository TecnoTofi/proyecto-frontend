import React, { Component } from 'react';
import './App.css';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';

const ipServidor = 'localhost';
const port = 3000;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      companyTypes: [],
      userTypes: []
    }

    this.registroUsuarioEmpresa = this.registroUsuarioEmpresa.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    fetch(`http://${ipServidor}:${port}/api/empresas/types`)
      .then(res => {
        res.json()
          .then(data => {
            this.setState({companyTypes: data});
          })
      });

      fetch(`http://${ipServidor}:${port}/api/user/types`)
      .then(res => {
        res.json()
          .then(data => {
            this.setState({userTypes: data});
          })
      });
  }

  registroUsuarioEmpresa(registerData){
    let request = new Request(`http://${ipServidor}:${port}/api/register`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(registerData)
    });

    fetch(request)
      .then((res) => {
          res.json()
              .then(data => {
                  console.log(data);
              });
      });
  }

  login(loginData){
    
  }

  render() {
    return (
      <div className="App">
        <RegisterForm companyTypes={this.state.companyTypes} userTypes={this.state.userTypes} onClick={this.registroUsuarioEmpresa}/>
        <br />
        <LoginForm />
      </div>
    );
  }
}

export default App;
