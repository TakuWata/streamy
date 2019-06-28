import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div>
      <Link to='/'>Streamy</Link>
      <GoogleAuth />
      <hr />
    </div>
  );
};

export default Header;
