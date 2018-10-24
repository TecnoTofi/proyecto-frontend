import React, { Component } from 'react';
import './App.css';
import RegisterForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import CompanyList from './components/companyList';
import Cookies from 'universal-cookie';
import Home from './components/Home';
const cookies = new Cookies();


const ipServidor = 'localhost';
const port = 3000;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      userData: {
        logged: false,
        userType: '',
        userName: '',
        userEmail: '',
        userId: 0
      },
      companyTypes: [],
      userTypes: [],
      companies:[]
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
      fetch(`http://${ipServidor}:${port}/api/companies`)
      // , {
      //   method: 'GET',
      //   headers: new Headers({ 'Content-Type': 'application/json', 'Token': cookies.get('access_token')}),
      //   credentials: 'same-origin'
      // })
      .then(res => {
        res.json()
          .then(data => {
            this.setState({companies: data});
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
    let request = new Request(`http://${ipServidor}:${port}/api/auth/login`, {
      method: 'POST',
      headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json'}),
      credentials: 'same-origin',
      body: JSON.stringify(loginData)
    });

    fetch(request)
      .then((res) => {
        res.json()
          .then(data => {
            let userData = {
              logged: true,
              userType: data.userData.userType,
              userName: data.userData.userName,
              userEmail: data.userData.userEmail,
              userId: data.userData.userId
            };
            // console.log(userData);
            this.setState({userData: userData});
            cookies.set('access_token', data.token, { path: '/' });
          });
      });
  }

  render() {
    return (
      <div className="App">
        <Home userData={this.state.userData} />
        <RegisterForm companyTypes={this.state.companyTypes} userTypes={this.state.userTypes} onClick={this.registroUsuarioEmpresa}/>
        <br />
        <LoginForm onClick={this.login} />
        <br />
        <CompanyList companies={this.state.companies} />
      </div>
    );
  }
}

export default App;
