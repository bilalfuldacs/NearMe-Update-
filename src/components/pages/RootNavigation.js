// Layout.js

import React from 'react';
import Navbar from '../navigation/Navigation';

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
