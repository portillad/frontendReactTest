import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

class List extends Component {

  render() {
    const var1 = Object.values(this.props.vehicles);
// console.log(var1);
    const vehicles_HTMLTABLE = var1.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.vehicle_type}</td>
                    <td>{item.vehicle_tires}</td>
                    <td>{item.vehicle_power}</td>
                </tr>
            );
        });
    

    if(!localStorage.getItem('token')){
      return <Redirect to={'login'} />
    }


    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Tires</th>
              <th scope="col">Power</th>
            </tr>
          </thead>
          <tbody>
           { vehicles_HTMLTABLE }
          </tbody>
        </table>
      </div>
    )
  }
}

export default List