import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class AddNew extends Component {

    state={
        vehicletype:'',
        power:'',
    }

    formSubmit = (e) => {
        e.preventDefault();
        
        

        if(Number(this.state.power) <= 0 || !this.state.vehicletype){
            return
        }

        console.log(this.state.vehicletype);
        console.log(this.state.power);

        const data = {
            vehicletype:this.state.vehicletype,
            power:this.state.power
        }

        axios.post('/addvehicles',data)
        .then((response) => {
          
          
          window.location.reload(false);
                
        })
        .catch((error) => {
          console.log(error);
        });
      

        
    }



  render() {

    if(!localStorage.getItem('token')){
        return <Redirect to={'login'} />
      }

      return (
        <div><br/><br/>
        <div class="row">
            <div class="jumbotron col-lg-4 offset-lg-4">
                <h3 class="text-center">Add a new Vehicle</h3>
                <br/>
              <form onSubmit={this.formSubmit}>
                <label class="form-label">Vehicle Type:</label>
                <br/>
                <select class="mdb-select md-form" name="vehicletype" required onChange={(e)=>{this.setState({vehicletype:e.target.value})}}>
                    <option disabled selected>Choose option</option>
                    <option value="1">Sedan</option>
                    <option value="2">Motorcycle</option>
                </select>
                <br/><br/>
                  <div class="mb-3">
                      <label class="form-label">Power:</label>
                      <input type="number" name="power" class="form-control" required onChange={(e)=>{this.setState({power:e.target.value})}}/>
                  </div>
                  <br/>
                  <button type="submit" class="btn btn-primary">Add</button>
              </form>
            </div>
        </div>
    </div>
    )
  }
}

export default AddNew