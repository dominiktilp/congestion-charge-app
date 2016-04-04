import React from 'react';
import { browserHistory } from 'react-router';

class BottomBar extends React.Component {
  
  render() {
    return (
      <div id="bottom-bar">
        {this.props.children}
      </div>
    );
  }
  
}

BottomBar.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
};

export default BottomBar;
