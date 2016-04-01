const React = require('react');
import { Link } from 'react-router';

export default props => {
  return (
    <div>
      <div>Page</div>
      <Link to="/set-vehicle">Set Vehicle</Link>
    </div>
  );
};
