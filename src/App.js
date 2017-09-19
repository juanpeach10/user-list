import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from './actions/index'

import UserItem from './components/UserItem'

import './styles/App.css'
import 'materialize-css/dist/css/materialize.min.css'

class App extends Component {
  constructor(){
    super();

    this.state = {
      rowSelected: 0,
      isConfirmed: false,
      idSelected: []
    }

    this.pushItem = this.pushItem.bind(this);
    this.popItem = this.popItem.bind(this);
    this.showSelected = this.showSelected.bind(this);
  }
  componentDidMount(){
    this.props.getUsers();
  }
  pushItem(id){
    this.setState({
      rowSelected: ++this.state.rowSelected,
      idSelected: this.state.idSelected.concat(id)
    });
  }
  popItem(id){
    let array = this.state.idSelected;
    console.log("array", array);
    let index = array.indexOf(Number(id));
    let newArray = array.splice(index);

    console.log("Id ", id);
    console.log("indexof",index);
    console.log("new array", newArray);

    this.setState({
      rowSelected: --this.state.rowSelected ,
      idSelected: newArray
    });
  }
  showSelected(e){
    this.setState({ isConfirmed: !this.state.isConfirmed });
  }
  showOutput(){
    if (this.state.isConfirmed) {
      console.log("Id selected: " +this.state.idSelected);
      let users = this.props.users.payload;
      return(<div></div>);
    }
  }
  render() {
    if (this.props.users.ready) {
      let self = this;
      let count = 0;
      let users = this.props.users.payload.map((currentValue, index, array) => {
        count += 1;
        return(
          <UserItem
            key={index}
            id={index}
            userName={ currentValue.name }
            email={ currentValue.email }
            pushItem= { self.pushItem }
            popItem= { self.popItem }/>
        );
      });
      return(
        <div className="App">
         { this.state.rowSelected != 0
           ? <h4>{ this.state.rowSelected + " of " + count + " selected" }</h4>
           : <h4></h4>
         }
         { users }
         <button
          className="waves-effect waves-light btn"
          onClick={ this.showSelected }>Confirm
          </button>
          { this.showOutput() }
        </div>
      );
    }
    return (
      <div className="progress">
          <div className="indeterminate"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUsers
  },dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
