import React,{Component} from 'react';
import {connect} from 'react-redux';
import Auth0Lock from 'auth0-lock'
import '../Style/style.css';
import MemeItem from './MemeItem';
import MyMemes from './MyMemes';
import Memes from './Memes';
import Login from './Login'

class App extends Component{

constructor(){

  super();

  this.state={
    memeLimit:10,
    text0:'',
    text1:'',
    idToken:'',
    profile:{},
    loggedIn:'false'
  }
}

 static defaultProps={
    clientID: 'FdjwbmAj1rFlHZam07IGBSm0Jt08FUKt',
    domain: 'dilipan.auth0.com'
  }

  componentWillMount(){
      this.lock =new Auth0Lock(this.props.clientID,this.props.domain);

      this.lock.on('authenticated',(authResult)=>{
        this.lock.getProfile(authResult.idToken,(error,profile)=>{
          if(error){
            console.log(error);
            return;
          }
          this.setProfile(authResult.idToken,profile);
        });
      });

      this.getProfile();



      if(!this.state.loggedIn){
        this.showLock();
      }
    }



    setProfile(idToken,profile){
      localStorage.setItem('idToken',idToken);
      localStorage.setItem('profile',JSON.stringify(profile));

      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile')),
        loggedIn:true
      });
    }

    getProfile(){
      if(localStorage.getItem('idToken') !=null){

        this.setState({
          idToken: localStorage.getItem('idToken'),
          profile: JSON.parse(localStorage.getItem('profile')),
          loggedIn:true
        },()=>{
          console.log('profile',this.state);
        });
      }

    }

    showLock(){
      this.lock.show();
    }

    logout(){
      this.setState({
        idToken:'',
        profile:'',
        loggedIn:false
      },()=>
    localStorage.removeItem('idToken'),
    localStorage.removeItem('profile'))
    this.showLock();
    }

  render(){
  let page;
  if(this.state.idToken) {
    page=  <Memes text0={this.state.text0} text1={this.state.text1}
    loggedIn={this.state.loggedIn}
    onLogout={this.logout.bind(this)} />
  }else{
  page=  <Login onLogin={this.showLock.bind(this)} />
  }
    return(
  <div>
  {page}
</div>
    )
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps,null)(App);
