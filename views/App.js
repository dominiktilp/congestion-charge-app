import React, { PropTypes } from 'react';

function App(props) {
  
  return (
    <div className="container">
      <div id="top-bar">
        <h1>Congestion Charge</h1>
      </div>
      <div className="body">
        {props.main}
      </div>
    </div>
  );

}

App.propTypes = {
  main: PropTypes.element
};

export default App;
