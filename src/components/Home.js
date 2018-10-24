import React, { Component } from 'react';
import '../App.css';

class Home extends Component{

    // constructor(props){
    //     super(props);
    //     this.state = {
            
    //     }
    // }

    // componentDidMount(){
        // if(document.cookie){
        //     this.setState({logged: true}).then(() => {

        //     });
        // }
    // }

    render(){
        let userData = this.props.userData;
        return(
            <div>
            {/* <p>{userData.logged}</p>
            <p>{userData.userType}</p>
            <p>{userData.userEmail}</p> */}
            <p>{userData.userName}</p>
            {/* <p>{userData.userId}</p> */}
            </div>
        );
    }
}

export default Home;