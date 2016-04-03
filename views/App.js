import React, { PropTypes } from 'react';

function App(props) {
  
  return (
    <div>
      App
      Main:
      {props.main}
    </div>
  );

}

App.propTypes = {
  main: PropTypes.element
};

export default App;
