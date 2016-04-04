import React from 'react';
import { browserHistory } from 'react-router';
import BottomBar from './BottomBar.js';

class BackNextBar extends React.Component {
  
  render() {
    return (
      <BottomBar>
        <a href="#" className="button" onClick={this.props.back}>Back</a>
        <a href="#" className="button active" onClick={this.props.next}>Next</a>
      </BottomBar>
    );
  }
  
}

BackNextBar.propTypes = {
  next: React.PropTypes.func.isRequired,
  back: React.PropTypes.func.isRequired
};

export default BackNextBar;
