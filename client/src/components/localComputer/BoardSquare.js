import React, { Component } from 'react';
import O from '../functional/icons/O';
import X from '../functional/icons/X';

class BoardSquare extends Component {
  getIcon=()=>{
    if(this.props.value==='X'){
         return <X/>
    }
    if(this.props.value==="O"){
       return <O/>
    }
  }
  render() {
    const styles = {
      
      position: 'relative',
      
    };
    return (
      <div className="square" onClick={this.props.onClick} style={styles}>
        {this.getIcon()}
      </div>
    );
  }
}

export default BoardSquare;
