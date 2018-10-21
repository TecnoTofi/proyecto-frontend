import React, { Component } from 'react';
import './App.css';
import RegisterForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

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
    fetch(`http://${ipServidor}:${port}/api/companies/types`)
      .then(res => {
        res.json()
          .then(data => {
            this.setState({companyTypes: data});
          })
      });

      fetch(`http://${ipServidor}:${port}/api/users/types`)
      .then(res => {
        res.json()
          .then(data => {
            this.setState({userTypes: data});
          })
      });
  }

  registroUsuarioEmpresa(signupdata){
    let request = new Request(`http://${ipServidor}:${port}/api/auth/signup`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(signupdata)
    });

    fetch(request)
      .then((res) => {
        res.json()
          .then(data => {
            console.log(data);
          })
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
