import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends Component {

    state={
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        message:''
    }


    formSubmit = (e) => {
        e.preventDefault();

        const data = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password_confirmation:this.state.password_confirmation
        }

        axios.post('/register',data)
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
                <h3 class="text-center">Register new account</h3>
              <form onSubmit={this.formSubmit}>
                  <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">User Name</label>
                      <input type="text" name="name" class="form-control" required onChange={(e)=>{this.setState({name:e.target.value})}}/>
                  </div>
                  <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Email address</label>
                      <input type="email" name="email" class="form-control" required onChange={(e)=>{this.setState({email:e.target.value})}}/>
                  </div>
                  <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Password</label>
                      <input type="password" name="password" class="form-control" required onChange={(e)=>{this.setState({password:e.target.value})}}/>
                  </div>
                  <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                      <input type="password" name="password_confirmation" class="form-control" required onChange={(e)=>{this.setState({password_confirmation:e.target.value})}}/>
                  </div>
                  <button type="submit" class="btn btn-primary">Register</button>
              </form>
            </div>
        </div>
    </div>
    )
  }
}

export default Register