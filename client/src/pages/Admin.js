import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Footer from "../components/Footer"
import Userinfo from "../components/UserInfo"
import API from "../utils/API";
import Auth from "../utils/user";

const pStyle = {
  textAlign : 'center'
};

class Admin extends Component {
  state = {
    accounts: []
  }

  assignRole = (id, role) => {
    var roleInfo = this.findAccount(id);
    roleInfo.role = role;
    Auth.updateUser(roleInfo)
    .then(res => {
      console.log(res.data)
      this.forceUpdate()
    })
    .catch(err => console.log(err));
    
  }

  findAccount = id => {
    for (var i = 0; i < this.state.accounts.length; i++){
      if(this.state.accounts[i]._id == id){
        return this.state.accounts[i]
      }
    }
  }

  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  handleLoad() {
    Auth.getUser()
      .then(res => {
        console.log(res.data);
        var temp = res.data;
        this.state.accounts = temp;
        this.forceUpdate();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <div className='list' style={pStyle}>

          {!this.state.accounts.length ? (<h1>No new pending users</h1>)
            :
            (this.state.accounts.map(stuff => {
              return (
                <Userinfo
                id={stuff._id}
                  image={stuff.photoURL}
                  name={stuff.name}
                  email={stuff.email}
                  role={stuff.role}
                  clicked={this.assignRole}
                  />
                  );
                })
                )
              }
        </div>
      </React.Fragment>
    );
  }
}
// Entries.propTypes = {
//   classes: PropTypes.object.isRequired, 
// };

export default Admin;