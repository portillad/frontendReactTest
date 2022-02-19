import React, { Component } from 'react'
import Nav from './Nav'
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import List from '../components/List';
import AddNew from '../components/AddNew';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends Component {

  state = {
    user:{},
    vehicles:{}
  }

  componentDidMount(){
    axios.get('/user')
          .then((response) => {
            this.setUser(response.data)
          })
          .catch((error) => {
            console.log(error);
          });

    axios.get('/vehicles')
          .then((response) => {
            if(response.status === 200)
            {
              this.setVehicles(response.data.vehicles)
            }
          })
          .catch((error) => {
            console.log(error);
          });
  }

  setUser = (user) => {
    this.setState({user:user})
  }
  setVehicles = (vehicles) => {
    this.setState({vehicles:vehicles})
  }
  


  render() {



    return (
    <Router>
      <div>
        <Nav user={this.state.user} setUser={this.setUser}/>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route exact path="/login" component={  () => <Login user={ this.state.user } setUser={this.setUser} />  }/>
          <Route exact path="/register" component={  () => <Register user={ this.state.user } setUser={this.setUser} />  }/>
          <Route exact path="/List" component={ () => <List vehicles={ this.state.vehicles } setVehicles={this.setVehicles} /> }/>
          <Route exact path="/AddNew" component={ () => <AddNew user={ this.state.user } setUser={this.setUser} /> }/>
        </Switch>
      </div>
    </Router>
    )
  }
}

export default Header