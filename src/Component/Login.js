import React,{Component} from 'react';

class Login extends Component {
  onLogin(){
    this.props.onLogin()
  }
  render(){
    return(
      <div>
           <p onClick={()=> this.onLogin()}> Click here to Login </p>
      </div>
    );
  }
}

export default Login
