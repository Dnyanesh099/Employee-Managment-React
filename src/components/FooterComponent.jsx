

import React from 'react';

const FooterComponent = () => {
  const footerStyle = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: '10px',
    textAlign: 'center'
  };

  return (
    <footer style={footerStyle}>
      © 2024 Employee Management System. All rights reserved.
    </footer>
  );
}

export default FooterComponent;


