import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    state={
        email:'',
        password:'',
        message:''
    }

    formSubmit = (e) => {
        e.preventDefault();

        const data = {
            email:this.state.email,
            password:this.state.password
        }

        axios.post('/login',data)
          .then((response) => {
            localStorage.setItem('token',response.data.token);
            this.setState({
                loggedIn:true
            })
            this.props.setUser(response.data.user);
          })
          .catch((error) => {
            console.log(error);
          });
    }

  render() {

    if(this.state.loggedIn){
        return <Redirect to={'/List'} />
    }


    if(localStorage.getItem('token')){
        return <Redirect to={'/List'} />
      }


    return (
      <div><br/><br/>
          <div class="row">
              <div class="jumbotron col-lg-4 offset-lg-4">
                  <h3 class="text-center">Login</h3>
                <form onSubmit={this.formSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" name="email" class="form-control" required onChange={(e)=>{this.setState({email:e.target.value})}}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" required onChange={(e)=>{this.setState({password:e.target.value})}}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
              </div>
          </div>
      </div>
    )
  }
}

export default Login